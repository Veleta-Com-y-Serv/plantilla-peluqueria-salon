# Plantilla NoExpertise · Peluquería y salón

Web chic de revista en negro, rosa empolvado y dorado para peluquerías, salones de belleza y coloristas, a ancho completo.

- Sectores: peluquería, salón de belleza, colorista, uñas, maquillaje. Estilo: chic. Plan mínimo: gratis.
- Secciones: hero, servicios, equipo, galeria, productos, ofertas, opiniones, preguntas, reserva, contacto (+ `texto` para apartados nuevos).
- Campos propios: `servicios[]` (nombre, texto, precio, duracion, categoria «Corte|Color|Peinado|Tratamiento», destacado), `personas[].especialidad` (cadena), `productos.items[]` (titulo = marca, texto = qué es), `ofertas[]` (titulo, texto, precio, validez), `testimonios[]` (texto, autor, nota), `reserva.franjas` (franjas horarias con «;»), `boton_formulario` en reserva y contacto, `contacto.horario[]` (dia, horas).
- El formulario de reserva saca el servicio de la carta y la estilista del equipo.
- SEO de base incluido (`src/lib/seo.ts`): canónica, og:image, JSON-LD del negocio (`HairSalon`) y de las preguntas frecuentes, `robots.txt`, `sitemap.xml` y `llms.txt`; `noindex` si `seo.indexable: false`.
- Varias páginas (opcional, `paginas:` en la raíz de `site.yaml`): Inicio + una página por entrada (`{ ruta, titulo, secciones: "a; b" }`, hasta 6) con el menú hecho solo; reparto recomendado en `template.yaml → paginas`. Sin la clave, una sola página larga.
- Contenido editable en `site.yaml`; metadatos y guion del asistente en `template.yaml`; reglas para el agente en `CLAUDE.md`; brief de diseño en `DISEÑO.md`; fotos a generar en `fotos.json` (respaldos en `public/placeholders/`).

```
npm ci
npm run dev      # desarrollo
npm run build    # web estática en dist/
```

Basada en [AstroWind](https://github.com/onwidget/astrowind) © onWidget, licencia MIT (`LICENSE-ASTROWIND.md`). Imágenes de relleno (`public/placeholders/`) generadas para esta plantilla, sin licencias de terceros.

## Páginas propias
- Cada elemento de `secciones.servicios.servicios` con `detalle` tiene su página en `/servicios/<slug>/` (`src/pages/[coleccion]/[slug].astro`).
- Campos opcionales de los elementos con ficha: `detalle` (párrafos separados por una línea en blanco), `slug` e `imagenes` («/fotos/a.jpg; /fotos/b.jpg»).
