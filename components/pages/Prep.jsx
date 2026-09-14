import Link from 'next/link';
import PageHead from '@/components/PageHead';
import Prose from '@/components/Prose';
import { getSite } from '@/lib/site';
import { buildMeta } from '@/lib/meta';
import { ui } from '@/lib/ui';
import { path } from '@/lib/routes';

export function meta(lang) {
  const p = getSite(lang).pages.prep;
  return buildMeta(lang, path('prep', lang), {
    title: p.metaTitle,
    description: p.metaDescription,
  });
}

export default function Prep({ lang }) {
  const s = getSite(lang);
  const t = ui(lang);
  const p = s.pages.prep;

  return (
    <>
      <PageHead
        lang={lang}
        crumbs={[{ label: t.routes.prep }]}
        title={p.title}
        lead={p.lead}
      />

      <section className="section">
        <div className="wrap split">
          <Prose blocks={p.blocks} />

          <aside className="aside-card" data-reveal>
            <h3>{p.asideTitle}</h3>
            <dl>
              {p.asideFacts.map(([k, v]) => (
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
