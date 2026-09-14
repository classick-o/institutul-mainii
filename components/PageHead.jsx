import Link from 'next/link';
import { ui } from '@/lib/ui';
import { path } from '@/lib/routes';

/** Antetul paginilor interioare: fir de navigare, titlu și o frază de context. */
export default function PageHead({ lang, crumbs = [], title, lead }) {
  const t = ui(lang);

  return (
    <section className="phead">
      <div className="wrap phead__in">
        <nav className="crumbs" aria-label={t.common.crumbsAria}>
          <Link href={path('home', lang)}>{t.routes.home}</Link>
          {crumbs.map((c) => (
            <span key={c.href || c.label}>
              <span aria-hidden="true">/</span>{' '}
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1 data-reveal="lead">{title}</h1>
        {lead && <p className="phead__lead" data-reveal>{lead}</p>}
      </div>
    </section>
  );
}
