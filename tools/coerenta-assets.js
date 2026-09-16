/* ═══════════════════════════════════════════════════════════
   Test de coerență pentru kitul de obiecte decorative.

   La ce e bun: „arată ca o familie" e o impresie, până o măsori.
   Scriptul citește PNG-urile `assets/img/deco-*.png`, ia doar pixelii
   opaci și calculează metricile de material și de cadraj. Dacă un obiect
   a fost generat cu alt material (crom, dispersie curcubeu, albastru
   saturat) sau cu altă lumină, iese ca outlier numeric.

   Rulare:
     node tools/coerenta-assets.js
     node tools/coerenta-assets.js <alt-folder> [încă-un-folder ...]

   Cere Playwright (folosit doar ca să am un canvas care citește RGBA).
   Dacă nu e instalat local:  npx playwright@latest install chromium
   ═══════════════════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');

const CANDIDATES = [
  'playwright',
  'C:/Users/Alex/AppData/Local/npm-cache/_npx/705bc6b22212b352/node_modules/playwright',
  'C:/Users/Alex/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright',
];
let pw = null;
for (const c of CANDIDATES) { try { pw = require(c); break; } catch (e) { /* încearcă următorul */ } }
if (!pw) { console.error('Playwright nu e disponibil. Rulează: npx playwright@latest install chromium'); process.exit(1); }

const dirs = process.argv.slice(2);
if (!dirs.length) dirs.push(path.join(__dirname, '..', 'assets', 'img'));

const measure = (dataUrl) => new Promise((res, rej) => {
  const img = new Image();
  img.onload = () => {
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    const g = c.getContext('2d', { willReadFrequently: true });
    g.drawImage(img, 0, 0);
    const d = g.getImageData(0, 0, c.width, c.height).data;
    let n = 0, sumL = 0, sumL2 = 0, sumS = 0, warm = 0, hisat = 0;
    let minX = 1e9, maxX = -1, minY = 1e9, maxY = -1;
    const sats = [], hues = [];
    const total = c.width * c.height;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i + 3] < 40) continue;                    // ignoră transparența
      const px = (i / 4) % c.width, py = Math.floor((i / 4) / c.width);
      if (px < minX) minX = px; if (px > maxX) maxX = px;
      if (py < minY) minY = py; if (py > maxY) maxY = py;
      const r = d[i] / 255, gg = d[i + 1] / 255, b = d[i + 2] / 255;
      const mx = Math.max(r, gg, b), mn = Math.min(r, gg, b);
      const L = (mx + mn) / 2;
      const S = mx === mn ? 0 : (L > 0.5 ? (mx - mn) / (2 - mx - mn) : (mx - mn) / (mx + mn));
      let H = 0;
      if (mx !== mn) {
        if (mx === r) H = 60 * (((gg - b) / (mx - mn)) % 6);
        else if (mx === gg) H = 60 * ((b - r) / (mx - mn) + 2);
        else H = 60 * ((r - gg) / (mx - mn) + 4);
        if (H < 0) H += 360;
      }
      n++; sumL += L; sumL2 += L * L; sumS += S; sats.push(S);
      if (S > 0.15) hues.push(H);
      if (S > 0.12 && H >= 20 && H <= 65) warm++;     // pixeli calzi = paletă spartă
      if (S > 0.45) hisat++;                          // pixeli foarte saturați
    }
    if (!n) return res(null);
    sats.sort((a, b2) => a - b2); hues.sort((a, b2) => a - b2);
    const meanL = sumL / n;
    res({
      cov:  +(100 * n / total).toFixed(1),
      bw:   +(100 * (maxX - minX + 1) / c.width).toFixed(1),
      bh:   +(100 * (maxY - minY + 1) / c.height).toFixed(1),
      diag: +(Math.hypot(100 * (maxX - minX + 1) / c.width, 100 * (maxY - minY + 1) / c.height)).toFixed(1),
      L:    +meanL.toFixed(3),
      Lsd:  +Math.sqrt(Math.max(0, sumL2 / n - meanL * meanL)).toFixed(3),
      S:    +(sumS / n).toFixed(3),
      S95:  +sats[Math.floor(0.95 * (sats.length - 1))].toFixed(3),
      warm: +(100 * warm / n).toFixed(1),
      hsat: +(100 * hisat / n).toFixed(1),
      hue:  hues.length ? +hues[Math.floor(hues.length / 2)].toFixed(0) : null,
    });
  };
  img.onerror = () => rej(new Error('imaginea nu s-a încărcat'));
  img.src = dataUrl;
});

const KEYS = [
  ['L',    'luminanță medie',      2],   // [cheie, etichetă, prag de variație % acceptat]
  ['Lsd',  'contrast intern',     25],
  ['S',    'saturație medie',     15],
  ['S95',  'saturație p95',       20],
  ['hsat', '% pixeli f. saturați', 0],   // 0 = doar informativ, se judecă pe valoarea absolută
  ['warm', '% pixeli calzi',       0],
  ['hue',  'nuanță mediană',       2],
  ['diag', 'mărime în cadru',     15],
];

(async () => {
  const b = await pw.chromium.launch();
  const p = await b.newPage();
  await p.goto('about:blank');
  const verdicts = [];

  for (const dir of dirs) {
    let failed = false;   // verdictul se dă pe fiecare set separat
    const files = fs.readdirSync(dir).filter(f => /^deco-\d+\.png$/i.test(f)).sort();
    if (!files.length) { console.log(`\n${dir}, niciun deco-*.png`); continue; }

    const rows = [];
    for (const f of files) {
      const b64 = fs.readFileSync(path.join(dir, f)).toString('base64');
      const m = await p.evaluate(measure, 'data:image/png;base64,' + b64);
      if (m) rows.push({ f, ...m });
    }

    console.log(`\n══════ ${dir} · ${rows.length} obiecte ══════`);
    const cols = ['fișier', 'acop%', 'lat%', 'înalt%', 'diag', 'lum', 'lumSD', 'sat', 'satP95', 'cald%', 'satMare%', 'nuanță'];
    console.log(cols.map((c, i) => c.padEnd(i === 0 ? 13 : 10)).join(''));
    rows.forEach(r => console.log(
      [r.f, r.cov, r.bw, r.bh, r.diag, r.L, r.Lsd, r.S, r.S95, r.warm, r.hsat, r.hue]
        .map((v, i) => String(v).padEnd(i === 0 ? 13 : 10)).join('')));

    console.log('--- dispersie ---');
    const flags = [];
    for (const [k, name, limit] of KEYS) {
      const vals = rows.map(r => r[k]).filter(v => v !== null && v !== undefined);
      if (!vals.length) continue;
      const mean = vals.reduce((a, c) => a + c, 0) / vals.length;
      const sd = Math.sqrt(vals.reduce((a, c) => a + (c - mean) ** 2, 0) / vals.length);
      const cv = mean !== 0 ? Math.abs(100 * sd / mean) : 0;
      const over = limit > 0 && cv > limit;
      if (over) failed = true;
      console.log(`${name.padEnd(22)} medie=${mean.toFixed(3).padStart(8)}  min=${Math.min(...vals).toFixed(3).padStart(8)}  max=${Math.max(...vals).toFixed(3).padStart(8)}  variație=${cv.toFixed(0).padStart(4)}%${over ? `  ← peste pragul de ${limit}%` : ''}`);
      if (sd > 0) rows.forEach(r => {
        if (r[k] === null) return;
        const z = (r[k] - mean) / sd;
        if (Math.abs(z) > 1.8) flags.push(`  ${r.f} · ${name} = ${r[k]}  (z=${z.toFixed(2)})`);
      });
    }
    const warmMax = Math.max(...rows.map(r => r.warm));
    if (warmMax > 1) { failed = true; console.log(`ATENȚIE: pixeli calzi până la ${warmMax}%, paleta e spartă (nu trebuie tonuri calde)`); }

    console.log('--- outlieri (|z| > 1.8) ---');
    console.log(flags.length ? [...new Set(flags)].join('\n') : '  niciunul');
    console.log(failed ? 'VERDICT: setul NU e omogen, vezi liniile marcate.' : 'VERDICT: set omogen.');
    verdicts.push({ dir, failed });
  }

  await b.close();
  // codul de ieșire se dă doar pe primul folder (implicit: kitul proiectului),
  // ca o comparație cu un set de arhivă să nu strice rezultatul
  process.exit(verdicts[0] && verdicts[0].failed ? 1 : 0);
})();
