<?php
/**
 * Institutul Mâinii — primirea formularului de programare.
 *
 * Rulează pe găzduirea Hostico (PHP prin MultiPHP). Nu are nevoie de
 * biblioteci externe și nu scrie datele pacientului pe disc: le trimite pe
 * email și le uită.
 *
 * Configurarea se face în `config.php` (copiat din `config.example.php`),
 * fișier care NU se urcă în git.
 *
 * Apel: POST application/json către /api/contact.php
 * Răspuns: {"ok":true} sau {"ok":false,"code":"...","error":"..."}
 *
 * Eroarea se întoarce ca `code`, nu ca text gata tradus: site-ul e bilingv,
 * iar textul trebuie să apară în limba în care citește vizitatorul. `error`
 * rămâne, în română, ca rezervă pentru cazul în care cererea nu vine din
 * formular (curl, un client vechi) și n-are cine să traducă codul.
 */

declare(strict_types=1);

// ─────────────────────────────────────────────────────────────
// 0. Configurare
// ─────────────────────────────────────────────────────────────
$configPath = __DIR__ . '/config.php';
if (!is_file($configPath)) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(
        ['ok' => false, 'code' => 'server_config', 'error' => 'Serverul nu e configurat.'],
        JSON_UNESCAPED_UNICODE
    );
    exit;
}
$cfg = require $configPath;

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: same-origin');
// Formularul e pe același domeniu, deci nu deschidem CORS pentru nimeni.
header('Vary: Origin');

// Pe cPanel mbstring e activ aproape mereu. Dacă totuși lipsește, formularul
// trebuie să funcționeze, nu să dea eroare fatală la prima cerere.
if (!function_exists('mb_strlen')) {
    function mb_strlen($s, $enc = null) { return strlen($s); }
    function mb_substr($s, $start, $len = null, $enc = null) { return substr($s, $start, $len); }
    function mb_encode_mimeheader($s, $enc = null) { return '=?UTF-8?B?' . base64_encode($s) . '?='; }
}

function fail(int $status, string $code, string $msg) {
    http_response_code($status);
    echo json_encode(
        ['ok' => false, 'code' => $code, 'error' => $msg],
        JSON_UNESCAPED_UNICODE
    );
    exit;
}

function ok() {
    echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Anteturile de email nu au voie să conțină CR sau LF: acolo se strecoară
 * injecția de anteturi, prin care un atacator ar adăuga Bcc și ar folosi
 * formularul ca releu de spam. Tăiem și caracterele de control.
 */
function headerSafe(string $v): string {
    $v = str_replace(["\r", "\n", "%0a", "%0d", "%0A", "%0D"], ' ', $v);
    $v = preg_replace('/[\x00-\x1F\x7F]/u', '', $v) ?? '';
    return trim($v);
}

function clean(string $v, int $max): string {
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v) ?? '';
    $v = trim($v);
    if (mb_strlen($v, 'UTF-8') > $max) {
        $v = mb_substr($v, 0, $max, 'UTF-8');
    }
    return $v;
}

function clientIp(): string {
    // Pe cPanel/LiteSpeed, REMOTE_ADDR e de încredere. Anteturile trimise de
    // client (X-Forwarded-For) NU sunt: pot fi falsificate, iar dacă le-am
    // crede, limitarea pe IP ar deveni inutilă.
    return (string)($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
}

// ─────────────────────────────────────────────────────────────
// 1. Metodă și origine
// ─────────────────────────────────────────────────────────────
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    fail(405, 'method', 'Metodă nepermisă.');
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$referer = $_SERVER['HTTP_REFERER'] ?? '';
$source = $origin !== '' ? $origin : $referer;
if ($source !== '') {
    $host = parse_url($source, PHP_URL_HOST) ?: '';
    $allowed = false;
    foreach ($cfg['allowed_hosts'] as $h) {
        if (strcasecmp($host, $h) === 0) { $allowed = true; break; }
    }
    if (!$allowed) {
        fail(403, 'origin', 'Cerere respinsă.');
    }
}

// ─────────────────────────────────────────────────────────────
// 2. Corpul cererii
// ─────────────────────────────────────────────────────────────
$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > 20000) {
    fail(413, 'too_large', 'Cerere prea mare.');
}
$in = json_decode($raw, true);
if (!is_array($in)) {
    // acceptăm și trimiterea clasică, dacă JS-ul e blocat în browser
    $in = $_POST;
}
if (!is_array($in) || !$in) {
    fail(400, 'bad_request', 'Cerere invalidă.');
}

// ─────────────────────────────────────────────────────────────
// 3. Filtre anti-robot
// ─────────────────────────────────────────────────────────────
// 3a. capcana: câmp invizibil pentru oameni
if (clean((string)($in['website'] ?? ''), 200) !== '') {
    // Răspundem „ok" intenționat: un robot care primește eroare încearcă
    // altă variantă, unul care primește succes se oprește.
    ok();
}

// 3b. timp minim de completare
$elapsed = (int)($in['elapsed'] ?? 0);
if ($elapsed > 0 && $elapsed < $cfg['min_fill_ms']) {
    ok();
}

// ─────────────────────────────────────────────────────────────
// 4. Validare
// ─────────────────────────────────────────────────────────────
$nume    = clean((string)($in['nume'] ?? ''), 80);
$telefon = clean((string)($in['telefon'] ?? ''), 30);
$email   = clean((string)($in['email'] ?? ''), 120);
$tip     = clean((string)($in['tip'] ?? ''), 60);
$dataPref= clean((string)($in['data_pref'] ?? ''), 20);
$mesaj   = clean((string)($in['mesaj'] ?? ''), 1500);
$lang    = clean((string)($in['lang'] ?? 'ro'), 5);
if (!in_array($lang, ['ro', 'en'], true)) {
    $lang = 'ro';
}

if ($nume === '') {
    fail(422, 'name_required', 'Numele e obligatoriu.');
}
$digits = preg_replace('/\D/', '', $telefon) ?? '';
if (strlen($digits) < 9 || strlen($digits) > 15) {
    fail(422, 'phone_invalid', 'Verifică numărul de telefon.');
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail(422, 'email_invalid', 'Verifică adresa de email.');
}
if ($dataPref !== '' && !preg_match('/^\d{4}-\d{2}-\d{2}$/', $dataPref)) {
    $dataPref = '';
}
// Lista se validează în ambele limbi și se normalizează în română: emailul îl
// citește personalul clinicii, care vrea mereu aceleași patru etichete. Limba
// vizitatorului se transmite separat, mai jos.
$tipuriPermise = [
    'Consultație inițială'   => 'Consultație inițială',
    'A doua opinie'          => 'A doua opinie',
    'Control postoperator'   => 'Control postoperator',
    'Urgență, sun acum'      => 'Urgență, sun acum',
    'First consultation'     => 'Consultație inițială',
    'Second opinion'         => 'A doua opinie',
    'Post-operative check'   => 'Control postoperator',
    'Emergency, calling now' => 'Urgență, sun acum',
];
$tip = $tipuriPermise[$tip] ?? 'Consultație inițială';
// Linkurile în mesaj sunt semnul cel mai sigur de spam la un formular medical.
if (preg_match_all('~https?://|www\.~i', $mesaj, $m) && count($m[0]) >= $cfg['max_links']) {
    fail(422, 'links', 'Mesajul pare să conțină linkuri. Scrie-ne fără adrese web.');
}

// ─────────────────────────────────────────────────────────────
// 5. Limitare pe IP
// ─────────────────────────────────────────────────────────────
// Stocăm doar un hash al IP-ului, cu o sare din config: fișierul de contorizare
// nu devine o listă de adrese IP ale pacienților.
$dir = $cfg['rate_dir'] ?: sys_get_temp_dir();
if (!is_dir($dir)) { @mkdir($dir, 0700, true); }
$key = hash('sha256', clientIp() . '|' . $cfg['rate_salt']);
$file = rtrim($dir, '/\\') . '/rl_' . $key . '.json';

$now = time();
$hits = [];
if (is_file($file)) {
    $prev = json_decode((string)@file_get_contents($file), true);
    if (is_array($prev)) {
        $hits = array_values(array_filter($prev, static fn($t) => is_int($t) && $t > $now - $cfg['rate_window']));
    }
}
if (count($hits) >= $cfg['rate_max']) {
    fail(429, 'rate_limited', 'Ai trimis deja o solicitare. Te sunăm noi sau, dacă e urgent, sună tu.');
}
$hits[] = $now;
@file_put_contents($file, json_encode($hits), LOCK_EX);

// curățare ocazională, ca directorul să nu crească la nesfârșit
if (random_int(1, 50) === 1) {
    foreach (glob(rtrim($dir, '/\\') . '/rl_*.json') ?: [] as $old) {
        if (@filemtime($old) < $now - $cfg['rate_window'] * 4) { @unlink($old); }
    }
}

// ─────────────────────────────────────────────────────────────
// 6. Compunerea mesajului
// ─────────────────────────────────────────────────────────────
// Prefixul se vede în lista de mesaje, deci personalul știe dinainte în ce
// limbă trebuie sunat, fără să deschidă emailul.
$subject = ($lang === 'en' ? '[EN] ' : '') . 'Programare: ' . $nume . ' (' . $telefon . ')';
$lines = [
    'Solicitare nouă de programare',
    str_repeat('=', 34),
    '',
    'Nume:      ' . $nume,
    'Telefon:   ' . $telefon,
    'Email:     ' . ($email !== '' ? $email : '—'),
    'Tip:       ' . $tip,
    'Limba:     ' . ($lang === 'en' ? 'engleză — pacientul așteaptă răspuns în engleză' : 'română'),
    'Data dorită: ' . ($dataPref !== '' ? $dataPref : '—'),
    '',
    'Mesaj:',
    $mesaj !== '' ? $mesaj : '—',
    '',
    str_repeat('-', 34),
    'Trimis: ' . date('d.m.Y H:i:s'),
    'Sursa:  ' . ($source !== '' ? headerSafe($source) : 'necunoscută'),
];
$body = implode("\r\n", $lines);

$fromName = headerSafe($cfg['from_name']);
$fromAddr = headerSafe($cfg['from']);
$toAddr   = headerSafe($cfg['to']);
// Reply-To pune adresa pacientului, ca personalul să răspundă cu un singur
// clic. Fără `headerSafe`, exact aici s-ar injecta anteturi.
$replyTo  = $email !== '' ? headerSafe($email) : $fromAddr;

$sent = $cfg['smtp']['enabled']
    ? smtp_send($cfg, $toAddr, $subject, $body, $replyTo, $fromName, $fromAddr)
    : mail_send($toAddr, $subject, $body, $replyTo, $fromName, $fromAddr);

if (!$sent) {
    fail(502, 'send_failed', 'Nu am putut trimite mesajul. Sună-ne, te rugăm.');
}
ok();

// ─────────────────────────────────────────────────────────────
// Trimitere prin funcția mail() a serverului (Exim, pe cPanel)
// ─────────────────────────────────────────────────────────────
function mail_send(string $to, string $subject, string $body, string $replyTo, string $fromName, string $fromAddr): bool {
    $headers = [
        'From: ' . mb_encode_mimeheader($fromName, 'UTF-8') . ' <' . $fromAddr . '>',
        'Reply-To: ' . $replyTo,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'X-Mailer: institutulmainii.ro',
    ];
    // Parametrul -f setează plicul expeditorului; fără el, SPF poate pica.
    return @mail(
        $to,
        mb_encode_mimeheader($subject, 'UTF-8'),
        $body,
        implode("\r\n", $headers),
        '-f' . $fromAddr
    );
}

// ─────────────────────────────────────────────────────────────
// Trimitere prin SMTP autentificat (recomandat de Hostico)
// ─────────────────────────────────────────────────────────────
function smtp_send(array $cfg, string $to, string $subject, string $body, string $replyTo, string $fromName, string $fromAddr): bool {
    $s = $cfg['smtp'];
    $host = $s['host'];
    $port = (int)$s['port'];
    $timeout = 15;

    $transport = ($s['secure'] === 'ssl') ? 'ssl://' : '';
    $fp = @stream_socket_client($transport . $host . ':' . $port, $errno, $errstr, $timeout);
    if (!$fp) { error_log('SMTP: conexiune eșuată — ' . $errstr); return false; }
    stream_set_timeout($fp, $timeout);

    $read = static function ($fp): string {
        $data = '';
        while (($line = fgets($fp, 515)) !== false) {
            $data .= $line;
            if (strlen($line) < 4 || $line[3] === ' ') break;
        }
        return $data;
    };
    $cmd = static function ($fp, string $c) use ($read): string {
        fwrite($fp, $c . "\r\n");
        return $read($fp);
    };
    $codeOf = static fn(string $r): int => (int)substr(trim($r), 0, 3);

    if ($codeOf($read($fp)) !== 220) { fclose($fp); return false; }

    $ehlo = $cmd($fp, 'EHLO ' . ($_SERVER['SERVER_NAME'] ?? 'localhost'));
    if ($codeOf($ehlo) !== 250) { fclose($fp); return false; }

    if ($s['secure'] === 'tls') {
        if ($codeOf($cmd($fp, 'STARTTLS')) !== 220) { fclose($fp); return false; }
        if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) { fclose($fp); return false; }
        // după STARTTLS, dialogul se reia de la EHLO
        if ($codeOf($cmd($fp, 'EHLO ' . ($_SERVER['SERVER_NAME'] ?? 'localhost'))) !== 250) { fclose($fp); return false; }
    }

    if ($codeOf($cmd($fp, 'AUTH LOGIN')) !== 334) { fclose($fp); return false; }
    if ($codeOf($cmd($fp, base64_encode($s['user']))) !== 334) { fclose($fp); return false; }
    if ($codeOf($cmd($fp, base64_encode($s['pass']))) !== 235) {
        error_log('SMTP: autentificare respinsă');
        fclose($fp); return false;
    }

    if ($codeOf($cmd($fp, 'MAIL FROM:<' . $fromAddr . '>')) !== 250) { fclose($fp); return false; }
    if (!in_array($codeOf($cmd($fp, 'RCPT TO:<' . $to . '>')), [250, 251], true)) { fclose($fp); return false; }
    if ($codeOf($cmd($fp, 'DATA')) !== 354) { fclose($fp); return false; }

    $headers = [
        'Date: ' . date('r'),
        'From: ' . mb_encode_mimeheader($fromName, 'UTF-8') . ' <' . $fromAddr . '>',
        'To: <' . $to . '>',
        'Reply-To: ' . $replyTo,
        'Subject: ' . mb_encode_mimeheader($subject, 'UTF-8'),
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'X-Mailer: institutulmainii.ro',
    ];
    // Un punct singur pe rând închide mesajul în SMTP, deci se dublează.
    $data = implode("\r\n", $headers) . "\r\n\r\n"
          . preg_replace('/^\./m', '..', $body) . "\r\n.";
    if ($codeOf($cmd($fp, $data)) !== 250) { fclose($fp); return false; }

    $cmd($fp, 'QUIT');
    fclose($fp);
    return true;
}
