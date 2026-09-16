/**
 * Harta de rute, pentru ambele limbi.
 *
 * Româna stă în rădăcină (`/despre/`), engleza într-un subarbore (`/en/about/`).
 * Motivul e clientul: româna e limba principală a clinicii, deci nu trebuie să
 * plătească un redirect și un segment în plus la fiecare adresă.
 *
 * Slug-urile se traduc. „/en/afectiuni/" i-ar spune unui cititor englez că
 * pagina e stricată, iar Google indexează separat fiecare versiune. Costul e
 * că perechea ro↔en trebuie ținută undeva: aici, într-un singur loc, de unde o
 * folosesc meniul, comutatorul de limbă, hreflang-ul și sitemap-ul.
 *
 * Fișierul nu importă nimic: îl citește și `scripts/postbuild.mjs`.
 */

export const LOCALES = ['ro', 'en'];
export const DEFAULT_LOCALE = 'ro';

/** Codurile pentru `<html lang>` și pentru `og:locale`. */
export const HTML_LANG = { ro: 'ro', en: 'en' };
export const OG_LOCALE = { ro: 'ro_RO', en: 'en_US' };

export const ROUTES = {
  home:       { ro: '/',                   en: '/en/' },
  about:      { ro: '/despre/',            en: '/en/about/' },
  conditions: { ro: '/afectiuni/',         en: '/en/conditions/' },
  procedures: { ro: '/proceduri/',         en: '/en/how-we-work/' },
  recovery:   { ro: '/recuperare/',        en: '/en/recovery/' },
  faq:        { ro: '/intrebari/',         en: '/en/faq/' },
  booking:    { ro: '/programare/',        en: '/en/appointment/' },
  prices:     { ro: '/tarife/',            en: '/en/prices/' },
  prep:       { ro: '/pregatire/',         en: '/en/preparation/' },
  privacy:    { ro: '/confidentialitate/', en: '/en/privacy/' },
  gdpr:       { ro: '/gdpr/',              en: '/en/gdpr/' },
  terms:      { ro: '/termeni/',           en: '/en/terms/' },
  cookies:    { ro: '/cookies/',           en: '/en/cookies/' },
};

/**
 * Perechile de slug pentru paginile de afecțiuni. `id` e cheia stabilă:
 * conținutul se scrie pe `id`, nu pe slug, deci o traducere de slug nu poate
 * desincroniza textul de adresă.
 */
export const CONDITION_SLUGS = [
  { id: 'tunel-carpian',          ro: 'tunel-carpian',          en: 'carpal-tunnel-syndrome' },
  { id: 'boala-dupuytren',        ro: 'boala-dupuytren',        en: 'dupuytren-disease' },
  { id: 'deget-in-resort',        ro: 'deget-in-resort',        en: 'trigger-finger' },
  { id: 'fracturi-si-luxatii',    ro: 'fracturi-si-luxatii',    en: 'fractures-and-dislocations' },
  { id: 'leziuni-de-nervi',       ro: 'leziuni-de-nervi',       en: 'peripheral-nerve-injuries' },
  { id: 'artroza-mainii',         ro: 'artroza-mainii',         en: 'hand-arthritis' },
  { id: 'urgente-si-replantari',  ro: 'urgente-si-replantari',  en: 'emergencies-and-replantation' },
  { id: 'malformatii-congenitale', ro: 'malformatii-congenitale', en: 'congenital-differences' },
];

/** Adresa unei pagini fixe. */
export function path(id, lang = DEFAULT_LOCALE) {
  const r = ROUTES[id];
  if (!r) throw new Error(`Rută inexistentă: ${id}`);
  return r[lang];
}

/** Slug-ul unei afecțiuni în limba cerută. */
export function conditionSlug(id, lang = DEFAULT_LOCALE) {
  const c = CONDITION_SLUGS.find((x) => x.id === id);
  if (!c) throw new Error(`Afecțiune inexistentă: ${id}`);
  return c[lang];
}

/** Adresa completă a unei pagini de afecțiune. */
export function conditionPath(id, lang = DEFAULT_LOCALE) {
  return `${path('conditions', lang)}${conditionSlug(id, lang)}/`;
}

/** Ordinea din meniu. Restul paginilor există, dar nu apar în bara de sus. */
export const NAV_IDS = ['about', 'conditions', 'procedures', 'recovery', 'faq'];
export const PATIENT_IDS = ['booking', 'faq', 'prices', 'prep'];
export const LEGAL_IDS = ['privacy', 'gdpr', 'terms', 'cookies'];

const norm = (p) => (p.endsWith('/') ? p : `${p}/`);

/**
 * Adresa aceleiași pagini în cealaltă limbă.
 *
 * Comutatorul de limbă trebuie să te lase pe pagina pe care ești, nu să te
 * arunce pe prima. Când nu există corespondent (o adresă greșită), duce la
 * pornirea limbii cerute, mai bine decât un 404.
 */
export function counterpart(pathname, to) {
  const p = norm(pathname || '/');

  for (const [id, byLang] of Object.entries(ROUTES)) {
    for (const lang of LOCALES) {
      if (norm(byLang[lang]) === p) return ROUTES[id][to];
    }
  }

  for (const lang of LOCALES) {
    const base = norm(ROUTES.conditions[lang]);
    if (p.startsWith(base)) {
      const slug = p.slice(base.length).replace(/\/$/, '');
      const found = CONDITION_SLUGS.find((c) => c[lang] === slug);
      if (found) return conditionPath(found.id, to);
      return ROUTES.conditions[to];
    }
  }

  return ROUTES.home[to];
}

/** Toate adresele dintr-o limbă, pentru sitemap și pentru verificări. */
export function allPaths(lang) {
  return [
    ...Object.keys(ROUTES).map((id) => path(id, lang)),
    ...CONDITION_SLUGS.map((c) => conditionPath(c.id, lang)),
  ];
}
