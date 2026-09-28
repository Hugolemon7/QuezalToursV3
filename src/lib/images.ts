import type { ImageMetadata } from 'astro';

/**
 * Las rutas de fotos del contenido ('/tours/<slug>/…', '/paginas/…')
 * apuntan a src/assets. Aquí se resuelven a metadatos de Astro para que
 * <Photo> genere tamaños y formatos optimizados en el build.
 */
const files = import.meta.glob<ImageMetadata>('/src/assets/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

export function asset(src: string): ImageMetadata {
  const meta = files[`/src/assets${src}`];
  if (!meta) throw new Error(`Imagen no encontrada en src/assets: ${src}`);
  return meta;
}
