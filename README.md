# Quetzal Tours — sitio web

Sitio estático bilingüe (ES/EN) hecho con [Astro](https://astro.build). El brief está en `docs/`.

## Dónde se cambia cada cosa

| Qué | Dónde |
|---|---|
| Tours, paquetes, circuitos, textos de páginas, contacto y cifras | Panel **/keystatic** (guarda en `src/content/**/*.json` y fotos en `src/assets/`) |
| Textos de interfaz (botones, menús, formulario), navegación, aviso de privacidad | `src/content/site.ts` |
| Colores, tipografía, espacios, movimiento, tema claro/oscuro | `src/styles/tokens.css` |
| Fotos (se optimizan solas al compilar) | Desde el panel; quedan en `src/assets/` |
| Logo, logos de aliados, capas del hero, favicon | `public/` |
| Fotos que no se usan ahora | `originales/` (no se publican) |

Los textos en inglés son un **borrador** que conviene revisar con una persona nativa.

## Panel de administración (Keystatic)

- **En línea:** `https://<proyecto>.vercel.app/keystatic` → *Log in with GitHub*.
  Cada **Save** es un commit en `main`; la GitHub Action vuelve a publicar el sitio
  en Hostinger en 2–3 minutos (pestaña *Actions* del repositorio).
- **En local:** `npm run dev` y abre http://localhost:4321/keystatic (guarda en tu disco;
  luego haz commit y push).
- Qué se puede editar se define en `keystatic.config.ts`. `src/content/site.ts` lee esos
  JSON y les da la forma que usan las páginas.
- El despliegue de Vercel es solo para el panel: tiene `noindex` y el formulario PHP no
  funciona ahí. El sitio público sigue en Hostinger.

### Configuración (solo la primera vez)

1. **Crear la GitHub App (en local, una vez):** crea un archivo `.env` con
   `PUBLIC_KEYSTATIC_STORAGE=github`, corre `npm run dev` y abre
   http://127.0.0.1:4321/keystatic/setup. En *Deployed App URL* pon
   `https://quetzaltours-v3.vercel.app` y sigue el asistente *Create GitHub App*.
   Al terminar, Keystatic escribe en `.env`: `KEYSTATIC_GITHUB_CLIENT_ID`,
   `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` y `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`.
   Cópialos en Vercel → Settings → Environment Variables y vuelve a desplegar.
   Después borra la línea `PUBLIC_KEYSTATIC_STORAGE=github` para editar en local sin GitHub.
   (`.env` nunca va a GitHub: está en `.gitignore`.)
2. **Instala la GitHub App** en el repositorio `QuezalToursV3` (solo ese repo).
3. **Da acceso a quien vaya a editar:** invítalo como colaborador del repositorio
   (Settings → Collaborators). Necesita cuenta de GitHub.
4. **FTP de Hostinger en GitHub:** Settings → Secrets and variables → Actions →
   *New repository secret*: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`
   (Hostinger → Archivos → Cuentas FTP). Si la carpeta del sitio no es `public_html/`
   vista desde esa cuenta FTP, crea la variable `FTP_SERVER_DIR`.

## Trabajar en local

```bash
npm install
npm run dev          # http://localhost:4321  (panel en /keystatic)
```

## Publicar en Hostinger

Automático: cada cambio en `main` (desde el panel o con `git push`) lo publica la
GitHub Action `.github/workflows/publicar-hostinger.yml`. Para publicar a mano sin
cambios: pestaña *Actions* → *Publicar en Hostinger* → *Run workflow*.

Manual (si la Action no está configurada):

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
