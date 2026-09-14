/**
 * Marca, folosită în bară și în subsol. Numele clinicii nu se traduce, deci
 * componenta n-are nevoie de limbă.
 */
export default function Logo() {
  return (
    <>
      <span className="logo__mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M7 20V9.5a1.5 1.5 0 0 1 3 0V4.5a1.5 1.5 0 0 1 3 0V10m0-1V5.5a1.5 1.5 0 0 1 3 0V12m0-2.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2a5 5 0 0 1-5-5v-3l-1.6 1.2a1.5 1.5 0 0 1-2-2.2L7 11"
            stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="logo__text">Institutul<em>Mâinii</em></span>
    </>
  );
}
