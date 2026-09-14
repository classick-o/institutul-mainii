/**
 * Export static. Motivul e concret, nu preferință:
 *
 *  - GitHub Pages servește doar fișiere statice;
 *  - planul Hostico Start (cel mai ieftin) are PHP prin MultiPHP, dar
 *    Node.js e disponibil doar pe pachetele Business și Reseller.
 *
 * Deci nu există server Node în niciunul dintre cele două scenarii, iar
 * `output: 'export'` produce HTML gata de urcat în `public_html` sau în
 * artefactul de Pages. Formularul are nevoie de execuție pe server, așa că
 * merge separat, prin `public_html/api/contact.php` (vezi DEPLOY.md).
 *
 * GITHUB_PAGES=1 pornește varianta pentru Pages: prefix de cale (numele
 * repozitoriului) și linkuri cu slash final, ca /despre/ să funcționeze
 * fără rescriere pe server.
 */
const isPages = process.env.GITHUB_PAGES === '1';
const repo = process.env.PAGES_BASE_PATH || '/institutul-mainii';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  basePath: isPages ? repo : '',
  assetPrefix: isPages ? repo + '/' : '',
  images: {
    // Fără server Node nu există optimizare de imagini la cerere.
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isPages ? repo : '',
  },
};

export default nextConfig;
