<?php
/**
 * Quetzal Tours — envío del formulario de contacto.
 *
 * Recibe el formulario (POST), lo valida y lo envía por SMTP autenticado
 * (cuenta de Hostinger) a reservas@. Responde JSON: {"ok":true} o
 * {"ok":false,"error":"…"}.
 *
 * Credenciales: NO van en este archivo ni en GitHub. Se leen de
 * quetzal-config.php, un nivel POR ENCIMA de public_html (ver README).
 */

declare(strict_types=1);

// Los avisos de PHP nunca deben mezclarse con la respuesta JSON.
ini_set('display_errors', '0');

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

/* ---------- Configuración ---------- */
$configPaths = [
    dirname(__DIR__, 2) . '/quetzal-config.php', // fuera de public_html (recomendado)
    __DIR__ . '/quetzal-config.php',              // alternativa (protegida por .htaccess)
];
$config = null;
foreach ($configPaths as $path) {
    if (is_file($path)) {
        $config = require $path;
        break;
    }
}
if (!is_array($config)) {
    respond(500, ['ok' => false, 'error' => 'config']);
}

/* ---------- Solo POST desde nuestro propio sitio ---------- */
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'method']);
}
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, $config['allowed_origins'], true)) {
    respond(403, ['ok' => false, 'error' => 'origin']);
}

/* ---------- Anti-spam ---------- */
// 1) Campo trampa: invisible para personas; los bots lo rellenan.
if (trim((string)($_POST['sitio_web'] ?? '')) !== '') {
    respond(200, ['ok' => true]); // se ignora en silencio
}
// 2) Límite: 5 envíos por IP cada 10 minutos (se guarda un hash, no la IP).
$ipHash = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . $config['rate_salt']);
$rateDir = $config['rate_dir'] ?? sys_get_temp_dir();
$rateFile = rtrim($rateDir, '/') . '/qt-form-' . substr($ipHash, 0, 32);
$now = time();
$hits = [];
if (is_file($rateFile)) {
    $hits = array_filter(
        array_map('intval', explode(',', (string)file_get_contents($rateFile))),
        fn($t) => $t > $now - 600
    );
}
if (count($hits) >= 5) {
    respond(429, ['ok' => false, 'error' => 'rate']);
}
$hits[] = $now;
@file_put_contents($rateFile, implode(',', $hits), LOCK_EX);

/* ---------- Validación ---------- */
$clean = static fn(string $v, int $max): string =>
    mb_substr(trim(str_replace(["\r", "\0"], '', $v)), 0, $max);

$nombre  = $clean((string)($_POST['nombre'] ?? ''), 120);
$email   = $clean((string)($_POST['email'] ?? ''), 160);
$asunto  = $clean((string)($_POST['asunto'] ?? ''), 160);
$mensaje = $clean((string)($_POST['mensaje'] ?? ''), 5000);
$idioma  = ($_POST['idioma'] ?? 'es') === 'en' ? 'en' : 'es';
$pagina  = $clean((string)($_POST['pagina'] ?? ''), 300);

$nombre = str_replace("\n", ' ', $nombre);
$asunto = str_replace("\n", ' ', $asunto);

if ($nombre === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['ok' => false, 'error' => 'invalid']);
}

/* ---------- Correo ---------- */
$subject = 'Web · ' . ($asunto !== '' ? $asunto : 'Nuevo mensaje') . ' · ' . $nombre;
$body = "Nuevo mensaje desde quetzaltours.com.mx\n"
      . "----------------------------------------\n"
      . "Nombre:  {$nombre}\n"
      . "Correo:  {$email}\n"
      . "Asunto:  {$asunto}\n"
      . "Idioma:  " . strtoupper($idioma) . "\n"
      . "Página:  {$pagina}\n"
      . "----------------------------------------\n\n"
      . ($mensaje !== '' ? $mensaje : '(sin mensaje)') . "\n";

try {
    smtp_send($config, $config['to'], $subject, $body, $email, $nombre);
} catch (Throwable $e) {
    error_log('[quetzal-form] ' . $e->getMessage());
    respond(502, ['ok' => false, 'error' => 'send']);
}

respond(200, ['ok' => true]);

/* =================================================================== */

/** Codifica un encabezado con UTF-8 (tildes, ñ). */
function mime_header(string $text): string
{
    return '=?UTF-8?B?' . base64_encode($text) . '?=';
}

/**
 * Cliente SMTP mínimo (SSL implícito, AUTH LOGIN), sin dependencias.
 * Hostinger: smtp.hostinger.com, puerto 465.
 */
function smtp_send(array $c, string $to, string $subject, string $body, string $replyTo, string $replyName): void
{
    $socket = @stream_socket_client(
        'ssl://' . $c['smtp_host'] . ':' . $c['smtp_port'],
        $errno,
        $errstr,
        15,
        STREAM_CLIENT_CONNECT,
        stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true]])
    );
    if (!$socket) {
        throw new RuntimeException("Conexión SMTP: {$errstr} ({$errno})");
    }
    stream_set_timeout($socket, 15);

    $read = static function () use ($socket): string {
        $data = '';
        while (($line = fgets($socket, 515)) !== false) {
            $data .= $line;
            if (isset($line[3]) && $line[3] === ' ') {
                break; // última línea de la respuesta
            }
        }
        return $data;
    };
    $cmd = static function (string $command, array $expect) use ($socket, $read): string {
        if ($command !== '') {
            fwrite($socket, $command . "\r\n");
        }
        $reply = $read();
        if (!in_array((int)substr($reply, 0, 3), $expect, true)) {
            throw new RuntimeException('SMTP ' . trim($reply));
        }
        return $reply;
    };

    $cmd('', [220]);
    $cmd('EHLO ' . ($c['ehlo'] ?? 'quetzaltours.com.mx'), [250]);
    $cmd('AUTH LOGIN', [334]);
    $cmd(base64_encode($c['smtp_user']), [334]);
    $cmd(base64_encode($c['smtp_pass']), [235]);
    $cmd('MAIL FROM:<' . $c['from'] . '>', [250]);
    $cmd('RCPT TO:<' . $to . '>', [250, 251]);
    $cmd('DATA', [354]);

    $headers = [
        'Date: ' . date(DATE_RFC2822),
        'From: ' . mime_header($c['from_name']) . ' <' . $c['from'] . '>',
        'To: <' . $to . '>',
        'Reply-To: ' . mime_header($replyName) . ' <' . $replyTo . '>',
        'Subject: ' . mime_header($subject),
        'Message-ID: <' . bin2hex(random_bytes(12)) . '@' . substr(strrchr($c['from'], '@'), 1) . '>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
    ];
    $data = implode("\r\n", $headers) . "\r\n\r\n" . chunk_split(base64_encode($body), 76, "\r\n");
    // Transparencia SMTP: una línea que empieza con "." se duplica.
    $data = preg_replace('/^\./m', '..', $data);
    fwrite($socket, $data . "\r\n.\r\n");
    $cmd('', [250]);
    $cmd('QUIT', [221]);
    fclose($socket);
}
