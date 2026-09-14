'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Comportamentele care în prototip stăteau în assets/js/main.js:
 * bara de progres, apariția elementelor la scroll și bara de acțiune de pe
 * mobil.
 *
 * Sunt grupate aici pentru că toate depind de layout și trebuie repornite la
 * fiecare schimbare de rută — altfel, după navigare, elementele noi ar rămâne
 * invizibile (`[data-reveal]` pornește cu opacity:0).
 */
export default function Chrome() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const $$ = (s) => Array.from(document.querySelectorAll(s));
    const cleanups = [];

    /* ── apariția la scroll ─────────────────────────────
       Decalajul dintre elemente nu se scrie în pagină. Un `data-delay` fix pe
       fiecare card e greșit în ambele sensuri: dacă intră toate odată, ultimul
       îl are pe al șaptelea chiar dacă e primul pe ecran; dacă intră singur,
       după derulare lentă, așteaptă degeaba o jumătate de secundă.

       Aici se numără câte elemente au intrat în ACEEAȘI observație și se
       decalează în ordinea din document. Un element care intră singur pornește
       imediat; un grup intră în cascadă. Cascada e plafonată, altfel al optulea
       card ar aștepta după primele șapte și n-ar mai părea o intrare, ci o
       coadă.

       `data-delay` rămâne pentru compozițiile orchestrate anume — deschiderea
       paginii, unde titlul, subtitlul și butoanele au o ordine gândită. */
    const PAS = 70;
    const PLAFON = 350;

    const revealables = $$('[data-reveal]');
    revealables.forEach((el) => {
      const d = el.dataset.delay;
      if (d) el.style.setProperty('--d', d + 'ms');
    });

    if ('IntersectionObserver' in window && !reduced) {
      const io = new IntersectionObserver(
        (entries) => {
          const intrate = entries
            .filter((e) => e.isIntersecting)
            .map((e) => e.target)
            .sort((a, b) =>
              a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
            );

          intrate.forEach((el, i) => {
            if (!el.dataset.delay) {
              el.style.setProperty('--d', Math.min(i * PAS, PLAFON) + 'ms');
            }
            el.classList.add('is-in');
            io.unobserve(el);
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
      );
      revealables.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    } else {
      revealables.forEach((el) => el.classList.add('is-in'));
    }

    /* ── bara de progres și bara de acțiune de pe mobil ── */
    const bar = document.getElementById('scrollProgress');
    const actionbar = document.getElementById('actionbar');
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (bar) bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
        if (actionbar) actionbar.classList.toggle('is-in', y > window.innerHeight * 0.45);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    cleanups.push(() => window.removeEventListener('scroll', onScroll));

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
