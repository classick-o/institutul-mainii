'use client';

import { useEffect, useRef, useState } from 'react';
import { ui } from '@/lib/ui';
import Select from './Select';
import DatePicker from './DatePicker';

/**
 * Formularul de programare.
 *
 * Nu există server Node nici pe GitHub Pages, nici pe planul Hostico Start,
 * deci trimiterea se face către un script PHP găzduit lângă site
 * (`/api/contact.php`). Endpointul e configurabil din variabile de mediu, ca
 * să poți trece pe alt serviciu fără să atingi componenta.
 *
 * Pe GitHub Pages, unde PHP nu rulează, `NEXT_PUBLIC_FORM_MODE=demo` face
 * formularul să valideze și să confirme local, cu o notă vizibilă, mai bine
 * decât un buton care pare că trimite și nu trimite nimic.
 *
 * Partea de securitate care ține de client (restul e în PHP):
 *   – câmp-capcană ascuns, completat doar de roboți;
 *   – marcaj de timp: sub 3 secunde de la afișare e trimitere automată;
 *   – validare și limite de lungime înainte de a atinge rețeaua.
 *
 * Erorile de la server vin ca `code`, nu ca text gata tradus: altfel un
 * vizitator care citește engleza ar primi mesajul de eroare în română, iar
 * traducerea ar trebui ținută în două locuri.
 */

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || '/api/contact.php';
const MODE = process.env.NEXT_PUBLIC_FORM_MODE || 'live';

const LIMITS = { nume: 80, telefon: 30, email: 120, mesaj: 1500 };

export default function BookingForm({ lang }) {
  const t = ui(lang).form;

  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | sending | sent | error
  const [serverError, setServerError] = useState('');
  const loadedAt = useRef(Date.now());
  const formRef = useRef(null);

  useEffect(() => { loadedAt.current = Date.now(); }, []);

  const validate = (data) => {
    const e = {};
    if (!data.nume.trim()) e.nume = t.errors.required;
    else if (data.nume.trim().length > LIMITS.nume) e.nume = t.errors.nameLong;

    const digits = data.telefon.replace(/\D/g, '');
    if (!data.telefon.trim()) e.telefon = t.errors.required;
    else if (digits.length < 9 || digits.length > 15) e.telefon = t.errors.phone;

    if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) {
      e.email = t.errors.email;
    }
    if (data.mesaj.length > LIMITS.mesaj) e.mesaj = t.errors.messageLong;
    return e;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setServerError('');
    const form = ev.currentTarget;
    const fd = new FormData(form);
    const data = {
      nume: fd.get('nume') || '',
      telefon: fd.get('telefon') || '',
      email: fd.get('email') || '',
      tip: fd.get('tip') || '',
      data_pref: fd.get('data_pref') || '',
      mesaj: fd.get('mesaj') || '',
      // limba în care a fost completat, ca personalul să știe cum să răspundă
      lang,
      // capcană: un om nu vede câmpul, deci nu îl completează
      website: fd.get('website') || '',
      // câte milisecunde a stat formularul pe ecran înainte de trimitere
      elapsed: String(Date.now() - loadedAt.current),
    };

    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = form.querySelector('[aria-invalid="true"]')
        || form.querySelector(`[name="${Object.keys(e)[0]}"]`);
      if (first) first.focus();
      return;
    }

    if (MODE === 'demo') {
      setState('sent');
      return;
    }

    setState('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || !out.ok) {
        setServerError(t.errors[out.code] || out.error || t.errors.generic);
        setState('error');
        return;
      }
      setState('sent');
    } catch {
      setServerError(t.errors.network);
      setState('error');
    }
  };

  const clear = (name) => setErrors((prev) => {
    if (!prev[name]) return prev;
    const next = { ...prev };
    delete next[name];
    return next;
  });

  const fieldProps = (name) => ({
    name,
    maxLength: LIMITS[name],
    'aria-invalid': errors[name] ? 'true' : undefined,
    onInput: () => clear(name),
  });

  return (
    <form
      ref={formRef}
      className={`form${state === 'sent' ? ' form--sent' : ''}`}
      data-reveal
      noValidate
      onSubmit={onSubmit}
    >
      {/* capcana pentru roboți: ascunsă vizual și scoasă din ordinea de tab */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">{t.honeypot}</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field">
        <label htmlFor="f-nume">{t.name} <i aria-hidden="true">*</i></label>
        <input
          type="text" id="f-nume" required autoComplete="name"
          placeholder={t.namePlaceholder} {...fieldProps('nume')}
        />
        {errors.nume && <p className="field__err">{errors.nume}</p>}
      </div>

      <div className="field">
        <label htmlFor="f-tel">{t.phone} <i aria-hidden="true">*</i></label>
        <input
          type="tel" id="f-tel" required autoComplete="tel" inputMode="tel"
          placeholder={t.phonePlaceholder} {...fieldProps('telefon')}
        />
        {errors.telefon && <p className="field__err">{errors.telefon}</p>}
      </div>

      <div className="field field--full">
        <label htmlFor="f-mail">
          {t.email} <span className="field__hint">{t.emailHint}</span>
        </label>
        <input
          type="email" id="f-mail" autoComplete="email"
          placeholder={t.emailPlaceholder} {...fieldProps('email')}
        />
        {errors.email && <p className="field__err">{errors.email}</p>}
      </div>

      <div className="field">
        <label htmlFor="f-tip">{t.type}</label>
        <Select id="f-tip" name="tip" options={t.types} defaultValue={t.types[0]} />
      </div>

      <div className="field">
        <label htmlFor="f-data">{t.date}</label>
        <DatePicker id="f-data" name="data_pref" lang={lang} t={t.calendar} />
      </div>

      <div className="field field--full">
        <label htmlFor="f-msg">{t.message}</label>
        <textarea
          id="f-msg" rows={3}
          placeholder={t.messagePlaceholder}
          {...fieldProps('mesaj')}
        />
        {errors.mesaj && <p className="field__err">{errors.mesaj}</p>}
      </div>

      <button
        type="submit"
        className="btn btn--primary btn--lg btn--block"
        disabled={state === 'sending'}
      >
        {state === 'sending' ? t.sending : t.submit}
      </button>

      {state === 'error' && <p className="form__err" role="alert">{serverError}</p>}

      <p className="form__note">
        {t.note}
        {MODE === 'demo' && t.noteDemo}
      </p>

      <p className="form__ok" role="status">
        {MODE === 'demo' ? t.okDemo : t.okLive}
      </p>
    </form>
  );
}
