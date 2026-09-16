/**
 * Zonă cu fundal continuu: un singur gradient sub mai multe secțiuni.
 *
 * Nu e un wrapper de layout, nu impune lățime, grilă sau spațiere. Singurul
 * lucru pe care îl adaugă e stratul de fundal, ca granița dintre secțiunile
 * dinăuntru să nu mai fie o repornire de culoare. Secțiunile rămân exact ce
 * erau, doar că își pierd fundalul propriu (vezi `.flow > :is(.section,
 * .feature)` din foaia de stil).
 *
 * `tone` alege imaginea: `calm` pentru zonele de citit, `bloom` pentru cele
 * care închid pagina, unde culoarea are voie să crească.
 */
export default function Flow({ tone = 'calm', children }) {
  return (
    <div className={`flow flow--${tone}`}>
      <div className="flow__bg" aria-hidden="true"></div>
      {children}
    </div>
  );
}
