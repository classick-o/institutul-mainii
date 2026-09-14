import { img } from '@/lib/images';

/**
 * Cele patru etape, ca grilă de carduri cu fotografia pe fund.
 *
 * Două pe rând, dar rândul de jos e împărțit inegal: cardul din stânga-jos ia
 * mai mult decât jumătate. Fără asta ar fi patru dreptunghiuri identice, adică
 * exact ce nu sunt etapele — patru lucruri interschimbabile.
 *
 * Împărțirea se face pe douăsprezece coloane, nu pe două: `6+6` sus și `7+5`
 * jos se scriu direct, pe când din `1fr 1fr` nu poți rupe șapte cu cinci.
 *
 * Textul stă peste fotografie, în colțul de jos-stânga, pe o perdea întunecată.
 * Perdeaua are două straturi din același motiv ca la deschidere: una singură,
 * verticală, lasă titlurile lungi să urce peste partea luminoasă a imaginii.
 */
export default function Steps({ steps }) {
  return (
    <ol className="steps">
      {steps.map((st) => {
        const bg = img(st.img);
        return (
          <li className="stepc" key={st.n} data-reveal="card">
            <article>
              <img
                className="stepc__bg"
                src={bg.src}
                alt={st.alt}
                width={bg.width}
                height={bg.height}
                loading="lazy"
                decoding="async"
              />
              <span className="stepc__scrim" aria-hidden="true"></span>

              <span className="stepc__time">{st.time}</span>

              <div className="stepc__body">
                <h3>{st.title}</h3>
                <p>{st.text}</p>
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
