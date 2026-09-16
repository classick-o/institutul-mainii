/**
 * Imaginile sunt importate ca module, nu scrise ca șiruri „/assets/img/...".
 *
 * Registrul ăsta conține doar imaginile CHEMATE de pagini. `prompt-1` (mâna de
 * sticlă) și `prompt-3` (fostul vizual al benzii albastre) au ieșit de aici
 * când secțiunile lor s-au schimbat: fișierele rămân pe disc și în PROMPTS.md,
 * dar un import nefolosit le-ar fi urcat în pachetul livrat degeaba.
 * Motivul e livrarea pe GitHub Pages: acolo site-ul stă într-un subdirector
 * (`/nume-repo/`), iar căile absolute scrise de mână s-ar rupe. Importate,
 * Next le prefixează singur cu `basePath` și le dă și dimensiunile, deci nu
 * apare nici salt de layout la încărcare.
 */
import heroBg from '@/assets/img/hero-bg.jpg';
import prompt2 from '@/assets/img/prompt-2.jpg';
import etapa1 from '@/assets/img/etapa-1.jpg';
import etapa2 from '@/assets/img/etapa-2.jpg';
import etapa3 from '@/assets/img/etapa-3.jpg';
import etapa4 from '@/assets/img/etapa-4.jpg';
import prompt8 from '@/assets/img/prompt-8.jpg';
import prompt9 from '@/assets/img/prompt-9.jpg';

export const images = {
  'hero': heroBg,
  'prompt-2': prompt2,
  'etapa-1': etapa1,
  'etapa-2': etapa2,
  'etapa-3': etapa3,
  'etapa-4': etapa4,
  'prompt-8': prompt8,
  'prompt-9': prompt9,
};

export function img(name) {
  const found = images[name];
  if (!found) throw new Error(`Imagine inexistentă: ${name}`);
  return found;
}
