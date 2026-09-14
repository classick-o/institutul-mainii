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
import prompt4 from '@/assets/img/prompt-4.jpg';
import prompt5 from '@/assets/img/prompt-5.jpg';
import prompt6 from '@/assets/img/prompt-6.jpg';
import prompt7 from '@/assets/img/prompt-7.jpg';
import prompt8 from '@/assets/img/prompt-8.jpg';
import prompt9 from '@/assets/img/prompt-9.jpg';

export const images = {
  'hero': heroBg,
  'prompt-2': prompt2,
  'prompt-4': prompt4,
  'prompt-5': prompt5,
  'prompt-6': prompt6,
  'prompt-7': prompt7,
  'prompt-8': prompt8,
  'prompt-9': prompt9,
};

export function img(name) {
  const found = images[name];
  if (!found) throw new Error(`Imagine inexistentă: ${name}`);
  return found;
}
