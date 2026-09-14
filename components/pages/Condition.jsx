import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHead from '@/components/PageHead';
import Prose from '@/components/Prose';
import { getCondition, getSite } from '@/lib/site';
import { buildMeta } from '@/lib/meta';
import { ui } from '@/lib/ui';
import { CONDITION_SLUGS, conditionPath, conditionSlug, path } from '@/lib/routes';

/** Fără server, rutele dinamice trebuie enumerate la build. */
export function params(lang) {
  return CONDITION_SLUGS.map((c) => ({ slug: conditionSlug(c.id, lang) }));
}

export function meta(lang, slug) {
  const found = getCondition(slug, lang);
  if (!found) return {};
  const c = found.condition;
  return buildMeta(lang, conditionPath(c.id, lang), {
    title: c.title,
    description: c.lead,
  });
}

export default function Condition({ lang, slug }) {
  const found = getCondition(slug, lang);
  if (!found) notFound();

  const { condition: c, prev, next } = found;
  const s = getSite(lang);
  const t = ui(lang);

  return (
    <>
      <PageHead
        lang={lang}
        crumbs={[
          { href: path('conditions', lang), label: t.routes.conditions },
          { label: c.title },
        ]}
        title={c.title}
        lead={c.lead}
      />

      <section className="section">
        {/* Pe granița de jos, nu pe cea de sus: sus ar rămâne singur într-o bandă
            goală între antet și text, iar `tuck` îl lasă să intre sub footer. */}

        <div className="wrap split">
          <Prose
            blocks={[
              { p: c.body },
              ...(c.urgent ? [{ h: c.urgentTitle, ul: c.urgentSteps }] : []),
            ]}
          >
            <div className="next-prev">
              {prev ? <Link href={prev.href}>← {prev.title}</Link> : <span />}
              {next && <Link href={next.href}>{next.title} →</Link>}
            </div>
          </Prose>

          <aside className="aside-card" data-reveal>
            <h3>{s.pages.conditions.summaryTitle}</h3>
            <dl>
              {c.facts.map(([k, v]) => (
                <div className="fact" key={k}>
                  <dt className="fact__k">{k}</dt>
                  <dd className="fact__v">{v}</dd>
                </div>
              ))}
            </dl>
            <Link href={path('booking', lang)} className="btn btn--primary btn--block">
              {t.common.book}
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
