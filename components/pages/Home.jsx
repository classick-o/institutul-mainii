import Link from 'next/link';
import Media from '@/components/Media';
import Flow from '@/components/Flow';
import Faq from '@/components/Faq';
import Steps from '@/components/Steps';
import Precision from '@/components/Precision';
import BookingForm from '@/components/BookingForm';
import InfoPanel from '@/components/InfoPanel';
import Hero from '@/components/Hero';
import { getSite } from '@/lib/site';
import { buildMeta } from '@/lib/meta';
import { ui } from '@/lib/ui';
import { path } from '@/lib/routes';

export function meta(lang) {
  const s = getSite(lang);
  return buildMeta(lang, path('home', lang), {
    title: s.meta.title,
    description: s.meta.description,
  });
}

export default function Home({ lang }) {
  const s = getSite(lang);
  const t = ui(lang);
  const p = s.pages.home;
  const { clinic } = s;

  return (
    <>
      {/* ══════════════ DESCHIDERE ══════════════ */}
      <Hero p={{ ...p, stats: s.stats }} t={t} clinic={clinic} bookHref={path('booking', lang)} />

      <Flow tone="calm">
        {/* ══════════════ MEDICUL ══════════════ */}
        <section className="section despre">
          <h2 className="sr-only">{p.sections.doctor}</h2>

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
                <p className="lead" data-reveal="lead">{p.doctorLead}</p>

                <dl className="despre__facts">
                  {clinic.doctor.facts.map(([k, v], i) => (
                    <div className="fact" key={k} data-reveal>
                      <dt className="fact__k">{k}</dt>
                      <dd className="fact__v">{v}</dd>
                    </div>
                  ))}
                </dl>

                <p data-reveal>
                  <Link href={path('about', lang)} className="link-arrow">
                    {p.doctorLink} <i>→</i>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ AFECȚIUNI ══════════════ */}
        <section className="section afectiuni">
          <h2 className="sr-only">{p.sections.conditions}</h2>

          <div className="wrap">
            <p className="intro" data-reveal="lead">{p.conditionsIntro}</p>

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

      {/* ══════════════ PRECIZIE ══════════════ */}
      <Precision s={s} ariaLabel={p.sections.blueprint} />

      {/* ══════════════ PARCURS ══════════════ */}
      <section className="section proceduri">
        <h2 className="sr-only">{p.sections.procedures}</h2>

        <div className="wrap">
          <p className="intro" data-reveal="lead">{p.proceduresIntro}</p>

          <Steps steps={s.steps} />
        </div>
      </section>

      <Flow tone="bloom">
        {/* ══════════════ RECUPERARE ══════════════ */}
        <section className="feature">
          <h2 className="sr-only">{p.sections.recovery}</h2>

          <div className="wrap feature__inner">
            <Media name="prompt-8" variant="feature" reveal alt={s.media.feature} />

            <div className="feature__copy">
              <p className="intro" data-reveal="lead">{p.recoveryIntro}</p>

              <div className="feature__cards">
                {s.recovery.map((r, i) => (
                  <div className="fcard" key={r.title} data-reveal="card">
                    <h4>{r.title}</h4>
                    <p>{r.text}</p>
                  </div>
                ))}
              </div>

              <p className="mt-6" data-reveal>
                <Link href={path('recovery', lang)} className="link-arrow">
                  {p.recoveryLink} <i>→</i>
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════ ÎNTREBĂRI ══════════════ */}
        <section className="section faq">
          <h2 className="sr-only">{p.sections.faq}</h2>

          <div className="wrap faq__inner">
            <div className="faq__head">
              <p className="intro" data-reveal="lead">{p.faqIntro}</p>
              <Link href={path('booking', lang)} className="btn btn--primary" data-reveal>
                {t.common.askDoctor}
              </Link>
            </div>

            <Faq items={s.faq} />
          </div>
        </section>

        {/* ══════════════ PROGRAMARE ══════════════ */}
        <section className="section booking">
          <h2 className="sr-only">{p.sections.booking}</h2>

          <div className="wrap booking__inner">
            <div className="booking__form">
              <p className="intro" data-reveal="lead">{p.bookingIntro}</p>
              <BookingForm lang={lang} />
            </div>

            <InfoPanel lang={lang} clinic={clinic} mapAlt={s.media.map} />
          </div>
        </section>
      </Flow>
    </>
  );
}
