import Link from 'next/link';
import PageHead from '@/components/PageHead';
import Faq from '@/components/Faq';
import Flow from '@/components/Flow';
import { rich } from '@/components/Prose';
import { getSite } from '@/lib/site';
import { buildMeta } from '@/lib/meta';
import { ui } from '@/lib/ui';
import { path } from '@/lib/routes';

export function meta(lang) {
  const p = getSite(lang).pages.faq;
  return buildMeta(lang, path('faq', lang), {
    title: p.metaTitle,
    description: p.metaDescription,
  });
}

/**
 * Datele structurate ajută la afișarea răspunsurilor direct în rezultatele
 * căutării. Le scriem din aceeași sursă ca pagina, deci nu pot ajunge să
 * difere de conținutul vizibil. `inLanguage` contează: fără el, cele două
 * versiuni ar concura pe aceleași întrebări.
 */
function faqJsonLd(items, lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export default function FaqPage({ lang }) {
  const s = getSite(lang);
  const t = ui(lang);
  const p = s.pages.faq;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(s.faq, lang)) }}
      />

      <PageHead
        lang={lang}
        crumbs={[{ label: t.routes.faq }]}
        title={p.title}
        lead={p.lead}
      />

      <Flow tone="bloom">
        <section className="section faq">

          <div className="wrap faq__inner">
            <div className="faq__head">
              <p className="intro" data-reveal="lead">{rich(p.intro)}</p>
              <Link
                href={path('booking', lang)}
                className="btn btn--primary"
                data-reveal
              >
                {t.common.askDoctor}
              </Link>
            </div>

            <Faq items={s.faq} />
          </div>
        </section>
      </Flow>
    </>
  );
}
