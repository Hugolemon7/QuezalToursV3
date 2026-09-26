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
3. Si el dominio no es `quetzaltours.com.mx`, cámbialo en `astro.config.mjs` (`site`) y en
   `public/robots.txt` antes de compilar.

## Pendientes del cliente

- Envío del formulario: hoy abre el correo del visitante con el mensaje redactado.
  Para envío directo, define `contact.formEndpoint` en `src/content/site.ts`.
- Textos y fotos de los tours sin página (Ciudad de Oaxaca, Cocina, Coyotepec, Yagul) y
  textos de los paquetes Oaxaca de Sabores, Oaxaca Cultural y Guelaguetza.
- Fechas de Fiesta de Muertos 2026, logo en SVG, páginas legales.
