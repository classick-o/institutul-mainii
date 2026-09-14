import Link from 'next/link';
import PageHead from '@/components/PageHead';
import Media from '@/components/Media';
import Precision from '@/components/Precision';
import Prose from '@/components/Prose';
import { getSite } from '@/lib/site';
import { buildMeta } from '@/lib/meta';
import { ui } from '@/lib/ui';
import { path } from '@/lib/routes';

export function meta(lang) {
  const p = getSite(lang).pages.about;
  return buildMeta(lang, path('about', lang), {
    title: p.metaTitle,
    description: p.metaDescription,
  });
}

export default function About({ lang }) {
  const s = getSite(lang);
  const t = ui(lang);
  const p = s.pages.about;
  const { clinic } = s;

  return (
    <>
      <PageHead
        lang={lang}
        crumbs={[{ label: t.routes.about }]}
        title={p.title}
        lead={p.lead}
      />

      <section className="section despre">
        {/* Coboară sub slab-ul de dotare care urmează; la marginea de sus ar sta
            singur în banda goală dintre antet și text. */}

        <div className="wrap">
          <div className="despre__grid">
            <div className="despre__media" data-reveal="media">
              <Media name="prompt-2" variant="portrait" alt={s.media.portrait} />
              <div className="despre__caption">
                <strong>{clinic.doctor.name}</strong>
                <span>{clinic.doctor.role}</span>
              </div>
            </div>

            <div className="despre__body">
              <Prose blocks={[{ p: p.body }, { h: p.factsTitle }]} />

              <dl className="despre__facts">
                {clinic.doctor.facts.map(([k, v], i) => (
                  <div className="fact" key={k} data-reveal>
                    <dt className="fact__k">{k}</dt>
                    <dd className="fact__v">{v}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-6" data-reveal>
                <Link href={path('booking', lang)} className="btn btn--primary">
                  {t.common.book}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Precision s={s} ariaLabel={p.equipmentAria} />
    </>
  );
}
