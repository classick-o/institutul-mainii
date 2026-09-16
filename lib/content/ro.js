/**
 * Conținutul în română. Perechea lui e `en.js`, cu exact aceeași formă:
 * paginile citesc structura, nu textul, deci o cheie lipsă dintr-o limbă se
 * vede imediat, la build sau la prima verificare.
 *
 * În textele de proză se pot folosi substituenți, înlocuiți la randare cu
 * datele reale ale clinicii: {legal} {cui} {address} {email} {phone}.
 * `{email}` și `{phone}` devin linkuri. Pentru accent, **text îngroșat**.
 *
 * ÎNAINTE DE LANSARE se înlocuiesc textele marcate „(placeholder)".
 */

export default {
  meta: {
    title: 'Institutul Mâinii: chirurgia mâinii și microchirurgie reconstructivă',
    description:
      'Centru dedicat patologiei mâinii: diagnostic ecografic în cabinet, chirurgie minim invazivă, recuperare condusă de terapeuți de mână. București.',
  },

  /** Partea din datele clinicii care se traduce. Restul e în lib/site.js. */
  clinic: {
    // `phone: true` pune numărul înaintea valorii; rândul de urgențe e singurul
    // pe care vrei să poți suna dintr-un clic.
    hours: [
      { k: 'Program', v: 'Luni – Vineri, 09:00 – 19:00' },
      { k: 'Sâmbătă', v: '09:00 – 14:00, doar cu programare' },
      { k: 'Urgențe', v: 'non-stop', phone: true },
    ],
    doctor: {
      role: 'Medic primar chirurgie plastică. Supraspecializare în chirurgia mâinii',
      facts: [
        ['Formare', 'Rezidențiat chirurgie plastică, fellowship de chirurgia mâinii la Viena și Strasbourg'],
        ['Domenii', 'Microchirurgie reconstructivă, chirurgia nervilor periferici, traumatologia mâinii'],
        ['Afilieri', 'Societatea Română de Chirurgie a Mâinii, membru IFSSH'],
        ['Consultații', 'Luni, miercuri și vineri, între 09:00 și 15:00, cu programare'],
      ],
    },
  },

  /** Textele alternative ale imaginilor, folosite în mai multe pagini. */
  media: {
    hero: 'Redare anatomică a mâinii, cu structurile osoase și tendinoase vizibile',
    portrait: 'Portretul medicului chirurg, în halat alb, pe coridorul clinicii',
    blueprint: 'Instrumente de microchirurgie așezate în ordine pe o suprafață mată, în lumină rece',
    feature: 'Antebraț cu orteză termoformată',
    map: 'Poziția clinicii în cartier, machetă a zonei',
  },

  /** Cifre afișate public. Trebuie să fie reale și verificabile. (placeholder) */
  stats: [
    { value: '18', label: 'ani de practică\nexclusiv pe mână' },
    { value: '4.800', label: 'intervenții\nchirurgicale' },
    { value: '98%', label: 'rată de recuperare\nfuncțională completă' },
    { value: '24 h', label: 'timp mediu până la\nexternare, chirurgie de zi' },
  ],

  conditions: [
    {
      id: 'tunel-carpian',
      title: 'Sindrom de tunel carpian',
      short: 'Amorțeli nocturne, scăderea forței de prindere. Eliberare endoscopică, incizie de 1 cm, revenire în 5 zile.',
      lead: 'Compresia nervului median în tunelul carpian, cea mai frecventă neuropatie de compresie a membrului superior.',
      body: [
        'Prin tunelul carpian trec nouă tendoane flexoare și nervul median. Când presiunea din tunel crește, nervul e primul care suferă: apar amorțelile nocturne la police, index și medius, apoi scăderea forței de prindere și, în formele avansate, atrofia mușchilor de la baza policelui.',
        'Diagnosticul se pune clinic și se confirmă ecografic în cabinet, unde se măsoară grosimea nervului. La cazurile cu deficit motor se adaugă electromiografie, care arată cât a scăzut conducerea nervoasă.',
        'În formele incipiente se începe cu orteză de noapte și, dacă e nevoie, o infiltrație ghidată ecografic. Când deficitul e instalat, eliberarea chirurgicală e singura care oprește degradarea nervului: endoscopic, printr-o incizie de aproximativ 1 cm.',
      ],
      facts: [
        ['Diagnostic', 'Examinare clinică și ecografie în cabinet, electromiografie la nevoie'],
        ['Anestezie', 'Locală sau bloc de plex brahial'],
        ['Durata intervenției', '20–30 de minute'],
        ['Revenire', '5–10 zile pentru muncă de birou, 3–4 săptămâni pentru muncă fizică'],
      ],
    },
    {
      id: 'boala-dupuytren',
      title: 'Boala Dupuytren',
      short: 'Degete blocate în flexie. De la aponevrotomie cu acul până la fasciectomie selectivă completă.',
      lead: 'Îngroșarea și retracția aponevrozei palmare, care trage progresiv degetele în flexie.',
      body: [
        'Boala începe cu noduli în palmă, nedureroși, pe care mulți pacienți îi ignoră ani de zile. În timp apar corzi care trag degetul spre palmă, cel mai frecvent inelarul și degetul mic, iar mâna nu se mai poate așeza plat pe masă.',
        'Momentul intervenției nu e dat de nodul, ci de deficitul de extensie: când degetul nu mai poate fi întins, funcția mâinii scade rapid.',
        'În stadiile incipiente, aponevrotomia cu acul rezolvă coarda printr-o procedură de cabinet, cu revenire în câteva zile. În formele avansate se face fasciectomie selectivă, cu îndepărtarea completă a țesutului bolnav.',
      ],
      facts: [
        ['Indicație', 'Deficit de extensie care împiedică activitățile zilnice'],
        ['Variante', 'Aponevrotomie cu acul sau fasciectomie selectivă'],
        ['Anestezie', 'Locală sau bloc de plex brahial'],
        ['Revenire', '2–6 săptămâni, în funcție de procedură'],
      ],
    },
    {
      id: 'deget-in-resort',
      title: 'Deget în resort și tendinite',
      short: 'Tenosinovita stenozantă și De Quervain: infiltrație ghidată ecografic sau eliberare chirurgicală.',
      lead: 'Tendonul se blochează în tunelul lui și degetul sare la extensie, uneori cu durere la baza degetului.',
      body: [
        'Tendonul flexor alunecă printr-un sistem de inele care îl țin lipit de os. Când primul inel se îngroașă, tendonul trece cu dificultate: degetul se blochează în flexie și sare brusc la extensie.',
        'În boala De Quervain, același mecanism apare pe partea policelui, la nivelul încheieturii, cu durere la prinderea obiectelor și la mișcarea policelui.',
        'Prima linie de tratament este infiltrația ghidată ecografic, care rezolvă o bună parte dintre cazuri. Dacă blocajele revin, eliberarea chirurgicală a tunelului tendinos e o intervenție scurtă, cu recuperare rapidă.',
      ],
      facts: [
        ['Diagnostic', 'Examinare clinică și ecografie dinamică'],
        ['Prima linie', 'Infiltrație ghidată ecografic'],
        ['Chirurgical', 'Eliberarea tunelului tendinos, 15–20 de minute'],
        ['Revenire', '3–14 zile'],
      ],
    },
    {
      id: 'fracturi-si-luxatii',
      title: 'Fracturi și luxații',
      short: 'Radius distal, scafoid, metacarpiene. Osteosinteză cu plăci anatomice, mobilizare precoce.',
      lead: 'Fracturile mâinii și ale încheieturii, de la cele care se tratează în gips până la cele care au nevoie de fixare internă.',
      body: [
        'Nu orice fractură are nevoie de operație. Fracturile fără deplasare se tratează în aparat gipsat, cu control radiologic la o săptămână pentru a verifica poziția.',
        'Când fragmentele sunt deplasate, fixarea internă cu placă anatomică din titan ține osul în poziția corectă cât timp se consolidează. Avantajul nu e cosmetic: permite începerea mișcării în primele zile, în loc de șase săptămâni de imobilizare.',
        'Fractura de scafoid are un traseu aparte: se vede greu pe radiografia inițială și se poate consolida vicios dacă e ratată, de aceea la suspiciune se repetă imagistica sau se face CT.',
      ],
      facts: [
        ['Imagistică', 'Radiografie în două incidențe, CT la fracturile complexe'],
        ['Implant', 'Plăci anatomice din titan, profil redus'],
        ['Mobilizare', 'Degetele din prima zi, încheietura de la 2 săptămâni'],
        ['Control', 'Radiografie la 1, 6 și 12 săptămâni'],
      ],
    },
    {
      id: 'leziuni-de-nervi',
      title: 'Leziuni de nervi periferici',
      short: 'Neuroliză, neurorafie microchirurgicală și grefe nervoase pentru recâștigarea sensibilității.',
      lead: 'Secționările de nervi nu dor neapărat: se pierde sensibilitatea într-un teritoriu precis.',
      body: [
        'Teritoriul în care s-a pierdut sensibilitatea spune care ram nervos a fost secționat și unde trebuie căutat capătul distal. De aceea examinarea clinică atentă contează la fel de mult ca imagistica.',
        'Sutura se face sub microscop, fasciculă cu fasciculă, cu fire de 9-0 și 10-0. Când capetele nu se pot apropia fără tensiune, se folosește o grefă nervoasă.',
        'Regenerarea avansează cu aproximativ un milimetru pe zi, deci sensibilitatea în vârful degetului se întoarce în luni, nu în săptămâni. Recuperarea ghidată în tot acest interval face diferența la rezultatul final.',
      ],
      facts: [
        ['Tehnică', 'Neurorafie epineurală sub microscop, fire 9-0 și 10-0'],
        ['Alternativă', 'Grefă nervoasă, când capetele nu se pot apropia'],
        ['Ritm de regenerare', 'Aproximativ 1 mm pe zi'],
        ['Recuperare', '3–12 luni, cu reeducare senzitivă'],
      ],
    },
    {
      id: 'artroza-mainii',
      title: 'Artroza mâinii',
      short: 'Rizartroză și artroze interfalangiene, de la protezare articulară la artrodeză stabilă.',
      lead: 'Uzura cartilajului la baza policelui sau la articulațiile degetelor, cu durere la prindere și pierdere de forță.',
      body: [
        'Rizartroza, artroza articulației de la baza policelui, e cea mai frecventă. Doare la prinderea cheii sau la deschiderea unui borcan, iar forța scade treptat.',
        'Tratamentul începe conservator: orteză pentru police, infiltrații și adaptarea gesturilor zilnice. Multe cazuri rămân controlate ani de zile în acest fel.',
        'Când durerea persistă, opțiunile chirurgicale se aleg în funcție de articulație și de cât solicită pacientul mâna: protezare articulară acolo unde contează mobilitatea, artrodeză acolo unde contează stabilitatea și dispariția durerii.',
      ],
      facts: [
        ['Conservator', 'Orteză, infiltrații, adaptarea gesturilor'],
        ['Chirurgical', 'Protezare articulară sau artrodeză'],
        ['Alegerea', 'În funcție de articulație și de solicitarea mâinii'],
        ['Revenire', '4–10 săptămâni'],
      ],
    },
    {
      id: 'urgente-si-replantari',
      title: 'Urgențe microchirurgicale și replantări',
      short: 'Amputații traumatice de degete și mână. Sutură vasculară sub microscop la 0,4 mm. Fereastra de intervenție este de ore, nu de zile.',
      lead: 'Amputații traumatice, secționări de tendoane și de nervi, leziuni prin strivire.',
      body: [
        'Fereastra optimă pentru replantare este de 6–12 ore de la accident, mai scurtă dacă segmentul nu a fost răcit corect. De aceea primul apel contează mai mult decât distanța până la clinică.',
        'Până ajungi: păstrează segmentul amputat într-o pungă curată, închide punga și pune-o pe gheață, fără contact direct între gheață și țesut. Nu spăla segmentul cu antiseptice și nu îl pune în alcool.',
        'Sutura vasculară se face sub microscop, pe vase de aproximativ 0,4 mm. După replantare urmează o perioadă de monitorizare atentă a circulației, apoi un program lung de recuperare.',
      ],
      facts: [
        ['Fereastră de intervenție', '6–12 ore de la accident'],
        ['Transport', 'Pungă curată, pusă pe gheață, fără contact direct'],
        ['Tehnică', 'Sutură vasculară sub microscop, la aproximativ 0,4 mm'],
        ['Program', 'Non-stop, la numărul de urgență'],
      ],
      urgent: true,
      urgentTitle: 'Ce faci până ajungi la clinică',
      urgentSteps: [
        'Sună imediat la {phone}, linia e non-stop.',
        'Pune segmentul amputat într-o pungă curată și închide punga.',
        'Așază punga pe gheață, fără contact direct între gheață și țesut.',
        'Nu spăla segmentul cu antiseptice și nu îl introduce în alcool.',
      ],
    },
    {
      id: 'malformatii-congenitale',
      title: 'Malformații congenitale',
      short: 'Sindactilie, police în resort, polidactilie, corectate la vârsta optimă pentru dezvoltare.',
      lead: 'Diferențe congenitale ale mâinii, evaluate și operate la momentul potrivit dezvoltării.',
      body: [
        'Momentul intervenției nu e același pentru toate diagnosticele: unele se operează în primul an, altele după ce mâna crește suficient. Evaluarea timpurie ajută chiar și când operația se face mai târziu, pentru că stabilește planul.',
        'În sindactilie, separarea degetelor se face cu lambouri de piele proiectate astfel încât comisura să rămână stabilă pe măsură ce copilul crește.',
        'Policele în resort la copil se rezolvă printr-o intervenție scurtă, iar rezultatul funcțional e de regulă complet.',
      ],
      facts: [
        ['Evaluare', 'Cât mai devreme, chiar dacă operația se face mai târziu'],
        ['Momentul operator', 'Stabilit în funcție de diagnostic și de dezvoltarea mâinii'],
        ['Anestezie', 'Generală, în echipă cu medic anestezist pediatru'],
        ['Urmărire', 'Controale periodice până la finalul creșterii'],
      ],
    },
  ],

  steps: [
    {
      n: '01',
      time: '45 min',
      title: 'Consultația inițială',
      text: 'Examinare clinică completă, testare funcțională și ecografie în cabinet. Pleci cu un diagnostic, nu cu o trimitere.',
      img: 'etapa-1',
      alt: 'Medicul examinează palma pacientului, în cabinet',
    },
    {
      n: '02',
      time: '2–5 zile',
      title: 'Planul de tratament',
      text: 'Îți explicăm toate variantele, inclusiv pe cele fără operație. Primești planul scris, cu costuri și durate reale.',
      img: 'etapa-2',
      alt: 'Radiografia mâinii pe negatoscop, cu medicul indicând încheietura',
    },
    {
      n: '03',
      time: '30–120 min',
      title: 'Intervenția',
      text: 'Majoritatea procedurilor se fac în anestezie loco-regională, chirurgie de zi. Intri dimineața, pleci acasă seara.',
      img: 'etapa-3',
      alt: 'Mâinile chirurgului cu instrumente microchirurgicale, sub lumina microscopului',
    },
    {
      n: '04',
      time: '2–12 săpt.',
      title: 'Recuperarea ghidată',
      text: 'Kinetoterapie dedicată mâinii, cu orteze realizate pe loc. Reevaluare la fiecare etapă, până la funcție completă.',
      img: 'etapa-4',
      alt: 'Mână cu orteză strângând o minge de recuperare',
    },
  ],

  faq: [
    {
      q: 'Am nevoie de trimitere de la medicul de familie?',
      a: 'Nu pentru consultația privată. Trimiterea e necesară doar dacă vrei decontare prin CAS pentru anumite proceduri; verificăm la programare dacă e cazul tău.',
    },
    {
      q: 'Cât durează până revin la muncă?',
      a: 'Depinde de intervenție și de ce lucrezi. Pentru tunel carpian endoscopic: 5–10 zile pentru muncă de birou, 3–4 săptămâni pentru muncă fizică. Pentru osteosinteze: 6–8 săptămâni. Estimarea pentru cazul tău intră în planul de tratament, în scris.',
    },
    {
      q: 'Se face cu anestezie generală?',
      a: 'În peste 80% dintre cazuri, nu. Folosim bloc de plex brahial sau anestezie locală: ești treaz, nu simți durere și pleci acasă în aceeași zi.',
    },
    {
      q: 'Rămân cicatrici vizibile?',
      a: 'Inciziile sunt plasate în pliurile naturale ale pielii și suturate intradermic. La 6 luni, majoritatea cicatricilor sunt greu de găsit fără să știi unde să te uiți. Primești și protocolul de îngrijire a cicatricii.',
    },
    {
      q: 'Lucrați cu asigurări private?',
      a: 'Da, avem contracte cu principalii asigurători privați. Trimite-ne polița înainte de consultație și verificăm acoperirea în 24 de ore lucrătoare.',
    },
    {
      q: 'Preluați urgențe (tăieturi, amputații)?',
      a: 'Da, non-stop. Pentru amputații: păstrează segmentul într-o pungă curată, pune punga pe gheață fără contact direct și sună imediat. Fereastra optimă pentru replantare este de 6–12 ore.',
    },
  ],

  recovery: [
    { title: 'Protocol pe zile', text: 'Știi exact ce miști în ziua 3, 10 și 21, și ce rămâne imobilizat.' },
    { title: 'Orteze pe măsură', text: 'Termoformate în clinică și reajustate la fiecare control.' },
    { title: 'Acces direct', text: 'Linie de contact cu terapeutul tău, 12 săptămâni după operație.' },
  ],

  /* Doar textul: numerotarea a ieșit. Un șir de dotări nu e o succesiune,
     fiindcă microscopul nu vine înaintea ecografului, iar `01…03` pe o listă care nu
     are ordine promite o ordine care nu există. */
  equipment: [
    'Microscop operator cu magnificare 40×',
    'Turn artroscopic dedicat articulațiilor mici',
    'Ecograf musculo-scheletal cu sondă de 22 MHz',
    'Implanturi anatomice din titan, profil redus',
  ],

  pages: {
    home: {
      title: 'Chirurgia mâinii și microchirurgie reconstructivă',
      /* Aceleași cuvinte, rupte de mână. `title` rămâne pentru locurile unde
         titlul e un șir (meta, cititoare de ecran); deschiderea documentară îl
         așază pe două trepte, iar unde cade ruptura e o decizie, nu o
         consecință a lățimii ferestrei. */
      titleLines: ['Chirurgia mâinii', 'și microchirurgie reconstructivă'],
      lead: 'Diagnostic ecografic în cabinet, chirurgie minim invazivă și recuperare condusă de terapeuți de mână. Tratăm sindromul de tunel carpian, boala Dupuytren, fracturile și luxațiile mâinii, leziunile de nervi periferici și urgențele microchirurgicale.',
      annotations: ['Nerv median', 'Tendoane flexoare', 'Articulație scafo-lunată'],
      sections: {
        doctor: 'Medicul',
        conditions: 'Afecțiuni tratate',
        blueprint: 'Planificare preoperatorie',
        procedures: 'Cum lucrăm',
        recovery: 'Recuperare',
        faq: 'Întrebări frecvente',
        booking: 'Programare',
      },
      doctorLead: 'Operează exclusiv mâna și antebrațul, de la intervenții de o oră în anestezie locală până la reconstrucții microchirurgicale în urgență.',
      doctorLink: 'Despre medic',
      conditionsIntro: 'Fiecare afecțiune are protocolul ei de diagnostic (ecografie musculo-scheletală, electromiografie sau RMN), stabilit înainte de a discuta despre operație.',
      proceduresIntro: 'Patru etape, de la prima consultație până la reluarea activității. Duratele sunt medii pentru intervențiile frecvente și se recalculează pentru fiecare caz.',
      recoveryIntro: 'O sutură de tendon își pierde rezultatul după trei săptămâni de imobilizare greșită, așa că protocolul de recuperare se scrie odată cu planul operator, nu după externare.',
      recoveryLink: 'Programul de recuperare',
      faqIntro: 'Răspunsurile de mai jos acoperă întrebările care apar cel mai des la programare. Pentru situația ta, scrie-ne sau sună.',
      bookingIntro: 'Completezi numele și telefonul, te sunăm noi. Confirmăm ora în maximum 4 ore lucrătoare. Pentru urgențe, sună direct.',
    },

    blueprint: {
      /* Prima propoziție e acum declarația secțiunii, pusă mare. A doua s-a
         desfăcut în `yield`: erau trei rezultate enumerate într-o subordonată,
         iar enumerările lungi la sfârșit de frază se citesc ca o listă oricum,
         doar că una pe care ochiul n-o poate parcurge. */
      statement: 'Planificarea preoperatorie se face pe imagistică: radiografie în două incidențe, ecografie dinamică și, unde e nevoie, CT cu reconstrucție.',
      yieldLabel: 'Din ea rezultă',
      yields: ['Abordul', 'Dimensiunea implantului', 'Structurile de evitat'],
      equipLabel: 'Dotare',
    },

    about: {
      metaTitle: 'Medicul',
      metaDescription:
        'Medic primar chirurgie plastică, cu supraspecializare în chirurgia mâinii. Formare, domenii de competență, afilieri și program de consultații.',
      title: 'Un chirurg care operează doar mâna',
      lead: 'Operează exclusiv mâna și antebrațul, de la intervenții de o oră în anestezie locală până la reconstrucții microchirurgicale în urgență.',
      body: [
        'Într-o mână intră 27 de oase, 34 de mușchi și trei nervi majori pe o suprafață cât un telefon. Chirurgia mâinii cere altă scară de lucru decât restul chirurgiei: instrumente mai fine, magnificare optică și un protocol de recuperare stabilit din ziua zero.',
        'Practica e limitată deliberat la mână și antebraț. Volumul concentrat pe o singură regiune înseamnă că afecțiuni rare pentru un chirurg general apar aici de câteva ori pe lună.',
      ],
      factsTitle: 'Formare și competențe',
      equipmentAria: 'Dotare',
    },

    conditions: {
      metaTitle: 'Afecțiuni tratate',
      metaDescription:
        'Sindrom de tunel carpian, boala Dupuytren, deget în resort, fracturi și luxații, leziuni de nervi periferici, artroză, urgențe microchirurgicale și malformații congenitale.',
      title: 'Afecțiunile pe care le tratăm',
      lead: 'Fiecare afecțiune are protocolul ei de diagnostic (ecografie musculo-scheletală, electromiografie sau RMN), stabilit înainte de a discuta despre operație.',
      summaryTitle: 'Pe scurt',
    },

    procedures: {
      metaTitle: 'Cum lucrăm',
      metaDescription:
        'Patru etape: consultația cu ecografie în cabinet, planul de tratament în scris, intervenția în chirurgie de zi și recuperarea ghidată.',
      title: 'De la prima consultație la funcție completă',
      lead: 'Patru etape, cu durate medii pentru intervențiile frecvente. Pentru cazul tău, duratele se recalculează și intră în planul scris.',
      blocks: [
        {
          h: 'Ce primești în scris',
          p: ['Planul de tratament nu e o recomandare verbală. Conține diagnosticul, variantele posibile (inclusiv cele fără operație), durata estimată de recuperare pentru fiecare variantă și costul total, fără sume care apar ulterior.'],
        },
        {
          h: 'Anestezia',
          p: ['În peste 80% dintre cazuri se folosește bloc de plex brahial sau anestezie locală: ești treaz, nu simți durere și pleci acasă în aceeași zi. Anestezia generală rămâne pentru intervențiile lungi și pentru copii.'],
        },
        {
          h: 'După intervenție',
          p: ['Pleci cu protocolul de mobilizare pe zile, cu rețeta și cu data primului control. Dacă apare ceva între controale, ai o linie directă cu echipa, timp de 12 săptămâni.'],
        },
      ],
      asideTitle: 'Înainte de intervenție',
      asideText: 'Pregătirea, analizele necesare și ce trebuie oprit din tratamentul curent sunt explicate pe o pagină separată.',
      asideLink: 'Pregătire preoperatorie',
    },

    recovery: {
      metaTitle: 'Recuperare',
      metaDescription:
        'Kinetoterapie dedicată mâinii, orteze termoformate în clinică, protocol de mobilizare pe zile și reevaluare la fiecare etapă.',
      title: 'Recuperarea e parte din intervenție',
      lead: 'O sutură de tendon își pierde rezultatul după trei săptămâni de imobilizare greșită. De aceea protocolul se scrie odată cu planul operator, nu după externare.',
      intro: [
        'La fiecare control se măsoară cu goniometrul unghiurile de flexie și extensie și se compară cu ținta etapei. Dacă amplitudinea stagnează două controale la rând, protocolul se schimbă; nu se așteaptă „să treacă de la sine".',
        'Ortezele se refac pe măsură ce edemul scade. Una care nu mai vine pe mână ajunge să limiteze exact mișcarea pe care ar trebui să o protejeze.',
      ],
      blocks: [
        {
          h: 'Etapele, pe zile',
          ul: [
            '**Zilele 0–3.** Edem și durere sub control, mâna ridicată deasupra nivelului inimii. Se mobilizează doar ce e indicat.',
            '**Zilele 3–21.** Intervalul critic după suturile de tendon: mobilizare pasivă precoce, în orteză, la amplitudinile stabilite.',
            '**Săptămânile 3–6.** Mobilizare activă, cu creșterea treptată a amplitudinii. Se verifică rezistența suturii înainte de fiecare etapă nouă.',
            '**Săptămânile 6–12.** Forță și rezistență, revenirea la gesturile profesionale. Ortezele se folosesc doar nocturn, dacă mai e nevoie.',
          ],
        },
        {
          h: 'Cine face recuperarea',
          p: ['Kinetoterapeuți cu formare pe mână, în aceeași clinică unde s-a făcut intervenția. Chirurgul și terapeutul văd aceleași măsurători, deci protocolul se ajustează fără să repeți povestea de la capăt.'],
        },
      ],
      asideTitle: 'Ce aduci la ședințe',
      asideText: 'Orteza, protocolul primit la externare și, dacă ai, ultima radiografie de control. Ședințele durează între 30 și 45 de minute.',
      asideCta: 'Programează o ședință',
    },

    faq: {
      metaTitle: 'Întrebări frecvente',
      metaDescription:
        'Trimitere de la medicul de familie, durata până la revenirea la muncă, tipul de anestezie, cicatrici, asigurări private și urgențe.',
      title: 'Ce ne întreabă pacienții',
      lead: 'Răspunsurile de mai jos acoperă întrebările care apar cel mai des la programare. Pentru situația ta, scrie-ne sau sună.',
      intro: 'Nu găsești răspunsul aici? Scrie-ne prin formularul de programare sau sună la {phone}.',
    },

    booking: {
      metaTitle: 'Programare',
      metaDescription:
        'Programează o consultație: completezi numele și telefonul, te sunăm în maximum 4 ore lucrătoare. Pentru urgențe, linia e non-stop.',
      title: 'Programează o consultație',
      lead: 'Completezi numele și telefonul, te sunăm noi. Confirmăm ora în maximum 4 ore lucrătoare. Pentru urgențe, sună direct.',
    },

    prices: {
      metaTitle: 'Tarife',
      metaDescription:
        'Cum se stabilesc costurile: consultația, investigațiile, intervenția și ședințele de recuperare. Costul total intră în planul de tratament, în scris.',
      title: 'Tarife',
      lead: 'Costul total al unei intervenții depinde de procedură, de tipul de anestezie și de implant. Îl primești în scris, în planul de tratament, înainte de a decide.',
      blocks: [
        {
          h: 'Ce include un cost',
          p: ['Pentru intervenții, suma comunicată acoperă intervenția propriu-zisă, anestezia, consumabilele, implantul dacă e cazul și controalele postoperatorii din pachet. Nu apar sume ulterioare pentru lucruri care se știau dinainte.'],
        },
        {
          h: 'Ce se plătește separat',
          ul: [
            'Investigațiile făcute în alt centru (RMN, CT, electromiografie).',
            'Ședințele de recuperare, dacă nu sunt incluse în pachetul intervenției.',
            'Ortezele suplimentare, când se schimbă tipul pe parcursul recuperării.',
          ],
        },
        {
          h: 'Asigurări private',
          p: ['Avem contracte cu principalii asigurători privați. Trimite polița înainte de consultație și verificăm acoperirea în 24 de ore lucrătoare.'],
        },
        {
          h: 'Decontare CAS',
          p: ['Pentru anumite proceduri există decontare prin CAS, condiționată de trimitere de la medicul de familie sau de la un medic specialist. Verificăm la programare dacă e cazul tău.'],
        },
      ],
      asideTitle: 'Consultații și proceduri',
      /* (placeholder) Sumele reale se completează înainte de lansare. */
      table: [
        ['Consultație inițială, cu ecografie în cabinet', '- lei'],
        ['A doua opinie, pe documentație existentă', '- lei'],
        ['Control postoperator', 'inclus în pachetul intervenției'],
        ['Infiltrație ghidată ecografic', '- lei'],
        ['Ședință de kinetoterapie a mâinii', '- lei'],
        ['Orteză termoformată, realizată în clinică', '- lei'],
      ],
      asideNote: 'Pentru o estimare exactă, sună la {phone}.',
    },

    prep: {
      metaTitle: 'Pregătire preoperatorie',
      metaDescription:
        'Ce analize sunt necesare, ce tratamente se opresc înainte de intervenție, cum vii îmbrăcat și ce iei cu tine în ziua operației.',
      title: 'Pregătirea pentru intervenție',
      lead: 'Instrucțiunile de mai jos sunt valabile pentru intervențiile obișnuite de chirurgia mâinii. Pentru cazul tău, primești lista finală odată cu planul de tratament.',
      blocks: [
        {
          h: 'Analize și investigații',
          p: ['Pentru intervențiile în anestezie locală, de regulă nu sunt necesare analize. Pentru bloc de plex brahial sau anestezie generală se cer analize uzuale, cu valabilitate de 30 de zile, și consult preanestezic.'],
        },
        {
          h: 'Tratamente care se opresc',
          ul: [
            'Anticoagulantele și antiagregantele se opresc doar la indicația medicului care le-a prescris. Nu le întrerupe singur.',
            'Antiinflamatoarele se opresc cu 5 zile înainte, dacă nu ai altă indicație.',
            'Suplimentele cu efect anticoagulant, între care extractul de ghimbir și cel de ginkgo, se opresc cu o săptămână înainte.',
            'Fumatul încetinește vindecarea plăgii; ideal se oprește cu două săptămâni înainte și pe toată durata cicatrizării.',
          ],
        },
        {
          h: 'În ziua intervenției',
          ul: [
            'Pentru anestezie generală sau sedare: fără mâncare și băutură cu 6 ore înainte.',
            'Vino cu haine lejere, cu mâneci largi, care se pot rula peste orteză.',
            'Scoate inelele și brățările de pe mâna operată. Dacă un inel nu mai iese, spune-ne din timp.',
            'Fără ojă și fără unghii false pe mâna operată: culoarea patului unghial e un indicator de circulație.',
            'Vino însoțit dacă se face bloc de plex sau sedare. Nu poți conduce în aceeași zi.',
          ],
        },
        {
          h: 'Ce iei cu tine',
          ul: [
            'Buletinul, cardul de sănătate și polița de asigurare, dacă ai.',
            'Imagistica anterioară: radiografii, CT, RMN, pe hârtie sau pe disc.',
            'Lista tratamentelor curente, cu doze.',
          ],
        },
        {
          h: 'După externare',
          p: ['Pleci cu protocolul de mobilizare pe zile, cu rețeta și cu data primului control. Pentru orice apare între controale (durere care crește, febră, pansament îmbibat), sună la {phone}.'],
        },
      ],
      asideTitle: 'Pe scurt',
      asideFacts: [
        ['Post alimentar', '6 ore, doar la sedare sau anestezie generală'],
        ['Însoțitor', 'Necesar la bloc de plex și la sedare'],
        ['Bijuterii', 'Scoase de pe mâna operată'],
        ['Condus', 'Nu în ziua intervenției'],
      ],
    },

    legalLead: 'Document orientativ, care trebuie verificat de un jurist înainte de lansare. (placeholder)',

    privacy: {
      metaTitle: 'Politica de confidențialitate',
      metaDescription: 'Ce date colectăm prin site, în ce scop, cât le păstrăm și cui le transmitem.',
      title: 'Politica de confidențialitate',
      blocks: [
        {
          h: 'Cine suntem',
          p: ['{legal}, CUI {cui}, cu sediul în {address}, este operatorul datelor colectate prin acest site. Ne poți contacta la {email} sau la {phone}.'],
        },
        {
          h: 'Ce date colectăm',
          p: ['Site-ul colectează doar datele pe care le completezi în formularul de programare: nume, telefon, adresă de email (opțional), tipul de programare, data preferată și descrierea pe scurt a problemei. Nu folosim formulare de urmărire și nu cerem date medicale detaliate prin site.'],
        },
        {
          h: 'În ce scop',
          p: ['Datele sunt folosite exclusiv pentru a te contacta și a stabili programarea. Temeiul prelucrării este demersul făcut la cererea ta, înainte de încheierea unui contract de servicii medicale. Nu le folosim în scop de marketing și nu îți trimitem comunicări comerciale fără acordul tău separat.'],
        },
        {
          h: 'Cât le păstrăm',
          p: ['Mesajele primite prin formular se păstrează în căsuța de email a clinicii pe durata necesară programării și, dacă devii pacient, intră în dosarul medical, cu termenele de păstrare prevăzute de lege pentru documentele medicale. Solicitările care nu se finalizează într-o programare se șterg în cel mult 12 luni.'],
        },
        {
          h: 'Cui le transmitem',
          p: ['Datele nu se vând și nu se transmit în scop comercial. Pot fi accesate de furnizorul de găzduire și de furnizorul de email, în calitate de persoane împuternicite, strict pentru funcționarea serviciului.'],
        },
        {
          h: 'Drepturile tale',
          p: ['Ai dreptul de acces, rectificare, ștergere, restricționare, opoziție și portabilitate a datelor. Le poți exercita scriind la {email}. Dacă răspunsul nu te mulțumește, te poți adresa Autorității Naționale de Supraveghere a Prelucrării Datelor cu Caracter Personal.'],
        },
        {
          h: 'Securitate',
          p: ['Site-ul rulează pe HTTPS, iar formularul are protecții împotriva trimiterilor automate și limitează numărul de trimiteri de la aceeași adresă IP. Accesul la căsuța de email a clinicii e restricționat la personalul care face programările.'],
        },
      ],
    },

    gdpr: {
      metaTitle: 'Prelucrarea datelor (GDPR)',
      metaDescription: 'Temeiul legal al prelucrării, drepturile persoanei vizate și cum le exerciți.',
      title: 'Prelucrarea datelor cu caracter personal',
      blocks: [
        {
          h: 'Operatorul',
          p: ['{legal}, CUI {cui}, {address}. Contact pentru orice cerere legată de date: {email}.'],
        },
        {
          h: 'Categorii de date',
          ul: [
            'Date de identificare și de contact: nume, telefon, email.',
            'Date privind programarea: tipul consultației, data preferată, descrierea pe scurt a problemei.',
            'Date medicale, colectate în cabinet, nu prin site, prelucrate în scop de diagnostic și tratament.',
          ],
        },
        {
          h: 'Temeiul prelucrării',
          ul: [
            'Demersuri făcute la cererea ta înainte de încheierea contractului de servicii medicale, pentru datele din formular.',
            'Prestarea serviciilor de sănătate și administrarea acestora, pentru datele medicale.',
            'Obligații legale, pentru păstrarea documentelor medicale și pentru facturare.',
          ],
        },
        {
          h: 'Drepturile tale',
          ul: [
            'Acces la datele prelucrate și la informații despre prelucrare.',
            'Rectificarea datelor inexacte și completarea celor incomplete.',
            'Ștergerea datelor, în limitele obligațiilor legale de păstrare a documentelor medicale.',
            'Restricționarea prelucrării și opoziție.',
            'Portabilitatea datelor furnizate de tine.',
            'Plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal.',
          ],
        },
        {
          h: 'Termen de răspuns',
          p: ['Răspundem cererilor în cel mult 30 de zile de la primire. Dacă cererea e complexă, termenul poate fi prelungit, iar prelungirea îți este comunicată cu motivare.'],
        },
        {
          h: 'Transferuri',
          p: ['Datele sunt găzduite pe servere din Uniunea Europeană. Nu efectuăm transferuri către țări terțe.'],
        },
      ],
    },

    terms: {
      metaTitle: 'Termeni și condiții',
      metaDescription:
        'Condițiile de utilizare a site-ului, programările, anularea și limitele informației medicale publicate.',
      title: 'Termeni și condiții',
      blocks: [
        { h: 'Cine administrează site-ul', p: ['{legal}, CUI {cui}, {address}.'] },
        {
          h: 'Informația medicală de pe site',
          p: ['Textele publicate aici au scop informativ și descriu situații obișnuite. Nu înlocuiesc consultația și nu constituie diagnostic sau indicație de tratament pentru cazul tău. Orice decizie terapeutică se ia după examinare.'],
        },
        {
          h: 'Programări',
          ul: [
            'Formularul transmite o solicitare de programare, nu o programare confirmată.',
            'Confirmarea se face telefonic, în maximum 4 ore lucrătoare.',
            'Dacă nu poți ajunge, anunță cu cel puțin 24 de ore înainte, ca intervalul să fie eliberat pentru alt pacient.',
          ],
        },
        {
          h: 'Urgențe',
          p: ['Formularul nu e canal de urgență. Pentru amputații traumatice și leziuni acute, sună direct la {phone}.'],
        },
        {
          h: 'Drepturi de autor',
          p: ['Textele, imaginile și elementele de identitate vizuală aparțin operatorului și nu pot fi reproduse fără acord scris.'],
        },
        {
          h: 'Modificări',
          p: ['Termenii pot fi actualizați. Versiunea aplicabilă e cea publicată pe site la momentul utilizării.'],
        },
      ],
    },

    cookies: {
      metaTitle: 'Cookies',
      metaDescription: 'Ce cookie-uri folosește site-ul și cum le poți controla.',
      title: 'Politica de cookies',
      blocks: [
        {
          h: 'Ce folosește site-ul acum',
          p: ['În forma publicată, site-ul nu folosește cookie-uri de analiză sau de publicitate și nu încarcă scripturi de la terți. Fonturile sunt găzduite local, iar imaginile sunt servite de pe același domeniu, deci simpla vizitare a paginilor nu transmite date către alte servere.'],
        },
        {
          h: 'Cookie-uri tehnice',
          p: ['Serverul poate folosi cookie-uri strict necesare, pentru securitate și pentru limitarea trimiterilor repetate din formular. Acestea nu urmăresc comportamentul și nu construiesc profiluri.'],
        },
        {
          h: 'Dacă se adaugă analiză de trafic',
          p: ['În momentul în care se adaugă un instrument de analiză, pagina asta se actualizează cu numele furnizorului, scopul, durata de viață a cookie-urilor și modul de retragere a consimțământului, iar pe site apare un banner care blochează scripturile până la acceptare.'],
        },
        {
          h: 'Controlul din browser',
          p: ['Poți șterge sau bloca cookie-urile din setările browserului. Blocarea celor strict necesare poate împiedica funcționarea formularului de programare.'],
        },
        { h: 'Contact', p: ['Întrebări despre pagina asta: {email}.'] },
      ],
    },

    notFound: {
      metaTitle: 'Pagina nu a fost găsită',
      title: 'Pagina nu a fost găsită',
      lead: 'Linkul e greșit sau pagina a fost mutată. Mai jos sunt locurile căutate cel mai des.',
      links: ['conditions', 'procedures', 'recovery', 'faq', 'booking'],
      emergency: 'Dacă e o urgență, sună direct la {phone}.',
      // Serverul are o singură pagină de eroare, iar ea e în română. Un
      // vizitator englez care nimerește un link greșit trebuie să aibă de unde
      // să plece mai departe, fără să ghicească.
      otherLang: { line: 'This page could not be found.', cta: 'Go to the English site' },
    },
  },
};
