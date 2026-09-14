import Link from 'next/link';
import PageHead from '@/components/PageHead';
import Prose, { rich } from '@/components/Prose';
import { getSite } from '@/lib/site';
import { buildMeta } from '@/lib/meta';
import { ui } from '@/lib/ui';
import { path } from '@/lib/routes';

export function meta(lang) {
  const p = getSite(lang).pages.prices;
  return buildMeta(lang, path('prices', lang), {
    title: p.metaTitle,
    description: p.metaDescription,
  });
}

export default function Prices({ lang }) {
  const s = getSite(lang);
  const t = ui(lang);
  const p = s.pages.prices;

  return (
    <>
      <PageHead
        lang={lang}
        crumbs={[{ label: t.routes.prices }]}
        title={p.title}
        lead={p.lead}
      />

      <section className="section">
        <div className="wrap split">
          <Prose blocks={p.blocks} />

          <aside className="aside-card" data-reveal>
            <h3>{p.asideTitle}</h3>
            <dl>
              {p.table.map(([k, v]) => (
                <div className="fact fact--plain" key={k}>
                  <dt className="fact__k">{k}</dt>
                  <dd className="fact__v">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="fine">{rich(p.asideNote)}</p>
            <Link href={path('booking', lang)} className="btn btn--primary btn--block">
              {t.common.book}
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
