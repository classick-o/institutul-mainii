import { img } from '@/lib/images';

/**
 * Cele patru etape, ca un parcurs: patru coloane legate de o linie.
 *
 * Etapele sunt o succesiune, nu patru lucruri interschimbabile, iar asta se
 * spune din formă, nu din numere: un punct pe o linie continuă, cu durata
 * lângă el. Deasupra liniei stă fotografia, dedesubt textul, deci linia taie
 * rândul exact pe unde trece ochiul de la imagine la titlu.
 *
 * Fotografia nu mai e fundalul textului. Randările sunt aproape albe, iar text
 * alb peste ele cerea o perdea groasă care le stingea; separate, rămân curate.
 *
 * Pe telefon rândul devine carusel: etapele se derulează pe orizontală, una
 * pe ecran, cu snap. Linia rămâne cea de aici, deci succesiunea se citește
 * în aceeași direcție în care se dă cu degetul.
 */
export default function Steps({ steps }) {
  return (
    <ol className="steps">
      {steps.map((st) => {
        const bg = img(st.img);
        return (
          <li className="stepc" key={st.n} data-reveal="card">
            <article>
              <div className="stepc__media">
                <img
                  src={bg.src}
                  alt={st.alt}
                  width={bg.width}
                  height={bg.height}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="stepc__rail">
                <span className="stepc__dot" aria-hidden="true"></span>
                <span className="stepc__time">{st.time}</span>
              </div>

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
