'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Alegerea datei, desenată de noi, în locul lui `<input type="date">`.
 *
 * Calendarul nativ arată diferit în fiecare browser, ignoră limba paginii
 * (pe un Windows în engleză, pagina română primea „mm/dd/yyyy") și nu știe
 * nimic despre clinică. Aici:
 *   · lunile și zilele vin din `Intl`, în limba paginii, cu săptămâna începând
 *     luni;
 *   · zilele trecute și duminicile nu se pot alege: clinica e închisă duminica,
 *     iar o programare în trecut nu are sens;
 *   · fereastra e de șase luni, cât are sens să ceri o dată „preferată".
 *
 * Tastatura urmează tiparul de calendar din ARIA APG: săgețile mută cu
 * o zi sau o săptămână, PageUp/PageDown cu o lună, Home/End la capetele
 * săptămânii, Enter alege, Escape închide și întoarce focusul pe buton.
 *
 * Valoarea pleacă tot ca `AAAA-LL-ZZ`, prin câmp ascuns, deci `contact.php`
 * primește exact formatul de dinainte.
 */

const LOCALES = { ro: 'ro-RO', en: 'en-GB' };
const MONTHS_AHEAD = 6;

const pad = (n) => String(n).padStart(2, '0');
const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const addMonths = (d, n) => {
  const t = new Date(d.getFullYear(), d.getMonth() + n, 1);
  const last = new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate();
  return new Date(t.getFullYear(), t.getMonth(), Math.min(d.getDate(), last));
};
const sameDay = (a, b) => a && b && toISO(a) === toISO(b);

export default function DatePicker({ id, name, lang, t }) {
  const locale = LOCALES[lang] || 'ro-RO';
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [today, setToday] = useState(null);
  const [focus, setFocus] = useState(null);
  const rootRef = useRef(null);
  const btnRef = useRef(null);
  const gridRef = useRef(null);

  // „azi" se află în browser, nu la build: pagina e statică și s-ar fi fixat
  // pe ziua în care a fost generată
  useEffect(() => { setToday(startOfDay(new Date())); }, []);

  const min = today;
  const max = today ? addMonths(today, MONTHS_AHEAD) : null;
  const isDisabled = (d) => !min || d < min || d > max || d.getDay() === 0;

  const firstEnabledFrom = (d) => {
    let x = d;
    for (let i = 0; i < 8 && isDisabled(x); i++) x = addDays(x, 1);
    return x;
  };

  const fmt = useMemo(() => ({
    month: new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }),
    long: new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    short: new Intl.DateTimeFormat(locale, { weekday: 'short', day: 'numeric', month: 'long' }),
    wd: new Intl.DateTimeFormat(locale, { weekday: 'narrow' }),
  }), [locale]);

  // inițialele zilelor, de luni până duminică (5 ian. 2026 e luni)
  const weekdays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => fmt.wd.format(new Date(2026, 0, 5 + i))),
    [fmt]
  );

  const openCal = () => {
    if (!today) return;
    setFocus(value || firstEnabledFrom(today));
    setOpen(true);
  };

  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) btnRef.current?.focus();
  };

  const choose = (d) => {
    if (isDisabled(d)) return;
    setValue(d);
    close();
  };

  // focusul urmează ziua activă, inclusiv când se schimbă luna
  useEffect(() => {
    if (!open || !focus || !gridRef.current) return;
    const el = gridRef.current.querySelector(`[data-day="${toISO(focus)}"]`);
    el?.focus({ preventScroll: true });
  }, [open, focus]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) close(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  const clamp = (d) => (d < min ? min : d > max ? max : d);

  const onGridKey = (e) => {
    const moves = {
      ArrowLeft: () => addDays(focus, -1),
      ArrowRight: () => addDays(focus, 1),
      ArrowUp: () => addDays(focus, -7),
      ArrowDown: () => addDays(focus, 7),
      PageUp: () => addMonths(focus, -1),
      PageDown: () => addMonths(focus, 1),
      Home: () => addDays(focus, -((focus.getDay() + 6) % 7)),
      End: () => addDays(focus, 6 - ((focus.getDay() + 6) % 7)),
    };
    if (moves[e.key]) {
      e.preventDefault();
      setFocus(clamp(moves[e.key]()));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      choose(focus);
    }
  };

  const onPopKey = (e) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); }
  };

  // celulele lunii afișate: completate cu zilele vecine până la săptămâni întregi
  const view = focus || today;
  const cells = useMemo(() => {
    if (!view) return [];
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const lead = (first.getDay() + 6) % 7;
    const daysIn = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const total = Math.ceil((lead + daysIn) / 7) * 7;
    return Array.from({ length: total }, (_, i) => addDays(first, i - lead));
  }, [view]);

  const canPrev = view && min && (view.getFullYear() > min.getFullYear() || view.getMonth() > min.getMonth());
  const canNext = view && max && (view.getFullYear() < max.getFullYear() || view.getMonth() < max.getMonth());
  const goMonth = (n) => setFocus(firstEnabledFrom(clamp(new Date(view.getFullYear(), view.getMonth() + n, 1))));

  const label = (s) => s.charAt(0).toLocaleUpperCase(locale) + s.slice(1);

  return (
    <div className={`datepick${open ? ' is-open' : ''}`} ref={rootRef}>
      <input type="hidden" name={name} value={value ? toISO(value) : ''} />
      <button
        type="button"
        id={id}
        ref={btnRef}
        className={`control datepick__trigger${value ? '' : ' is-empty'}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => (open ? close(false) : openCal())}
      >
        <span>{value ? label(fmt.short.format(value)) : t.placeholder}</span>
        <svg className="control__ico" viewBox="0 0 20 20" aria-hidden="true">
          <rect x="3" y="4.5" width="14" height="12" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M3 8.5h14M7 3v3M13 3v3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>

      {open && view && (
        <div
          className="pop datepick__pop"
          role="dialog"
          aria-modal="false"
          aria-label={t.dialog}
          onKeyDown={onPopKey}
          data-lenis-prevent
        >
          <div className="datepick__head">
            <button type="button" className="datepick__nav" onClick={() => goMonth(-1)} disabled={!canPrev} aria-label={t.prev}>
              <svg viewBox="0 0 8 12" aria-hidden="true"><path d="M6.5 1L1.5 6l5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </button>
            <p className="datepick__month" aria-live="polite">{label(fmt.month.format(view))}</p>
            <button type="button" className="datepick__nav" onClick={() => goMonth(1)} disabled={!canNext} aria-label={t.next}>
              <svg viewBox="0 0 8 12" aria-hidden="true"><path d="M1.5 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </button>
          </div>

          <div className="datepick__wd" aria-hidden="true">
            {weekdays.map((w, i) => <span key={i}>{w}</span>)}
          </div>

          <div className="datepick__grid" ref={gridRef} onKeyDown={onGridKey}>
            {cells.map((d) => {
              const outside = d.getMonth() !== view.getMonth();
              const disabled = isDisabled(d);
              const selected = sameDay(d, value);
              const isFocus = sameDay(d, focus);
              return (
                <button
                  type="button"
                  key={toISO(d)}
                  data-day={toISO(d)}
                  tabIndex={isFocus ? 0 : -1}
                  className={[
                    'datepick__day',
                    outside && 'is-outside',
                    selected && 'is-selected',
                    sameDay(d, today) && 'is-today',
                  ].filter(Boolean).join(' ')}
                  aria-pressed={selected}
                  aria-disabled={disabled || undefined}
                  aria-label={label(fmt.long.format(d))}
                  onClick={() => choose(d)}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>

          <div className="datepick__foot">
            <span className="datepick__note">{t.closedNote}</span>
            {value && (
              <button type="button" className="datepick__clear" onClick={() => { setValue(null); close(); }}>
                {t.clear}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
