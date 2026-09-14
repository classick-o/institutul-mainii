import Link from 'next/link';
import { clinic } from '@/lib/site';
import { ui } from '@/lib/ui';
import { path } from '@/lib/routes';

/**
 * Bara de acțiune de pe telefon. Apare după ce prima parte a paginii iese din
 * ecran (clasa `is-in` o pune Chrome.jsx), pentru că pe mobil butonul de
 * programare din bara de sus se ascunde sub burger.
 */
export default function ActionBar({ lang }) {
  const t = ui(lang);
  return (
    <div className="actionbar" id="actionbar">
      <a href={clinic.phoneHref} className="btn btn--ghost">{t.actionbar.call}</a>
      <Link href={path('booking', lang)} className="btn btn--primary">{t.nav.cta}</Link>
    </div>
  );
}
