/**
 * Textele de interfață: meniu, butoane, formular, etichete de accesibilitate.
 *
 * Aici stă doar ce se repetă în mai multe pagini. Textul propriu unei pagini
 * stă în `lib/content/{ro,en}.js`, ca să nu ajungă un dicționar de o mie de
 * chei în care nu mai găsești nimic.
 */

const ro = {
  /** Etichetele din meniu, pe id-ul rutei din lib/routes.js */
  routes: {
    home: 'Acasă',
    about: 'Despre',
    conditions: 'Afecțiuni',
    procedures: 'Cum lucrăm',
    recovery: 'Recuperare',
    faq: 'Întrebări',
    booking: 'Programare',
    prices: 'Tarife',
    prep: 'Pregătire preoperatorie',
    privacy: 'Politica de confidențialitate',
    gdpr: 'Prelucrarea datelor (GDPR)',
    terms: 'Termeni și condiții',
    cookies: 'Cookies',
  },
  /** Variante mai lungi, pentru coloana „Pacienți" din subsol */
  routesLong: {
    faq: 'Întrebări frecvente',
  },

  nav: {
    aria: 'Navigare principală',
    menu: 'Meniu',
    skip: 'Sari la conținut',
    cta: 'Programare',
    langAria: 'Schimbă limba',
    langOther: 'English',
    langOtherShort: 'EN',
  },

  footer: {
    tagline:
      'Centru dedicat exclusiv chirurgiei mâinii, microchirurgiei reconstructive și recuperării funcționale.',
    clinic: 'Clinică',
    patients: 'Pacienți',
    legal: 'Legal',
  },

  actionbar: { call: 'Sună' },

  common: {
    book: 'Programează o consultație',
    seeDetails: 'Vezi detalii',
    askDoctor: 'Întreabă un medic',
    crumbsAria: 'Fir de navigare',
    address: 'Adresă',
    email: 'Email',
  },

  form: {
    name: 'Nume complet',
    namePlaceholder: 'Andrei Popescu',
    phone: 'Telefon',
    phonePlaceholder: '07xx xxx xxx',
    email: 'Email',
    emailHint: '(opțional, pentru planul scris)',
    emailPlaceholder: 'nume@exemplu.ro',
    type: 'Tip programare',
    date: 'Data preferată',
    calendar: {
      placeholder: 'Alege o zi',
      dialog: 'Alege data preferată',
      prev: 'Luna anterioară',
      next: 'Luna următoare',
      clear: 'Șterge',
      closedNote: 'Duminica suntem închiși',
    },
    message: 'Descrie pe scurt problema',
    messagePlaceholder:
      'De când ai simptomele, ce te împiedică să faci, ce investigații ai deja.',
    submit: 'Trimite solicitarea',
    sending: 'Se trimite…',
    honeypot: 'Nu completa acest câmp',
    note: 'Datele tale sunt confidențiale și nu sunt folosite în scop de marketing.',
    noteDemo: ' Pe această previzualizare formularul nu trimite emailuri.',
    okDemo: '✓ Formular validat. Pe site-ul live, solicitarea ajunge pe email.',
    okLive: '✓ Solicitare trimisă. Te sunăm în maximum 4 ore lucrătoare.',
    types: [
      'Consultație inițială',
      'A doua opinie',
      'Control postoperator',
      'Urgență, sun acum',
    ],
    errors: {
      required: 'Câmpul e obligatoriu.',
      nameLong: 'Nume prea lung.',
      phone: 'Verifică numărul de telefon.',
      email: 'Verifică adresa de email.',
      messageLong: 'Mesaj prea lung.',
      network: 'Nu am putut trimite formularul. Verifică conexiunea sau sună-ne.',
      generic: 'Trimiterea nu a reușit. Sună-ne sau încearcă din nou.',
      // codurile venite de la contact.php
      server_config: 'Serverul nu e configurat.',
      method: 'Metodă nepermisă.',
      origin: 'Cerere respinsă.',
      too_large: 'Cerere prea mare.',
      bad_request: 'Cerere invalidă.',
      name_required: 'Numele e obligatoriu.',
      phone_invalid: 'Verifică numărul de telefon.',
      email_invalid: 'Verifică adresa de email.',
      links: 'Mesajul pare să conțină linkuri. Scrie-ne fără adrese web.',
      rate_limited:
        'Ai trimis deja o solicitare. Te sunăm noi sau, dacă e urgent, sună tu.',
      send_failed: 'Nu am putut trimite mesajul. Sună-ne, te rugăm.',
    },
  },
};

const en = {
  routes: {
    home: 'Home',
    about: 'The surgeon',
    conditions: 'Conditions',
    procedures: 'How we work',
    recovery: 'Recovery',
    faq: 'Questions',
    booking: 'Book a visit',
    prices: 'Fees',
    prep: 'Preparing for surgery',
    privacy: 'Privacy policy',
    gdpr: 'Data processing (GDPR)',
    terms: 'Terms and conditions',
    cookies: 'Cookies',
  },
  routesLong: {
    faq: 'Frequently asked questions',
  },

  nav: {
    aria: 'Main navigation',
    menu: 'Menu',
    skip: 'Skip to content',
    cta: 'Book a visit',
    langAria: 'Change language',
    langOther: 'Română',
    langOtherShort: 'RO',
  },

  footer: {
    tagline:
      'A centre devoted entirely to hand surgery, reconstructive microsurgery and functional recovery.',
    clinic: 'Clinic',
    patients: 'Patients',
    legal: 'Legal',
  },

  actionbar: { call: 'Call' },

  common: {
    book: 'Book a consultation',
    seeDetails: 'Read more',
    askDoctor: 'Ask a surgeon',
    crumbsAria: 'Breadcrumb',
    address: 'Address',
    email: 'Email',
  },

  form: {
    name: 'Full name',
    namePlaceholder: 'Andrew Popescu',
    phone: 'Phone',
    phonePlaceholder: '+40 7xx xxx xxx',
    email: 'Email',
    emailHint: '(optional, for the written plan)',
    emailPlaceholder: 'name@example.com',
    type: 'Type of appointment',
    date: 'Preferred date',
    calendar: {
      placeholder: 'Pick a day',
      dialog: 'Choose your preferred date',
      prev: 'Previous month',
      next: 'Next month',
      clear: 'Clear',
      closedNote: 'Closed on Sundays',
    },
    message: 'Describe the problem briefly',
    messagePlaceholder:
      'How long you have had the symptoms, what they stop you doing, any tests already done.',
    submit: 'Send request',
    sending: 'Sending…',
    honeypot: 'Do not fill in this field',
    note: 'Your details stay confidential and are never used for marketing.',
    noteDemo: ' On this preview the form does not send email.',
    okDemo: '✓ Form validated. On the live site the request arrives by email.',
    okLive: '✓ Request sent. We will call you within 4 working hours.',
    types: [
      'First consultation',
      'Second opinion',
      'Post-operative check',
      'Emergency, calling now',
    ],
    errors: {
      required: 'This field is required.',
      nameLong: 'Name too long.',
      phone: 'Please check the phone number.',
      email: 'Please check the email address.',
      messageLong: 'Message too long.',
      network: 'We could not send the form. Check your connection or call us.',
      generic: 'Sending failed. Please call us or try again.',
      server_config: 'The server is not configured.',
      method: 'Method not allowed.',
      origin: 'Request rejected.',
      too_large: 'Request too large.',
      bad_request: 'Invalid request.',
      name_required: 'Your name is required.',
      phone_invalid: 'Please check the phone number.',
      email_invalid: 'Please check the email address.',
      links: 'The message looks like it contains links. Please write without web addresses.',
      rate_limited:
        'You have already sent a request. We will call you, or call us if it is urgent.',
      send_failed: 'We could not send the message. Please call us.',
    },
  },
};

const DICT = { ro, en };

export function ui(lang) {
  return DICT[lang] || DICT.ro;
}
