'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * Derulare lină cu rotița și cu touchpad-ul.
 *
 * Lenis nu înlocuiește scroll-ul paginii, doar netezește pașii rotiței: poziția
 * rămâne cea nativă, deci `position:sticky`, bara fixă, IntersectionObserver-ul
 * de la apariții și scroll-ul la începutul paginii la schimbarea rutei merg ca
 * înainte.
 *
 * Pe telefon și tabletă nu se atinge nimic (`syncTouch` rămâne oprit): inerția
 * degetului e deja a sistemului, iar una simulată peste ea se simte lipicioasă.
 * Cu „reducere mișcare" activată, Lenis trece singur pe derulare 1:1.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      autoRaf: true,
      // ancorele de pe pagină alunecă și ele, oprite sub bara fixă
      anchors: { offset: -80 },
    });
    return () => lenis.destroy();
  }, []);

  return null;
}
