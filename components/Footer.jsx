import Link from 'next/link';
import { clinic } from '@/lib/site';
import { ui } from '@/lib/ui';
import { LEGAL_IDS, NAV_IDS, PATIENT_IDS, path } from '@/lib/routes';
import Logo from './Logo';

export default function Footer({ lang }) {
  const t = ui(lang);

  const col = (ids, heading, long = false) => (
    <nav className="footer__col" aria-label={heading}>
      <h5>{heading}</h5>
      {ids.map((id) => (
        <Link key={id} href={path(id, lang)}>
          {(long && t.routesLong[id]) || t.routes[id]}
        </Link>
      ))}
    </nav>
  );

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <Link href={path('home', lang)} className="logo logo--light"><Logo /></Link>
            <p>{t.footer.tagline}</p>
          </div>

          {col(NAV_IDS, t.footer.clinic)}
          {col(PATIENT_IDS, t.footer.patients, true)}
          {col(LEGAL_IDS, t.footer.legal)}
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {clinic.legal}, CUI {clinic.cui}, {clinic.address}
          </span>
        </div>
      </div>
    </footer>
  );
}
