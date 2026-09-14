import Link from 'next/link';
import { img } from '@/lib/images';

/**
 * Deschiderea paginii de pornire.
 *
 * Fotografie pe tot ecranul, text jos-stânga, cifrele pe un rând la bază.
 * Statică, fără nicio animație: o fotografie documentară care se mișcă devine
 * reclamă.
 *
 * Perdeaua e în două straturi — unul vertical, care apasă partea de jos, și
 * unul orizontal dinspre stânga. Unul singur n-ar fi ajuns: cu doar cel
 * vertical, cuvintele lungi din lead ajung peste zona luminoasă a imaginii,
 * iar contrastul cade sub prag exact la mijlocul rândului.
 *
 * ── ce ține compoziția ──
 * Nimic aici nu e lăsat pe seama browserului, pentru că varianta care era
 * arăta exact ca ce e: un șablon. Titlul rupt de `text-wrap:balance` în rânduri
 * egale, totul pornind de pe aceeași linie din stânga, cifrele în coloane
 * identice — corect în fiecare punct și fără nicio urmă că cineva a hotărât
 * ceva. Deci:
 *   · titlul stă pe două trepte, iar ruptura e scrisă în conținut
 *     (`titleLines`), nu calculată din lățimea ferestrei;
 *   · treapta a doua e retrasă — singura abatere de la raftul din stânga, și
 *     e intenționată. Dacă ar fi două, n-ar mai părea decizie;
 *   · cifrele își iau lățimea din conținut, nu din `1fr`;
 *   · etichetele își păstrează rupturile de rând din fișierul de conținut.
 *     Nu le uni: `label.replace('\n', ' ')` șterge exact deciziile omului care
 *     a scris textul și transformă rândul de cifre într-un tabel.
 */
export default function Hero({ p, t, clinic, bookHref }) {
  const bg = img('hero');
  const lines = p.titleLines ?? [p.title];

  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true">
        <img src={bg.src} alt="" width={bg.width} height={bg.height} fetchPriority="high" />
        {/* Ordinea straturilor e ordinea unui laborator foto: întâi negrul
            ridicat, pe imaginea curată; apoi perdelele care fac loc textului;
            vigneta peste ele; granulația ultima, peste tot, pentru că pe
            peliculă grăunțele sunt în emulsie, nu sub ea. */}
        <span className="hero__lift"></span>
        <span className="hero__scrim"></span>
        <span className="hero__scrim-x"></span>
        <span className="hero__vig"></span>
        <span className="hero__grain"></span>
      </div>

      <div className="hero__inner">
        <div className="hero__copy">
          <h1 className="hero__title">
            <span className="hero__t1">{lines[0]}</span>
            {lines[1] ? <span className="hero__t2">{lines[1]}</span> : null}
          </h1>

          <p className="hero__lead">{p.lead}</p>

          <div className="hero__cta">
            <Link href={bookHref} className="btn btn--primary btn--lg">{t.common.book}</Link>
            <a href={clinic.phoneHref} className="hero__phone">{clinic.phone}</a>
          </div>
        </div>

        <dl className="hero__stats">
          {p.stats.map((s) => (
            <div key={s.value}>
              <dt>{s.value}</dt>
              <dd>
                {s.label.split('\n').map((line, i) => (
                  <span key={i}>{line}{i === 0 ? <br /> : null}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
