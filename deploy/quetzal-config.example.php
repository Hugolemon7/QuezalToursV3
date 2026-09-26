<?php
/**
 * Copia este archivo como `quetzal-config.php` y súbelo a Hostinger UN NIVEL
 * POR ENCIMA de public_html (junto a la carpeta public_html, no dentro).
 * Nunca lo subas a GitHub.
 */
return [
    // Cuenta de correo de Hostinger que envía los mensajes
    'smtp_host' => 'smtp.hostinger.com',
    'smtp_port' => 465,
    'smtp_user' => 'reservas@quetzaltours.com.mx',
    'smtp_pass' => 'CONTRASEÑA-DEL-CORREO',

    // Remitente y destinatario
    'from'      => 'reservas@quetzaltours.com.mx',
    'from_name' => 'Web Quetzal Tours',
    'to'        => 'reservas@quetzaltours.com.mx',

    // Solo se aceptan envíos desde estos orígenes
    'allowed_origins' => [
        'https://quetzaltours.com.mx',
        'https://www.quetzaltours.com.mx',
    ],

    // Cualquier texto largo y aleatorio (para anonimizar IPs del límite de envíos)
    'rate_salt' => 'CAMBIA-ESTO-POR-UN-TEXTO-ALEATORIO',

    // Carpeta para el límite de envíos (opcional; por defecto la temporal del servidor)
    // 'rate_dir' => '/home/USUARIO/tmp',
];
