import type { Lang, Text } from '@/content/site';

export const langs: Lang[] = ['es', 'en'];
export const defaultLang: Lang = 'es';

/** Texto en el idioma pedido; si falta el inglés, cae al español. */
export function tr(text: Text | undefined, lang: Lang): string {
  if (!text) return '';
  if (lang === 'en' && !text.en) missingEn.add(text.es);
  return (lang === 'en' ? text.en : undefined) ?? text.es;
}

/** Textos sin traducir detectados durante el render (para el informe de build). */
export const missingEn = new Set<string>();

/** Prefija una ruta interna con el idioma (el español va sin prefijo). */
export function href(path: string, lang: Lang): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === defaultLang ? clean : `/${lang}${clean === '/' ? '' : clean}`;
}

/** Ruta equivalente en el otro idioma, para el selector ES/EN. */
export function switchLang(pathname: string, to: Lang): string {
  const bare = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  return href(bare, to);
}

/** Rutas estáticas para `[...lang]`: undefined = español en la raíz. */
export const langPaths = () =>
  langs.map((lang) => ({ params: { lang: lang === defaultLang ? undefined : lang }, props: { lang } }));

/** **texto** → <strong>texto</strong>, escapando el resto. */
export function rich(s: string): string {
  const esc = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return esc.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}
