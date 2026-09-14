import Link from 'next/link';
import PageHead from '@/components/PageHead';
import Media from '@/components/Media';
import Prose from '@/components/Prose';
import { getSite } from '@/lib/site';
import { buildMeta } from '@/lib/meta';
import { ui } from '@/lib/ui';
import { path } from '@/lib/routes';

export function meta(lang) {
  const p = getSite(lang).pages.procedures;
  return buildMeta(lang, path('procedures', lang), {
    title: p.metaTitle,
    description: p.metaDescription,
  });
}

export default function Procedures({ lang }) {
  const s = getSite(lang);
  const t = ui(lang);
  const p = s.pages.procedures;

  return (
    <>
      <PageHead
        lang={lang}
        crumbs={[{ label: t.routes.procedures }]}
        title={p.title}
        lead={p.lead}
      />

      <section className="section proceduri">
        {/* Pe granița de jos, nu pe cea de sus: sus ar rămâne singur într-o bandă
            goală între antet și text. */}

        <div className="wrap">
          <div className="steps">
            {s.steps.map((st, i) => (
              <article className="step" key={st.n} data-reveal="card">
                <div className="step__top">
                  <span className="step__n">{st.n}</span>
                  <span className="step__time">{st.time}</span>
                </div>
                <h3>{st.title}</h3>
                <p>{st.text}</p>
                <Media name={st.img} variant="step" alt={st.alt} />
              </article>
            ))}
          </div>

          <div className="split mt-block">
            <Prose blocks={p.blocks} />

            <aside className="aside-card" data-reveal>
              <h3>{p.asideTitle}</h3>
              <p>{p.asideText}</p>
              <Link href={path('prep', lang)} className="btn btn--ghost btn--block">
                {p.asideLink}
              </Link>
              <Link href={path('booking', lang)} className="btn btn--primary btn--block">
                {t.common.book}
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
