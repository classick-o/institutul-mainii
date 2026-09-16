'use client';

import { useRef } from 'react';

/**
 * Acordeon pe `<details>` nativ: un singur răspuns deschis.
 *
 * `<details>` face singur deschiderea, tastatura și căutarea în pagină, de
 * aceea nu e un `<div>` cu `onClick`. Singurul lucru care lipsește din
 * comportamentul nativ e exclusivitatea, iar aia se face închizând frații la
 * `toggle`. (`name="..."` pe `<details>` ar face-o din HTML, dar încă nu e
 * peste tot.)
 *
 * Mecanismul a stat o vreme într-un `Accordion` separat, cât l-au folosit și
 * etapele din pagina de pornire. De când acelea au altă formă, împărțitul n-are
 * pe cine servi: un înveliș care se cheamă o singură dată e doar un fișier în
 * plus de deschis ca să afli ce face.
 */
export default function Faq({ items, openFirst = true }) {
  const listRef = useRef(null);

  const onToggle = (e) => {
    if (!e.target.open || !listRef.current) return;
    listRef.current.querySelectorAll('details.qa').forEach((d) => {
      if (d !== e.target) d.open = false;
    });
  };

  return (
    <div className="faq__list" ref={listRef}>
      {items.map((item, i) => (
        <details
          className="qa"
          key={item.q}
          data-reveal
          open={openFirst && i === 0 ? true : undefined}
          onToggle={onToggle}
        >
          <summary>
            {item.q}
            <span className="qa__ico" aria-hidden="true"></span>
          </summary>
          <div className="qa__body"><p>{item.a}</p></div>
        </details>
      ))}
    </div>
  );
}
