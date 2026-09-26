# 03 · Secciones — [NOMBRE DEL PROYECTO]

> Recorre la web de arriba abajo. Por cada sección describe **qué es, qué contiene y qué pasa** (a nivel
> de intención e interacción), no cómo se ve al píxel. Ejemplo: `../ejemplo-marina/03-SECCIONES.md`.

Para cada sección, responde:
- **Propósito:** ¿qué hace por el objetivo del sitio (`01` §2)?
Concretar ventas o reservas de usuarios que quieran explorar y vivir las mejores experiencias de Oaxaca, y regresar pronto.
- **Contenido:** qué elementos lleva.
Hero, Carousel de tours, Tour del momento, tipos de experiencias.
- **Interacción:** ¿qué pasa al hover / clic / scroll? ¿algo que premie explorar?
El carousel muestra los cards de diferentes tours ofrecidos de manera dinámica, haciendo que el usuario guste de estar viendo los tours en el causal.
- **Referencia:** ¿de qué referencia sale (si aplica)?
- **En móvil / sin animación:** cómo degrada (touch no tiene hover; respeta reduced-motion).

---

## Estructura del sitio (mapa)
Lista las secciones/rutas en orden. Ejemplo:
```
/ Home
├─ Cabecera + menú
├─ Portada (hero)
├─ Tours
├─ Tour del momento
└─ Cierre + contacto


/tours
├─ Cabecera + menú
├─ Portada (hero)
├─ Descripción
├─ Galería de tours
└─ Cierre + contacto

/paquetes
├─ Cabecera + menú
├─ Portada (hero)
├─ Descripción
├─ Galería de paquetes
└─ Cierre + contacto

/circuitos
├─ Cabecera + menú
├─ Portada (hero)
├─ Descripción
├─ Circuitos
└─ Cierre + contacto

/nosotros
├─ Cabecera + menú
├─ Portada (hero)
├─ Descripción
├─ Datos
└─ Cierre + contacto

/tours/tour1
├─ Cabecera + menú
├─ Portada 
├─ Descripción
├─ Galería
├─ Datos (qué incluye y que no)
├─ Itinerario
└─ Formulario para contacto

---

## Sección: Cabecera / menú
- Propósito · Contenido · Interacción · Referencia · Móvil/reduced-motion

## Sección: Portada (hero)
- Propósito · Contenido · Interacción · Referencia · Móvil/reduced-motion
- (Pista: la portada suele ser tu mayor palanca. ¿Qué idea única transmite? ¿Dónde está el CTA?)

## Sección: [tu sección clave]
- …

## Sección: Sobre mí / nosotros
- …

## Sección: Cierre / contacto
- …

*(Duplica el bloque por cada sección real.)*

---

## Comportamientos globales
- **Scroll:** suave por secciones
- **Accesibilidad:** teclado, foco visible, `prefers-reduced-motion`.
