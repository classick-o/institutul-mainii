<?php
/**
 * Copiază fișierul ăsta în `config.php` pe server și completează valorile.
 * `config.php` NU se urcă în git (e în .gitignore) și nu se pune în repo:
 * conține parola căsuței de email.
 *
 * În cPanel, înainte: Email Accounts → Create, pentru
 * `formular@institutulmainii.ro`.
 */

return [
    // ── Unde ajung solicitările ──────────────────────────────
    'to'        => 'programari@institutulmainii.ro',

    // Expeditorul trebuie să fie o adresă DE PE DOMENIU, altfel mesajul
    // pică la SPF și ajunge în spam. Nu pune aici adresa pacientului.
    'from'      => 'formular@institutulmainii.ro',
    'from_name' => 'Formular institutulmainii.ro',

    // ── Cine are voie să trimită către endpoint ──────────────
    // Cererile cu Origin/Referer din altă parte sunt respinse.
    'allowed_hosts' => [
        'institutulmainii.ro',
        'www.institutulmainii.ro',
    ],

    // ── Filtre anti-robot ────────────────────────────────────
    'min_fill_ms' => 3000,   // sub 3 secunde de completare = robot
    'max_links'   => 1,      // câte adrese web acceptăm în mesaj

    // ── Limitare pe IP ───────────────────────────────────────
    'rate_max'    => 5,          // trimiteri
    'rate_window' => 3600,       // pe interval, în secunde
    // Director scriibil, ideal în afara lui public_html.
    // Exemplu pe cPanel: '/home/UTILIZATOR/formular-rate'
    'rate_dir'    => '',
    // Schimbă în orice șir lung și aleatoriu: cu el se hashuiesc IP-urile,
    // ca fișierele de contorizare să nu fie o listă de adrese.
    'rate_salt'   => 'schimbă-mă-cu-un-șir-lung-și-aleatoriu',

    // ── Trimitere ────────────────────────────────────────────
    // enabled = false → se folosește mail() (Exim, local). Merge imediat.
    // enabled = true  → SMTP autentificat, recomandat pentru livrabilitate.
    'smtp' => [
        'enabled' => false,
        'host'    => 'mail.institutulmainii.ro',
        'port'    => 465,          // 465 cu 'ssl', 587 cu 'tls'
        'secure'  => 'ssl',        // 'ssl' | 'tls'
        'user'    => 'formular@institutulmainii.ro',
        'pass'    => '',
    ],
];
