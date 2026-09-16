# Institutul Mâinii

Site pentru un centru de chirurgia mâinii. **Next.js cu export static**, nu are
nevoie de Node pe server, pentru că niciuna dintre cele două destinații nu oferă
Node (vezi [DEPLOY.md](DEPLOY.md)).

```bash
npm ci
npm run dev       # http://localhost:3000
npm run build     # generează out/
npm run preview   # servește out/ pe http://localhost:4173
```

## Structura

```
app/                     doar rutarea, fișiere de câteva rânduri
  (ro)/                    româna, în rădăcină: /, /despre/, /afectiuni/…
  (en)/en/                 engleza, în subarbore: /en/, /en/about/…
  not-found.jsx            404, în afara ambelor grupuri
components/pages/        paginile propriu-zise, câte una pentru ambele limbi
components/              Nav, Footer, ActionBar, Chrome, Shell, PageHead,
                         Prose, Media, Decor, Faq, BookingForm, InfoPanel
lib/content/ro.js        TOT textul în română
lib/content/en.js        aceleași chei, în engleză
lib/site.js              datele fixe ale clinicii + îmbinarea cu limba cerută
lib/routes.js            harta de rute și perechile ro↔en
lib/ui.js                textele de interfață: meniu, butoane, formular
lib/meta.js              titluri, canonical și hreflang
lib/images.js            imaginile, importate ca module
styles/style.css         design system (tokeni în :root)
styles/fonts/            General Sans .woff2, self-hosted
assets/img/              hero-bg.jpg (deschiderea) + prompt-1…9.jpg (conținut)
                         + deco-1…6.png (obiecte)
server/                  ce urcă pe Hostico: .htaccess + api/contact.php
scripts/postbuild.mjs    sitemap, robots, .nojekyll, copierea fișierelor de server
tools/                   verificarea coerenței kitului de obiecte
PROMPTS.md               prompturile asset-urilor și capcanele lor
inspo/                   moodboard-ul sursă
```

### Trei decizii de structură

**Textul nu stă în pagini.** `app/` conține doar rutare; paginile sunt în
`components/pages/` și primesc `lang`, iar textul vine din `lib/content/`. Dacă
fiecare limbă ar avea propriile pagini JSX, o corectură de layout ar trebui
făcută de două ori, iar a doua oară s-ar uita. Așa, structura e scrisă o
singură dată, iar traducerea e doar date. O afecțiune nouă = un obiect nou în
`conditions`, iar pagina, linkurile din listă, navigarea „anterior/următor" și
sitemap-ul apar singure.

**`lib/routes.js` e singurul loc unde există adrese.** Din el ies meniul,
subsolul, comutatorul de limbă, hreflang-ul și sitemap-ul. O rută nouă se adaugă
acolo o dată, nu în cinci fișiere din care unul rămâne mereu în urmă.

**Imaginile se importă, nu se scriu ca adrese.** `lib/images.js` le importă ca
module, iar Next le pune prefixul corect. Pe GitHub Pages site-ul stă într-un
subdirector, deci un `/assets/img/x.jpg` scris de mână ar da 404 acolo și ar
merge acasă, exact genul de defect care apare abia după livrare.

## Deschiderea

`components/Hero.jsx` + `assets/img/hero-bg.jpg`: o fotografie documentară pe tot
ecranul, text jos-stânga, cifrele pe un rând la bază. Complet statică: o
fotografie de reportaj care se mișcă devine reclamă.

**Nimic din compoziție nu e lăsat pe seama browserului**, și ăsta e tot rostul ei.
Varianta dinainte era corectă în fiecare punct (titlu rupt de `text-wrap:balance`
în rânduri egale, totul pornind de pe aceeași linie din stânga, cifre în patru
coloane de `1fr`) și tocmai de aceea arăta ca un șablon: nicăieri nu se vedea că
cineva a *hotărât* ceva. Deci:

- titlul stă pe două trepte, iar unde cade ruptura scrie în conținut
  (`titleLines`), nu se calculează din lățimea ferestrei;
- treapta a doua e retrasă, singura abatere de la raftul din stânga, și e
  intenționată. Dacă ar fi două, n-ar mai părea decizie;
- cifrele își iau lățimea din conținut, iar linia de deasupra lor se oprește la
  două treimi și se stinge;
- etichetele cifrelor își păstrează rupturile de rând din fișierul de conținut.
  **Nu le uni.** Un `.replace('\n', ' ')` pe ele șterge exact deciziile omului
  care a scris textul și transformă rândul de cifre într-un tabel.

**Perdeaua e în două straturi**, unul vertical și unul orizontal dinspre stânga.
Unul singur nu ajunge: cu doar cel vertical, cuvintele lungi din lead ajung peste
zona luminoasă a imaginii și contrastul cade sub prag fix la mijlocul rândului.

**Meniul se inversează pe alb doar aici.** Bara e fixă, deci stă peste deschidere,
dar în DOM e frate cu ea, deci n-o poate ținti niciun selector pornit din secțiune.
`body:has(.hero)` rezolvă din CSS ce altfel ar fi cerut un atribut scris din
JavaScript, și se aplică numai pe pagina care are `.hero`; paginile interioare își
păstrează culorile.

**Și numai peste 900px.** Inversarea are sens doar cât timp bara e transparentă.
Două lucruri o umplu cu alb: derularea (`.is-stuck`) și lățimea, fiindcă sub 900px
`.nav__inner` are pastila de sticlă tot timpul. Prima e prinsă de
`:not(.is-stuck)`, a doua cere media query; fără el, ieșea text alb pe pastilă
albă pe fiecare telefon.

## Bilingv: română în rădăcină, engleză în `/en/`

| | română | engleză |
|---|---|---|
| Pornire | `/` | `/en/` |
| Medicul | `/despre/` | `/en/about/` |
| O afecțiune | `/afectiuni/tunel-carpian/` | `/en/conditions/carpal-tunnel-syndrome/` |

**Româna nu are prefix.** E limba principală a clinicii, deci nu trebuie să
plătească un redirect și un segment în plus la fiecare adresă.

**Slug-urile se traduc.** `/en/afectiuni/` i-ar spune unui cititor englez că
pagina e stricată, iar Google indexează separat fiecare versiune. Costul e că
perechea ro↔en trebuie ținută undeva, e în `lib/routes.js`, într-un singur loc.

**Fiecare limbă are propriul layout rădăcină** (`app/(ro)` și `app/(en)`),
pentru că `<html lang>` se scrie o singură dată, în layoutul rădăcină, iar un
subarbore nu îl poate schimba. Alternativa, corectat din JavaScript după
încărcare, ar livra pagina engleză marcată ca română, adică exact ce citesc
cititoarele de ecran și motoarele de căutare la prima trecere. Consecința:
schimbarea limbii e o încărcare completă, nu o navigare din client. E în
regulă, se schimbă tot textul paginii.

**Comutatorul duce la aceeași pagină, nu la pornire.** `counterpart()` din
`lib/routes.js` face potrivirea, inclusiv pentru slug-urile de afecțiuni.

**Nu există redirect automat după limba browserului.** Un vizitator care
primește altă pagină decât cea pe care a dat clic nu înțelege ce s-a întâmplat,
iar crawlerele ajung să indexeze versiunea greșită. Alegerea rămâne a lui, în
bară, și e vizibilă la orice lățime, nu ascunsă în meniul mobil.

**404-ul e unul singur, în română**, pentru că serverul are o singură pagină de
eroare. Poartă și o punte în engleză: vizitatorul care ajunge acolo n-a putut
alege limba.

### Cum adaugi text nou

1. Scrii cheia în `lib/content/ro.js` **și** în `en.js`. Aceleași chei, în
   aceeași ordine.
2. O citești în componenta din `components/pages/`.

Textele de proză acceptă substituenți (`{legal}`, `{cui}`, `{address}`,
`{email}`, `{phone}`) și `**accent**`. Datele clinicii sunt identice în ambele
limbi, deci nu se copiază în traduceri: un telefon schimbat s-ar actualiza
într-o limbă și ar rămâne vechi în cealaltă.

### Cum adaugi o pagină

1. Ruta, în `ROUTES` din `lib/routes.js`, cu adresa în ambele limbi.
2. Eticheta, în `routes` din `lib/ui.js`, în ambele limbi.
3. Conținutul, în `lib/content/{ro,en}.js`.
4. Componenta, în `components/pages/`, cu un `meta(lang)` exportat.
5. Două fișiere de rută de câte cinci rânduri, în `app/(ro)/` și `app/(en)/en/`.

Sitemap-ul și hreflang-ul apar singure: `scripts/postbuild.mjs` citește paginile
chiar generate și **se oprește cu eroare** dacă vreuna a rămas fără pereche de
limbă.

## Vocea · ce nu scrie în pagină

Cea mai vizibilă urmă de „generat" nu era în pixeli, ci în scriitură. Au fost
scoase:

- **titlurile de secțiune**, cu tot cu etichetele numerotate. Nu mai există
  „01. MEDICUL", nici titluri-slogan de tipul „Ce rezolvăm, concret." O secțiune
  se identifică din conținutul ei; pentru structura documentului rămâne câte un
  `<h2 class="sr-only">`.
- **paralelismele retorice**: „Pleci cu un diagnostic, nu cu o trimitere",
  „îți răspunde un medic, nu un formular automat". Fiecare a fost rescrisă ca
  informație.
- **revendicările de diplomă** (EBHS/FESSH), badge-ul rotativ, chip-ul din
  deschidere și rândul din credențiale. Dacă medicul chiar are diploma, se adaugă
  ca rând simplu în listă, cu anul și emitentul. Nu în hero și nu ca badge.

Regula pentru orice text nou: dacă propoziția ar funcționa la fel de bine pe
site-ul altei clinici, nu spune nimic. Scoate-o sau pune o cifră în ea.

## Tipografie · un singur font, peste tot

**General Sans**, self-hosted în `styles/fonts`. Un grotesc cu forme deschise și
tăietură curată: elegant fără să fie decorativ.

Local, nu de pe CDN: nu depinde de un domeniu extern (viteză și GDPR), versiunea
rămâne fixă și nu apare flash de font nestilizat.

| Rol | Cum se obține |
|---|---|
| Titlul din deschidere | 300, `letter-spacing:-.032em` |
| Titluri de secțiune, nume de card | 400 |
| Corp de text | 300 |
| Butoane, nav, UI | 500 |
| Etichete „tehnice" | 500, majuscule, `letter-spacing:.13em`, cifre tabulare |

Trei lucruri de respectat dacă modifici:

- **se livrează doar 300 / 400 / 500.** Semibold și Bold au fost scoase când
  textele au trecut pe greutăți mici, nu mai era nimic care să le folosească.
  Dacă adaugi text la 600, adaugi și fișierul plus `@font-face`-ul; altfel
  browserul îngroașă sintetic și se vede.
- **familia nu are italic.** Accentul din logo („Mâinii") se face din greutate și
  culoare, nu din `font-style`.
- **un grotesc suportă tracking negativ mai mare decât un serif.** La greutăți
  mici valorile sunt și mai negative: `-.032em` la titlu.

## Culori

| Token | Valoare | Unde |
|---|---|---|
| `--white` | `#FFFFFF` | fundal secțiuni principale |
| `--paper` | `#F5F8FD` | fundal secțiuni alternante, inputuri |
| `--blue-50` | `#EEF3FF` | etichete, fundaluri discrete |
| `--mist` | `#E4ECFA` | linii rămase, scrollbar |
| `--blue-100` | `#C1D5FF` | accent deschis, obiecte 3D |
| `--blue-500` | `#2840E7` | brand, butoane, accentul din logo |
| `--blue-900` | `#0E1A5C` | slab-ul de precizie |
| `--ink` | `#0A1020` | text, slab-ul de cifre, footer |

## Spațierea · o scară, nu decizii luate pe rând

Înainte, foaia de stil avea **43 de valori distincte** de spațiere: 7px lângă
9px lângă 11px, 22px lângă 26px, 92px lângă 98px. Fiecare era o decizie luată
separat, fără nicio relație cu celelalte, de acolo venea senzația că nimic nu
se aliniază cu nimic.

Acum toate sunt una dintre **13 trepte**, declarate în `:root`:

| | | | |
|---|---|---|---|
| `--s-1` 4px | `--s-4` 16px | `--s-7` 32px | `--s-10` 64px |
| `--s-2` 8px | `--s-5` 20px | `--s-8` 40px | `--s-11` 80px |
| `--s-3` 12px | `--s-6` 24px | `--s-9` 48px | `--s-12` 96px |
| | | | `--s-13` 128px |

Pas de 4px până la 24, apoi trepte tot mai rare, destule ca să ai ce alege în
interiorul unui card, destul de puține cât să nu poți greși ritmul dintre
secțiuni. **Nicio margine, niciun padding și niciun gap din pagină nu e în
afara scării**, iar asta se verifică:

```bash
node -e "const c=require('fs').readFileSync('styles/style.css','utf8');const p=/(?:^|[;{\s])(margin|padding|gap|row-gap|column-gap)(-[a-z-]+)?\s*:\s*([^;{}]+)/g;const v=/(?<![\w.-])(\d+(?:\.\d+)?)px/g;const g=new Set();let m,x;while((m=p.exec(c)))while((x=v.exec(m[3])))if(+x[1]>3)g.add(+x[1]);console.log(g.size?[...g]:'toate pe scara')"
```

Excepțiile sunt două și sunt declarate ca atare: `--nav-h` și `--nav-clear`.
Nu sunt spațiere, sunt măsurători ale barei fixe.

### Ritmul se plătește o dată, nu de două ori

Cea mai mare parte din „prea mult spațiu" nu venea din valori mari, ci din
adunarea lor. Două secțiuni alăturate își plăteau fiecare ritmul întreg, 96px
sub ultimul rând plus 96px deasupra următorului, deci între două fraze care se
continuă rămâneau **192px de gol**. Ritmul e al graniței, nu al fiecărei
secțiuni: a doua o plătește pe jumătate.

```css
:is(.section, .feature, .slab, .phead) + :is(.section, .feature){
  padding-top:clamp(var(--s-7), 3vw, var(--s-8));
}
```

`:is`, nu `:where`: `:where` are specificitate zero, deci `.section` de
deasupra l-ar bate și regula n-ar face nimic. (Prima variantă chiar așa a fost
scrisă și n-a mișcat un pixel.)

`--sec-y` a scăzut de la `clamp(88px, 10vw, 160px)` la
`clamp(var(--s-10), 6vw, var(--s-12))`. 160px pe desktop e spațiu de galerie:
împinge a doua secțiune sub linia ecranului și rupe legătura dintre ce citești
și ce urmează.

Rezultatul, măsurat pe înălțimea paginilor la 1440px:

| | înainte | după | |
|---|---|---|---|
| pornire | 8813px | 7599px | −14% |
| o afecțiune | 1907px | 1623px | −15% |
| programare | 2158px | 1855px | −14% |
| tarife | 2102px | 1790px | −15% |

Pe telefon scăderea e de 3–5%: acolo spațiul era deja aproape de minimul din
`clamp`, iar înălțimea o dă textul, nu ritmul.

### Nu mai există stiluri scrise în JSX

Cele 16 `style={{ marginTop: '18px' }}` din componente au dispărut. Jumătate
erau redundante, CSS-ul lor exista deja, iar restul au devenit clase pe
scară (`.mt-6`, `.mt-7`, `.mt-block`) sau reguli reale (`.aside-card p`,
`.aside-card .btn + .btn`, `.fact--plain`).

## Forma · de ce nu e rigid

Colțuri rotunjite peste tot, borduri aproape nicăieri:

| Token | Valoare | Unde |
|---|---|---|
| `--r-xs` | 4px | focus, detalii |
| `--r-sm` | 7px | inputuri |
| `--r-md` | 10px | carduri mici, rânduri de listă |
| `--r-lg` | 14px | carduri de conținut, imagini |
| `--r-xl` | 20px | formular, hartă |
| `--r-2xl` | 28px | slab-urile mari |
| `--r-pill` | 999px | butoane, nav, pastile |

Scara e **jumătate** din cea inițială (8 / 14 / 20 / 28 / 40 / 56). Colțurile
mari erau semnătura designului, dar la 56px o bandă întreagă începe să arate a
card de aplicație, nu a pagină.

Două lucruri au rămas neatinse, pentru că nu sunt colțuri rotunjite, sunt
**forme**: `--r-pill` (jumătate din 999px tot pastilă dă) și cele
treisprezece `border-radius:50%`, adică cercul din deschidere, inelul din
jurul lui, punctele de pe hartă, butoanele rotunde și marca. Înjumătățite, un
punct de 9px ar deveni un pătrat cu colțurile teșite.

Cinci mecanisme:

1. **Slab-uri plutitoare**: secțiunile întunecate nu sunt benzi pe toată
   lățimea, sunt blocuri retrase de la marginile ecranului (`--slab-inset`) cu
   colțuri rotunjite. Nu mai citești dreptunghiuri.
2. **Umbre în loc de borduri**: `--sh-xs…lg` plus `--hair` (o umbră `inset` de
   1px, nu un `border`, ca să nu adune 1px în layout).
3. **Forme, nu cadre**: hero-ul e un cerc, portretul o arcadă, imaginea de
   recuperare are colțurile inegale pe diagonală.
4. **Grile aliniate.** Cifrele, cardurile și pașii au avut un timp offset
   propriu, ca ochiul să citească un val, nu un tabel. Costul era mai mare
   decât câștigul: patru cifre decalate nu se mai puteau compara, iar la opt
   carduri cu texte de lungimi diferite ieșeau opt margini de jos diferite.
   Acum pornesc de pe aceeași linie și ajung la aceeași înălțime pe rând, cu
   linkul din josul fiecăruia aliniat cu al vecinilor. Ritmul îl dă intrarea în
   cadru, decalată în timp, nu în spațiu.
5. **Obiecte 3D pe granițele dintre secțiuni**: mai jos.

## Obiectele 3D · sistemul

Kitul e format din **șase implanturi și fixatoare din titan mat**: placă
anatomică de radius, șurub cortical, placă în T, trei șuruburi, broșă Kirschner
inelată, placă cu șurub montat. Fiecare are exact un detaliu anodizat albastru.
Nu sunt forme abstracte: sunt obiecte reale din lumea clinicii.

### Poziționarea · patru reguli, toate în CSS

Prima versiune avea treisprezece obiecte împrăștiate cu valori negative
(`right:-6%`): ieșeau din ecran și unele ajungeau peste text. Arătau aruncate,
pentru că erau aruncate. Regulile acum:

1. **Nu pot ieși din ecran.** Poziția orizontală e
   `left: min(var(--x), calc(100% - var(--w) - var(--o-edge)))`. Dacă procentul
   ar împinge obiectul afară, se oprește la marginea de siguranță. Verificat la
   390, 768, 1024, 1280, 1440 și 1920 px.
2. **Nu pot acoperi text.** Decorul e pe `z-index` 1 (`rise`) sau 0 (`tuck`); tot
   conținutul e pe 2. Invariantul: **orice text nou trebuie pus într-un `.wrap`.**
3. **Fiecare obiect stă pe o graniță dintre două secțiuni cu conținut**, o
   singură dată pe pagină. Granița dintre antet și primul text nu se folosește:
   acolo sunt 144px de gol, iar obiectul îl umple exact, deci se citește ca o
   pată singură, nu ca un obiect pe o muchie. Paginile interioare cu o singură
   secțiune folosesc muchia de jos, unde footer-ul acoperă obiectul (`tuck`).
4. **Trei dimensiuni**, nu douăsprezece valori arbitrare.

Ca să muți un obiect ai nevoie de o variabilă și două atribute:
`<Decor name="deco-4" variant="proc" dir="rise" depth="near" />`.

### Adâncimea · z-index, dimensiune, opacitate

| | ce face | z-index |
|---|---|---|
| `decor--rise` | iese în **sus** din secțiunea lui, peste cea de dinainte | 1 |
| `decor--tuck` | coboară și **intră sub** secțiunea următoare | 0 |

`tuck` funcționează din ordinea de pictare: elementul e mai sus în DOM decât
secțiunea care urmează, iar pe `z-index:0` fundalul opac al acelei secțiuni îl
taie. Rezultatul e ocluzie reală, nu o umbră care mimează adâncime.

| strat | opacitate | dimensiune | umbră |
|---|---|---|---|
| `d-near` | 1 | `--o-lg` (~186px) | puternică |
| `d-mid` | .86 | `--o-md` (~144px) | medie |
| `d-far` | .58 | `--o-sm` (~108px) | slabă + `blur(.7px)` |

Blurul de 0,7px pe stratul îndepărtat e ce transformă „mic" în „departe".
Pe telefon rămân trei obiecte; restul doar aglomerau.

### Coerența · măsurată, nu presupusă

„Arată ca o familie" e o impresie până o măsori, iar exact aici a greșit prima
versiune a kitului (sticlă albastră + tor cromat + cristal cu dispersie curcubeu).

```bash
node tools/coerenta-assets.js       # măsoară și dă verdict (cod 1 dacă nu trece)
node tools/normalizeaza-assets.js   # aduce setul la mediana lui, apoi re-testezi
```

Testul citește pixelii opaci din fiecare `deco-*.png` și compară luminanța,
contrastul intern, saturația medie și p95, procentul de pixeli calzi, nuanța
mediană și mărimea obiectului în cadru.

Kitul livrat: luminanță **0%** variație, saturație medie **9%**, p95 **17%**,
nuanță mediană **207 ±3**, mărime în cadru **0%**, zero pixeli calzi (*set
omogen*. Kitul respins picase trei praguri, cu pixeli foarte saturați între 0% și
82,9% în același set.

Ce se repară cum, din trei greșeli proprii:

- **mărimea** se repară în asset, nu cu o excepție în CSS.
- **accentul colorat nu se gradează după media saturației.** Media e dominată de
  corpul aproape neutru al obiectului, deci multiplicatorul umflă vârful colorat:
  un accent a urcat de la p95 0,44 la 0,72, exact invers decât voiam. Se ține
  **p95** și se taie **doar excesul**.
- **ordinea filtrelor contează.** `brightness` se aplică înaintea lui `saturate`,
  iar luminarea unui gri albăstrui îi crește saturația măsurată; de aceea
  normalizatorul face două treceri.

## Animații

Toate CSS + IntersectionObserver, zero librării. Trăiesc în `components/Chrome.jsx`
și se **reaplică la fiecare schimbare de rută**, `[data-reveal]` pornește de la
`opacity:0`, deci fără reaplicare o pagină deschisă prin navigare client ar rămâne
goală.

### Intrarea în cadru · un mecanism, trei variante

| variantă | ce face | unde |
|---|---|---|
| `data-reveal` | urcă 22px și apare | text, blocuri, formulare |
| `data-reveal="lead"` | 30px și mai lent (1s) | titlul și fraza care deschid o secțiune |
| `data-reveal="card"` | 26px plus `scale(.97)` | carduri, cifre, pași |
| `data-reveal="media"` | doar opacitate, 1,1s | imaginile mari |

Cardurile se apropie, nu doar urcă: diferența de scară e sub trei procente și nu
se citește ca efect, se citește ca greutate. Imaginile nu se mută deloc; mutate,
ar sări față de cadrul care le ține, iar cadrul e deja în mișcare.

Curba e `cubic-bezier(.22,1,.36,1)`: pornește repede, iar ultima treime se stinge
lung, ceea ce face mișcarea să pară că se **așază**, nu că se oprește.

Se animează numai `opacity` și `transform`, singurele două proprietăți pe care
browserul le poate anima fără să recalculeze layout la fiecare cadru, iar aici
intră uneori zece elemente odată.

### Decalajul nu se scrie în pagină

Un `data-delay` fix pe fiecare card e greșit în ambele sensuri: dacă intră toate
odată, ultimul îl are pe al șaptelea chiar dacă e primul pe ecran; dacă intră
singur, după derulare lentă, așteaptă degeaba o jumătate de secundă.

Observatorul numără câte elemente au intrat în **aceeași observație** și le
decalează în ordinea din document, câte 70ms, plafonat la 350ms, altfel al
optulea card ar aștepta după primele șapte și n-ar mai părea o intrare, ci o
coadă. Un element care intră singur pornește imediat.

Au rămas scrise de mână **patru** întârzieri, toate în deschiderea paginii de
pornire, unde ordinea titlu → subtitlu → text → butoane → adnotări e o compoziție,
nu o listă. Restul de 18 au fost scoase.

Măsurat pe cardurile de recuperare, la intrarea în cadru: 120ms: încă în
repaus; 300ms: opacități 0,17 / 0 / 0,09, adică decalajul e vizibil; 600ms:
0,91 / 0,84 / 0,90, cu deplasarea scăzută de la 26px la 2px; 1300ms: așezate.

Verificat pe 18 rute × 2 lățimi: **480 de elemente, niciunul rămas invizibil**.
Cu `prefers-reduced-motion`, toate cele 61 de elemente ale paginii de pornire
apar direct, fără deplasare.

- `[data-reveal]`: apariția la intrarea în viewport
- parallax pe scroll pentru fiecare obiect 3D, cu factor propriu (`data-float`);
  factorii sunt mici (0,09–0,16) tocmai ca obiectul să rămână pe granița lui
- plutire lentă (`bob`): scrisă pe proprietatea `translate`, ca să nu intre în
  conflict cu `transform`-ul folosit de parallax
- nav care se micșorează, se ascunde la scroll în jos, bară de progres
- accordion pe `<details>` nativ, un singur item deschis

Scoase deliberat, ca efecte care cer atenție fără să dea informație: split-ul pe
cuvinte al titlului, contoarele animate, butoanele magnetice, banda derulantă,
indicatorul „scroll" și badge-ul rotativ.

`prefers-reduced-motion: reduce` dezactivează tot.

## Pentru utilizator

- **bară de acțiune pe mobil**: „Sună" + „Programare", apare după prima derulare;
  sub 640px butonul de programare din bara de sus trece în meniu, altfel nu ar
  încăpea lângă burger
- **formular** cu etichete permanente, validare cu mesaje în română lângă câmpul
  greșit (`novalidate` + JS)
- skip link, focus vizibil, `aria-expanded` pe burger, `role="status"` pe
  confirmare, `scroll-padding-top` ca ancorele să nu intre sub nav
- meniul mobil se închide la Escape, la clic în afară și la schimbarea rutei

## Clipping orizontal

`body` are `overflow-x:clip`. Fără el, orice element care iese lateral lărgește
layout viewport-ul, iar nav-ul `position:fixed` se raportează la el, devine mai
lat decât ecranul pe mobil. `clip` nu creează scroll container, deci sticky-ul
rămâne funcțional și nu taie elementele `position:fixed`.

## Formularul

Trimite `POST /api/contact.php` (JSON). Endpointul rulează pe Hostico, unde există
PHP; pe GitHub Pages intră în modul demo, controlat din `NEXT_PUBLIC_FORM_MODE`.
Straturile de securitate și motivul fiecăruia sunt în
[DEPLOY.md, secțiunea 3](DEPLOY.md#3-securitatea-formularului).

Fiind bilingv, endpointul face trei lucruri în plus:

- **erorile vin ca `code`, nu ca text gata tradus** (`rate_limited`,
  `phone_invalid`…), iar clientul le traduce din `lib/ui.js`. Altfel un
  vizitator care citește engleza ar primi eroarea în română, iar traducerea ar
  trebui ținută în două locuri;
- **tipul de programare e acceptat în ambele limbi și normalizat în română**,
  pentru că emailul îl citește personalul clinicii, care vrea mereu aceleași
  patru etichete;
- **subiectul primește prefixul `[EN]`** și corpul o linie `Limba:`, deci
  personalul știe în ce limbă să sune fără să deschidă mesajul.

## Ce trebuie înlocuit înainte de lansare

Tot ce e marcat `(placeholder)` în `lib/site.js`:

- `Dr. Radu Mihăilescu`: numele real și credențialele lui;
- `+40 700 000 000`, `contact@institutulmainii.ro`, `Str. Exemplu nr. 12`,
  `CUI 00000000`;
- cifrele afișate public (18 ani / 4.800 / 98% / 24 h): statisticile medicale
  publicate trebuie să fie reale și verificabile, altfel se scoate secțiunea;
- tarifele din `app/tarife/page.jsx`;
- paginile legale: sunt schelet corect, dar trebuie verificate de un jurist
  înainte de publicare;
- harta: `prompt-9` e o machetă decorativă; în producție se poate înlocui cu un
  `<iframe>` Google Maps stilizat pe aceeași paletă, `.map__pin` rămâne peste.

**Imaginile sunt generate AI**, inclusiv portretul: e o machetă, nu o persoană
reală. Pentru un site medical publicat e nevoie de fotograf. Prompturile și
capcanele întâlnite sunt în [PROMPTS.md](PROMPTS.md).

## Verificat

Toate cele 28 de pagini (14 × două limbi), în browser real, la 390 / 768 / 1440 px,
pe **ambele build-uri**: producție și cel cu prefix de cale pentru GitHub Pages,
unde defectele de adresare ar apărea altfel abia după livrare:

- zero erori de consolă, zero cereri eșuate, zero imagini rupte după derulare;
- fără overflow orizontal, un singur font;
- `<html lang>` corect pe fiecare pagină;
- comutatorul de limbă: 30 de treceri, fiecare ajunge pe perechea corectă;
- hreflang reciproc pe toate cele 15 perechi;
- niciun cuvânt românesc rămas în paginile engleze: căutare pe cuvinte care
  există numai în română, cu numele clinicii și datele de contact exceptate;
- formularul, în ambele limbi: erorile de câmp și confirmarea apar în limba
  paginii, iar lista de tipuri de programare e cea tradusă.

Ce **nu** e verificat local: `server/api/contact.php`. Nu există PHP pe mașina de
lucru, deci modificările lui se confirmă abia pe Hostico, pasul 2.8 din
[DEPLOY.md](DEPLOY.md) are secvența exactă, pentru ambele limbi.
