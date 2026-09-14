import Link from 'next/link';
import PageHead from '@/components/PageHead';
import { rich } from '@/components/Prose';
import { getSite } from '@/lib/site';
import { ui } from '@/lib/ui';
import { path } from '@/lib/routes';

export default function NotFound({ lang }) {
  const t = ui(lang);
  const other = lang === 'ro' ? 'en' : 'ro';
  const p = getSite(lang).pages.notFound;

  return (
    <>
      <PageHead lang={lang} crumbs={[{ label: '404' }]} title={p.title} lead={p.lead} />

      <section className="section">
        <div className="wrap prose" data-reveal>
          <ul>
            {p.links.map((id) => (
              <li key={id}><Link href={path(id, lang)}>{t.routesLong[id] || t.routes[id]}</Link></li>
            ))}
          </ul>
          <p className="mt-6">{rich(p.emergency)}</p>

          <p className="mt-6" lang={other}>
            {p.otherLang.line}{' '}
            <Link href={path('home', other)} hrefLang={other}>{p.otherLang.cta}</Link>
          </p>
        </div>
      </section>
    </>
  );
}
