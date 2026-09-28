// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

/**
 * Dos formas de compilar el mismo sitio:
 *
 * - Hostinger (sitio público, `npm run build`): 100 % estático, sin panel.
 *   Es lo que sube la GitHub Action a public_html.
 * - Vercel (panel de administración): el mismo sitio + /keystatic, que
 *   necesita servidor para iniciar sesión con GitHub y guardar cambios.
 *   Vercel define VERCEL=1 al compilar; en local, `npm run dev` también
 *   incluye el panel (modo local: guarda en tu disco).
 */
const isDev = process.argv.includes('dev');
const withAdmin = isDev || process.env.VERCEL === '1' || process.env.KEYSTATIC === '1';

export default defineConfig({
  // Dominio de producción (Hostinger): usado en sitemap, canónicas y Open Graph
  site: 'https://quetzaltours.com.mx',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  build: { format: 'directory' },
  adapter: withAdmin && !isDev ? vercel() : undefined,
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-MX', en: 'en-US' } },
      filter: (page) => !page.includes('/404') && !page.includes('/keystatic'),
    }),
    ...(withAdmin ? [react(), keystatic()] : []),
  ],
});
