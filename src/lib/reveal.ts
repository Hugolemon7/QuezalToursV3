/**
 * Marca con .is-in los [data-reveal] al entrar en pantalla (una sola vez).
 * Dentro de un [data-reveal-group] (p. ej. un carrusel horizontal), los hijos
 * se revelan juntos cuando entra el grupo: los que quedan fuera por los lados
 * nunca "entrarían" y se quedarían desplazados.
 */
export function initReveal() {
  const els = document.querySelectorAll<HTMLElement>(
    '[data-reveal]:not(.is-in):not([data-reveal-group] [data-reveal]), [data-reveal-group]',
  );
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-in');
        e.target.querySelectorAll('[data-reveal]').forEach((c) => {
          if ((e.target as HTMLElement).hasAttribute('data-reveal-group')) c.classList.add('is-in');
        });
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
  );
  els.forEach((el) => io.observe(el));
}
