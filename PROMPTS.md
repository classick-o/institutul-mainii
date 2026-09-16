# Institutul Mâinii · prompturile pentru asset-uri

Site-ul e construit pe **un singur limbaj vizual: 3D**. Singura fotografie din tot
template-ul este portretul medicului.

Sunt două materiale, unul pentru fiecare rol, și fiecare e blocat printr-un paragraf
identic în toate prompturile din familia lui:

- **conținut**: sticlă translucidă mată cu filamente albastre, în cadre, cu fundal;
- **decor**: titan mat, gri neutru rece, cu un singur detaliu anodizat albastru,
  decupat pe transparent.

Asset-urile sunt de două feluri:

| Tip | Fișiere | Rol |
|---|---|---|
| **Conținut** | `prompt-1.jpg` … `prompt-9.jpg` | stau în cadre, cu fundal |
| **Decor** | `deco-1.png` … `deco-6.png` | plutesc pe granițele dintre secțiuni, fundal transparent |

Fișierele stau în `assets/img/`, iar `lib/images.js` le importă ca module: o imagine
regenerată se înlocuiește pe disc, cu același nume, și nu se atinge niciun cod. Numele
contează, dacă lipsește un fișier din listă, build-ul se oprește cu eroare, în loc să
livreze o pagină cu imagini rupte.

Generat cu **Nano Banana 2 Lite** (conectorul 3D AI Studio).

---

---

## Fundalul deschiderii · `hero-bg.jpg`

Deschiderea e o **fotografie documentară** pe tot ecranul: chirurgul la
microscopul operator, văzut din spate și din lateral, în penumbră. Registrul e
reportaj, nu materialitate: restul paginii ține imaginile în cadre, asta e
scena pe care stă textul.

> A cinematic documentary photograph taken from behind and to the side of a
> surgeon seated at an operating microscope in a darkened theatre: the shoulders
> and gowned back are a soft silhouette on the right, leaning into the
> eyepieces, while the microscope's cool light spills forward and outlines the
> shape. Everything is heavily underexposed; the left half of the frame is
> near-black and empty. Graded in muted, desaturated deep blue, dark indigo,
> steel blue, sparse pale cyan highlights. Absolutely no warm tones, no amber,
> no vivid electric blue. Shot on a 50mm lens at f/1.8, natural film grain. No
> faces, no visible features, no readable text, no letters, no logos, no blood,
> no exposed tissue. Concentrated, still, expensive.

**Jumătatea din stânga trebuie să fie goală și întunecată.** Nu e o preferință:
acolo stau titlul, lead-ul și cifrele, albe. Un cadru care are subiectul în
stânga cere o perdea atât de groasă încât nu mai rămâne nimic din el, iar un cadru
care cere asta e un cadru greșit, nu o perdea greșită.

**„Muted, desaturated" nu e de ornament.** Paleta site-ului a fost mătuită
(saturație ×0,66), iar rama din jurul fotografiei (fundalul secțiunii,
perdelele, vigneta) e în familia aceea. O fotografie cu albastru electric într-o
ramă mată se vede ca două materiale lipite.

**Cere explicit „no faces, no visible features".** Chirurgul e văzut din spate:
fără asta, modelul pune un chip inventat pe o pagină care vorbește despre un
medic real.

**Imaginea brută nu ajunge pe ecran așa cum vine.** În `.hero__bg` trec peste ea
patru straturi, în ordinea unui laborator foto: negrul ridicat, perdelele,
vigneta descentrată, granulația. De ce fiecare, scrie în `styles/style.css`, la
blocul HERO.

> ⚠️ Un prompt care descria măsurarea amplitudinii unei articulații cu un
> goniometru a fost respins de filtrul de siguranță al modelului, ca fals
> pozitiv. Dacă se întâmplă, creditele se întorc singure; reformulează sau alege
> alt subiect, nu insista pe aceeași frazare.

## Cele patru capcane, din experiență directă

1. **Rezoluția maximă acceptată e `1K`.** Cererile `2K`/`4K` se întorc cu
   `400 INVALID_ARGUMENT` (creditele se refundează automat). Ieșirea reală:
   1024×1024 la 1:1, 1200×896 la 4:3, 928×1152 la 4:5.
2. **Transparența nu se cere din prompt.** Obiectele decorative se generează pe fundal
   alb plat, apoi trec prin *remove background* (birefnet, 1 credit). Cerută direct în
   prompt, alfa iese murdară pe sticlă.
3. **Materialul trebuie blocat, altfel obiectele nu par o familie.** Prima versiune a
   kitului avea un orb de sticlă albastru intens, un tor **cromat** și un cristal cu
   **dispersie curcubeu**: trei materiale diferite, trei surse de lumină diferite. Pe
   pagină arătau ca trei seturi amestecate. Soluția e mai jos: un singur paragraf de
   material, identic în toate șase prompturile, iar diferența doar în formă.
4. **„Isolated on white" nu e suficient.** Într-un cadru a intrat un softbox negru din
   studioul virtual, care ar fi supraviețuit decupajului. Cere explicit *„nothing else is
   visible in the frame, no lights, no softboxes, no reflectors, no props"*.

---

# A. Asset-uri de conținut

Lipește la finalul fiecărui prompt de conținut:

> **Style:** premium 3D product render, Octane / Redshift quality, studio HDRI lighting,
> soft shadows, subtle depth of field. **Palette locked:** pure white #FFFFFF, off-white
> #F5F8FD, pale blue #C1D5FF, electric blue #2840E7, deep navy #0A1020. Absolutely no
> warm tones, no gold, no green, no teal, no purple. Clean, clinical, expensive.
> Sharp focus, high detail.

**Negative prompt universal:**

> text, watermark, logo, signature, deformed hands, extra fingers, missing fingers,
> fused fingers, six fingers, gore, blood, open wounds, surgical incisions, medical
> horror, warm color cast, orange, yellow, green, purple, cluttered background,
> harsh contrast, fisheye, low resolution, jpeg artifacts, plastic toy look, cartoon

> ⚠️ `deformed hands / extra fingers / six fingers` e obligatoriu, tot site-ul e despre
> mâini, iar exact asta greșesc modelele generative. Generează minimum 4 variante și
> verifică-le la rezoluție plină înainte să alegi.

**Consistență:** generează întâi `prompt-1`. Odată ce ai o mână de sticlă care îți place,
folosește-o ca **referință de stil** pentru `prompt-4`, `prompt-7` și `prompt-8`.

## prompt-1 · Hero: mâna anatomică din sticlă
`prompt-1.jpg` · **1:1** · în pagină e mascată în cerc, deci lasă marginile libere

> A hyper-detailed 3D render of a human right hand made of translucent frosted glass,
> floating in mid-air, fingers relaxed and slightly spread, palm angled three-quarters
> toward the camera. Inside the glass the skeletal structure and flexor tendons glow
> faintly as delicate luminous filaments in electric blue #2840E7, like illuminated fiber
> optics. Iridescent refraction along the glass edges, pale blue caustics pooling beneath.
> Background: seamless gradient from pure white to very pale blue with a soft radial glow
> behind the hand. A few tiny glass particles drift around it. Anatomically perfect:
> exactly five fingers, correct proportions. Centered, with generous negative space.

## prompt-2 · Portretul medicului *(singura fotografie)*
`prompt-2.jpg` · **4:5** · în pagină e tăiat în arcadă (semicerc sus)

> Editorial medical portrait photograph of a confident male surgeon in his late 40s,
> short dark hair, crisp white lab coat over a light blue shirt, hands visible and
> loosely clasped in front. Calm, competent expression, slight closed-mouth smile,
> direct eye contact. 85mm lens, f/2.0, shallow depth of field. Background:
> out-of-focus modern clinic wall in white and pale blue with a soft vertical light
> gradient. Natural window light from the left, soft fill right, no harsh shadows.
> Muted desaturated grade with a cool cast. The aesthetic of a Monocle magazine profile,
> not a stock photo. Subject slightly left of center.

> **Dacă ai poza reală a medicului**, folosește-o pe aceea. Trimite-o prin acest prompt
> ca *image-to-image* la strength 0.2–0.3, doar ca să aliniezi lumina și gradingul. Nu-i
> schimba trăsăturile. **Verifică genul:** numele afișat pe pagină e masculin, deci
> portretul trebuie să fie masculin, prima generare a ieșit feminină și a trebuit
> refăcută.

## prompt-3 · Implanturi de titan
`prompt-3.jpg` · **4:3** · stă în secțiunea albastru închis

> A cinematic macro photograph of low-profile anatomical titanium bone plates and
> tiny cortical screws, laid out in precise order on a dark matte surface, lit by
> cool blue directional light from the right. The polished titanium catches thin
> cyan-white highlights along its edges; the plate contours and screw holes are
> crisply in focus in the centre, the rest falling into shallow blur. The
> background is deep navy, almost black in the corners. Cool desaturated palette
>, deep navy #0E1A5C, steel blue, cold chrome highlights, absolutely no warm
> tones, no gold, no amber. Shot on a 100mm macro lens at f/4, natural film
> grain. No hands, no faces, no readable text, no letters, no numbers, no logos.
> Precise, tactile, expensive.

**Locul ăsta a fost pe rând o hologramă wireframe, o planșă tehnică și o
radiografie cu plan suprapus, toate respinse.** Registrul cerut e fotografic,
ca deschiderea: secțiunea are deja grila proprie și fundalul tehnic, iar o
planșă pusă peste ele adaugă o a doua strată de „tehnic" în același loc.

**Subtitlurile de sub imagine se schimbă odată cu ea.** Erau `MÂNA DREAPTĂ ·
INCIDENȚĂ PA · SCARA 1:1`, scrise pentru o planșă radiografică. „Incidență PA"
e un termen de radiologie, iar sub o fotografie de implanturi ar fi o etichetă
falsă. Acum sunt cele trei lucruri care REZULTĂ din planificare, luate din fraza
de deasupra: abordul, dimensiunea implantului, structurile de evitat. Dacă se
schimbă iar imaginea, se verifică și ele.

## prompt-4 · Pasul 01: Consultația
`prompt-4.jpg` · **4:3**

> 3D render: a translucent frosted-glass hand resting palm-up, with a large circular
> lens of clear glass hovering above the wrist, magnifying the luminous blue nerve
> pathways beneath. Thin blue scan-lines sweep across the magnified area. White seamless
> studio background with a soft gradient, gentle contact shadow. Calm and precise.

## prompt-5 · Pasul 02: Planul de tratament
`prompt-5.jpg` · **4:3**

> 3D render: three thin floating panels of frosted glass arranged in staggered depth,
> each displaying a minimal schematic of a hand in glowing blue line-art, one overview,
> one detail of the wrist, one timeline of small dots and bars. A slim electric blue
> marker floats beside them. Pure white background, soft studio light, long gentle
> shadows. Apple-keynote cleanliness, generous spacing.

## prompt-6 · Pasul 03: Intervenția
`prompt-6.jpg` · **4:3**

> 3D render of an abstract microsurgical instrument: a slender polished chrome shaft with
> a fine tapered tip and a matte white ergonomic grip, floating diagonally. Beside it, a
> tiny suture thread curves through the air as a glowing blue filament, impossibly thin.
> Extreme precision implied by scale. Pure white seamless background, sharp specular
> highlights on the chrome, soft shadow. No hands, no patient, no tissue, no blood.

## prompt-7 · Pasul 04: Recuperarea
`prompt-7.jpg` · **4:3**

> 3D render: a translucent frosted-glass hand gently squeezing a soft matte sphere in
> pale blue #C1D5FF, the sphere deforming slightly under the fingers. Concentric thin
> blue rings radiate outward from the grip point like a ripple, indicating force and
> progress. Anatomically perfect five fingers. White seamless background, soft top light,
> gentle contact shadow. Encouraging, quiet, tactile.

## etapa-1 … etapa-4 · Cele patru etape *(înlocuiesc prompt-4 … prompt-7 pe site)*
`etapa-N.jpg` · **4:5 vertical** · Nano Banana 2 Lite, 1K

Registru fotografic, nu 3D: aceeași lumină rece și întunecată ca fundalul din
deschidere, ca să se lege de el și de portretul medicului. Setul se ține unitar
din aceeași formulă de lumină în toate patru; `prompt-4` … `prompt-7` rămân pe
disc, dar nu mai sunt importate.

Formula comună: *Editorial documentary photograph, vertical 4:5, low-key cinematic
lighting … shallow depth of field, desaturated cool blue colour grade … no faces,
no text, no logos.*

- **etapa-1 · Consultația:** a hand surgeon's two hands gently examining a patient's
  single open right hand resting palm-up on a clinic examination table; single soft
  cool white light from above-left, dark blurred clinic in deep navy shadows.
- **etapa-2 · Planul:** a hand X-ray film clipped on a softly glowing lightbox in a dim
  clinic office; a gloved index finger points at the wrist bones; room in deep navy shadows.
- **etapa-3 · Intervenția:** a microsurgeon's hands in pale blue gloves holding fine
  forceps and a micro needle holder above a sterile blue drape, lit by a single pool of
  light from an unbranded white operating microscope. Fără mărci pe echipament.
- **etapa-4 · Recuperarea:** one single right hand wearing a matte white custom wrist
  orthosis, squeezing a pale blue therapy ball, forearm on a dark grey table; cool
  window light from the right. „One single hand" e necesar: fără el apar mâini în plus.

## prompt-8 · Recuperare, imagine mare
`prompt-8.jpg` · **4:5 vertical** · cadru cu colțuri asimetrice în pagină

> Vertical 3D render: a translucent frosted-glass forearm and hand resting at rest angle,
> wearing a sleek custom orthosis in matte white with soft pale blue #C1D5FF straps. The
> orthosis is smooth, minimal, medical-product design, think Braun or Teenage
> Engineering, not a hospital brace. Fingers free and anatomically perfect. Soft
> directional light from the upper right, long gentle shadow across an off-white #F5F8FD
> surface. Negative space in the upper third of the frame. Calm, hopeful, premium.

## prompt-9 · Macheta locației
`prompt-9.jpg` · **4:3**

> Isometric 3D render of a small stylized city district as a clean architectural model:
> matte white building volumes of varying heights, streets as smooth off-white #F5F8FD
> channels, parks as flat pale blue-grey pads, a boulevard curving through as a soft
> #C1D5FF band. One building in the upper-left third is electric blue #2840E7 and slightly
> taller, marking the clinic. No text, no street names, no labels, no cars, no people.
> Soft studio light from above, gentle ambient occlusion in the street canyons.

---

# B. Kitul de obiecte decorative

Șase **implanturi și fixatoare din titan mat**, fiecare cu un singur detaliu anodizat
albastru. Nu forme abstracte: obiecte reale din lumea clinicii, iar materialul leagă
decorul de linia „implanturi anatomice titan, profil redus" din secțiunea de precizie.

**Aici stă diferența între „set" și „adunătură":** materialul, lumina și cadrajul sunt
identice la toate șase. Se schimbă doar piesa.

### Paragraful de material · identic, copiat în toate șase prompturile

> A single surgical implant, floating in the centre of an otherwise completely empty
> frame: **‹forma›**. Made of surgical-grade titanium with a matte brushed finish, cool
> neutral grey with a faint blue-grey cast, very low specularity. Exactly one anodised
> electric blue #2840E7 detail: a ring or band, medium intensity, matte not glossy,
> covering about 3% of the object's visible surface, nothing else is coloured. No chrome,
> no mirror finish, no environment reflections, no gold, no warm tones, no rust, no blood,
> no tissue. Soft large-source studio light from the upper left, faint self-shadow on the
> lower right, no cast shadow, no ground plane, nothing else visible in the frame. The
> object occupies about 60% of the frame, centred, with even empty margin on all sides.
> Isolated on a completely plain flat pure white background. Premium product render,
> Octane quality, 85mm lens, sharp focus. No text, no watermark, no logos, no labels,
> no numbers.

> „No chrome, no mirror finish, no environment reflections" nu e opțional: fără ele,
> titanul iese oglindă și obiectul devine exact outlierul pe care l-a respins prima
> versiune a kitului.

### Formele · singurul lucru care diferă

| | Obiect | Fraza de formă |
|---|---|---|
| **deco-1** | Placă de radius | *an anatomical bone plate for a distal radius, a slim curved plate with several round screw holes, seen at a three-quarter angle* |
| **deco-2** | Șurub cortical | *one cortical bone screw with a fine thread and a hexagonal drive socket in its head, lying at a slight diagonal* |
| **deco-3** | Placă în T | *a small T-shaped bone plate with round screw holes, seen at a three-quarter angle* |
| **deco-4** | Trei șuruburi | *three bone screws of different lengths, lying side by side in a loose fan* |
| **deco-5** | Broșă inelată | *a Kirschner wire coiled into two neat loops, a thick smooth wire forming a compact ring shape* |
| **deco-6** | Placă cu șurub | *a short straight bone plate with one screw already seated in it and standing proud, seen at a three-quarter angle* |

Toate: **1:1**, apoi *remove background* → `.png` cu alfa, cu
`operating_resolution: 2048x2048`, marginile metalice ies mai curate.

**Unde apar**, fiecare obiect o singură dată, pe o graniță de secțiune, cu stratul de
adâncime din README:

```
deco-1  hero → cifre            near, iese în sus
deco-2  cifre → medic           mid,  iese în sus
deco-3  afecțiuni → precizie    far,  intră SUB slab
deco-4  precizie → parcurs      near, iese în sus
deco-5  parcurs → recuperare    mid,  iese în sus
deco-6  programare → footer     mid,  intră SUB footer
```

Poziția nu se scrie în HTML. Fiecare obiect are în CSS o variabilă (`--x`, ancora
orizontală) și două clase (direcția + stratul), iar sistemul garantează că nu iese din
ecran și nu ajunge peste text.

### Verifică setul, nu te uita doar la el

```
node tools/normalizeaza-assets.js   # aduce setul la mediana lui
node tools/coerenta-assets.js       # dă verdictul
```

Praguri: luminanță ≤2% variație, contrast intern ≤25%, saturație medie ≤15%, saturație
p95 ≤20%, nuanță mediană ≤2%, mărime în cadru ≤15%, pixeli calzi ~0%.

Setul actual: luminanță 0%, saturație medie 9%, saturație p95 17%, nuanță 207 ±3, mărime
în cadru 0%, zero pixeli calzi → *set omogen*. Setul respins anterior picase trei praguri,
cu pixeli foarte saturați între 0% și 82,9% în același kit.

Trei lucruri învățate din rulările astea, toate din greșeli proprii:

- **mărimea** se repară în asset, nu cu o excepție în CSS. Normalizatorul rescalează
  fiecare PNG în același cadru până la diagonala mediană a setului.
- **proporția accentului colorat nu se poate ținti din prompt.** Am cerut explicit „about
  3% of the visible surface" și, după trei runde, obiectele au ieșit între −43% și +46%
  față de mediană. Ce funcționează: generezi, apoi tai excesul cu `saturate()`, dar
  ținând **p95** (vârful), nu media. Media e dominată de corpul aproape neutru al
  obiectului, iar un multiplicator calculat pe ea umflă accentul (l-am dus de la p95 0,44
  la 0,72, exact invers). Un accent prea *palid* nu se repară din filtru, acela se
  regenerează.
- **ordinea filtrelor contează.** `brightness` se aplică înaintea lui `saturate`, iar
  luminarea unui gri albăstrui îi crește saturația măsurată; factorul calculat pe imaginea
  negradată nu mai e valid după gradare. De aceea normalizatorul face două treceri.

---

# C. Extensii opționale

**prompt-10, Open Graph / social share** (1200×630)
> Wide banner: the translucent glass hand from prompt-1 on the right third, against a
> white-to-pale-blue gradient, with clean empty space on the left two thirds for
> typography. Soft blue glow, floating glass particles. Cinematic, premium, minimal.

**prompt-11, Favicon / marcă** (1:1, transparent)
> A minimal geometric icon of a stylized open hand built from five rounded-rectangle
> strokes of uniform weight, electric blue #2840E7 on transparent background. Sharp
> corners, 2px radius, no gradients. Grid-aligned, symmetrical, legible at 32×32.

---

## Ordinea de generat

| Prioritate | Ce | De ce |
|---|---|---|
| 1 | `prompt-1`, `prompt-2` | hero-ul și medicul, 80% din prima impresie |
| 2 | tot kitul `deco-1` … `deco-6`, într-o singură rundă | dacă le generezi la momente diferite, materialul derivează și nu mai par o familie |
| 3 | `prompt-3` | secțiunea albastră e semnătura vizuală a site-ului |
| 4 | `prompt-8`, `prompt-9` | blocuri mari, foarte vizibile |
| 5 | `etapa-1` … `etapa-4` | cardurile de proces, mai mici |

> Patru registre alternative sunt parcate în afara proiectului, dacă vrei să compari:
> `D:\tmp\institutul-mainii-gips-assets` (modele anatomice din gips, cu axă de planificare),
> `D:\tmp\institutul-mainii-sticla-assets` (kit decorativ din sticlă mată unificată),
> `D:\tmp\institutul-mainii-3d-assets` (kitul respins: sticlă + crom + cristal) și
> `D:\tmp\institutul-mainii-foto-assets` (registru complet fotografic-documentar:
> microscop, ecograf, orteze, radiografie, planșă anatomică, interior de clinică).
