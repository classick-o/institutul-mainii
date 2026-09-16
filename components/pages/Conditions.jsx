import Link from 'next/link';
import PageHead from '@/components/PageHead';
import Flow from '@/components/Flow';
import { getSite } from '@/lib/site';
import { buildMeta } from '@/lib/meta';
import { ui } from '@/lib/ui';
import { path } from '@/lib/routes';

export function meta(lang) {
  const p = getSite(lang).pages.conditions;
  return buildMeta(lang, path('conditions', lang), {
    title: p.metaTitle,
    description: p.metaDescription,
  });
}

export default function Conditions({ lang }) {
  const s = getSite(lang);
  const t = ui(lang);
  const p = s.pages.conditions;

  return (
    <>
      <PageHead
        lang={lang}
        crumbs={[{ label: t.routes.conditions }]}
        title={p.title}
        lead={p.lead}
      />

      <Flow tone="calm">
        <section className="section afectiuni">

          <div className="wrap">
            <div className="cond-grid">
              {s.conditions.map((c, i) => (
                <Link
                  className={`cond${c.urgent ? ' cond--urgent' : ''}`}
                  href={c.href}
                  key={c.id}
                  data-reveal="card"
                >
                  <h3>{c.title}</h3>
                  <p>{c.short}</p>
                  <span className="cond__go">{t.common.seeDetails} <i>→</i></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Flow>
    </>
  );
}
