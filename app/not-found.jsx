import Shell from '@/components/Shell';
import Page from '@/components/pages/NotFound';
import { getSite } from '@/lib/site';

/**
 * Pagina de eroare a site-ului.
 *
 * Stă în rădăcina lui `app/`, în afara celor două grupuri de limbă, pentru că
 * o adresă greșită nu aparține niciunei limbi. Acolo nu se aplică niciun layout
 * rădăcină, deci pagina își desenează singură documentul, prin `Shell`.
 *
 * E în română, limba principală a clinicii, dar poartă și o punte în engleză:
 * serverul are o singură pagină de eroare, iar vizitatorul care ajunge aici
 * n-a putut alege limba.
 */
export const metadata = {
  title: getSite('ro').pages.notFound.metaTitle,
  robots: { index: false, follow: false },
};

export const viewport = { themeColor: '#2840E7' };

export default function NotFoundRoute() {
  return (
    <Shell lang="ro">
      <Page lang="ro" />
    </Shell>
  );
}
