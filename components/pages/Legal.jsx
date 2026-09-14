import PageHead from '@/components/PageHead';
import Prose from '@/components/Prose';
import { getSite } from '@/lib/site';
import { buildMeta } from '@/lib/meta';
import { ui } from '@/lib/ui';
import { path } from '@/lib/routes';

/**
 * Cele patru pagini legale au aceeași structură: antet, o notă că documentul e
 * orientativ, apoi blocuri de titlu + text. Diferă doar conținutul, deci sunt
 * o singură componentă cu `id`-ul rutei ca parametru.
 */

export function meta(lang, id) {
  const p = getSite(lang).pages[id];
  return buildMeta(lang, path(id, lang), {
    title: p.metaTitle,
    description: p.metaDescription,
  });
}

export default function Legal({ lang, id }) {
  const s = getSite(lang);
  const t = ui(lang);
  const p = s.pages[id];

  return (
    <>
      <PageHead
        lang={lang}
        crumbs={[{ label: t.routes[id] }]}
        title={p.title}
        lead={s.pages.legalLead}
      />

      <section className="section">
        <div className="wrap">
          <Prose blocks={p.blocks} />
        </div>
      </section>
    </>
  );
}
