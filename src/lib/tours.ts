import type { Tour } from '@/content/site';

/**
 * Imagen de tarjeta de un tour. Si no hay foto, se usa la portada gráfica
 * (1350×440) recortada al centro, donde está la fotografía del collage.
 */
export function tourImage(tour: Tour) {
  if (tour.cover) return { src: tour.cover.src, alt: tour.cover.alt, fromBanner: false };
  return { src: tour.banner, alt: tour.name, fromBanner: true };
}
