/* ═══════════════════════════════════════════════════════════
   Normalizează kitul decorativ, ca să treacă testul de coerență.

   Ce face, în ordine, pentru fiecare `assets/img/deco-*.png`:
     1. măsoară obiectul (bounding box, luminanță medie, saturație medie);
     2. îl rescalează în același cadru, ca diagonala lui să fie egală cu
        mediana setului — și îl centrează;
     3. îl gradează cu `brightness()` până la luminanța mediană a setului;
     4. îi reduce saturația până la p95-ul median al setului — DOAR în jos.

   Regula „doar în jos" e din greșeală proprie: prima versiune ținea saturația
   MEDIE a setului și o creștea unde era mică. Media e dominată de corpul
   aproape neutru al obiectului, deci multiplicatorul umfla vârful colorat —
   un accent albastru a urcat de la p95 0.44 la 0.72, adică exact invers decât
   voiam. Acum se ține p95 (vârful, adică accentul) și se taie doar excesul.
   Un obiect al cărui accent e prea PALID nu se poate repara din filtru: se
   regenerează, cerând în prompt proporția accentului. Scriptul îl raportează.

   Rulare:  node tools/normalizeaza-assets.js [--dry]
   Apoi:    node tools/coerenta-assets.js
   ═══════════════════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');

const CANDIDATES = [
  'playwright',
  'C:/Users/Alex/AppData/Local/npm-cache/_npx/705bc6b22212b352/node_modules/playwright',
  'C:/Users/Alex/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright',
];
let pw = null;
for (const c of CANDIDATES) { try { pw = require(c); break; } catch (e) { /* next */ } }
if (!pw) { console.error('Playwright nu e disponibil.'); process.exit(1); }

const DRY = process.argv.includes('--dry');
const DIR = path.join(__dirname, '..', 'assets', 'img');
const CLAMP = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const median = (a) => { const s = [...a].sort((x, y) => x - y); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };

const stats = (dataUrl) => new Promise((res, rej) => {
  const img = new Image();
  img.onload = () => {
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    const g = c.getContext('2d', { willReadFrequently: true });
    g.drawImage(img, 0, 0);
    const d = g.getImageData(0, 0, c.width, c.height).data;
    let n = 0, sumL = 0, minX = 1e9, maxX = -1, minY = 1e9, maxY = -1;
    const sats = [];
    for (let i = 0; i < d.length; i += 4) {
      if (d[i + 3] < 40) continue;
      const px = (i / 4) % c.width, py = Math.floor((i / 4) / c.width);
      if (px < minX) minX = px; if (px > maxX) maxX = px;
      if (py < minY) minY = py; if (py > maxY) maxY = py;
      const r = d[i] / 255, gg = d[i + 1] / 255, b = d[i + 2] / 255;
      const mx = Math.max(r, gg, b), mn = Math.min(r, gg, b);
      const L = (mx + mn) / 2;
      sumL += L;
      sats.push(mx === mn ? 0 : (L > 0.5 ? (mx - mn) / (2 - mx - mn) : (mx - mn) / (mx + mn)));
      n++;
    }
    if (!n) return rej(new Error('imagine goală'));
    sats.sort((a, b2) => a - b2);
    res({
      w: c.width, h: c.height,
      bx: minX, by: minY, bw: maxX - minX + 1, bh: maxY - minY + 1,
      diag: Math.hypot(maxX - minX + 1, maxY - minY + 1),
      L: sumL / n, S95: sats[Math.floor(0.95 * (sats.length - 1))],
    });
  };
  img.onerror = () => rej(new Error('imaginea nu s-a încărcat'));
  img.src = dataUrl;
});

const rewrite = ({ dataUrl, m, scale, bright, sat }) => new Promise((res, rej) => {
  const img = new Image();
  img.onload = () => {
    const c = document.createElement('canvas');
    c.width = m.w; c.height = m.h;
    const g = c.getContext('2d');
    g.clearRect(0, 0, c.width, c.height);
    g.imageSmoothingQuality = 'high';
    g.filter = `brightness(${bright}) saturate(${sat})`;
    // scalăm în jurul centrului bounding box-ului și îl aducem în centrul cadrului
    const cx = m.bx + m.bw / 2, cy = m.by + m.bh / 2;
    g.translate(c.width / 2, c.height / 2);
    g.scale(scale, scale);
    g.drawImage(img, -cx, -cy);
    res(c.toDataURL('image/png'));
  };
  img.onerror = () => rej(new Error('imaginea nu s-a încărcat'));
  img.src = dataUrl;
});

(async () => {
  const files = fs.readdirSync(DIR).filter(f => /^deco-\d+\.png$/i.test(f)).sort();
  if (!files.length) { console.error('niciun deco-*.png în ' + DIR); process.exit(1); }

  const b = await pw.chromium.launch();
  const p = await b.newPage();
  await p.goto('about:blank');

  const deRegenerat = [];
  // Două treceri, pentru că filtrele se aplică în ordinea brightness → saturate:
  // luminarea unui gri albăstrui îi crește saturația măsurată, deci factorul
  // calculat pe imaginea negradată nu mai e valid după gradare. A doua trecere
  // pornește de la valorile reale de după prima.
  const PASSES = DRY ? 1 : 2;
  for (let pass = 1; pass <= PASSES; pass++) {
    const items = [];
    for (const f of files) {
      const dataUrl = 'data:image/png;base64,' + fs.readFileSync(path.join(DIR, f)).toString('base64');
      items.push({ f, dataUrl, m: await p.evaluate(stats, dataUrl) });
    }

    const tDiag = median(items.map(i => i.m.diag));
    const tL = median(items.map(i => i.m.L));
    const tS95 = median(items.map(i => i.m.S95));
    console.log(`── trecerea ${pass}/${PASSES} · ținte: diagonală=${tDiag.toFixed(0)}px  luminanță=${tL.toFixed(3)}  saturație p95=${tS95.toFixed(3)}`);

    for (const it of items) {
      const scale  = CLAMP(tDiag / it.m.diag, 0.75, 1.3);
      const bright = CLAMP(tL / it.m.L, 0.8, 1.25);
      const dev = tS95 > 0 ? (it.m.S95 - tS95) / tS95 : 0;
      const sat = CLAMP(it.m.S95 > 0.01 ? Math.min(1, tS95 / it.m.S95) : 1, 0.4, 1);
      console.log(`   ${it.f}  scale=${scale.toFixed(3)}  brightness=${bright.toFixed(3)}  saturate=${sat.toFixed(3)}  satP95=${it.m.S95.toFixed(3)} (${dev >= 0 ? '+' : ''}${(100 * dev).toFixed(0)}%)`);
      // doar accentele prea PALIDE rămân de regenerat; excesul e tăiat mai sus
      if (pass === PASSES && dev < -0.25) deRegenerat.push(`${it.f} (accent prea mic/palid, ${(100 * dev).toFixed(0)}%)`);
      if (DRY) continue;
      const out = await p.evaluate(rewrite, { dataUrl: it.dataUrl, m: it.m, scale, bright, sat });
      fs.writeFileSync(path.join(DIR, it.f), Buffer.from(out.split(',')[1], 'base64'));
    }
  }

  await b.close();
  if (deRegenerat.length) {
    console.log('\nDE REGENERAT (saturația nu se rezolvă din filtru — cere în prompt');
    console.log('proporția accentului: „a single ring covering about 3% of the visible surface"):');
    deRegenerat.forEach(l => console.log('  ' + l));
  }
  console.log(DRY ? '\n(dry run — nu s-a scris nimic)' : '\nScris. Rulează acum: node tools/coerenta-assets.js');
})();
