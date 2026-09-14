import PageHead from '@/components/PageHead';
import BookingForm from '@/components/BookingForm';
import InfoPanel from '@/components/InfoPanel';
import Flow from '@/components/Flow';
import { getSite } from '@/lib/site';
import { buildMeta } from '@/lib/meta';
import { ui } from '@/lib/ui';
import { path } from '@/lib/routes';

export function meta(lang) {
  const p = getSite(lang).pages.booking;
  return buildMeta(lang, path('booking', lang), {
    title: p.metaTitle,
    description: p.metaDescription,
  });
}

export default function Booking({ lang }) {
  const s = getSite(lang);
  const t = ui(lang);
  const p = s.pages.booking;

  return (
    <>
      <PageHead
        lang={lang}
        crumbs={[{ label: t.routes.booking }]}
        title={p.title}
        lead={p.lead}
      />

      <Flow tone="bloom">
        <section className="section booking">

          <div className="wrap booking__inner">
            <div className="booking__form">
              <BookingForm lang={lang} />
            </div>

            <InfoPanel lang={lang} clinic={s.clinic} mapAlt={s.media.map} />
          </div>
        </section>
      </Flow>
    </>
  );
}
