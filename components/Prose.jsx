import { Fragment } from 'react';
import { clinic } from '@/lib/site';

/**
 * Randează blocurile de proză din fișierele de conținut.
 *
 * Textele conțin substituenți ({legal} {cui} {address} {email} {phone}) în
 * loc de linkuri scrise de mână. Motivul e că datele clinicii sunt aceleași în
 * ambele limbi: dacă traducătorul ar copia telefonul în text, o schimbare de
 * număr ar trebui făcută în zeci de locuri, iar una dintre limbi ar rămâne în
 * urmă. Pentru accent, **text îngroșat**.
 */

const TOKEN = /(\{(?:legal|cui|address|email|phone)\}|\*\*[^*]+\*\*)/g;

export function rich(text) {
  return String(text)
    .split(TOKEN)
    .filter((p) => p !== '' && p !== undefined)
    .map((p, i) => {
      switch (p) {
        case '{legal}': return clinic.legal;
        case '{cui}': return clinic.cui;
        case '{address}': return clinic.address;
        case '{email}':
          return <a key={i} href={`mailto:${clinic.email}`}>{clinic.email}</a>;
        case '{phone}':
          return <a key={i} href={clinic.phoneHref}>{clinic.phone}</a>;
        default:
          return p.startsWith('**')
            ? <strong key={i}>{p.slice(2, -2)}</strong>
            : p;
      }
    });
}

/** Un bloc are un titlu și fie paragrafe (`p`), fie o listă (`ul`), fie ambele. */
export default function Prose({ blocks = [], intro = [], children, ...rest }) {
  return (
    <div className="prose" data-reveal {...rest}>
      {intro.map((t, i) => <p key={`i${i}`}>{rich(t)}</p>)}

      {blocks.map((b, i) => (
        <Fragment key={i}>
          {b.h && <h2>{b.h}</h2>}
          {b.p?.map((t, j) => <p key={j}>{rich(t)}</p>)}
          {b.ul && (
            <ul>
              {b.ul.map((t, j) => <li key={j}>{rich(t)}</li>)}
            </ul>
          )}
        </Fragment>
      ))}

      {children}
    </div>
  );
}
