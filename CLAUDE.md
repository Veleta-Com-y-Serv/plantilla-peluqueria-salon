# Plantilla «Peluquería y salón» (NoExpertise)

Web estática Astro 5 + Tailwind 4, derivada de AstroWind (MIT, ver `LICENSE-ASTROWIND.md`). Estilo: **chic**, de
revista de moda (negro, rosa empolvado y dorado; titulares en serif fina de alto contraste a tamaño enorme con la
segunda parte en cursiva, antetítulos en mayúsculas muy espaciadas con filete dorado, fotos a sangre con un marco
dorado fino por dentro). Todo a ancho completo: cada sección es una banda de borde a borde. Todo en castellano de
España, frases cortas, sin jerga. El brief de diseño está en `DISEÑO.md`.

## Dónde está cada cosa
- **Textos, contacto, menú, SEO y secciones**: `site.yaml` (raíz). Es la única fuente de contenido. `src/data/site.ts` lo carga y lo tipa; no pongas textos fijos en los componentes.
- **Colores**: `site.yaml → colores` (primario, acento, fondo, texto). `src/layouts/Base.astro` los convierte en variables CSS (`--c-primario`…) y Tailwind los expone como `bg-primario`, `text-acento`…
  - `fondo` = negro de las bandas oscuras; `texto` = marfil rosado. Las bandas claras («marfil») son esos dos invertidos: si el cliente pide fondo claro, cambia `fondo` y `texto` y todo se invierte sin romperse.
  - `primario` = rosa empolvado de las bandas de color (Trabajos, Opiniones, mitad del formulario de Reserva) y de la cursiva del titular de portada. La letra encima se calcula sola (`--sobre-primario`).
  - `acento` = dorado de botones, filetes, antetítulos y marcos de las fotos (`--oro`; sobre marfil se usa una mezcla más oscura, `--oro-oscuro`, para que se lea).
- **Tipografías y aspecto general**: `src/styles/global.css` (`--fuente-titulos`: "Didot", "Bodoni 72", "Bodoni MT"… peso normal, nunca negrita; bandas `.banda-negra`, `.banda-marfil`, `.banda-rosa`, `.banda-carbon`; `.marco` (filete dorado por dentro de una foto); `.antetitulo`; `.cursiva`; botones `.btn` (rectángulo dorado con filete final) y `.btn-sec`; campos de formulario subrayados; cabecera fija `.cabecera--revista` con alto `--alto-cabecera`, transparente sobre la portada (`.sobre-hero`, la pone un script corto de `Header.astro`); pie `.pie--revista`). Fuentes del sistema: no añadas fuentes externas.
- **Titulares en cursiva**: `src/components/ui/Cursiva.astro` pone en cursiva lo que va tras la primera coma del título (o, sin coma, la última palabra si hay tres o más). Para controlar qué va en cursiva, basta con poner o quitar la coma en `site.yaml`.
- **Imágenes**: en `public/`. Las fotos van en `public/fotos/` (lista y descripción en `fotos.json`); cada una tiene su respaldo `public/placeholders/<mismo nombre>.svg`, que `Imagen.astro` enseña si la foto falta. En `site.yaml` se referencian con ruta absoluta (`/fotos/hero.jpg`). Fotos de personas: `/placeholders/persona.svg` (no se generan caras).
- **Logo**: `site.yaml → logo` (ruta en `public/`); vacío = rombo dorado + nombre en serif mayúscula espaciada.
- **Pie «Web creada con NoExpertise»**: `site.yaml → marca_pie`. El pie repite eslogan, botón de la cabecera, contacto, horario (de `secciones.contacto.horario` o `contacto.horario`), menú, redes y el nombre en grande.

## Secciones
Cada sección es un componente que solo se pinta si `site.yaml → secciones.<id>.activa` es `true`. Se pintan en el orden en que aparecen en `site.yaml`.
- `hero` → `hero.astro`: portada a pantalla completa con `imagen` a sangre, velo negro y marco dorado; centrados `antetitulo`, `titulo` enorme (mejor con una coma: «Tu pelo, con firma propia»), `texto`, `cta`, `cta_secundario`; abajo `items: [{titulo, icono}]` separados por rombos. Sin foto, negro con halo rosa.
- `servicios` → `servicios.astro`: banda marfil partida: `imagen` a sangre a la izquierda (fija al bajar en escritorio) y la carta `servicios: [{nombre, texto, precio, duracion, categoria, destacado}]` agrupada por `categoria` (Corte, Color, Peinado, Tratamiento…). `precio` siempre texto (`"28 €"`, `"desde 95 €"`); vacío = no se pinta. `destacado: true` = «Favorito». `nota` y `cta` opcionales. No inventes precios.
- `equipo` → `equipo.astro`: banda negra con retratos 3:4 en zigzag (hasta 4 columnas): `personas: [{nombre, cargo, especialidad, foto, texto}]`; `especialidad` es **una cadena** («Balayage, rubios y corrección de color»). Los nombres salen en el desplegable «Estilista» de la reserva.
- `galeria` → `galeria.astro`: banda rosa con titular y `cta` (p. ej. a Instagram) y `galeria: [ruta…]` en mosaico de borde a borde sin huecos (8 fotos cierran la rejilla de escritorio).
- `productos` → `productos.astro`: banda marfil con las marcas `items: [{titulo, texto}]` en serif enorme, separadas por rombos; `texto` = qué es (tintes, champús…). No inventes marcas reales que el negocio no use.
- `ofertas` → `ofertas.astro`: banda negra con promociones `ofertas: [{titulo, texto, precio, validez}]` en filas a todo el ancho y el precio enorme en rosa. Sin precio no hay precio.
- `opiniones` → `opiniones.astro`: banda rosa; la primera opinión como cita enorme y el resto en columnas: `testimonios: [{texto, autor, nota}]` (`nota` = servicio). No inventes opiniones.
- `preguntas` → `preguntas.astro`: banda marfil, titular fijo a la izquierda y acordeón `details/summary` a la derecha (`preguntas: [{pregunta, respuesta}]`); `imagen` opcional en franja encima. Sin preguntas no se pinta.
- `reserva` → `reserva.astro`: partida 50/50: `imagen` a sangre y, sobre rosa, titular, pasos `items: [{titulo, texto}]`, formulario de reserva (servicio, estilista, fecha preferida, franja de `franjas` —**cadena con «;»**— y comentario), botón de WhatsApp (sale solo de `contacto.whatsapp`), `cta` opcional y `nota`. `boton_formulario` opcional.
- `contacto` → `contacto.astro`: banda marfil: teléfono enorme en cursiva, WhatsApp, email y dirección en fila, horario (`horario: [{dia, horas}]`, o `contacto.horario` si no hay lista) y, tras un filete dorado, formulario corto. `boton_formulario` opcional.
- `texto` → `texto.astro`: apartado genérico sobre negro (párrafos, `imagen` a sangre 50/50, `items`, `cta`). Para apartados nuevos: `tipo: texto`.

## Reglas para órdenes
1. **Activar o quitar una sección**: cambia `activa: true|false` en `site.yaml`. No borres componentes.
2. **Reordenar secciones**: mueve el bloque dentro de `secciones:` en `site.yaml`. Conviene alternar bandas negras, rosas y marfil.
3. **Cambiar textos, teléfonos, horarios, fotos**: solo en `site.yaml`. Si un texto contiene comas o dos puntos dentro de `{ … }`, ponlo entre comillas (las horas, siempre: `horas: "9:00 a 14:30"`).
4. **Listas planas**: nunca una lista dentro de un elemento de lista (los servicios son una lista con su `categoria`, no categorías con servicios dentro; la especialidad de una estilista y las franjas son cadenas). Precios siempre como texto entre comillas. Máximo 24 elementos por lista.
5. **Página nueva**: crea `src/pages/<slug>.astro` usando `import Base from '../layouts/Base.astro'` y `<Base titulo="…" descripcion="…">…</Base>`; enlázala en `site.yaml → menu` (`{ texto: …, url: "/<slug>" }`). Ejemplo: `src/pages/aviso-legal.astro`.
6. **Sección nueva**: mejor un apartado con `tipo:` (`tipo: texto`, `tipo: servicios`, `tipo: galeria`…) y su propio id. Si hace falta un diseño nuevo, crea `src/components/secciones/<id>.astro` con `seccion(Astro.props.id)` y una banda de borde a borde (`banda-*`). `src/pages/index.astro` la recoge sola: no lo toques.
7. **No tocar** `src/layouts/Base.astro`, `src/pages/index.astro`, `tailwind.config.mjs` ni `src/styles/comun.css` salvo orden explícita de diseño. Los ids `hero` y `contacto` son obligatorios. Tampoco `src/lib/seo.ts` ni `src/pages/robots.txt.ts`, `sitemap.xml.ts` y `llms.txt.ts`: son el SEO de base (canónica, og:image, `noindex` si `seo.indexable: false`, JSON-LD del negocio —`HairSalon`— y de las preguntas, robots, sitemap y llms.txt), salen solos de `site.yaml` y el fichero es el mismo en todas las plantillas. `seo.url` y `seo.indexable` los pone la plataforma: no los cambies.
8. Mantén: `lang="es-ES"`, imágenes con `Imagen.astro` (carga diferida y respaldo), sin JavaScript nuevo salvo necesidad real, 16 px de margen lateral del texto (`.contenedor`; fotos y fondos tocan el borde), sin scroll horizontal en móvil, botones de 44 px de alto como mínimo. Imágenes de contenido con `alt` sacado del contenido (`altHero`, `altFicha`, `altGaleria`, `altSeccion` de `src/lib/seo.ts`, o el `nombre` de la persona); las decorativas, `alt=""` (Imagen.astro les pone `aria-hidden`).
9. El formulario no tiene servidor: abre el correo (`mailto`) con el email de `site.yaml`. Para envío real, cambia `action` en `src/components/ui/FormularioContacto.astro`.
10. Iconos disponibles: ver `src/components/ui/Icono.astro` (del sector: `tijeras, gota, hoja, corazon, estrella, calendario, reloj, mensaje`…).

## Construir
```
npm ci && npm run build      # resultado en dist/
npx astro preview            # ver dist/ en http://localhost:4321
```
Antes de dar una orden por buena: `npm run build` sin errores.
