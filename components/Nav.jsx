'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { clinic } from '@/lib/site';
import { ui } from '@/lib/ui';
import { NAV_IDS, counterpart, path } from '@/lib/routes';
import Logo from './Logo';

/**
 * Bara de sus.
 *
 * Comportamentul păstrat din prototip: bara se micșorează la scroll, se ascunde
 * când derulezi în jos și reapare când urci, iar meniul mobil se închide cu
 * Escape sau cu un clic în afara lui.
 *
 * Comutatorul de limbă nu duce la pornire, ci la aceeași pagină în cealaltă
 * limbă (`counterpart`). Altfel, un vizitator care citește despre tunel carpian
 * și schimbă limba ar trebui să caute pagina din nou.
 */
export default function Nav({ lang }) {
  const t = ui(lang);
  const other = lang === 'ro' ? 'en' : 'ro';

  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const navRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setStuck(y > 24);
        // meniul deschis ține bara pe ecran, altfel ar dispărea sub deget
        setHidden(y > 420 && y > lastY.current + 6 && !open);
        lastY.current = y;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const onClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [open]);

  // la schimbarea rutei meniul trebuie să se închidă singur
  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href) =>
    pathname === href || pathname.startsWith(href.replace(/\/$/, '') + '/');

  const swap = counterpart(pathname, other);

  return (
    <header className={`nav${stuck ? ' is-stuck' : ''}${hidden ? ' is-hidden' : ''}`} ref={navRef}>
      <div className="nav__inner">
        <Link href={path('home', lang)} className="logo"><Logo /></Link>

        <nav className={`nav__links${open ? ' is-open' : ''}`} id="navLinks" aria-label={t.nav.aria}>
          {NAV_IDS.map((id) => {
            const href = path(id, lang);
            return (
              <Link key={id} href={href} className={isActive(href) ? 'is-active' : undefined}>
                {t.routes[id]}
              </Link>
            );
          })}
          <Link href={path('booking', lang)} className="btn btn--primary nav__cta">
            {t.nav.cta}
          </Link>
        </nav>

        <div className="nav__actions">
          {/* Vizibil la orice lățime, nu ascuns în meniul mobil: pe un site
              bilingv, comutatorul e prima nevoie a jumătate dintre vizitatori.
              Sub 900px rămâne doar codul de două litere, ca să încapă. */}
          <Link
            href={swap}
            className="nav__lang"
            lang={other}
            hrefLang={other}
            aria-label={`${t.nav.langAria}: ${t.nav.langOther}`}
          >
            <span className="nav__lang-full">{t.nav.langOther}</span>
            <span className="nav__lang-short" aria-hidden="true">{t.nav.langOtherShort}</span>
          </Link>

          <a href={clinic.phoneHref} className="nav__phone">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 6.2 2 2 0 0 1 5 4Z"
                stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
              />
            </svg>
            <span>{clinic.phone}</span>
          </a>

          <Link href={path('booking', lang)} className="btn btn--primary">{t.nav.cta}</Link>

          <button
            className="nav__burger"
            aria-label={t.nav.menu}
            aria-expanded={open}
            aria-controls="navLinks"
            onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
          >
            <span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
