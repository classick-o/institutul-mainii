/**
 * Metadatele paginilor, construite dintr-un singur loc.
 *
 * Partea care contează la un site bilingv e `alternates`: fiecare pagină
 * trebuie să declare unde se află perechea ei în cealaltă limbă. Fără hreflang,
 * Google tratează cele două versiuni ca pagini concurente pe același subiect și
 * o alege pe una singură. Cu el, arată versiunea potrivită limbii căutătorului.
 *
 * `x-default` trimite la română: e limba principală a clinicii, deci e
 * varianta rezonabilă pentru un vizitator a cărui limbă nu e niciuna dintre
 * cele două.
 */

import { clinic, getSite } from './site';
import { LOCALES, OG_LOCALE, ROUTES, counterpart } from './routes';

/** Codurile hreflang. Româna e regională, engleza deliberat nu. */
const HREFLANG = { ro: 'ro-RO', en: 'en' };

/**
 * Metadatele layoutului rădăcină al unei limbi. Titlul paginii de pornire e
 * complet; restul paginilor îl primesc prin șablon, deci numele clinicii nu
 * trebuie repetat în fiecare fișier de conținut.
 */
export function rootMeta(lang) {
  const s = getSite(lang);
  return {
    metadataBase: new URL(clinic.url),
    title: { default: s.meta.title, template: `%s · ${clinic.name}` },
    description: s.meta.description,
    robots: { index: true, follow: true },
  };
}

export function buildMeta(lang, currentPath, { title, description } = {}) {
  const languages = {};
  for (const l of LOCALES) languages[HREFLANG[l]] = counterpart(currentPath, l);
  languages['x-default'] = ROUTES.home.ro;

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: { canonical: currentPath, languages },
    openGraph: {
      type: 'website',
      siteName: clinic.name,
      locale: OG_LOCALE[lang],
      url: currentPath,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
    },
  };
}
