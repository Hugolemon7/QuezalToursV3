/**
 * Panel de administración (Keystatic) — https://keystatic.com
 * ------------------------------------------------------------------
 * Define qué se puede editar desde /keystatic y dónde se guarda.
 * Todo se guarda como archivos JSON en src/content/ y fotos en
 * src/assets/, dentro del mismo repositorio de GitHub.
 *
 * - En local (`npm run dev`) guarda directo en tu disco.
 * - En Vercel guarda en GitHub (cada "Save" es un commit en main) y
 *   la GitHub Action vuelve a publicar el sitio en Hostinger.
 *
 * Textos: cada campo tiene Español e Inglés. Si el inglés queda vacío,
 * el sitio muestra el español. `**texto**` pone el texto en negritas.
 */
import { config, collection, singleton, fields } from '@keystatic/core';

const REPO = { owner: 'Hugolemon7', name: 'QuezalToursV3' } as const;

/**
 * En Vercel (producción) siempre guarda en GitHub. En local guarda en disco,
 * salvo con PUBLIC_KEYSTATIC_STORAGE=github en .env (necesario solo para el
 * asistente que crea la GitHub App la primera vez).
 */
const useGitHub = !!import.meta.env?.PROD || import.meta.env?.PUBLIC_KEYSTATIC_STORAGE === 'github';

/* ------------------------------------------------------------------ */
/* Ayudantes                                                           */
/* ------------------------------------------------------------------ */

const BOLD = 'Usa **texto** para resaltar en negritas.';

/** Texto bilingüe { es, en }. */
const bi = (label: string, opts: { multiline?: boolean; required?: boolean; description?: string } = {}) =>
  fields.object(
    {
      es: fields.text({
        label: 'Español',
        multiline: opts.multiline,
        validation: opts.required === false ? undefined : { length: { min: 1 } },
      }),
      en: fields.text({ label: 'English', multiline: opts.multiline }),
    },
    { label, description: opts.description, layout: [6, 6] },
  );

/** Lista de textos bilingües (párrafos, "incluye", etc.). */
const biList = (label: string, itemLabel: string, opts: { multiline?: boolean; description?: string } = {}) =>
  fields.array(bi(itemLabel, { multiline: opts.multiline }), {
    label,
    description: opts.description,
    itemLabel: (p) => p.fields.es.value || '(vacío)',
  });

/** Foto que se guarda en src/assets/<carpeta>/ y se optimiza al compilar. */
const photo = (label: string, folder: string, opts: { required?: boolean; description?: string } = {}) =>
  fields.image({
    label,
    description: opts.description,
    directory: `src/assets/${folder}`,
    publicPath: `/${folder}/`,
    validation: { isRequired: opts.required ? true : undefined },
  } as Parameters<typeof fields.image>[0]);

/** Foto + texto alternativo (para lectores de pantalla y buscadores). */
const photoAlt = (label: string, folder: string, required = false) =>
  fields.object(
    {
      src: photo('Foto', folder, { required }),
      alt: bi('Descripción de la foto (texto alternativo)', { required: false }),
    },
    { label },
  );

const heroFields = (folder: string) =>
  fields.object(
    {
      title: bi('Título', { description: BOLD }),
      lead: bi('Subtítulo', { multiline: true }),
      image: photoAlt('Foto de portada', folder, true),
    },
    { label: 'Portada' },
  );

const metaFields = () =>
  fields.object(
    {
      title: bi('Título en la pestaña y en Google'),
      description: bi('Descripción para Google y redes', { multiline: true }),
    },
    { label: 'SEO' },
  );

const order = () =>
  fields.integer({
    label: 'Orden',
    description: 'Posición en las listas (1 = primero).',
    defaultValue: 99,
    validation: { isRequired: true },
  });

/* ------------------------------------------------------------------ */
/* Configuración                                                       */
/* ------------------------------------------------------------------ */

export default config({
  storage: useGitHub ? { kind: 'github', repo: REPO } : { kind: 'local' },
  ui: {
    brand: { name: 'Quetzal Tours' },
    navigation: {
      Catálogo: ['tours', 'paquetes', 'circuitos'],
      Páginas: ['inicio', 'paginaTours', 'paginaPaquetes', 'paginaCircuitos', 'nosotros'],
      Ajustes: ['general'],
    },
  },

  collections: {
    /* ---------------------------- Tours ---------------------------- */
    tours: collection({
      label: 'Tours',
      path: 'src/content/tours/*',
      format: { data: 'json' },
      slugField: 'name',
      columns: ['order', 'category'],
      entryLayout: 'form',
      schema: {
        name: fields.slug({
          name: { label: 'Nombre (español)', validation: { length: { min: 1 } } },
          slug: {
            label: 'Dirección web',
            description: 'Parte final del enlace: quetzaltours.com.mx/tours/…  No la cambies en tours ya publicados.',
          },
        }),
        nameEn: fields.text({ label: 'Nombre (English)' }),
        order: order(),
        category: fields.select({
          label: 'Categoría',
          options: [
            { label: 'Arqueología', value: 'arqueologia' },
            { label: 'Colonial', value: 'colonial' },
            { label: 'Gastronomía', value: 'gastronomia' },
            { label: 'Arte', value: 'arte' },
            { label: 'Ecoturismo', value: 'ecoturismo' },
          ],
          defaultValue: 'arqueologia',
        }),
        duration: fields.text({
          label: 'Duración (horas)',
          description: 'Solo el número, p. ej. 8 o 3:30.',
          validation: { length: { min: 1 } },
        }),
        region: bi('Región'),
        banner: photo('Portada gráfica', 'tours', {
          required: true,
          description: 'Imagen de marca de 1350×440 px. Se usa si el tour no tiene foto.',
        }),
        cover: photoAlt('Foto principal (tarjetas y cabecera)', 'tours'),
        summary: bi('Resumen', { multiline: true, required: false, description: 'Una o dos frases para la tarjeta del tour.' }),
        detail: fields.conditional(
          fields.checkbox({
            label: 'Tiene página de detalle',
            description: 'Si está apagado, la tarjeta lleva a WhatsApp en lugar de a una página.',
            defaultValue: true,
          }),
          {
            true: fields.object(
              {
                subtitle: bi('Subtítulo'),
                body: biList('Descripción', 'Párrafo', { multiline: true, description: BOLD }),
                departures: bi('Salidas', { description: 'P. ej. «Salidas diarias desde la Ciudad de Oaxaca.»' }),
                stops: fields.array(
                  fields.object({
                    title: bi('Nombre de la parada'),
                    text: bi('Descripción', { multiline: true, required: false }),
                    image: photoAlt('Foto (opcional)', 'tours'),
                  }),
                  { label: 'Lo que harás (paradas)', itemLabel: (p) => p.fields.title.fields.es.value || 'Parada' },
                ),
                includes: biList('Incluye', 'Elemento'),
                excludes: biList('No incluye', 'Elemento'),
                itinerary: fields.array(
                  fields.object({ label: bi('Concepto'), value: bi('Detalle') }),
                  { label: 'Itinerario', itemLabel: (p) => p.fields.label.fields.es.value || 'Renglón' },
                ),
                gallery: fields.array(photoAlt('Foto', 'tours', true), {
                  label: 'Galería',
                  itemLabel: (p) => p.fields.alt.fields.es.value || 'Foto',
                }),
              },
              { label: 'Página de detalle' },
            ),
            false: fields.empty(),
          },
        ),
      },
    }),

    /* -------------------------- Paquetes --------------------------- */
    paquetes: collection({
      label: 'Paquetes vacacionales',
      path: 'src/content/paquetes/*',
      format: { data: 'json' },
      slugField: 'name',
      columns: ['order'],
      entryLayout: 'form',
      schema: {
        name: fields.slug({
          name: { label: 'Nombre (español)', validation: { length: { min: 1 } } },
          slug: { label: 'Identificador', description: 'Uso interno. No lo cambies si el paquete está en «Tour del momento».' },
        }),
        nameEn: fields.text({ label: 'Nombre (English)' }),
        order: order(),
        summary: bi('Resumen', { multiline: true, required: false }),
        cover: photoAlt('Foto', 'paquetes'),
        detail: fields.conditional(
          fields.checkbox({
            label: 'Tiene información completa',
            description: 'Si está apagado, se muestra como tarjeta pequeña con «Detalles por WhatsApp».',
            defaultValue: true,
          }),
          {
            true: fields.object(
              {
                dates: bi('Fechas', { required: false, description: 'P. ej. «Del 30 de octubre al 3 de noviembre de 2026».' }),
                body: biList('Descripción', 'Párrafo', { multiline: true, description: BOLD }),
                includes: biList('Incluye', 'Elemento'),
              },
              { label: 'Información del paquete' },
            ),
            false: fields.empty(),
          },
        ),
      },
    }),
  },

  singletons: {
    /* ------------------------- Circuitos --------------------------- */
    circuitos: singleton({
      label: 'Circuitos turísticos',
      path: 'src/content/ajustes/circuitos',
      format: { data: 'json' },
      schema: {
        groups: fields.array(
          fields.object({
            title: bi('Nombre del grupo'),
            items: fields.array(
              fields.object({
                code: fields.text({ label: 'Clave', description: 'P. ej. Q101' }),
                name: bi('Ruta'),
                days: fields.text({ label: 'Días', description: 'P. ej. 07 o 05–06' }),
              }),
              { label: 'Circuitos', itemLabel: (p) => `${p.fields.code.value} · ${p.fields.name.fields.es.value}` },
            ),
          }),
          { label: 'Grupos de circuitos', itemLabel: (p) => p.fields.title.fields.es.value || 'Grupo' },
        ),
      },
    }),

    /* --------------------------- Inicio ---------------------------- */
    inicio: singleton({
      label: 'Inicio',
      path: 'src/content/paginas/inicio',
      format: { data: 'json' },
      schema: {
        metaTitle: bi('Título en la pestaña y en Google'),
        hero: fields.object(
          {
            kicker: bi('Frase superior'),
            title: bi('Título', { description: BOLD }),
            lead: bi('Subtítulo', { multiline: true }),
            cta: bi('Texto del botón'),
          },
          { label: 'Portada' },
        ),
        tours: fields.object(
          {
            kicker: bi('Frase superior'),
            title: bi('Título', { description: BOLD }),
            lead: bi('Subtítulo', { multiline: true }),
            featured: fields.multiRelationship({
              label: 'Tours del carrusel (en orden)',
              collection: 'tours',
            }),
            cta: bi('Texto del botón'),
          },
          { label: 'Carrusel de tours' },
        ),
        spotlight: fields.object(
          {
            kicker: bi('Frase superior'),
            package: fields.relationship({
              label: 'Paquete destacado',
              description: 'Debe tener «información completa».',
              collection: 'paquetes',
              validation: { isRequired: true },
            }),
            cta: bi('Texto del botón'),
          },
          { label: 'Tour del momento' },
        ),
        modes: fields.object(
          {
            kicker: bi('Frase superior'),
            title: bi('Título', { description: BOLD }),
            items: fields.array(
              fields.object({
                title: bi('Título'),
                text: bi('Texto', { multiline: true }),
                image: photoAlt('Foto', 'paginas/inicio', true),
              }),
              { label: 'Modalidades', itemLabel: (p) => p.fields.title.fields.es.value || 'Modalidad' },
            ),
          },
          { label: 'Modalidades de viaje' },
        ),
      },
    }),

    paginaTours: singleton({
      label: 'Página Tours',
      path: 'src/content/paginas/tours',
      format: { data: 'json' },
      schema: {
        meta: metaFields(),
        hero: heroFields('paginas/tours'),
        description: biList('Texto de introducción', 'Párrafo', { multiline: true, description: BOLD }),
      },
    }),
    paginaPaquetes: singleton({
      label: 'Página Paquetes',
      path: 'src/content/paginas/paquetes',
      format: { data: 'json' },
      schema: {
        meta: metaFields(),
        hero: heroFields('paginas/paquetes'),
        description: biList('Texto de introducción', 'Párrafo', { multiline: true, description: BOLD }),
      },
    }),
    paginaCircuitos: singleton({
      label: 'Página Circuitos',
      path: 'src/content/paginas/circuitos',
      format: { data: 'json' },
      schema: {
        meta: metaFields(),
        hero: heroFields('paginas/circuitos'),
        description: biList('Texto de introducción', 'Párrafo', { multiline: true, description: BOLD }),
      },
    }),

    /* -------------------------- Nosotros --------------------------- */
    nosotros: singleton({
      label: 'Nosotros',
      path: 'src/content/paginas/nosotros',
      format: { data: 'json' },
      schema: {
        meta: metaFields(),
        hero: heroFields('paginas/nosotros'),
        letter: fields.object(
          {
            greeting: bi('Saludo'),
            rows: fields.array(
              fields.object({
                text: biList('Párrafos', 'Párrafo', { multiline: true, description: BOLD }),
                image: photoAlt('Foto', 'paginas/nosotros', true),
              }),
              { label: 'Bloques de la carta', itemLabel: (p) => p.fields.text.elements[0]?.fields.es.value.slice(0, 60) || 'Bloque' },
            ),
            farewell: bi('Despedida'),
            signature: bi('Firma'),
          },
          { label: 'Carta de bienvenida' },
        ),
        statsKicker: bi('Título de las cifras'),
        closing: fields.object(
          {
            title: bi('Título', { description: BOLD }),
            image: photoAlt('Foto', 'paginas/nosotros', true),
            cta: bi('Texto del botón'),
          },
          { label: 'Cierre' },
        ),
      },
    }),

    /* ------------------------ Datos generales ---------------------- */
    general: singleton({
      label: 'Contacto y datos generales',
      path: 'src/content/ajustes/general',
      format: { data: 'json' },
      schema: {
        description: bi('Descripción del sitio (Google y redes)', { multiline: true }),
        email: fields.text({ label: 'Correo de reservas', validation: { length: { min: 3 } } }),
        whatsapp: fields.text({
          label: 'Número de WhatsApp',
          description: 'Con código de país, solo números. P. ej. 529511138305',
          validation: { length: { min: 10 } },
        }),
        phones: fields.array(
          fields.object({
            label: fields.text({ label: 'Cómo se muestra', description: 'P. ej. +52 (951) 515 55 51' }),
            number: fields.text({ label: 'Número para marcar', description: 'Con código de país, solo números. P. ej. 529515155551' }),
            whatsapp: fields.checkbox({ label: 'Es WhatsApp', description: 'El enlace abre WhatsApp en lugar de llamar.' }),
          }),
          { label: 'Teléfonos', itemLabel: (p) => p.fields.label.value || 'Teléfono' },
        ),
        social: fields.array(
          fields.object({
            name: fields.select({
              label: 'Red',
              options: [
                { label: 'Instagram', value: 'Instagram' },
                { label: 'Facebook', value: 'Facebook' },
                { label: 'X', value: 'X' },
              ],
              defaultValue: 'Instagram',
            }),
            href: fields.url({ label: 'Enlace' }),
          }),
          { label: 'Redes sociales', itemLabel: (p) => p.fields.name.value },
        ),
        stats: fields.array(
          fields.object({
            value: fields.text({ label: 'Cifra', description: 'P. ej. 34 o 50,000' }),
            label: bi('Texto'),
          }),
          { label: 'Cifras (página Nosotros)', itemLabel: (p) => `${p.fields.value.value} ${p.fields.label.fields.es.value}` },
        ),
      },
    }),
  },
});
