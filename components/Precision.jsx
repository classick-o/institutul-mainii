/**
 * Banda de precizie: declarația despre planificare, ce rezultă din ea, dotarea.
 *
 * Fotografie pe toată lățimea, cu textul peste ea. Imaginea nu stă într-un
 * cadru lângă text, cum stătea înainte: e fundalul întregii benzi, iar textul
 * se citește pe ea. Restul paginii pune imaginile în cadre; asta e singura care
 * nu o face, și de acolo îi vine diferența.
 *
 * ── de ce e componentă, nu markup copiat ──
 * Stătea scrisă de două ori, în pagina de pornire și în „Despre". Când lista de
 * dotări a trecut de la perechi `['01', text]` la șiruri simple, s-a actualizat
 * doar copia din pornire. Cealaltă a continuat să destructureze șirul, deci
 * randa prima literă a fiecărei dotări: „M i", „T u". N-a aruncat nicio eroare
 * și n-a apărut în niciun test, fiindcă era pe o pagină pe care n-o priveam.
 * Aici există un singur loc de schimbat.
 */
export default function Precision({ s, ariaLabel }) {
  const bp = s.pages.blueprint;

  return (
    <section className="blueprint slab" aria-label={ariaLabel}>
      <div className="wrap blueprint__inner">
        <p className="blueprint__statement" data-reveal="lead">{bp.statement}</p>

        <div className="blueprint__block">
          <span className="blueprint__label">{bp.yieldLabel}</span>
          <ul className="yields">
            {bp.yields.map((y) => (
              <li key={y} data-reveal>{y}</li>
            ))}
          </ul>
        </div>

        <div className="blueprint__block">
          <span className="blueprint__label">{bp.equipLabel}</span>
          <ul className="equip">
            {s.equipment.map((text) => (
              <li key={text} data-reveal>{text}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
