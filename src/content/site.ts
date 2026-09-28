/**
 * CONTENIDO DEL SITIO
 * ------------------------------------------------------------------
 * Los componentes solo leen de este archivo; nunca repiten un dato.
 *
 * Qué se edita dónde:
 *   - Tours, paquetes, circuitos, textos de páginas, contacto y cifras →
 *     panel /keystatic (se guardan como JSON en src/content/ y las fotos
 *     en src/assets/). Este archivo los carga y les da forma.
 *   - Textos de interfaz (botones, menús, formulario), navegación, logos
 *     de aliados, capas del hero y aviso de privacidad → aquí mismo.
 *
 * Textos: cada texto es `{ es, en }`. El inglés es un BORRADOR traducido
 * a partir del sitio v2; pendiente de revisión por un nativo. Si falta
 * el inglés, la web muestra el español (ver `tr()` en src/lib/i18n.ts).
 *
 * Imágenes: rutas relativas a src/assets — Astro genera tamaños WebP
 * automáticamente (ver src/components/Photo.astro). Logos, marca y capas
 * del hero viven en /public porque se usan tal cual.
 */

export type Lang = 'es' | 'en';
export type Text = { es: string; en?: string };
const t = (es: string, en?: string): Text => ({ es, en });

export type Img = { src: string; alt: Text };

/* ------------------------------------------------------------------ */
/* Datos editables desde Keystatic (src/content/**.json)               */
/* ------------------------------------------------------------------ */

type Json = any; // la forma la define y valida keystatic.config.ts
const load = (files: Record<string, Json>) =>
  Object.entries(files).map(([path, data]) => ({ slug: path.split('/').pop()!.replace(/\.json$/, ''), data }));
const one = (files: Record<string, Json>): Json => Object.values(files)[0];

const tourFiles = load(import.meta.glob('./tours/*.json', { eager: true, import: 'default' }));
const packageFiles = load(import.meta.glob('./paquetes/*.json', { eager: true, import: 'default' }));
const general = one(import.meta.glob('./ajustes/general.json', { eager: true, import: 'default' }));
const circuitsData = one(import.meta.glob('./ajustes/circuitos.json', { eager: true, import: 'default' }));
const home = one(import.meta.glob('./paginas/inicio.json', { eager: true, import: 'default' }));
const pageTours = one(import.meta.glob('./paginas/tours.json', { eager: true, import: 'default' }));
const pagePackages = one(import.meta.glob('./paginas/paquetes.json', { eager: true, import: 'default' }));
const pageCircuits = one(import.meta.glob('./paginas/circuitos.json', { eager: true, import: 'default' }));
const pageAbout = one(import.meta.glob('./paginas/nosotros.json', { eager: true, import: 'default' }));

/** Texto de Keystatic → Text. El inglés vacío cuenta como "falta". */
const T = (x?: { es?: string; en?: string } | null): Text => ({ es: x?.es ?? '', en: x?.en || undefined });
/** Texto opcional: undefined si el español está vacío. */
const Topt = (x?: { es?: string; en?: string } | null): Text | undefined => (x?.es ? T(x) : undefined);
/** Foto de Keystatic → Img (undefined si no hay archivo). */
const I = (x?: { src?: string | null; alt?: Json } | null): Img | undefined => (x?.src ? { src: x.src, alt: T(x.alt) } : undefined);
const byOrder = (a: { data: Json }, b: { data: Json }) => (a.data.order ?? 99) - (b.data.order ?? 99);

/* ------------------------------------------------------------------ */
/* Marca y contacto                                                    */
/* ------------------------------------------------------------------ */

export const site = {
  name: 'Quetzal Tours',
  legalName: 'Quetzal Tour Operator',
  hashtag: '#PorElMundoDeQuetzal',
  /** Firma del pie: el mismo hashtag con juego de pesos. */
  signature: '#PorEl**Mundo**DeQuetzal',
  description: T(general.description),
  logo: {
    // Solo existe en blanco (webp). Se pinta con CSS mask para que
    // funcione en ambos temas. TODO(cliente): logo en SVG.
    src: '/brand/Logo-Quetzal-2019.webp',
    width: 450,
    height: 255,
  },
  favicon: '/brand/32.png', // TODO(cliente): favicon en alta (SVG o 512px)
  /** Imagen para redes sociales (Open Graph). */
  ogImage: '/hero/sierra-fondo-1728.webp',
  stats: (general.stats as Json[]).map((s) => ({ value: String(s.value), label: T(s.label) })),
};

type Phone = { label: string; href: string; whatsapp?: true };
const digits = (s: string) => String(s).replace(/\D/g, '');

export const contact = {
  phones: (general.phones as Json[]).map((p): Phone =>
    p.whatsapp
      ? { label: p.label, href: `https://wa.me/${digits(p.number)}`, whatsapp: true }
      : { label: p.label, href: `tel:+${digits(p.number)}` },
  ),
  whatsapp: `https://wa.me/${digits(general.whatsapp)}`,
  email: general.email as string,
  emailHref: `mailto:${general.email}?subject=${encodeURIComponent('¡Hola, Quetzal Tours!')}`,
  /**
   * Destino del formulario: script PHP en Hostinger (public/api/enviar.php),
   * que envía por SMTP a reservas@. Si se pone en null, el formulario abre
   * el correo del visitante con el mensaje ya redactado.
   */
  formEndpoint: '/api/enviar.php' as string | null,
  social: (general.social as Json[]).map((s) => ({ name: s.name as string, href: s.href as string })),
};

export type Partner = { name: string; src: string; width: number; height: number };
/** Logos blancos con transparencia: se pintan con máscara CSS (currentColor). */
export const partners: Partner[] = [
  { name: 'Secretaría de Turismo', src: '/logos/68a693dffdd331811e02207f_SECTUR_Logo_2019.png', width: 149, height: 35 },
  { name: 'Turismo Oaxaca', src: '/logos/68a693dffdd331811e0220b4_turismo_LOGO.webp', width: 147, height: 36 },
  { name: 'Asociación Mexicana de Agencias de Viajes', src: '/logos/68a693dffdd331811e022108_AMAV.png', width: 1100, height: 489 },
  { name: 'Tripadvisor', src: '/logos/68a693dffdd331811e02207e_tripadvisor-1.webp', width: 100, height: 47 },
  { name: 'Lonely Planet', src: '/logos/68a693dffdd331811e022081_lonelyplanet-1.png', width: 100, height: 50 },
  { name: 'Huatulco', src: '/logos/68a693dffdd331811e02211d_5b0ea5_7497579a36a74d848b7512e7022c9e81~mv2.png', width: 620, height: 339 },
];

/* ------------------------------------------------------------------ */
/* Navegación                                                          */
/* ------------------------------------------------------------------ */

export const nav = [
  { key: 'tours', href: '/tours', label: t('Tours en Oaxaca', 'Oaxaca Tours') },
  { key: 'paquetes', href: '/paquetes', label: t('Paquetes vacacionales', 'Vacation Packages') },
  { key: 'circuitos', href: '/circuitos', label: t('Circuitos turísticos', 'Tour Circuits') },
  { key: 'nosotros', href: '/nosotros', label: t('Nosotros', 'About Us') },
] as const;
// Hoteles existe en el v2 ("Página en construcción") pero no está en el
// mapa de docs/03, así que queda fuera.

/* ------------------------------------------------------------------ */
/* Textos de interfaz reutilizados                                     */
/* ------------------------------------------------------------------ */

export const ui = {
  skipToContent: t('Saltar al contenido', 'Skip to content'),
  homeLink: t('Quetzal Tours, inicio', 'Quetzal Tours, home'),
  breadcrumb: t('Ruta de navegación', 'Breadcrumb'),
  notFoundTitle: t('No encontramos esta página', 'We couldn\'t find this page'),
  notFoundText: t('Puede que el enlace haya cambiado. Estas son buenas formas de seguir:', 'The link may have changed. Here are good ways to continue:'),
  goHome: t('Ir al inicio', 'Go to home'),
  defaultSubject: t('¡Hola, Quetzal Tours!', 'Hello, Quetzal Tours!'),
  menu: t('Menú', 'Menu'),
  close: t('Cerrar', 'Close'),
  themeLight: t('Tema claro', 'Light theme'),
  themeDark: t('Tema oscuro', 'Dark theme'),
  language: t('Idioma', 'Language'),
  bookCta: t('Reserva tu tour', 'Book your tour'),
  openMenu: t('Abrir menú', 'Open menu'),
  closeMenu: t('Cerrar menú', 'Close menu'),
  backToTop: t('Volver arriba', 'Back to top'),
  explore: t('Explora', 'Explore'),
  contactTitleShort: t('Contacto', 'Contact'),
  callUs: t('Llámanos', 'Call us'),
  writeUs: t('Escríbenos', 'Write to us'),
  whatsapp: t('WhatsApp', 'WhatsApp'),
  email: t('Correo', 'Email'),
  contactCta: t('Escríbenos', 'Write to us'),
  whatsappCta: t('Escríbenos por WhatsApp', 'Message us on WhatsApp'),
  seeTour: t('Ver tour', 'View tour'),
  seeAllTours: t('Ver más tours', 'See more tours'),
  prevTours: t('Tours anteriores', 'Previous tours'),
  nextTours: t('Tours siguientes', 'Next tours'),
  seasonal: t('Temporada', 'Seasonal'),
  moreInfo: t('Más información', 'More information'),
  hours: t('h', 'h'),
  includes: t('Incluye', 'Includes'),
  excludes: t('No incluye', 'Not included'),
  itinerary: t('Itinerario', 'Itinerary'),
  gallery: t('Galería', 'Gallery'),
  whatYouDo: t('Lo que harás', 'What you\'ll do'),
  description: t('Descripción', 'Description'),
  bookSection: t('Reserva', 'Book'),
  bookThisTour: t('Reserva este tour', 'Book this tour'),
  askWhatsapp: t('Pregunta por WhatsApp', 'Ask on WhatsApp'),
  whatsappTourMsg: t('Hola, me interesa el tour', 'Hi, I\'m interested in the tour'),
  duration: t('Duración', 'Duration'),
  region: t('Región', 'Region'),
  onThisPage: t('En esta página', 'On this page'),
  seePhotos: t('Ver fotos', 'See photos'),
  previous: t('Anterior', 'Previous'),
  next: t('Siguiente', 'Next'),
  stop: t('Parada', 'Stop'),
  breadcrumbTours: t('Tours en Oaxaca', 'Oaxaca Tours'),
  priceOnRequest: t('Precio bajo consulta', 'Price on request'),
  all: t('Todos', 'All'),
  filterBy: t('Filtrar por categoría', 'Filter by category'),
  days: t('días', 'days'),
  askAvailability: t('Consulta disponibilidad', 'Check availability'),
  whatsappCircuitMsg: t('Hola, me interesa el circuito', 'Hi, I\'m interested in the circuit'),
  whatsappPackageMsg: t('Hola, me interesa el paquete', 'Hi, I\'m interested in the package'),
  toursCount: t('tours', 'tours'),
  comingSoon: t('Detalles por WhatsApp', 'Details on WhatsApp'),
  similarTours: t('Tours similares', 'Similar tours'),
  departures: t('Salidas', 'Departures'),
  serviceNote: t(
    'El orden de los servicios puede ser modificado por causas de fuerza mayor ajenas a la Empresa, o para un mejor desarrollo de las actividades.',
  ),
  partnersTitle: t('En colaboración con', 'In partnership with'),
  contactKicker: t('Queremos escucharte', 'We want to hear from you'),
  contactTitle: t('¡Escríbenos y **reserva**!', 'Write to us and **book**!'),
  followUs: t('Síguenos', 'Follow us'),
  copyright: t('Quetzal Tour Operator. Todos los derechos reservados.', 'Quetzal Tour Operator. All rights reserved.'),
  legal: [{ href: '/aviso-de-privacidad', label: t('Aviso de privacidad', 'Privacy notice') }],
  form: {
    title: t('Déjanos un mensaje', 'Leave us a message'),
    name: t('Tu nombre', 'Your name'),
    email: t('Tu correo electrónico', 'Your email'),
    subject: t('Asunto', 'Subject'),
    message: t('Tu mensaje', 'Your message'),
    required: t('requerido', 'required'),
    submit: t('Enviar mensaje', 'Send message'),
    sending: t('Enviando…', 'Sending…'),
    invalidName: t('Escribe tu nombre.', 'Please enter your name.'),
    invalidEmail: t('Escribe un correo válido, por ejemplo nombre@correo.com.', 'Please enter a valid email, for example name@email.com.'),
    consent: t('Al enviar el formulario aceptas el tratamiento de tus datos conforme a nuestro', 'By sending this form you agree to the processing of your data under our'),
    mailtoNote: t('Se abrirá tu aplicación de correo con el mensaje listo para enviar.', 'Your email app will open with the message ready to send.'),
    success: t('¡Gracias! Tu mensaje ha sido enviado, nos pondremos en contacto contigo.', 'Thank you! Your message has been sent; we\'ll get back to you soon.'),
    error: t('¡Ups! Parece que algo salió mal con el mensaje. Intenta nuevamente.', 'Oops! Something went wrong with your message. Please try again.'),
  },
} as const;

/* ------------------------------------------------------------------ */
/* Tours                                                               */
/* ------------------------------------------------------------------ */

export const tourCategories = {
  arqueologia: t('Arqueología', 'Archaeology'),
  colonial: t('Colonial', 'Colonial'),
  gastronomia: t('Gastronomía', 'Gastronomy'),
  arte: t('Arte', 'Art'),
  ecoturismo: t('Ecoturismo', 'Ecotourism'),
} as const;
export type TourCategory = keyof typeof tourCategories;

/** Una parada de "Lo que harás" (patrón Airbnb). */
export type Stop = { title: Text; text?: Text; image?: Img };

export type Tour = {
  slug: string;
  name: Text;
  category: TourCategory;
  /** Duración en horas, tal como la publica el v2. */
  duration: string;
  region: Text;
  /** Portada gráfica de marca (1350×440 y recorte 810×440). */
  banner: string;
  /** Foto real para tarjetas y cabecera. `undefined` = falta. */
  cover?: Img;
  /** Una frase para tarjetas y hero del detalle. */
  summary?: Text;
  /** `false` = el v2 lo lista pero no tiene página de detalle. */
  hasDetail: boolean;
  detail?: {
    subtitle: Text;
    /** Párrafos. `**texto**` marca los destinos que el v2 resalta. */
    body: Text[];
    departures: Text;
    stops: Stop[];
    includes: Text[];
    excludes: Text[];
    itinerary: { label: Text; value: Text }[];
    gallery: Img[];
  };
  /** TODO(cliente): el v2 no publica precios. */
  price?: { from: number; currency: 'MXN' | 'USD' };
};


export const tours: Tour[] = tourFiles.sort(byOrder).map(({ slug, data: d }) => {
  const x = d.detail?.discriminant ? d.detail.value : null;
  return {
    slug,
    name: T({ es: d.name, en: d.nameEn }),
    category: d.category,
    duration: String(d.duration),
    region: T(d.region),
    banner: d.banner,
    cover: I(d.cover),
    summary: Topt(d.summary),
    hasDetail: !!x,
    detail: x
      ? {
          subtitle: T(x.subtitle),
          body: (x.body as Json[]).map(T),
          departures: T(x.departures),
          stops: (x.stops as Json[]).map((s) => ({ title: T(s.title), text: Topt(s.text), image: I(s.image) })),
          includes: (x.includes as Json[]).map(T),
          excludes: (x.excludes as Json[]).map(T),
          itinerary: (x.itinerary as Json[]).map((r) => ({ label: T(r.label), value: T(r.value) })),
          gallery: (x.gallery as Json[]).map(I).filter((g): g is Img => !!g),
        }
      : undefined,
  };
});

/* ------------------------------------------------------------------ */
/* Paquetes vacacionales                                               */
/* ------------------------------------------------------------------ */

export type Package = {
  slug: string;
  name: Text;
  summary?: Text;
  cover?: Img;
  hasDetail: boolean;
  dates?: Text;
  body?: Text[];
  includes?: Text[];
};

export const packages: Package[] = packageFiles.sort(byOrder).map(({ slug, data: d }) => {
  const x = d.detail?.discriminant ? d.detail.value : null;
  return {
    slug,
    name: T({ es: d.name, en: d.nameEn }),
    summary: Topt(d.summary),
    cover: I(d.cover),
    hasDetail: !!x,
    dates: x ? Topt(x.dates) : undefined,
    body: x ? (x.body as Json[]).map(T) : undefined,
    includes: x ? (x.includes as Json[]).map(T) : undefined,
  };
});

/* ------------------------------------------------------------------ */
/* Circuitos turísticos                                                */
/* ------------------------------------------------------------------ */

export type Circuit = { code: string; name: Text; days: string };
export type CircuitGroup = { title: Text; items: Circuit[] };

export const circuits: CircuitGroup[] = (circuitsData.groups as Json[]).map((g) => ({
  title: T(g.title),
  items: (g.items as Json[]).map((c) => ({ code: c.code, name: T(c.name), days: c.days })),
}));

/* ------------------------------------------------------------------ */
/* Páginas                                                             */
/* ------------------------------------------------------------------ */

const hero = (h: Json) => ({ title: T(h.title), lead: T(h.lead), image: I(h.image)! });
const meta = (m: Json) => ({ title: T(m.title), description: T(m.description) });

export const pages = {
  home: {
    meta: { title: T(home.metaTitle), description: site.description },
    hero: {
      kicker: T(home.hero.kicker),
      title: T(home.hero.title),
      lead: T(home.hero.lead),
      cta: { label: T(home.hero.cta), href: '/tours' },
      /** Palabra gigante que queda detrás de la sierra (decorativa). */
      stamp: 'Oaxaca',
      // Capas del hero de profundidad (ref. Vita), generadas a partir de
      // 678f166d107ac72cf091bca5_Container.png (3:2). El frente es la misma
      // foto recortada por la línea de la sierra; empieza al 38.19 % de alto.
      layers: {
        alt: t('Sierra de Oaxaca bajo cielo turquesa', 'Oaxaca\'s sierra under a turquoise sky'),
        ratio: 1728 / 1152,
        frontTop: 0.3819,
        background: { 1080: '/hero/sierra-fondo-1080.webp', 1728: '/hero/sierra-fondo-1728.webp' },
        foreground: { 1080: '/hero/sierra-frente-1080.webp', 1728: '/hero/sierra-frente-1728.webp' },
      },
    },
    tours: {
      kicker: T(home.tours.kicker),
      title: T(home.tours.title),
      lead: T(home.tours.lead),
      featured: home.tours.featured as string[],
      cta: { label: T(home.tours.cta), href: '/tours' },
    },
    /** "Tour del momento": sección temporal (se elige el paquete en el panel). */
    spotlight: {
      kicker: T(home.spotlight.kicker),
      packageSlug: home.spotlight.package as string,
      cta: { label: T(home.spotlight.cta) },
    },
    modes: {
      kicker: T(home.modes.kicker),
      title: T(home.modes.title),
      items: (home.modes.items as Json[]).map((m) => ({ title: T(m.title), text: T(m.text), image: I(m.image)! })),
    },
  },
  tours: { meta: meta(pageTours.meta), hero: hero(pageTours.hero), description: (pageTours.description as Json[]).map(T) },
  paquetes: { meta: meta(pagePackages.meta), hero: hero(pagePackages.hero), description: (pagePackages.description as Json[]).map(T) },
  circuitos: { meta: meta(pageCircuits.meta), hero: hero(pageCircuits.hero), description: (pageCircuits.description as Json[]).map(T) },
  nosotros: {
    meta: meta(pageAbout.meta),
    hero: hero(pageAbout.hero),
    /** Carta de bienvenida del v2, repartida en filas (layout Lightship). */
    letter: {
      greeting: T(pageAbout.letter.greeting),
      rows: (pageAbout.letter.rows as Json[]).map((r) => ({ text: (r.text as Json[]).map(T), image: I(r.image)! })),
      farewell: T(pageAbout.letter.farewell),
      signature: T(pageAbout.letter.signature),
    },
    stats: { kicker: T(pageAbout.statsKicker) },
    closing: { title: T(pageAbout.closing.title), image: I(pageAbout.closing.image)!, cta: { label: T(pageAbout.closing.cta) } },
  },
};

/* ------------------------------------------------------------------ */
/* Aviso de privacidad (LFPDPPP, México)                               */
/* ------------------------------------------------------------------ */

/** Bloque de texto: párrafo o lista. {RAZON_SOCIAL} y {DOMICILIO} se sustituyen al mostrarlo. */
export type LegalBlock = Text | { list: Text[] };

export const privacy = {
  slug: '/aviso-de-privacidad',
  meta: {
    title: t('Aviso de privacidad', 'Privacy notice'),
    description: t(
      'Cómo Quetzal Tour Operator recaba, usa y protege tus datos personales, y cómo ejercer tus derechos ARCO.',
      'How Quetzal Tour Operator collects, uses and protects your personal data, and how to exercise your ARCO rights.',
    ),
  },
  updated: t('26 de septiembre de 2026', 'September 26, 2026'),
  updatedLabel: t('Última actualización', 'Last updated'),
  courtesyNote: t('', 'This English version is a courtesy translation. In case of any discrepancy, the Spanish version prevails.'),
  /** Si alguno fuera null, se mostraría marcado como pendiente. */
  company: {
    legalEntity: 'Agencia de Viajes Quetzal' as string | null,
    address: 'Huiyatoo 102-101, Col. Álamos Infonavit, C.P. 68143, Oaxaca de Juárez, Oaxaca, México' as string | null,
  },
  pending: { legalEntity: t('razón social pendiente', 'legal entity name pending'), address: t('domicilio pendiente', 'address pending') },
  sections: [
    {
      id: 'responsable',
      title: t('1. Identidad y domicilio del responsable', '1. Identity and address of the data controller'),
      body: [
        t(
          '{RAZON_SOCIAL}, que opera comercialmente como **Quetzal Tour Operator** («Quetzal Tours», «nosotros»), con domicilio en {DOMICILIO}, es responsable del tratamiento de tus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y demás normativa aplicable.',
          '{RAZON_SOCIAL}, doing business as **Quetzal Tour Operator** ("Quetzal Tours", "we"), with its address at {DOMICILIO}, is responsible for the processing of your personal data under Mexico\'s Federal Law on the Protection of Personal Data Held by Private Parties and other applicable regulations.',
        ),
        t(
          'Para cualquier asunto relacionado con tus datos personales puedes escribirnos a **reservas@quetzaltours.com.mx** o llamarnos al **+52 (951) 515 55 51**.',
          'For any matter related to your personal data, write to us at **reservas@quetzaltours.com.mx** or call us at **+52 (951) 515 55 51**.',
        ),
      ] as LegalBlock[],
    },
    {
      id: 'datos',
      title: t('2. Datos personales que recabamos', '2. Personal data we collect'),
      body: [
        t('Según el servicio que nos solicites, podemos recabar:', 'Depending on the service you request, we may collect:'),
        {
          list: [
            t('**Identificación y contacto:** nombre, correo electrónico, teléfono o WhatsApp.', '**Identification and contact:** name, email address, phone or WhatsApp number.'),
            t('**Datos del viaje:** tour, paquete o circuito de interés, fechas, número de viajeros, hotel o alojamiento para la recogida, idioma preferido y peticiones especiales.', '**Trip details:** tour, package or circuit of interest, dates, number of travelers, hotel or lodging for pickup, preferred language and special requests.'),
            t('**Para paquetes y circuitos con hospedaje o vuelos:** los datos que exigen hoteles, aerolíneas y aseguradoras, como nombre completo tal como aparece en tu identificación, fecha de nacimiento, nacionalidad y número de pasaporte o identificación oficial.', '**For packages and circuits with lodging or flights:** the data required by hotels, airlines and insurers, such as your full name as it appears on your ID, date of birth, nationality and passport or official ID number.'),
            t('**Facturación**, si solicitas factura: nombre o razón social, RFC, domicilio fiscal y régimen fiscal.', '**Invoicing**, if you request an invoice: name or company name, tax ID (RFC), tax address and tax regime.'),
          ],
        },
        t(
          '**Datos sensibles:** no los solicitamos. Si decides compartirnos información de salud (por ejemplo, alergias alimentarias o necesidades de movilidad) para adaptar tu experiencia, la usaremos únicamente con ese fin y con tu consentimiento expreso, que otorgas al enviárnosla.',
          '**Sensitive data:** we do not request it. If you choose to share health information with us (for example, food allergies or mobility needs) so we can adapt your experience, we will use it solely for that purpose and with your express consent, which you give by sending it to us.',
        ),
        t(
          '**Menores de edad:** los datos de menores que viajen con nosotros deben proporcionarlos su madre, padre o tutor, quien otorga el consentimiento correspondiente.',
          '**Minors:** data of minors traveling with us must be provided by their parent or legal guardian, who gives the corresponding consent.',
        ),
      ] as LegalBlock[],
    },
    {
      id: 'obtencion',
      title: t('3. Cómo obtenemos tus datos', '3. How we obtain your data'),
      body: [
        t(
          'Directamente de ti, cuando nos escribes a través del formulario de este sitio, por correo electrónico, por teléfono, por WhatsApp o por nuestras redes sociales, o cuando nos visitas en persona.',
          'Directly from you, when you contact us through the form on this site, by email, by phone, via WhatsApp or our social media, or when you visit us in person.',
        ),
      ] as LegalBlock[],
    },
    {
      id: 'finalidades',
      title: t('4. Para qué usamos tus datos', '4. How we use your data'),
      body: [
        t('**Finalidades primarias**, necesarias para prestarte el servicio:', '**Primary purposes**, necessary to provide the service:'),
        {
          list: [
            t('Responder tus mensajes, solicitudes de información y cotizaciones.', 'Replying to your messages, information requests and quotes.'),
            t('Reservar y prestar los tours, paquetes y circuitos que contrates.', 'Booking and providing the tours, packages and circuits you purchase.'),
            t('Coordinar la recogida en tu hotel, el transporte y los guías.', 'Coordinating hotel pickup, transportation and guides.'),
            t('Contratar en tu nombre hospedaje, vuelos, entradas y demás servicios incluidos.', 'Booking lodging, flights, entrance tickets and other included services on your behalf.'),
            t('Gestionar el seguro de viajero a bordo.', 'Managing traveler insurance on board.'),
            t('Informarte de cambios en tu itinerario.', 'Informing you of changes to your itinerary.'),
            t('Gestionar pagos y emitir facturas.', 'Processing payments and issuing invoices.'),
            t('Cumplir obligaciones legales y atender requerimientos de autoridades.', 'Complying with legal obligations and requests from authorities.'),
          ],
        },
        t('**Finalidades secundarias**, que no son necesarias para el servicio:', '**Secondary purposes**, not necessary for the service:'),
        {
          list: [
            t('Enviarte promociones, novedades y temporadas especiales.', 'Sending you promotions, news and special seasons.'),
            t('Invitarte a encuestas de satisfacción.', 'Inviting you to satisfaction surveys.'),
          ],
        },
        t(
          'Si no deseas que usemos tus datos para las finalidades secundarias, escríbenos en cualquier momento a **reservas@quetzaltours.com.mx** con el asunto «No deseo publicidad». Tu negativa no afectará los servicios que contrates con nosotros.',
          'If you do not want us to use your data for secondary purposes, write to us at any time at **reservas@quetzaltours.com.mx** with the subject "No advertising". Declining will not affect the services you purchase from us.',
        ),
      ] as LegalBlock[],
    },
    {
      id: 'transferencias',
      title: t('5. Con quién compartimos tus datos', '5. Who we share your data with'),
      body: [
        t(
          'No vendemos ni cedemos tus datos. Solo los compartimos cuando es necesario para prestarte el servicio que contrataste o cuando la ley lo exige:',
          'We do not sell or rent your data. We only share it when necessary to provide the service you purchased or when required by law:',
        ),
        {
          list: [
            t('Hoteles, transportistas, guías certificados, aerolíneas, aseguradoras y administradores de sitios y espectáculos, en México y, para circuitos por Centroamérica, en los países que visites.', 'Hotels, transportation companies, certified guides, airlines, insurers and site or show operators, in Mexico and, for Central America circuits, in the countries you visit.'),
            t('Autoridades competentes, cuando exista un requerimiento legal.', 'Competent authorities, when legally required.'),
          ],
        },
        t(
          'Estas transferencias no requieren tu consentimiento porque son necesarias para cumplir el servicio que contrataste o una obligación legal. Además, usamos proveedores que tratan datos por nuestra cuenta, como el servicio de alojamiento web y correo electrónico, obligados a protegerlos.',
          'These transfers do not require your consent because they are necessary to fulfill the service you purchased or a legal obligation. We also use providers that process data on our behalf, such as our web hosting and email service, who are bound to protect it.',
        ),
      ] as LegalBlock[],
    },
    {
      id: 'arco',
      title: t('6. Tus derechos ARCO', '6. Your ARCO rights'),
      body: [
        t(
          'Tienes derecho a **Acceder** a tus datos, **Rectificarlos** si son inexactos, **Cancelarlos** cuando consideres que no se requieren para las finalidades señaladas y **Oponerte** a su uso para fines específicos.',
          'You have the right to **Access** your data, **Rectify** it if inaccurate, **Cancel** it when you believe it is no longer needed for the stated purposes, and **Object** to its use for specific purposes.',
        ),
        t('Para ejercerlos, envía una solicitud a **reservas@quetzaltours.com.mx** que incluya:', 'To exercise them, send a request to **reservas@quetzaltours.com.mx** including:'),
        {
          list: [
            t('Tu nombre y un medio para comunicarte la respuesta.', 'Your name and a way to send you our response.'),
            t('Copia de tu identificación oficial o, si actúas en representación de alguien, el documento que lo acredite.', 'A copy of your official ID or, if acting on someone else\'s behalf, proof of representation.'),
            t('La descripción clara de los datos y del derecho que deseas ejercer.', 'A clear description of the data and the right you wish to exercise.'),
            t('En caso de rectificación, la corrección que solicitas y, si aplica, documentos que la respalden.', 'For rectification, the correction you request and, if applicable, supporting documents.'),
          ],
        },
        t(
          'Te responderemos en un plazo máximo de 20 días hábiles. Si tu solicitud procede, la haremos efectiva dentro de los 15 días hábiles siguientes a nuestra respuesta.',
          'We will respond within a maximum of 20 business days. If your request is granted, we will carry it out within 15 business days of our response.',
        ),
      ] as LegalBlock[],
    },
    {
      id: 'revocacion',
      title: t('7. Revocar tu consentimiento o limitar el uso de tus datos', '7. Revoking consent or limiting the use of your data'),
      body: [
        t(
          'Puedes revocar tu consentimiento o pedir que limitemos el uso o la divulgación de tus datos por el mismo medio y con los mismos requisitos del apartado anterior. Ten en cuenta que, si la revocación afecta datos necesarios para un servicio en curso, es posible que no podamos continuar prestándolo.',
          'You can revoke your consent or ask us to limit the use or disclosure of your data through the same channel and with the same requirements as the previous section. Please note that if revocation affects data needed for an ongoing service, we may be unable to continue providing it.',
        ),
      ] as LegalBlock[],
    },
    {
      id: 'sitio',
      title: t('8. Uso de tecnologías en este sitio', '8. Technologies used on this site'),
      body: [
        {
          list: [
            t('**No usamos cookies de rastreo, de analítica ni de publicidad.**', '**We do not use tracking, analytics or advertising cookies.**'),
            t('Guardamos en tu navegador (almacenamiento local) únicamente tu preferencia de tema claro u oscuro. Puedes borrarla desde la configuración de tu navegador.', 'We only store your light or dark theme preference in your browser (local storage). You can delete it from your browser settings.'),
            t('Para evitar el envío masivo de spam, el formulario conserva durante 10 minutos un identificador cifrado derivado de tu dirección IP; no guardamos la IP.', 'To prevent spam, the contact form keeps an encrypted identifier derived from your IP address for 10 minutes; we do not store the IP itself.'),
            t('Nuestro servidor registra datos técnicos de las visitas (dirección IP, fecha y página consultada) con fines de seguridad y funcionamiento.', 'Our server logs technical visit data (IP address, date and page viewed) for security and operational purposes.'),
            t('Los enlaces a WhatsApp, Facebook, Instagram y X te llevan a servicios de terceros que se rigen por sus propias políticas de privacidad.', 'Links to WhatsApp, Facebook, Instagram and X take you to third-party services governed by their own privacy policies.'),
          ],
        },
      ] as LegalBlock[],
    },
    {
      id: 'conservacion',
      title: t('9. Conservación de tus datos', '9. Data retention'),
      body: [
        t(
          'Conservamos tus datos solo durante el tiempo necesario para cumplir las finalidades descritas y las obligaciones legales aplicables, como las fiscales. Después los eliminamos de forma segura.',
          'We keep your data only for as long as necessary to fulfill the purposes described and applicable legal obligations, such as tax requirements. After that, we securely delete it.',
        ),
      ] as LegalBlock[],
    },
    {
      id: 'cambios',
      title: t('10. Cambios a este aviso', '10. Changes to this notice'),
      body: [
        t(
          'Podemos actualizar este aviso de privacidad. Cualquier cambio se publicará en esta misma página, indicando la fecha de la última actualización.',
          'We may update this privacy notice. Any change will be published on this page, showing the date of the latest update.',
        ),
        t(
          'Si consideras que tu derecho a la protección de datos personales ha sido vulnerado, puedes acudir ante la autoridad competente en materia de protección de datos personales.',
          'If you believe your right to personal data protection has been violated, you may file a complaint with the competent data protection authority.',
        ),
      ] as LegalBlock[],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Selectores                                                          */
/* ------------------------------------------------------------------ */

export const getTour = (slug: string) => tours.find((x) => x.slug === slug);
export const getPackage = (slug: string) => packages.find((x) => x.slug === slug);
