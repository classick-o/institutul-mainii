/**
 * Punctul unic de acces la conținut.
 *
 * Datele care nu se traduc (telefon, email, adresă, CUI) stau aici o singură
 * dată: dacă ar fi copiate în fiecare fișier de limbă, s-ar desincroniza exact
 * la lucrurile care trebuie să fie identice peste tot.
 *
 * Textele traduse vin din `lib/content/{ro,en}.js`. Paginile cer `getSite(lang)`
 * și primesc totul deja îmbinat, cu slug-urile potrivite limbii.
 *
 * ÎNAINTE DE LANSARE se înlocuiesc valorile marcate „(placeholder)".
 */

import ro from './content/ro';
import en from './content/en';
import { DEFAULT_LOCALE, conditionPath, conditionSlug } from './routes';

const CONTENT = { ro, en };

/** Datele clinicii care sunt aceleași în orice limbă. */
export const clinic = {
  name: 'Institutul Mâinii',
  legal: 'Institutul Mâinii SRL',
  cui: '00000000', // (placeholder)
  domain: 'institutulmainii.ro',
  url: 'https://institutulmainii.ro',
  phone: '+40 700 000 000', // (placeholder)
  phoneHref: 'tel:+40700000000', // (placeholder)
  email: 'contact@institutulmainii.ro', // (placeholder)
  address: 'Str. Exemplu nr. 12, București', // (placeholder)
  doctor: {
    name: 'Dr. Radu Mihăilescu', // (placeholder)
  },
};

/**
 * Tot conținutul unei limbi, îmbinat cu datele fixe ale clinicii.
 * Afecțiunile primesc `slug` și `href` calculate din harta de rute, deci o
 * pagină nu poate genera un link către un slug din cealaltă limbă.
 */
export function getSite(lang = DEFAULT_LOCALE) {
  const c = CONTENT[lang] || CONTENT[DEFAULT_LOCALE];

  return {
    lang,
    meta: c.meta,
    media: c.media,
    stats: c.stats,
    steps: c.steps,
    faq: c.faq,
    recovery: c.recovery,
    equipment: c.equipment,
    pages: c.pages,
    clinic: {
      ...clinic,
      hours: c.clinic.hours,
      doctor: { ...clinic.doctor, ...c.clinic.doctor },
    },
    conditions: c.conditions.map((cond) => ({
      ...cond,
      slug: conditionSlug(cond.id, lang),
      href: conditionPath(cond.id, lang),
    })),
  };
}

/** O singură afecțiune, după slug-ul din adresă. `null` dacă nu există. */
export function getCondition(slug, lang = DEFAULT_LOCALE) {
  const site = getSite(lang);
  const i = site.conditions.findIndex((c) => c.slug === slug);
  if (i === -1) return null;
  return {
    condition: site.conditions[i],
    prev: site.conditions[i - 1] || null,
    next: site.conditions[i + 1] || null,
  };
}
