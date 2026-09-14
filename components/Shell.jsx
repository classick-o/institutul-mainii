import '@/styles/style.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Chrome from '@/components/Chrome';
import ActionBar from '@/components/ActionBar';
import { ui } from '@/lib/ui';
import { HTML_LANG } from '@/lib/routes';

/**
 * Învelișul paginii, comun ambelor limbi.
 *
 * Fiecare limbă are propriul layout rădăcină (`app/(ro)` și `app/(en)`), pentru
 * că `<html lang>` se scrie o singură dată, în layoutul rădăcină, iar un
 * subarbore nu îl poate schimba. Alternativa — să-l corectezi din JavaScript
 * după încărcare — ar livra pagina engleză marcată ca română: exact ce citesc
 * cititoarele de ecran și motoarele de căutare la prima trecere.
 *
 * Trecerea dintr-o limbă în alta traversează două layouturi rădăcină, deci
 * Next face o încărcare completă. E în regulă: se schimbă tot textul paginii.
 */
export default function Shell({ lang, children }) {
  const t = ui(lang);

  return (
    <html lang={HTML_LANG[lang]}>
      <body>
        <a href="#top" className="skip">{t.nav.skip}</a>
        <div className="scroll-progress" id="scrollProgress"></div>

        <Nav lang={lang} />
        <main id="top">{children}</main>
        <Footer lang={lang} />
        <ActionBar lang={lang} />
        <Chrome />
      </body>
    </html>
  );
}
