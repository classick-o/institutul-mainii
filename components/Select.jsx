'use client';

import { useEffect, useId, useRef, useState } from 'react';

/**
 * Listă derulantă desenată de noi, în locul lui `<select>`.
 *
 * Lista nativă se deschide în fereastra sistemului (gri pe Windows, roată pe
 * iOS) și nu poate fi stilizată; e singurul loc din formular care ieșea din
 * design. Aici lista e un panou din pagină, cu aceleași colțuri și umbre.
 *
 * Tiparul e „select-only combobox" din ARIA APG: butonul poartă focusul, iar
 * opțiunea activă e anunțată prin `aria-activedescendant`, deci cititoarele de
 * ecran o citesc la fel ca pe o listă nativă. Tastatura: săgeți, Home/End,
 * Enter sau Space alege, Escape închide, iar tastarea unei litere sare la
 * prima opțiune care începe cu ea.
 *
 * Valoarea pleacă la trimitere printr-un `<input type="hidden">`, deci
 * `FormData` o vede exact ca înainte.
 */
export default function Select({ id, name, options, defaultValue, onChange }) {
  const [value, setValue] = useState(defaultValue ?? options[0]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() => Math.max(0, options.indexOf(defaultValue)));
  const rootRef = useRef(null);
  const btnRef = useRef(null);
  const listId = useId();
  const optId = (i) => `${listId}-opt-${i}`;

  // clic în afara listei o închide
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  const openList = () => {
    setActive(Math.max(0, options.indexOf(value)));
    setOpen(true);
  };

  const choose = (i) => {
    const v = options[i];
    setValue(v);
    setOpen(false);
    btnRef.current?.focus();
    onChange?.(v);
  };

  const onKeyDown = (e) => {
    const last = options.length - 1;
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); setActive((a) => Math.min(last, a + 1)); break;
      case 'ArrowUp': e.preventDefault(); setActive((a) => Math.max(0, a - 1)); break;
      case 'Home': e.preventDefault(); setActive(0); break;
      case 'End': e.preventDefault(); setActive(last); break;
      case 'Enter':
      case ' ': e.preventDefault(); choose(active); break;
      case 'Escape': e.preventDefault(); setOpen(false); break;
      case 'Tab': setOpen(false); break;
      default:
        if (e.key.length === 1) {
          const k = e.key.toLocaleLowerCase();
          const i = options.findIndex((o) => o.toLocaleLowerCase().startsWith(k));
          if (i >= 0) setActive(i);
        }
    }
  };

  return (
    <div className={`select${open ? ' is-open' : ''}`} ref={rootRef}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        id={id}
        ref={btnRef}
        className="control select__trigger"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? optId(active) : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
      >
        <span className="select__value">{value}</span>
        <svg className="control__chev" viewBox="0 0 12 8" aria-hidden="true">
          <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      <ul
        id={listId}
        role="listbox"
        className="pop select__list"
        aria-labelledby={id}
        hidden={!open}
        data-lenis-prevent
      >
        {options.map((o, i) => (
          <li
            key={o}
            id={optId(i)}
            role="option"
            aria-selected={o === value}
            className={`select__opt${i === active ? ' is-active' : ''}`}
            onPointerEnter={() => setActive(i)}
            onPointerDown={(e) => e.preventDefault()}
            onClick={() => choose(i)}
          >
            <span>{o}</span>
            <svg className="select__check" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
}
