import Media from './Media';
import { ui } from '@/lib/ui';

/** Coloana de lângă formular: harta, adresa, programul și emailul. */
export default function InfoPanel({ lang, clinic, mapAlt }) {
  const t = ui(lang);

  return (
    <aside className="booking__side">
      <Media name="prompt-9" variant="map" reveal alt={mapAlt} />

      <dl className="info">
        <div className="info__row" data-reveal>
          <dt>{t.common.address}</dt><dd>{clinic.address}</dd>
        </div>

        {clinic.hours.map((h, i) => (
          <div className="info__row" key={h.k} data-reveal>
            <dt>{h.k}</dt>
            <dd>
              {h.phone
                ? <><a href={clinic.phoneHref}>{clinic.phone}</a>, {h.v}</>
                : h.v}
            </dd>
          </div>
        ))}

        <div className="info__row" data-reveal>
          <dt>{t.common.email}</dt>
          <dd><a href={`mailto:${clinic.email}`}>{clinic.email}</a></dd>
        </div>
      </dl>
    </aside>
  );
}
