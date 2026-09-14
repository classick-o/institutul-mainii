/**
 * După `next build` (export static), pune în `out/` fișierele care nu trec
 * prin bundler:
 *
 *   – `.nojekyll`  — GitHub Pages ignoră altfel folderele care încep cu `_`,
 *                    adică exact `_next`, și site-ul rămâne fără CSS și JS;
 *   – `.htaccess`  — regulile de server pentru Hostico;
 *   – `api/`       — endpointul PHP al formularului;
 *   – `robots.txt`, `sitemap.xml` — generate din paginile chiar produse.
 *
 * Sitemap-ul se construiește citind `out/`, nu harta de rute din cod. Așa nu
 * poate anunța o pagină care n-a fost generată, iar perechile de limbă se iau
 * din `<link rel="alternate">` scrise chiar în pagini — deci sitemap-ul e și o
 * verificare că hreflang-ul a ajuns în HTML.
 */
import { cp, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'out');
const isPages = process.env.GITHUB_PAGES === '1';

if (!existsSync(out)) {
  console.error('postbuild: lipsește folderul out/. Rulează întâi `next build`.');
  process.exit(1);
}

/* ── 1. GitHub Pages ─────────────────────────────────────── */
await writeFile(path.join(out, '.nojekyll'), '');

/* ── 2. Fișierele pentru Hostico ─────────────────────────── */
await cp(path.join(root, 'server', '.htaccess'), path.join(out, '.htaccess'));
await mkdir(path.join(out, 'api'), { recursive: true });
for (const f of await readdir(path.join(root, 'server', 'api'))) {
  await cp(path.join(root, 'server', 'api', f), path.join(out, 'api', f));
}

/* ── 3. Alias pentru încărcarea anticipată a rutelor ──────
   Next 16 scrie payload-urile de navigare în foldere
   (`despre/__next.despre/__PAGE__.txt`), dar browserul le cere cu punct în
   cale (`despre/__next.despre.__PAGE__.txt`). Fără aliasuri, fiecare trecere
   cu mouse-ul peste un link produce un 404 în logurile serverului, iar
   navigarea pierde avantajul prefetch-ului și reîncarcă pagina întreagă.
   Copiem fișierele și sub numele cerut; sunt câțiva kilobytes. */
async function aliasPrefetch(dir) {
  let created = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith('__next.')) {
      const stack = [{ p: full, prefix: entry.name }];
      while (stack.length) {
        const { p: cur, prefix } = stack.pop();
        for (const e of await readdir(cur, { withFileTypes: true })) {
          const child = path.join(cur, e.name);
          if (e.isDirectory()) stack.push({ p: child, prefix: `${prefix}.${e.name}` });
          else {
            await cp(child, path.join(dir, `${prefix}.${e.name}`));
            created++;
          }
        }
      }
    } else {
      created += await aliasPrefetch(full);
    }
  }
  return created;
}
const aliases = await aliasPrefetch(out);

/* ── 4. Paginile chiar generate ──────────────────────────── */
// Ignorăm 404-ul și ruta internă `_not-found`: nu se indexează.
const SKIP = new Set(['404', '_not-found', '_next', 'api']);

async function collectPages(dir, prefix = '') {
  const found = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.isFile() && e.name === 'index.html') {
      found.push({ route: prefix === '' ? '/' : `/${prefix}/`, file: path.join(dir, e.name) });
    } else if (e.isDirectory() && !SKIP.has(e.name) && !e.name.startsWith('__next')) {
      found.push(...await collectPages(path.join(dir, e.name), prefix ? `${prefix}/${e.name}` : e.name));
    }
  }
  return found;
}

const pages = (await collectPages(out)).sort((a, b) => a.route.localeCompare(b.route));

/* ── 5. sitemap.xml, cu perechile de limbă ───────────────── */
const site = await readFile(path.join(root, 'lib', 'site.js'), 'utf8');
const base = (site.match(/url:\s*'([^']+)'/) || [])[1] || 'https://institutulmainii.ro';

const ALT = /<link[^>]+rel="alternate"[^>]*>/g;
const ATTR = (tag, name) => (tag.match(new RegExp(`${name}="([^"]*)"`)) || [])[1];

let withAlternates = 0;
const entries = [];

for (const p of pages) {
  const html = await readFile(p.file, 'utf8');
  const alts = (html.match(ALT) || [])
    .map((tag) => ({ lang: ATTR(tag, 'hrefLang') || ATTR(tag, 'hreflang'), href: ATTR(tag, 'href') }))
    .filter((a) => a.lang && a.href);

  if (alts.length) withAlternates++;
  entries.push({ loc: base + p.route, alts });
}

const today = new Date().toISOString().slice(0, 10);
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' +
  ' xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
  entries
    .map((e) => {
      const links = e.alts
        .map((a) => `\n    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.href}"/>`)
        .join('');
      return `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${today}</lastmod>${links}\n  </url>`;
    })
    .join('\n') +
  '\n</urlset>\n';

// Pe previzualizarea de pe GitHub Pages nu vrem indexare: e o variantă de
// lucru, iar dacă ajunge în Google concurează cu domeniul real.
const robots = isPages
  ? 'User-agent: *\nDisallow: /\n'
  : `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`;

await writeFile(path.join(out, 'sitemap.xml'), sitemap);
await writeFile(path.join(out, 'robots.txt'), robots);

if (withAlternates !== pages.length) {
  console.error(
    `postbuild: ${pages.length - withAlternates} pagini fără hreflang. ` +
    'Verifică `alternates` din lib/meta.js.'
  );
  process.exit(1);
}

console.log(
  `postbuild: ${pages.length} pagini în sitemap, toate cu pereche de limbă, ` +
  `${aliases} aliasuri de prefetch, ` +
  `${isPages ? 'robots = noindex (previzualizare Pages)' : 'robots = indexabil'}, ` +
  `.htaccess și api/ copiate.`
);
