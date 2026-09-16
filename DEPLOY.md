# Livrare

Site static generat cu Next.js (`output: 'export'`). Aceeași ieșire merge în
ambele locuri, cu o singură diferență de configurare.

## De ce static și nu Next cu server

| | GitHub Pages | Hostico Start (~1,99 €/lună) |
|---|---|---|
| Fișiere statice | da | da |
| Node.js | nu | **nu**, Hostico dă acces la Node doar pe Business și Reseller |
| PHP | nu | da, prin MultiPHP |

Nu există server Node în niciunul dintre scenarii, deci `next start` și rutele
API din Next sunt excluse din start. Formularul, care are nevoie de execuție pe
server, merge separat, printr-un script PHP, disponibil pe Hostico, indisponibil
pe Pages (unde formularul rulează în modul demo).

---

## 1. Previzualizare pe GitHub Pages (validarea designului)

Se face singură din GitHub Actions: `.github/workflows/deploy-pages.yml`.

1. Urcă proiectul într-un repo GitHub.
2. **Settings → Pages → Source: GitHub Actions.**
3. La fiecare push pe `main`, workflow-ul face build și publică.

Adresa rezultată: `https://<utilizator>.github.io/<nume-repo>/`

Ce face workflow-ul diferit:

- `GITHUB_PAGES=1` și `PAGES_BASE_PATH=/<nume-repo>`, pe Pages site-ul stă
  într-un subdirector, deci toate căile primesc prefix. Numele se ia automat din
  repo, nu e scris de mână.
- `NEXT_PUBLIC_FORM_MODE=demo`, PHP nu rulează pe Pages, deci formularul
  validează și confirmă local, cu o notă vizibilă. E preferabil unui buton care
  pare că trimite și nu trimite.
- `robots.txt` devine `Disallow: /`, previzualizarea nu trebuie să ajungă în
  Google și să concureze cu domeniul real.

Build local identic cu cel de pe Pages (PowerShell):

```powershell
$env:GITHUB_PAGES='1'; $env:PAGES_BASE_PATH='/institutul-mainii'; $env:NEXT_PUBLIC_FORM_MODE='demo'
npm run build
```

---

## 2. Producție pe Hostico (institutulmainii.ro)

### 2.1 Build

```bash
npm ci
npm run build      # rezultatul e în out/
```

Fără variabile de mediu: fără prefix de cale, formular în modul live, robots
indexabil.

### 2.2 Ce urci

Conținutul folderului `out/` merge în `public_html/`. Include deja:

```
index.html, despre/, afectiuni/, ...   paginile
_next/                                 CSS, JS, fonturi, imagini
.htaccess                              HTTPS, www→neprefixat, cache, securitate
api/contact.php                        primirea formularului
api/config.example.php                 model de configurare
robots.txt, sitemap.xml, 404.html
```

Urcarea se face prin File Manager (cPanel) sau FTP. Dacă folosești File Manager,
activează **Settings → Show Hidden Files**, altfel `.htaccess` nu se vede și nu se
copiază.

### 2.3 PHP

**cPanel → MultiPHP Manager** → alege domeniul → **PHP 8.1 sau mai nou**.
Scriptul merge și pe 7.4, dar 8.x e mai rapid și primește actualizări de
securitate.

### 2.4 Căsuțele de email

**cPanel → Email Accounts → Create**, două adrese:

- `programari@institutulmainii.ro`, aici ajung solicitările;
- `formular@institutulmainii.ro`, de aici pleacă mesajele.

Expeditorul **trebuie** să fie o adresă de pe domeniu. Dacă pui adresa
pacientului la `From`, mesajul pică la verificarea SPF și ajunge în spam;
adresa pacientului se pune la `Reply-To`, ca răspunsul să meargă la el
dintr-un clic.

### 2.5 Configurarea formularului

Pe server, în `public_html/api/`:

```bash
cp config.example.php config.php
```

Apoi editează `config.php`:

- `to`, unde ajung solicitările;
- `from` / `from_name`, adresa de pe domeniu, de la 2.4;
- `allowed_hosts`, `institutulmainii.ro` și `www.institutulmainii.ro`;
- `rate_salt`, orice șir lung și aleatoriu (cu el se hashuiesc IP-urile);
- `rate_dir`, de preferat **în afara** lui `public_html`, de exemplu
  `/home/UTILIZATOR/formular-rate`. Creează folderul și dă-i drept de scriere.

`config.php` nu se urcă în git (e în `.gitignore`) și e blocat și din `.htaccess`,
ca să nu poată fi citit din browser.

### 2.6 Livrabilitate: mail() sau SMTP

Implicit, `smtp.enabled = false` și mesajele pleacă prin funcția `mail()` a
serverului (Exim). Merge imediat, fără parole în fișiere.

Dacă mesajele ajung în spam, treci pe SMTP autentificat, varianta recomandată de
Hostico:

```php
'smtp' => [
    'enabled' => true,
    'host'    => 'mail.institutulmainii.ro',
    'port'    => 465,        // 465 cu 'ssl', 587 cu 'tls'
    'secure'  => 'ssl',
    'user'    => 'formular@institutulmainii.ro',
    'pass'    => 'parola căsuței',
],
```

Verifică și **cPanel → Email Deliverability**: SPF și DKIM trebuie să apară cu
bifă verde pentru domeniu.

### 2.7 SSL și domeniu

- **cPanel → SSL/TLS Status** → *Run AutoSSL* (Let's Encrypt, inclus).
- După ce HTTPS funcționează, poți activa HSTS: decomentează linia
  `Strict-Transport-Security` din `.htaccess`. Nu o activa înainte, dacă ceva nu
  merge pe https, browserele vor refuza să mai deschidă site-ul pe http.
- Dacă domeniul e înregistrat în altă parte, la registrar se pun nameserverele
  Hostico. Propagarea poate dura până la 24 de ore.

### 2.8 Verificare după livrare

1. `https://institutulmainii.ro` se deschide și redirectează de pe `http://` și de pe `www.`
2. O pagină interioară deschisă direct: `https://institutulmainii.ro/afectiuni/tunel-carpian/`
3. Perechea ei în engleză, tot direct:
   `https://institutulmainii.ro/en/conditions/carpal-tunnel-syndrome/`
4. Adresa fără bară la final ajunge la cea cu bară: `…/en/about` → `…/en/about/`
5. O adresă inexistentă duce la pagina 404, nu la eroarea serverului
6. **Formularul, în română:** trimite cu date reale și verifică emailul în
   `programari@`. Subiectul e `Programare: <nume> (<telefon>)`, iar corpul are
   linia `Limba: română`.
7. **Formularul, în engleză**, de pe `/en/appointment/`: subiectul trebuie să
   înceapă cu `[EN]`, corpul să spună `Limba: engleză`, iar tipul de programare
   să apară tradus în română („Consultație inițială"), nu „First consultation".
8. Tot din engleză, trimite formularul gol: mesajele de eroare trebuie să apară
   **în engleză**. Dacă apar în română, `contact.php` de pe server e versiunea
   veche, fără câmpul `code`.
9. Trimite de două ori la rând: a doua oară trebuie să funcționeze, a șasea în
   aceeași oră trebuie respinsă (limitarea pe IP)
10. `https://institutulmainii.ro/api/config.php` trebuie să dea **403**, nu conținut
11. `https://institutulmainii.ro/sitemap.xml` conține 42 de adrese, fiecare cu
    `xhtml:link` către perechea din cealaltă limbă

Pasul 7 și pasul 8 sunt singurele care nu s-au putut verifica înainte de
livrare: `contact.php` are nevoie de PHP, care nu există pe mașina de dezvoltare.

### 2.9 Indexarea celor două limbi

Nu e nevoie de nicio setare specială: fiecare pagină își declară în `<head>`
perechea din cealaltă limbă (`hreflang`), iar `sitemap.xml` repetă legăturile.
`x-default` trimite la română.

În **Google Search Console** adaugă proprietatea o singură dată, pe domeniu, și
trimite `sitemap.xml`. Cele două limbi apar ca pagini separate, ceea ce e
corect: fiecare trebuie să se claseze pe cuvintele ei.

Site-ul **nu redirectează automat după limba browserului**, deliberat. Un
vizitator care primește altă pagină decât cea pe care a dat clic nu înțelege ce
s-a întâmplat, iar crawlerele ajung să indexeze versiunea greșită. Comutatorul
din bară e vizibil la orice lățime.

---

## 3. Securitatea formularului

Fără backend propriu, un formular public devine repede releu de spam. Ce e pus:

| Strat | Unde | Ce oprește |
|---|---|---|
| Câmp-capcană ascuns | client + PHP | roboții care completează tot |
| Timp minim de completare (3s) | client + PHP | trimiterea automată instantanee |
| Validare și limite de lungime | client + PHP | date aiurea, mesaje uriașe |
| Curățare CR/LF din anteturi | PHP | **injecția de anteturi**, prin care s-ar adăuga `Bcc` și formularul ar deveni releu de spam |
| Verificare Origin/Referer | PHP | formulare copiate pe alt domeniu care trimit prin serverul tău |
| Limitare pe IP (5/oră) | PHP | inundarea căsuței |
| Filtru de linkuri în mesaj | PHP | spamul clasic cu adrese web |
| Fără stocare pe disc | PHP | datele pacientului nu rămân în fișiere pe server |
| Tip de programare din listă închisă | PHP | text arbitrar strecurat în emailul citit de personal |

Endpointul întoarce eroarea ca **cod** (`rate_limited`, `phone_invalid`…), nu ca
text: site-ul e bilingv, iar mesajul trebuie să apară în limba în care citește
vizitatorul. Traducerile stau în `lib/ui.js`, într-un singur loc.

Contorizarea pe IP păstrează doar un hash cu sare, nu adresa în clar, ca fișierele
de contorizare să nu devină o listă de IP-uri ale pacienților.

La capcană și la timpul minim, răspunsul e intenționat **„ok"**: un robot care
primește eroare încearcă altă variantă, unul care primește succes se oprește.

Dacă apare spam care trece de toate astea, pasul următor e Cloudflare Turnstile
(gratuit), se adaugă un câmp de token în formular și o verificare în PHP.

---

## 4. Actualizări ulterioare

Datele de contact stau în `lib/site.js`; textele stau în `lib/content/ro.js` și
`lib/content/en.js`, cu aceleași chei. Modifici acolo, rulezi `npm run build` și
urci din nou `out/`.

Paginile de afecțiuni se generează din aceeași listă: adaugi un obiect nou în
`conditions`, în ambele limbi, plus perechea de slug-uri în `lib/routes.js`, iar
paginile, linkurile, hreflang-ul și sitemap-ul apar automat.

Structura completă și pașii pentru o pagină nouă sunt în
[README.md](README.md#cum-adaugi-o-pagină).
