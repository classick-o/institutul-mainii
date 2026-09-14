import { img } from '@/lib/images';

/**
 * Cadru de imagine. `variant` alege forma din CSS: cerc la hero, arcadă la
 * portret, colțuri asimetrice la recuperare.
 *
 * Cât timp fișierul lipsește, CSS-ul afișează un gradient cu eticheta
 * `data-prompt` (`.media:not(:has(img))`), deci se vede imediat ce imagine
 * lipsește, fără să se strice layoutul.
 */
export default function Media({ name, variant, alt, priority = false, reveal = false, className = '' }) {
  const src = img(name);
  return (
    <figure
      className={`media media--${variant} ${className}`.trim()}
      data-prompt={name}
      data-reveal={reveal ? 'media' : undefined}
    >
      <img
        src={src.src}
        alt={alt}
        width={src.width}
        height={src.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding={priority ? undefined : 'async'}
      />
    </figure>
  );
}
