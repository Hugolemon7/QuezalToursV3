/**
 * ÚNICA FUENTE DE VERDAD DEL SITIO
 * ------------------------------------------------------------------
 * Todo texto, dato, enlace y ruta de imagen vive aquí. Los componentes
 * solo leen de este archivo; nunca repiten un dato.
 *
 * Textos: cada texto es `t('español', 'inglés')`. El inglés es un BORRADOR
 * traducido a partir del sitio v2; pendiente de revisión por un nativo.
 * Si falta el inglés, la web muestra el español (ver `tr()` en src/lib/i18n.ts).
 *
 * Fuente del contenido: sitio v2
 * https://quetzaltours-v2-2d260bbf78995d338539127.webflow.io/
 * Marcas usadas:
 *   TODO(...)  → falta contenido del cliente
 *   REVISAR(...) → dato del v2 inconsistente; confirmar con el cliente
 *
 * Imágenes: rutas relativas a src/assets (fotos) — Astro genera tamaños
 * WebP automáticamente (ver src/components/Photo.astro). Logos, marca y
 * capas del hero viven en /public porque se usan tal cual.
 */

export type Lang = 'es' | 'en';
export type Text = { es: string; en?: string };
const t = (es: string, en?: string): Text => ({ es, en });

export type Img = { src: string; alt: Text };
const img = (src: string, alt: string, altEn?: string): Img => ({ src, alt: t(alt, altEn) });

/* ------------------------------------------------------------------ */
/* Marca y contacto                                                    */
/* ------------------------------------------------------------------ */

export const site = {
  name: 'Quetzal Tours',
  legalName: 'Quetzal Tour Operator',
  hashtag: '#PorElMundoDeQuetzal',
  /** Firma del pie: el mismo hashtag con juego de pesos. */
  signature: '#PorEl**Mundo**DeQuetzal',
  description: t(
    'Tours guiados en Oaxaca con guías certificados por la Secretaría de Turismo: Monte Albán, Mitla, Hierve el Agua, Guelaguetza y más. Salidas diarias desde la Ciudad de Oaxaca.',
  ),
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
  stats: [
    { value: '34', label: t('Años al servicio del turismo', 'Years in tourism') },
    { value: '50,000', label: t('Viajeros', 'Travelers') },
  ],
} as const;

export const contact = {
  phones: [
    { label: '+52 (951) 515 55 51', href: 'tel:+529515155551' },
    { label: '(951) 113 83 05', href: 'https://wa.me/529511138305', whatsapp: true },
  ],
  whatsapp: 'https://wa.me/529511138305',
  email: 'reservas@quetzaltours.com.mx',
  emailHref:
    'mailto:reservas@quetzaltours.com.mx?subject=%C2%A1Hola%2C%20Quetzal%20Tours!',
  /**
   * Destino del formulario: script PHP en Hostinger (public/api/enviar.php),
   * que envía por SMTP a reservas@. Si se pone en null, el formulario abre
   * el correo del visitante con el mensaje ya redactado.
   */
  formEndpoint: '/api/enviar.php' as string | null,
  social: [
    { name: 'Instagram', href: 'https://www.instagram.com/quetzaltours/' },
    { name: 'Facebook', href: 'https://www.facebook.com/QuetzalTourOperator' },
    { name: 'X', href: 'https://x.com/quetzaltours' },
  ],
} as const;

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

const P = '/tours/Tours';
const includesStd = [
  t('Guía de turista certificado', 'Certified tour guide'),
  t('Seguro de viajero a bordo', 'Traveler insurance on board'),
  t('Transporte de lujo de uso exclusivo de turismo', 'Luxury transport for exclusive tourist use'),
  t('Impuestos', 'Taxes'),
];
const excludesStd = [
  t('Propinas', 'Tips'),
  t('Ningún otro servicio que no esté aquí claramente especificado', 'Any other service not clearly specified here'),
];
const pickup = { label: t('Salida', 'Departure'), value: t('Pickup en el lobby de su hotel', 'Pickup at your hotel lobby') };

export const tours: Tour[] = [
  {
    slug: 'tour-ruta-monte-alban-oaxaca',
    name: t('Tour Ruta Monte Albán', 'Monte Albán Route Tour'),
    category: 'arqueologia',
    duration: '8',
    region: t('Valles de Oaxaca', 'Valleys of Oaxaca'),
    banner: `${P}/Portadas_RutasQuetzalTours2022_TourRutaMonteAlban-1-2.webp`,
    cover: img(`${P}/ruta-monte-alban/Monte-Alban_QuetzalTours_Oaxaca_06.webp`, 'Zona arqueológica de Monte Albán', 'Monte Albán archaeological site'),
    summary: t(
      'Explora Monte Albán, la majestuosa ciudad zapoteca; descubre la creatividad de los alebrijes en Arrazola; y conoce la tradición del barro negro en San Bartolo Coyotepec.',
    ),
    hasDetail: true,
    detail: {
      subtitle: t('Tour a la Zona Arqueológica de Monte Albán, San Antonio Arrazola y San Bartolo Coyotepec.', 'Tour to the Monte Albán Archaeological Site, San Antonio Arrazola and San Bartolo Coyotepec.'),
      body: [
        t('A tan solo diez kilómetros de la Ciudad de Oaxaca, se encuentra **Monte Albán**, una de las zonas arqueológicas más impresionantes del continente americano y corazón de la antigua civilización zapoteca.', 'Just ten kilometers from Oaxaca City lies **Monte Albán**, one of the most impressive archaeological sites in the Americas and the heart of the ancient Zapotec civilization.'),
        t('Con más de tres mil años de historia, esta majestuosa ciudad prehispánica nos recibe en la cima de una montaña con vistas espectaculares del Valle de Oaxaca. Exploraremos su **Plaza Principal**, el **Juego de Pelota**, el enigmático **Edificio de los Danzantes** y su **Observatorio Astronómico**, entre otros vestigios que revelan la grandeza de esta cultura milenaria.', 'With more than three thousand years of history, this majestic pre-Hispanic city welcomes us from a mountaintop with spectacular views of the Oaxaca Valley. We will explore its **Main Plaza**, the **Ball Court**, the enigmatic **Building of the Dancers** and its **Astronomical Observatory**, among other remains that reveal the greatness of this ancient culture.'),
        t('Después de esta inmersión histórica, nos dirigimos al pueblo indígena de **San Antonio Arrazola**, cuna de los famosos **alebrijes**, coloridas figuras talladas en madera que dan vida a criaturas fantásticas surgidas de la imaginación. Visitaremos talleres artesanales donde los artistas locales comparten con orgullo su proceso creativo, inspiración que incluso dejó huella en la película animada **Coco** de Pixar.', 'After this dive into history, we head to the Indigenous town of **San Antonio Arrazola**, birthplace of the famous **alebrijes**, colorful wood-carved figures that bring imaginary creatures to life. We will visit artisan workshops where local artists proudly share their creative process, an inspiration that even left its mark on Pixar\'s animated film **Coco**.'),
        t('Más adelante, disfrutaremos de un descanso para saborear la riqueza gastronómica de la región en un **restaurante típico de comida oaxaqueña**, con platillos tradicionales llenos de historia y sabor.', 'Later, we will take a break to savor the region\'s cuisine at a **traditional Oaxacan restaurant**, with dishes full of history and flavor.'),
        t('La última parada del día nos lleva a **San Bartolo Coyotepec**, pueblo reconocido mundialmente por su inconfundible **cerámica negra**. Aquí visitaremos talleres y espacios de exposición donde admiraremos cómo, con técnica ancestral y barro local, los artesanos moldean y pulen piezas que son verdaderas joyas del arte popular oaxaqueño.', 'The last stop of the day takes us to **San Bartolo Coyotepec**, a town world-renowned for its unmistakable **black pottery**. Here we will visit workshops and showrooms to see how artisans shape and polish pieces with ancestral techniques and local clay, true jewels of Oaxacan folk art.'),
        t('Con el corazón lleno de historia, arte y sabores, regresamos a la ciudad.', 'With hearts full of history, art and flavor, we return to the city.'),
      ],
      departures: t('Salidas diarias desde la Ciudad de Oaxaca.', 'Daily departures from Oaxaca City.'),
      stops: [
        {
          title: t('Monte Albán', 'Monte Albán'),
          text: t('Plaza Principal, Juego de Pelota, Edificio de los Danzantes y Observatorio Astronómico.', 'Main Plaza, Ball Court, Building of the Dancers and Astronomical Observatory.'),
          image: img(`${P}/ruta-monte-alban/Monte-Alban_QuetzalTours_Oaxaca_06.webp`, 'Monte Albán', 'Monte Albán'),
        },
        {
          title: t('San Antonio Arrazola', 'San Antonio Arrazola'),
          text: t('Talleres de alebrijes tallados en madera.', 'Workshops of wood-carved alebrijes.'),
          // TODO(cliente): foto de Arrazola.
        },
        {
          title: t('Comida oaxaqueña', 'Oaxacan lunch'),
          text: t('Descanso en un restaurante típico de la región.', 'A break at a traditional restaurant of the region.'),
        },
        {
          title: t('San Bartolo Coyotepec', 'San Bartolo Coyotepec'),
          text: t('Talleres de cerámica de barro negro.', 'Black clay pottery workshops.'),
          image: img(`${P}/ruta-monte-alban/San-Bartolo-Coyotepec_QuetzalTours_Oaxaca_01.webp`, 'Barro negro de San Bartolo Coyotepec', 'Black clay from San Bartolo Coyotepec'),
        },
      ],
      includes: includesStd,
      excludes: [...excludesStd, t('Comida en el trayecto', 'Meal during the tour')],
      itinerary: [
        pickup,
        { label: t('Hora de salida', 'Departure time'), value: t('15 minutos antes, para salir a tiempo a las 09:30 h.', '15 minutes before, to leave on time at 9:30 a.m.') },
        { label: t('Regreso', 'Return'), value: t('Regreso aproximado a las 18:00 h.', 'Approximate return at 6:00 p.m.') },
      ],
      gallery: [
        img(`${P}/ruta-monte-alban/Monte-Alban_QuetzalTours_Oaxaca_06.webp`, 'Monte Albán', 'Monte Albán'),
        img(`${P}/ruta-monte-alban/San-Bartolo-Coyotepec_QuetzalTours_Oaxaca_01.webp`, 'San Bartolo Coyotepec', 'San Bartolo Coyotepec'),
      ],
    },
  },
  {
    slug: 'mitla-tour-oaxaca',
    name: t('Tour Ruta Mitla', 'Mitla Route Tour'),
    category: 'arqueologia',
    duration: '10',
    region: t('Valles de Oaxaca', 'Valleys of Oaxaca'),
    banner: `${P}/Portadas_RutasQuetzalTours2022_TourRutaMitla.webp`,
    cover: img(`${P}/mitla/galeria/Mitla_QuetzalTours_Oaxaca_01.jpg`, 'Grecas de la zona arqueológica de Mitla', 'Stone fretwork at the Mitla archaeological site'),
    summary: t(
      'Árbol del Tule, cascadas petrificadas de Hierve el Agua, Zona Arqueológica de Mitla, telares de Teotitlán del Valle y un palenque de mezcal.',
    ),
    hasDetail: true,
    detail: {
      subtitle: t('Tour al Árbol del Tule, Hierve el Agua, la Zona Arqueológica de Mitla, Teotitlán del Valle y un Palenque de Mezcal.', 'Tour to the Tule Tree, Hierve el Agua, the Mitla Archaeological Site, Teotitlán del Valle and a mezcal distillery.'),
      body: [
        t('Acompáñanos en un recorrido por los paisajes, sabores y tradiciones más emblemáticos de Oaxaca. Comenzamos con una visita al imponente **Árbol del Tule**, un ahuehuete milenario ubicado a tan solo diez kilómetros de la ciudad de Oaxaca.', 'Join us on a journey through Oaxaca\'s most iconic landscapes, flavors and traditions. We start with a visit to the towering **Tule Tree**, a thousand-year-old ahuehuete cypress just ten kilometers from Oaxaca City.'),
        t('Su gigantesco tronco, considerado el más ancho del mundo, ha sido testigo del paso del tiempo. Nuestra siguiente parada es **Hierve el Agua**, un paraje natural único en el mundo. Allí contemplarás las cascadas petrificadas formadas por minerales, suspendidas sobre un majestuoso valle. Podrás caminar por sus senderos y admirar el paisaje desde los miradores.', 'Its gigantic trunk, considered the widest in the world, has witnessed the passing of time. Our next stop is **Hierve el Agua**, a natural site unique in the world. There you will see petrified waterfalls formed by minerals, suspended above a majestic valley. You can walk its trails and take in the landscape from the viewpoints.'),
        t('Luego nos dirigimos a la **zona arqueológica de Mitla**, cuyo nombre en náhuatl, **Mictlán**, significa “Lugar de los Muertos”. Esta antigua ciudad zapoteca es famosa por su arquitectura única y sus grecas talladas en piedra. Visitaremos el Grupo de la Iglesia, el Grupo de las Columnas y sus cámaras funerarias.', 'Then we head to the **Mitla archaeological site**, whose Nahuatl name, **Mictlán**, means “Place of the Dead”. This ancient Zapotec city is famous for its unique architecture and its stone-carved fretwork. We will visit the Church Group, the Group of the Columns and its burial chambers.'),
        t('Más adelante, disfrutaremos de un descanso en un **restaurante típico de comida oaxaqueña**.', 'Later, we will take a break at a **traditional Oaxacan restaurant**.'),
        t('Continuamos hacia **Teotitlán del Valle**, pueblo zapoteco reconocido por su arte textil. Aquí, los telares de pedal y los tintes naturales como la grana cochinilla y el añil siguen dando vida a tapetes y piezas únicas. Visitaremos talleres familiares, el mercado local o espacios comunitarios.', 'We continue to **Teotitlán del Valle**, a Zapotec town renowned for its textile art. Here, pedal looms and natural dyes such as cochineal and indigo still bring rugs and unique pieces to life. We will visit family workshops, the local market or community spaces.'),
        t('Antes de regresar, haremos una parada opcional en un auténtico **palenque de mezcal artesanal**, para conocer el proceso tradicional de destilación. Disfrutaremos una degustación de mezcales jóvenes, reposados, añejos, de pechuga y cremas de mezcal.', 'Before returning, we make an optional stop at an authentic **artisanal mezcal distillery** (palenque) to learn about the traditional distilling process. We will taste young, rested, aged and pechuga mezcals, as well as mezcal creams.'),
        t('Además, los **domingos** es posible añadir una visita (con costo adicional) al tradicional **mercado indígena de Tlacolula**, uno de los más antiguos y coloridos de Oaxaca.', 'On **Sundays**, you can also add a visit (at an extra cost) to the traditional **Tlacolula Indigenous market**, one of the oldest and most colorful in Oaxaca.'),
      ],
      departures: t('Salidas diarias desde la Ciudad de Oaxaca.', 'Daily departures from Oaxaca City.'),
      stops: [
        {
          title: t('Árbol del Tule', 'Tule Tree'),
          text: t('Ahuehuete milenario con el tronco más ancho del mundo.', 'A thousand-year-old cypress with the widest trunk in the world.'),
          image: img(`${P}/mitla/Arbol-del-Tule_QuetzalTours_Oaxaca_01.webp`, 'Árbol del Tule', 'Tule Tree'),
        },
        {
          title: t('Hierve el Agua', 'Hierve el Agua'),
          text: t('Cascadas petrificadas y miradores sobre el valle.', 'Petrified waterfalls and viewpoints over the valley.'),
          // TODO(cliente): foto de Hierve el Agua.
        },
        {
          title: t('Zona Arqueológica de Mitla', 'Mitla Archaeological Site'),
          text: t('Grupo de la Iglesia, Grupo de las Columnas y cámaras funerarias.', 'Church Group, Group of the Columns and burial chambers.'),
          image: img(`${P}/mitla/Mitla_QuetzalTours_Oaxaca_01.webp`, 'Zona arqueológica de Mitla', 'Mitla archaeological site'),
        },
        {
          title: t('Comida oaxaqueña', 'Oaxacan lunch'),
          text: t('Descanso en un restaurante típico de la región.', 'A break at a traditional restaurant of the region.'),
        },
        {
          title: t('Teotitlán del Valle', 'Teotitlán del Valle'),
          text: t('Telares de pedal y tintes naturales en talleres familiares.', 'Pedal looms and natural dyes in family workshops.'),
          image: img(`${P}/mitla/Teotitlan-del-Valle_QuetzalTours_Oaxaca_01.webp`, 'Telar en Teotitlán del Valle', 'Loom in Teotitlán del Valle'),
        },
        {
          title: t('Palenque de mezcal', 'Mezcal distillery'),
          text: t('Parada opcional con degustación de mezcales artesanales.', 'Optional stop with a tasting of artisanal mezcals.'),
          image: img(`${P}/mitla/Tour-de-Mezcal_QuetzalTours_Oaxaca_01.webp`, 'Palenque de mezcal', 'Mezcal distillery'),
        },
      ],
      includes: includesStd,
      excludes: excludesStd,
      itinerary: [
        pickup,
        { label: t('Hora de salida', 'Departure time'), value: t('15 minutos antes, para salir a tiempo a las 08:30 h.', '15 minutes before, to leave on time at 8:30 a.m.') },
        { label: t('Regreso', 'Return'), value: t('Regreso aproximado a las 18:30 h.', 'Approximate return at 6:30 p.m.') },
      ],
      gallery: [
        img(`${P}/mitla/galeria/Mitla_QuetzalTours_Oaxaca_01.jpg`, 'Mitla', 'Mitla'),
        img(`${P}/mitla/galeria/Mitla_QuetzalTours_Oaxaca_02.jpg`, 'Mitla', 'Mitla'),
        img(`${P}/mitla/galeria/Mitla_QuetzalTours_Oaxaca_03.webp`, 'Mitla', 'Mitla'),
        img(`${P}/mitla/galeria/Arbol-del-Tule_QuetzalTours_Oaxaca_01.webp`, 'Árbol del Tule', 'Tule Tree'),
        img(`${P}/mitla/galeria/Arbol-del-Tule_QuetzalTours_Oaxaca_02.webp`, 'Árbol del Tule', 'Tule Tree'),
        img(`${P}/mitla/galeria/Arbol-del-Tule_QuetzalTours_Oaxaca_03.webp`, 'Árbol del Tule', 'Tule Tree'),
        img(`${P}/mitla/galeria/Teotitlan-del-Valle_QuetzalTours_Oaxaca_01.webp`, 'Teotitlán del Valle', 'Teotitlán del Valle'),
        img(`${P}/mitla/galeria/Teotitlan-del-Valle_QuetzalTours_Oaxaca_02.webp`, 'Teotitlán del Valle', 'Teotitlán del Valle'),
        img(`${P}/mitla/galeria/Teotitlan-del-Valle_QuetzalTours_Oaxaca_03.jpg`, 'Teotitlán del Valle', 'Teotitlán del Valle'),
      ],
    },
  },
  {
    slug: 'tour-ciudad-de-oaxaca',
    name: t('Ciudad de Oaxaca', 'Oaxaca City'),
    category: 'colonial',
    duration: '3:30',
    region: t('Ciudad de Oaxaca', 'Oaxaca City'),
    banner: `${P}/Portadas_RutasQuetzalTours2022_TourdeCiudad.webp`,
    cover: img(`${P}/ciudad-de-oaxaca/Ciudad-de-Oaxaca_QuetzalTours_Oaxaca_02.webp`, 'Centro histórico de Oaxaca', 'Historic center of Oaxaca'),
    hasDetail: false, // TODO(cliente): textos, paradas, incluye e itinerario
  },
  {
    slug: 'clase-de-cocina-oaxaquena',
    name: t('Clase de Cocina Oaxaqueña', 'Oaxacan Cooking Class'),
    category: 'gastronomia',
    duration: '5',
    region: t('Ciudad de Oaxaca', 'Oaxaca City'), // REVISAR: región no publicada en el v2
    banner: `${P}/Portadas_RutasQuetzalTours2022_TourCocinaOaxaquena.webp`,
    hasDetail: false, // TODO(cliente): textos y fotos
  },
  {
    slug: 'cena-guelaguetza',
    name: t('Cena Show Guelaguetza', 'Guelaguetza Dinner Show'),
    category: 'gastronomia',
    duration: '4',
    region: t('Ciudad de Oaxaca', 'Oaxaca City'),
    banner: `${P}/Portadas_RutasQuetzalTours2022_CenaShowGuelaguetza-2-1.webp`,
    cover: img('/fotos/Quetzaltours_Guelaguetza003-scaled.webp', 'Danza folclórica de la Guelaguetza', 'Guelaguetza folk dance'),
    summary: t(
      'Cena oaxaqueña tradicional de cuatro tiempos con un espectáculo de danzas regionales que celebran la diversidad cultural del Estado.',
    ),
    hasDetail: true,
    detail: {
      subtitle: t('Cena Show Guelaguetza', 'Guelaguetza Dinner Show'),
      body: [
        t('No puedes visitar Oaxaca sin vivir la magia de la **Guelaguetza**, una de las expresiones folclóricas más fascinantes de México.', 'You can\'t visit Oaxaca without experiencing the magic of the **Guelaguetza**, one of Mexico\'s most fascinating folk celebrations.'),
        t('Disfruta de una cena oaxaqueña de 4 tiempos, preparada con ingredientes frescos de la región, mientras te sumerges en un espectáculo que celebra la riqueza cultural de Oaxaca.', 'Enjoy a four-course Oaxacan dinner, prepared with fresh local ingredients, while you immerse yourself in a show that celebrates Oaxaca\'s cultural wealth.'),
        t('La danza y la música indígenas, provenientes de las distintas regiones del Estado, cobran vida en la **Capilla de Santa Catalina**, con ballet folklórico y la música en vivo de una banda tradicional.', 'Indigenous dance and music from the State\'s different regions come to life in the **Chapel of Santa Catalina**, with a folkloric ballet and live music by a traditional band.'),
        t('La función comienza a las 18:00 h. Nosotros nos encargamos de la reservación.', 'The show starts at 6:00 p.m. We take care of the reservation.'),
      ],
      departures: t('Consulta disponibilidad y calendario, ya que los días pueden variar.', 'Check availability and schedule, as days may vary.'),
      stops: [
        {
          title: t('Cena de cuatro tiempos', 'Four-course dinner'),
          text: t('Cocina oaxaqueña con ingredientes de la región.', 'Oaxacan cuisine with local ingredients.'),
        },
        {
          title: t('Espectáculo de Guelaguetza', 'Guelaguetza show'),
          text: t('Ballet folklórico y banda en vivo en la Capilla de Santa Catalina.', 'Folkloric ballet and live band at the Chapel of Santa Catalina.'),
          image: img(`${P}/cena-guelaguetza/Guelaguetza_QuetzalTours_Oaxaca_01.webp`, 'Espectáculo de Guelaguetza', 'Guelaguetza show'),
        },
      ],
      includes: [
        t('Seguro de viajero a bordo', 'Traveler insurance on board'),
        t('Transporte de lujo de uso exclusivo de turismo', 'Luxury transport for exclusive tourist use'),
        t('Impuestos', 'Taxes'),
        t('Cena oaxaqueña', 'Oaxacan dinner'),
      ],
      excludes: [t('Propinas', 'Tips'), t('Transportación de regreso al hotel', 'Return transportation to the hotel')],
      itinerary: [
        pickup,
        { label: t('Hora de salida', 'Departure time'), value: t('15 minutos antes, para salir a tiempo a las 18:00 h.', '15 minutes before, to leave on time at 6:00 p.m.') },
      ],
      gallery: [
        img(`${P}/cena-guelaguetza/Guelaguetza_QuetzalTours_Oaxaca_01.webp`, 'Guelaguetza', 'Guelaguetza'),
        img('/fotos/Quetzaltours_Guelaguetza003-scaled.webp', 'Guelaguetza', 'Guelaguetza'),
      ],
    },
  },
  {
    slug: 'tour-a-monte-alban-oaxaca',
    name: t('Monte Albán Tour', 'Monte Albán Tour'),
    category: 'arqueologia',
    duration: '3:30',
    region: t('Valle de Oaxaca', 'Oaxaca Valley'),
    banner: `${P}/Portadas_RutasQuetzalTours2022_TourMonteAlban-1.webp`,
    cover: img('/sueltas/HERO-Monte-Alban_QuetzalTours_Oaxaca_01.webp', 'Monte Albán sobre el Valle de Oaxaca', 'Monte Albán above the Oaxaca Valley'),
    summary: t('Explora uno de los sitios arqueológicos más emblemáticos de Mesoamérica, a 10 km de la ciudad de Oaxaca.', 'Explore one of the most iconic archaeological sites in Mesoamerica, 10 km from Oaxaca City.'),
    hasDetail: true,
    detail: {
      subtitle: t('Tour a la Zona Arqueológica de Monte Albán.', 'Tour to the Monte Albán Archaeological Site.'),
      body: [
        t('Explora uno de los sitios arqueológicos más emblemáticos de Mesoamérica. A solo 10 kilómetros de la ciudad de Oaxaca, Monte Albán se alza sobre una montaña que domina el Valle, como testigo milenario de la grandeza zapoteca.', 'Explore one of the most iconic archaeological sites in Mesoamerica. Just 10 kilometers from Oaxaca City, Monte Albán rises on a mountain overlooking the Valley, an ancient witness to Zapotec greatness.'),
        t('Con más de tres mil años de historia, este antiguo centro ceremonial fue cuna de una de las civilizaciones más importantes del continente. Durante el recorrido visitaremos la **Plaza Principal**, el **Juego de Pelota**, el **Observatorio Astronómico**, el **Edificio de los Danzantes** y otros espacios que aún conservan el poder simbólico y político de la época prehispánica.', 'With more than three thousand years of history, this ancient ceremonial center was the cradle of one of the most important civilizations on the continent. On the tour we will visit the **Main Plaza**, the **Ball Court**, the **Astronomical Observatory**, the **Building of the Dancers** and other spaces that still hold the symbolic and political power of the pre-Hispanic era.'),
        t('Desde lo alto de Monte Albán, la vista panorámica de los Valles Centrales y de la “Verde Antequera” te regalará una nueva perspectiva del territorio oaxaqueño.', 'From the top of Monte Albán, the panoramic view of the Central Valleys and the “Green Antequera” will give you a new perspective on Oaxacan land.'),
      ],
      departures: t('Salidas diarias desde la Ciudad de Oaxaca.', 'Daily departures from Oaxaca City.'),
      stops: [
        {
          title: t('Plaza Principal', 'Main Plaza'),
          text: t('El corazón ceremonial de la ciudad zapoteca.', 'The ceremonial heart of the Zapotec city.'),
          image: img(`${P}/monte-alban/Monte-Alban_QuetzalTours_Oaxaca_01.webp`, 'Plaza Principal de Monte Albán', 'Main Plaza of Monte Albán'),
        },
        { title: t('Juego de Pelota', 'Ball Court') },
        { title: t('Observatorio Astronómico', 'Astronomical Observatory') },
        { title: t('Edificio de los Danzantes', 'Building of the Dancers') },
      ],
      includes: includesStd,
      excludes: excludesStd,
      itinerary: [
        pickup,
        { label: t('Hora de salida', 'Departure time'), value: t('15 minutos antes, para salir a tiempo a las 09:30 h o 14:30 h.', '15 minutes before, to leave on time at 9:30 a.m. or 2:30 p.m.') },
        { label: t('Regreso', 'Return'), value: t('Regreso aproximado a las 13:00 h, y 17:30 h en el tour de la tarde.', 'Approximate return at 1:00 p.m., or 5:30 p.m. on the afternoon tour.') },
      ],
      gallery: [
        img(`${P}/monte-alban/Monte-Alban_QuetzalTours_Oaxaca_01.webp`, 'Monte Albán', 'Monte Albán'),
        img('/sueltas/HERO-Monte-Alban_QuetzalTours_Oaxaca_01.webp', 'Monte Albán', 'Monte Albán'),
      ],
    },
  },
  {
    slug: 'tour-coyotepec-jalietza-ocotlan',
    name: t('Tour a Coyotepec, Jalietza y Ocotlán', 'Coyotepec, Jalietza & Ocotlán Tour'),
    category: 'arte',
    duration: '4',
    region: t('Valles Centrales', 'Central Valleys'), // REVISAR: región no publicada en el v2
    banner: `${P}/Portadas_RutasQuetzalTours2022_TourRutadeArtesanias.webp`,
    hasDetail: false, // TODO(cliente): textos y fotos
  },
  {
    slug: 'tour-a-san-pablo-guelatao',
    name: t('Tour a San Pablo Guelatao', 'San Pablo Guelatao Tour'),
    category: 'ecoturismo',
    duration: '5',
    region: t('Sierra Norte', 'Sierra Norte'),
    banner: `${P}/Portadas_RutasQuetzalTours2022_TourSanPabloGuelatao.webp`,
    // TODO(cliente): fotos de Guelatao, Laguna Encantada e Ixtlán.
    summary: t('Historia y naturaleza de la Sierra Norte: la cuna de Benito Juárez, la Laguna Encantada e Ixtlán de Juárez.', 'History and nature in the Sierra Norte: the birthplace of Benito Juárez, the Enchanted Lagoon and Ixtlán de Juárez.'),
    hasDetail: true,
    detail: {
      subtitle: t('Tour a San Pablo Guelatao e Ixtlán de Juárez.', 'Tour to San Pablo Guelatao and Ixtlán de Juárez.'),
      body: [
        t('Sumérgete en la historia y la majestuosidad natural de la **Sierra Madre Oriental**, en un recorrido que combina memoria, paisajes y legado.', 'Immerse yourself in the history and natural majesty of the **Sierra Madre Oriental**, on a journey that combines memory, landscapes and legacy.'),
        t('A 60 kilómetros de la Ciudad de Oaxaca se encuentra **San Pablo Guelatao**, un pueblo enclavado en la sierra, rodeado de bosques de niebla y montañas de tres mil metros. Es célebre por ser la **cuna de Don Benito Juárez García**, el presidente zapoteco que transformó el rumbo de México en el siglo XIX. Visitaremos el **Museo de Sitio** dedicado a su vida y legado, y la **Laguna Encantada**.', 'Sixty kilometers from Oaxaca City lies **San Pablo Guelatao**, a village nestled in the mountains, surrounded by cloud forests and peaks three thousand meters high. It is famous as the **birthplace of Don Benito Juárez García**, the Zapotec president who changed the course of Mexico in the 19th century. We will visit the **Site Museum** dedicated to his life and legacy, and the **Enchanted Lagoon**.'),
        t('A dos kilómetros de Guelatao se encuentra **Ixtlán de Juárez**, donde conoceremos su **iglesia barroca del siglo XVI**, construida en piedra.', 'Two kilometers from Guelatao lies **Ixtlán de Juárez**, where we will see its **16th-century baroque church**, built in stone.'),
        t('Durante todo el trayecto nos acompaña el paisaje de la Sierra Norte: aire puro, aromas de pino y encino, y vistas que conectan con la tierra oaxaqueña.', 'Throughout the journey, the Sierra Norte landscape keeps us company: fresh air, the scent of pine and oak, and views that connect you with Oaxacan land.'),
      ],
      departures: t('Salidas diarias desde la Ciudad de Oaxaca, bajo reservación.', 'Daily departures from Oaxaca City, by reservation.'),
      stops: [
        { title: t('Museo de Sitio de Benito Juárez', 'Benito Juárez Site Museum'), text: t('La vida y legado del presidente zapoteco.', 'The life and legacy of the Zapotec president.') },
        { title: t('Laguna Encantada', 'Enchanted Lagoon'), text: t('Espejo de agua rodeado de bosque.', 'A mirror of water surrounded by forest.') },
        { title: t('Ixtlán de Juárez', 'Ixtlán de Juárez'), text: t('Iglesia barroca del siglo XVI construida en piedra.', 'A 16th-century baroque church built in stone.') },
      ],
      includes: includesStd,
      excludes: [...excludesStd, t('Comida en el trayecto', 'Meal during the tour')],
      itinerary: [
        pickup,
        { label: t('Hora de salida', 'Departure time'), value: t('15 minutos antes, para salir a tiempo a las 09:30 h o 15:00 h.', '15 minutes before, to leave on time at 9:30 a.m. or 3:00 p.m.') },
      ],
      gallery: [],
    },
  },
  {
    slug: 'ruta-dominica-tour-oaxaca',
    name: t('Ruta Dominica', 'Dominican Route'),
    category: 'colonial',
    duration: '10',
    region: t('Región Mixteca', 'Mixteca Region'),
    banner: `${P}/Portadas_RutasQuetzalTours2022_TourRutaDominica.webp`,
    // TODO(cliente): fotos de Coixtlahuaca, Teposcolula y Yanhuitlán.
    summary: t('Tres de los conjuntos arquitectónicos más imponentes del México virreinal, en el corazón de la Mixteca.', 'Three of the most imposing architectural complexes of colonial Mexico, in the heart of the Mixteca.'),
    hasDetail: true,
    detail: {
      subtitle: t('Tour a Coixtlahuaca, Teposcolula y Yanhuitlán.', 'Tour to Coixtlahuaca, Teposcolula and Yanhuitlán.'),
      body: [
        t('Viaja al corazón de la Mixteca oaxaqueña para descubrir tres de los conjuntos arquitectónicos más imponentes del México virreinal.', 'Travel to the heart of Oaxaca\'s Mixteca to discover three of the most imposing architectural complexes of colonial Mexico.'),
        t('A solo dos horas de la Ciudad de Oaxaca nos esperan **Coixtlahuaca, Teposcolula y Yanhuitlán**, pueblos que resguardan joyas del arte sacro del siglo XVI.', 'Just two hours from Oaxaca City, **Coixtlahuaca, Teposcolula and Yanhuitlán** await us, towns that safeguard gems of 16th-century sacred art.'),
        t('Estos **templos, exconventos y capillas abiertas** fueron construidos durante la primera etapa de la colonización española, testigos del encuentro –y el contraste– entre la cosmovisión indígena y la expansión del poder europeo.', 'These **churches, former convents and open chapels** were built during the first stage of Spanish colonization, witnesses to the encounter –and the contrast– between the Indigenous worldview and the expansion of European power.'),
        t('En Coixtlahuaca admiraremos una de las capillas abiertas más antiguas del continente; en Teposcolula caminaremos por el Exconvento de San Pedro y San Pablo; y en Yanhuitlán exploraremos su templo dominico, cuya arquitectura y retablos son expresión viva del sincretismo cultural.', 'In Coixtlahuaca we will admire one of the oldest open chapels on the continent; in Teposcolula we will walk through the Former Convent of San Pedro y San Pablo; and in Yanhuitlán we will explore its Dominican church, whose architecture and altarpieces are a living expression of cultural syncretism.'),
      ],
      departures: t('Salidas diarias desde la Ciudad de Oaxaca, bajo reservación.', 'Daily departures from Oaxaca City, by reservation.'),
      stops: [
        { title: t('Coixtlahuaca', 'Coixtlahuaca'), text: t('Una de las capillas abiertas más antiguas del continente.', 'One of the oldest open chapels on the continent.') },
        { title: t('Teposcolula', 'Teposcolula'), text: t('Exconvento de San Pedro y San Pablo.', 'Former Convent of San Pedro y San Pablo.') },
        { title: t('Yanhuitlán', 'Yanhuitlán'), text: t('Templo dominico y sus retablos.', 'Dominican church and its altarpieces.') },
      ],
      includes: includesStd,
      excludes: [...excludesStd, t('Comida en el trayecto', 'Meal during the tour')],
      itinerary: [
        pickup,
        { label: t('Hora de salida', 'Departure time'), value: t('15 minutos antes, para salir a tiempo a las 09:30 h.', '15 minutes before, to leave on time at 9:30 a.m.') },
        { label: t('Regreso', 'Return'), value: t('Regreso aproximado a las 18:00 h.', 'Approximate return at 6:00 p.m.') },
      ],
      gallery: [],
    },
  },
  {
    slug: 'tour-yagul-tlacochahuaya-jaguar-xoo',
    name: t('Tour a Yagul, Tlacochahuaya y Jaguar Xoo', 'Yagul, Tlacochahuaya & Jaguar Xoo Tour'),
    category: 'arqueologia',
    duration: '7',
    region: t('Valles Centrales', 'Central Valleys'), // REVISAR: región no publicada en el v2
    banner: `${P}/Portadas_RutasQuetzalTours2022_TouraYagulTlacochahuayayJaguarXoo.webp`,
    hasDetail: false, // TODO(cliente): textos y fotos
  },
];

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

export const packages: Package[] = [
  {
    slug: 'fiesta-de-muertos-en-oaxaca-2026',
    name: t('Fiesta de Muertos en Oaxaca 2026', 'Day of the Dead in Oaxaca 2026'),
    summary: t('Transportación, alojamiento, desayunos y tours, incluido el tour nocturno de panteones en Xoxocotlán.', 'Transportation, lodging, breakfasts and tours, including the night cemetery tour in Xoxocotlán.'),
    cover: img('/fotos/dia-de-muertos-oaxaca.webp', 'Joven con maquillaje de catrín, estrella de papel y cempasúchil en un maizal', 'Young man with catrín makeup, a paper star and marigolds in a cornfield'),
    hasDetail: true,
    dates: t('TODO: fechas 2026', 'TODO: 2026 dates'), // TODO(cliente): fechas exactas del paquete 2026
    body: [
      t('Los festejos del Día de Muertos en México son únicos, pero como el festejo en Oaxaca no hay dos.', 'Day of the Dead celebrations in Mexico are unique, but there is nothing like the celebration in Oaxaca.'),
      t('Oaxaca es el ejemplo ideal de costumbre y tradición, de respeto por la cultura, su pueblo y sus orígenes.', 'Oaxaca is the ideal example of custom and tradition, of respect for culture, its people and its origins.'),
      t('Nuestro paquete vacacional incluye transportación, alojamiento, desayunos y tours, incluido el tour nocturno de panteones para conocer la celebración indígena de la Fiesta de Muertos en Xoxocotlán, locación que inspiró la película Coco, de Pixar.', 'Our vacation package includes transportation, lodging, breakfasts and tours, including the night cemetery tour to experience the Indigenous Day of the Dead celebration in Xoxocotlán, the location that inspired Pixar\'s film Coco.'),
      t('Llámanos o escríbenos para reservar tu lugar.', 'Call or write to us to book your spot.'),
    ],
    // TODO(cliente): confirmar lo incluido en 2026 (se toma de 2025).
    includes: [t('Transportación', 'Transportation'), t('Alojamiento', 'Lodging'), t('Desayunos', 'Breakfasts'), t('Tours', 'Tours'), t('Tour nocturno de panteones', 'Night cemetery tour')],
  },
  {
    slug: 'oaxaca-de-sabores',
    name: t('Oaxaca de Sabores', 'Flavors of Oaxaca'),
    cover: img('/fotos/paquete-oaxaca-de-sabores.webp', 'Mesa de platillos y dulces oaxaqueños sobre el pasto', 'Table of Oaxacan dishes and sweets on the grass'),
    hasDetail: false, // TODO(cliente): textos
  },
  {
    slug: 'oaxaca-cultural',
    name: t('Oaxaca Cultural', 'Cultural Oaxaca'),
    cover: img('/fotos/paquete-oaxaca-cultural.webp', 'Vista panorámica de Monte Albán', 'Panoramic view of Monte Albán'),
    hasDetail: false, // TODO(cliente): textos
  },
  {
    slug: 'guelaguetza-2027',
    name: t('Guelaguetza 2027', 'Guelaguetza 2027'),
    cover: img('/fotos/paquete-guelaguetza.webp', 'Chinas oaxaqueñas con canastas de flores en una calenda', 'Chinas oaxaqueñas carrying flower baskets in a calenda parade'),
    hasDetail: false, // TODO(cliente): textos
  },
];

/* ------------------------------------------------------------------ */
/* Circuitos turísticos (lista tal cual del v2)                        */
/* ------------------------------------------------------------------ */

export type Circuit = { code: string; name: Text; days: string };
const c = (code: string, name: string, days: string, en?: string): Circuit => ({ code, name: t(name, en), days });

export const circuits = {
  cultural: {
    title: t('Circuitos culturales', 'Cultural circuits'),
    items: [
      c('Q101', 'Ciudad de México – Cancún', '07', 'Mexico City – Cancún'),
      c('Q102', 'Cancún – Ciudad de México', '07', 'Cancún – Mexico City'),
      c('Q103', 'Oaxaca – Huatulco, México', '05', 'Oaxaca – Huatulco, Mexico'),
      c('Q104', 'Tuxtla Gutiérrez – San Cristóbal, México', '05', 'Tuxtla Gutiérrez – San Cristóbal, Mexico'),
      c('Q105', 'Villahermosa – Palenque, México', '05', 'Villahermosa – Palenque, Mexico'),
      c('Q106', 'Mérida – Cancún, México', '05', 'Mérida – Cancún, Mexico'),
      c('Q107', 'México Antiguo', '08', 'Ancient Mexico'),
      c('Q108', 'Pasión Mexicana (Escorted)', '10', 'Mexican Passion (Escorted)'),
      c('Q109', 'México Mágico', '15', 'Magical Mexico'),
      c('Q110', 'Senderos Mesoamericanos, México y Guatemala', '24', 'Mesoamerican Trails, Mexico and Guatemala'),
      c('Q201', 'Paisajes y Culturas de Guatemala', '06', 'Landscapes and Cultures of Guatemala'),
    ],
  },
  nature: {
    title: t('Circuitos de naturaleza', 'Nature circuits'),
    items: [
      c('Q601', 'Aves Mexicanas, Parque Nacional Benito Juárez', '09', 'Mexican Birds, Benito Juárez National Park'),
      c('Q602', 'Aves Mexicanas, Parque Nacional de Chacahua', '08', 'Mexican Birds, Chacahua National Park'),
      c('Q603', 'Ríos, Selvas y Pirámides, Chiapas, México', '08', 'Rivers, Jungles and Pyramids, Chiapas, Mexico'),
      c('Q604', 'Descenso de Ríos y Caminata por la Selva Tropical, Veracruz, México', '12', 'River Rafting and Rainforest Hiking, Veracruz, Mexico'),
      c('Q605', 'Descenso de Ríos en Bosque Tropical, Rápidos Clase III–IV, Veracruz, México', '03', 'Rafting in the Tropical Forest, Class III–IV Rapids, Veracruz, Mexico'),
      c('Q606', 'Descenso de Ríos por Cañones Vírgenes, Rápidos Clase IV–V, Veracruz, México', '03', 'Rafting Through Pristine Canyons, Class IV–V Rapids, Veracruz, Mexico'),
      c('Q607', 'Excursión al Río Usumacinta, Chiapas, México', '08', 'Usumacinta River Expedition, Chiapas, Mexico'),
      c('Q608', 'Selvas, Ríos y Pirámides de México y Guatemala', '11', 'Jungles, Rivers and Pyramids of Mexico and Guatemala'),
      c('Q609', 'Río Usumacinta – Mundo Maya, Chiapas, México', '10', 'Usumacinta River – Maya World, Chiapas, Mexico'),
      c('Q610', 'Santuario de Flamingos, Yucatán, México', '05', 'Flamingo Sanctuary, Yucatán, Mexico'),
      c('Q611', 'Avistamiento de Ballenas, Nayarit y Baja California, México', '05–06', 'Whale Watching, Nayarit and Baja California, Mexico'),
      c('Q612', 'Santuario de Mariposas, Michoacán, México', '02–03', 'Monarch Butterfly Sanctuary, Michoacán, Mexico'),
      c('Q613', 'Costa Rica. Costa a Costa', '09', 'Costa Rica. Coast to Coast'),
    ],
  },
  // TODO(cliente): descripción e imagen por circuito.
};

/* ------------------------------------------------------------------ */
/* Páginas                                                             */
/* ------------------------------------------------------------------ */

export const pages = {
  home: {
    meta: { title: t('Tours guiados en Oaxaca', 'Guided tours in Oaxaca'), description: site.description },
    hero: {
      kicker: t('¡Embárcate en una nueva aventura!', 'Embark on a new adventure!'),
      title: t('Conoce las maravillas de **Oaxaca** con el host correcto', 'Discover the wonders of **Oaxaca** with the right host'),
      lead: t('Desbloquea las puertas de una gran cultura, paisajes increíbles y emocionantes aventuras con nosotros.', 'Unlock the doors to a great culture, stunning landscapes and exciting adventures with us.'),
      cta: { label: t('Explora ahora', 'Explore now'), href: '/tours' },
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
      kicker: t('¡Vive la magia oaxaqueña!', 'Live the Oaxacan magic!'),
      title: t('Conoce **Oaxaca**', 'Discover **Oaxaca**'),
      lead: t('Explora las rutas más auténticas de Oaxaca con nuestras excursiones y experiencias diseñadas para ti.', 'Explore Oaxaca\'s most authentic routes with our excursions and experiences designed for you.'),
      // Orden del carrusel del v2.
      featured: [
        'cena-guelaguetza',
        'tour-ruta-monte-alban-oaxaca',
        'tour-a-monte-alban-oaxaca',
        'tour-a-san-pablo-guelatao',
        'ruta-dominica-tour-oaxaca',
        'mitla-tour-oaxaca',
      ],
      cta: { label: t('Ver más tours', 'See more tours'), href: '/tours' },
    },
    /** "Tour del momento": sección temporal. Cambiar aquí el slug. */
    spotlight: {
      kicker: t('¡Vive la Fiesta de Muertos en Oaxaca!', 'Experience Day of the Dead in Oaxaca!'),
      packageSlug: 'fiesta-de-muertos-en-oaxaca-2026',
      cta: { label: t('Más información', 'More information') },
    },
    modes: {
      kicker: t('Conoce nuestras modalidades de viaje', 'Discover our ways to travel'),
      title: t('Viaja según tus **preferencias**', 'Travel your **way**'),
      items: [
        {
          title: t('Tours en grupo', 'Group tours'),
          text: t('Nos especializamos en crear itinerarios personalizados que se adaptan a tus preferencias y a las de quienes viajan contigo.', 'We specialize in creating personalized itineraries that adapt to your preferences and those of the people traveling with you.'),
          image: img('/fotos/Quetzaltours_0189.webp', 'Grupo de viajeros en Oaxaca', 'Group of travelers in Oaxaca'),
        },
        {
          title: t('Tours privados', 'Private tours'),
          text: t('Flexibilidad y exclusividad. Programas pensados para que tu experiencia en Oaxaca sea completamente a tu medida.', 'Flexibility and exclusivity. Programs designed so your Oaxaca experience is completely tailored to you.'),
          image: img('/fotos/young-attractive-girl-stands-on-the-mountain-with-2023-11-27-04-58-45-utc.webp', 'Viajera en la montaña', 'Traveler in the mountains'),
        },
        {
          title: t('Luna de miel y aniversarios', 'Honeymoons and anniversaries'),
          text: t('Experiencias especiales con detalles únicos que hacen de tu viaje a Oaxaca un momento para compartir y recordar.', 'Special experiences with unique details that make your trip to Oaxaca a moment to share and remember.'),
          image: img('/fotos/couple-in-love-chooses-a-turkish-carpet-at-the-mar-2023-11-27-04-53-57-utc.webp', 'Pareja eligiendo un tapete artesanal', 'Couple choosing a handmade rug'),
        },
      ],
    },
  },
  tours: {
    meta: { title: t('Tours en Oaxaca', 'Oaxaca Tours'), description: t('Excursiones en servicio compartido o privado con guías bilingües certificados por la Secretaría de Turismo.', 'Shared or private excursions with bilingual guides certified by the Ministry of Tourism.') },
    hero: {
      title: t('Tours en **Oaxaca**', 'Tours in **Oaxaca**'),
      lead: t('Maravillas arqueológicas, arquitectónicas, culturales, gastronómicas y naturales. Contrata tu excursión con nosotros.', 'Archaeological, architectural, cultural, culinary and natural wonders. Book your excursion with us.'),
      image: img('/fotos/teatro-macedonio-alcala.webp', 'Teatro Macedonio Alcalá, Oaxaca', 'Macedonio Alcalá Theater, Oaxaca'),
    },
    description: [
      t('Nuestras excursiones en servicio compartido incluyen guías de turistas bilingües (español/inglés) autorizados por la Secretaría de Turismo del Gobierno Federal; transporte de servicio exclusivo de turismo en viaje redondo; seguro del pasajero a bordo y, como cortesía, te recogemos y regresamos a tu hotel.', 'Our shared-service excursions include bilingual (Spanish/English) tour guides authorized by Mexico\'s Federal Ministry of Tourism; round-trip transport for exclusive tourist use; passenger insurance on board; and, as a courtesy, pickup and drop-off at your hotel.'),
      t('Nuestros precios no incluyen boletos de entrada a los sitios a visitar ni impuestos. Temporalmente contamos con descuentos y promociones.', 'Our prices do not include entrance fees to the sites visited or taxes. We currently offer discounts and promotions.'),
      t('También ofrecemos excursiones con auto, van o autobús y guía de turistas en servicio privado por hora o por día, en diferentes idiomas.', 'We also offer excursions by car, van or bus with a tour guide in private service, by the hour or by the day, in different languages.'),
      t('¿Tienes alguna petición especial para tu excursión? Háznoslo saber: todas nuestras excursiones son personalizadas.', 'Do you have a special request for your excursion? Let us know: all our excursions are personalized.'),
    ],
  },
  paquetes: {
    meta: { title: t('Paquetes vacacionales', 'Vacation Packages'), description: t('Paquetes todo incluido y personalizables para vivir Oaxaca en cualquier época del año.', 'All-inclusive, customizable packages to experience Oaxaca at any time of year.') },
    hero: {
      title: t('Paquetes **vacacionales**', 'Vacation **Packages**'),
      lead: t('Descubre Oaxaca con todos los sentidos.', 'Discover Oaxaca with all your senses.'),
      // La calenda (540 px) es demasiado pequeña para portada a sangre.
      image: img('/fotos/Quetzaltours_Guelaguetza003-scaled.webp', 'Danza de la Guelaguetza', 'Guelaguetza dance'),
    },
    description: [
      t('Nuestros paquetes vacacionales todo incluido te invitan a explorar lo mejor de Oaxaca en cualquier época del año: su gastronomía, la riqueza cultural de sus pueblos, sus tradiciones vivas y sus escenarios naturales.', 'Our all-inclusive vacation packages invite you to explore the best of Oaxaca at any time of year: its food, the cultural richness of its towns, its living traditions and its natural landscapes.'),
      t('Elige la temporada que más te convenga —desde fiestas tradicionales hasta momentos ideales para descansar—. Todos los paquetes son personalizables: puedes alargar o acortar tu estancia, añadir destinos dentro y fuera del Estado, o incluir experiencias a tu medida.', 'Choose the season that suits you best —from traditional festivities to ideal times to rest. All packages are customizable: you can extend or shorten your stay, add destinations inside and outside the State, or include experiences tailored to you.'),
      t('Escríbenos y te ayudamos a planear tu viaje, desde la primera idea hasta el último detalle.', 'Write to us and we\'ll help you plan your trip, from the first idea to the last detail.'),
    ],
  },
  circuitos: {
    meta: { title: t('Circuitos turísticos', 'Tour Circuits'), description: t('Circuitos por México y Centroamérica desde 4 días con alojamiento, vuelos, tours, traslados y alimentos.', 'Circuits across Mexico and Central America from 4 days, with lodging, flights, tours, transfers and meals.') },
    hero: {
      title: t('Circuitos **turísticos**', 'Tour **Circuits**'),
      lead: t('Aventúrate a conocer México y Centroamérica.', 'Venture out to discover Mexico and Central America.'),
      image: img('/fotos/valle-oaxaca.webp', 'Valle de Oaxaca', 'Oaxaca Valley'),
    },
    description: [
      t('Conoce el lado cultural y natural de México. Circuitos turísticos desde 4 días con alojamiento, vuelos, tours, traslados y alimentos.', 'Discover the cultural and natural side of Mexico. Tour circuits from 4 days with lodging, flights, tours, transfers and meals.'),
      t('Operamos servicios en todo el mundo maya —Honduras, Belice, El Salvador, Guatemala y México— con un único operador turístico.', 'We operate services throughout the Maya world —Honduras, Belize, El Salvador, Guatemala and Mexico— as a single tour operator.'),
      t('Contamos con hospedaje de 3, 4 y 5 estrellas, cabañas ecoturísticas, clase especial, hoteles boutique, gran turismo, resorts y todo incluido, además de transportación terrestre y guías certificados con experiencia.', 'We offer 3, 4 and 5-star lodging, eco-cabins, special class, boutique hotels, grand tourism, resorts and all-inclusive options, plus ground transportation and experienced certified guides.'),
    ],
  },
  nosotros: {
    meta: { title: t('Nosotros', 'About Us'), description: t('Quetzal Tour Operator: más de tres décadas mostrando Oaxaca.', 'Quetzal Tour Operator: more than three decades showing Oaxaca.') },
    hero: {
      title: t('Somos **Quetzal** Tour Operator', 'We are **Quetzal** Tour Operator'),
      lead: t('Esta aventura no se trata de un cambio, pero parece ser algo inevitable.', 'This adventure is not about a change, but it seems to be something inevitable.'),
      image: img('/fotos/Mitla_QuetzalTours_Oaxaca_01.jpg', 'Grupo de Quetzal Tours en Mitla', 'Quetzal Tours group in Mitla'),
    },
    /** Carta de bienvenida del v2, repartida en dos filas (layout Lightship). */
    letter: {
      greeting: t('Muy estimados visitantes:', 'Dear visitors:'),
      rows: [
        {
          text: [
            t('Bienvenidos a Oaxaca. Gracias por venir. Hemos estado aquí por más de 3,000 años. Este viejo legado cultural continúa viviendo en los vastos paisajes de la Sierra, los Valles y la Costa.', 'Welcome to Oaxaca. Thank you for coming. We have been here for more than 3,000 years. This old cultural legacy lives on in the vast landscapes of the Sierra, the Valleys and the Coast.'),
            t('Puedes verlo en los antiguos templos, pirámides y tumbas mixtecas y zapotecas, y oírlo cuando te encuentres con los zapotecas de hoy, en sus pueblos y mercados, descendientes directos de una de las civilizaciones antiguas más desarrolladas del mundo.', 'You can see it in the ancient Mixtec and Zapotec temples, pyramids and tombs, and hear it when you meet today\'s Zapotecs, in their towns and markets, direct descendants of one of the most developed ancient civilizations in the world.'),
          ],
          image: img('/fotos/Quetzaltours_0189.webp', 'Viajeros de Quetzal Tours en una zona arqueológica', 'Quetzal Tours travelers at an archaeological site'),
        },
        {
          text: [
            t('Queremos darles la bienvenida para que vengan y sientan el poder y la gloria del **Mundo Mesoamericano**, especialmente del Mundo Zapoteco y el Mundo Maya.', 'We want to welcome you to come and feel the power and glory of the **Mesoamerican World**, especially the Zapotec World and the Maya World.'),
          ],
          image: img('/tours/Tours/mitla/galeria/Teotitlan-del-Valle_QuetzalTours_Oaxaca_02.webp', 'Tintes naturales y materiales de los talleres de Teotitlán del Valle', 'Natural dyes and materials from the Teotitlán del Valle workshops'),
        },
      ],
      farewell: t('¡Bienvenidos!', 'Welcome!'),
      signature: t('El equipo de Quetzal Tour Operator.', 'The Quetzal Tour Operator team.'),
    },
    stats: { kicker: t('Quetzal en cifras', 'Quetzal in numbers') },
    closing: {
      title: t('Vive la magia de **Oaxaca**', 'Live the magic of **Oaxaca**'),
      image: img('/sueltas/HERO-Monte-Alban_QuetzalTours_Oaxaca_01.webp', 'Monte Albán sobre el Valle de Oaxaca', 'Monte Albán above the Oaxaca Valley'),
      cta: { label: t('Escríbenos', 'Write to us') },
    },
  },
} as const;

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
