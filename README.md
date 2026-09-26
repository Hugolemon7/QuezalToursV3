# Quetzal Tours — sitio web

Sitio estático bilingüe (ES/EN) hecho con [Astro](https://astro.build). El brief está en `docs/`.

## Dónde se cambia cada cosa

| Qué | Dónde |
|---|---|
| Todos los textos (ES y EN), tours, paquetes, circuitos, contacto, rutas de fotos | `src/content/site.ts` (única fuente de verdad) |
| Colores, tipografía, espacios, movimiento, tema claro/oscuro | `src/styles/tokens.css` |
| Fotos (se optimizan solas al compilar) | `src/assets/` |
| Logo, logos de aliados, capas del hero, favicon | `public/` |
| Fotos que no se usan ahora | `originales/` (no se publican) |

Los textos en inglés son un **borrador** que conviene revisar con una persona nativa.

## Trabajar en local

```bash
npm install
npm run dev          # http://localhost:4321
```

## Publicar en Hostinger

1. Compila el sitio:
   ```bash
   npm run build
   ```
2. Sube **el contenido** de la carpeta `dist/` (no la carpeta en sí) a `public_html/`
   con el Administrador de archivos de Hostinger o por FTP. Incluye el archivo oculto
   `.htaccess` (HTTPS obligatorio, página 404 y caché).
3. **Solo la primera vez — correo del formulario:** copia `deploy/quetzal-config.example.php`
   como `quetzal-config.php`, pon la contraseña del correo reservas@ y un texto aleatorio en
   `rate_salt`, y súbelo **un nivel por encima de `public_html`** (al lado, no dentro).
   Este archivo nunca va a GitHub. El formulario lo usa `public/api/enviar.php`, que envía
   por SMTP (smtp.hostinger.com:465) a reservas@ con anti-spam (campo trampa + límite de
   5 envíos por IP cada 10 minutos).
4. Prueba el formulario en producción y revisa que el mensaje llegue a reservas@
   (y no a spam). En local (`npm run dev`) el formulario no puede enviar porque no hay PHP.

## Pendientes del cliente

- Textos y fotos de los tours sin página (Ciudad de Oaxaca, Cocina, Coyotepec, Yagul) y
  textos de los paquetes Oaxaca de Sabores, Oaxaca Cultural y Guelaguetza.
- Fotos pendientes de algunos tours, logo en SVG y favicon en alta resolución.
