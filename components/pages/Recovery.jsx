import Link from 'next/link';
import PageHead from '@/components/PageHead';
import Media from '@/components/Media';
import Flow from '@/components/Flow';
import Prose from '@/components/Prose';
import { getSite } from '@/lib/site';
import { buildMeta } from '@/lib/meta';
import { ui } from '@/lib/ui';
import { path } from '@/lib/routes';

export function meta(lang) {
  const p = getSite(lang).pages.recovery;
  return buildMeta(lang, path('recovery', lang), {
    title: p.metaTitle,
    description: p.metaDescription,
  });
}

export default function Recovery({ lang }) {
  const s = getSite(lang);
  const t = ui(lang);
  const p = s.pages.recovery;

  return (
    <>
      <PageHead
        lang={lang}
        crumbs={[{ label: t.routes.recovery }]}
        title={p.title}
        lead={p.lead}
      />

      <Flow tone="bloom">
        <section className="feature">
          <div className="wrap feature__inner">
            <Media name="prompt-8" variant="feature" reveal alt={s.media.feature} />

            <div className="feature__copy">
              <Prose intro={p.intro} />

              <div className="feature__cards">
                {s.recovery.map((r, i) => (
                  <div className="fcard" key={r.title} data-reveal="card">
                    <h4>{r.title}</h4>
                    <p>{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section">

          <div className="wrap split">
            <Prose blocks={p.blocks} />

            <aside className="aside-card" data-reveal>
              <h3>{p.asideTitle}</h3>
              <p>{p.asideText}</p>
              <Link href={path('booking', lang)} className="btn btn--primary btn--block">
                {p.asideCta}
              </Link>
            </aside>
          </div>
        </section>
      </Flow>
    </>
  );
}
