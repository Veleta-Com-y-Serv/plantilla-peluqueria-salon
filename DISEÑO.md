# Peluquería y salón: brief de diseño

Plantilla `peluqueria-salon` creada el 02/11/2026 a partir de `tatuajes-barberia` (base de origen) con
`php artisan plantillas:nueva`. De la base solo queda la estructura técnica (site.ts, seo.ts, Base.astro, index.astro,
Imagen.astro, formulario `mailto`); el diseño es otro entero. Este fichero se queda en el repo: es lo que lee quien
(persona o agente) rediseñe la plantilla.

## Brief

- **Para quién**: peluquerías, salones de belleza, coloristas, uñas y maquillaje (`sectores`). Quien entra quiere ver
  si el salón tiene buen gusto, cuánto cuesta lo que busca y quién le va a atender, y reservar sin llamar.
- **Qué tiene que conseguir la web**: la reserva (formulario con servicio, estilista, fecha y franja, o WhatsApp).
- **Tono y estilo** (`estilo: chic`): elegante, nocturno, editorial. Sí: una portada de revista de moda, un salón con
  terciopelo y latón. No: el spa blanco con arcos y fotos redondas (`belleza-estetica`), la clínica clara
  (`clinica-estetica`), la barbería cruda de slab serif y bordes dentados (`tatuajes-barberia`).
- **Paleta de ejemplo**: primario `#e2b4ad` (rosa empolvado), acento `#c19a5b` (dorado), fondo `#0d0b0b` (negro),
  texto `#f7eeea` (marfil rosado). Derivados con `color-mix`: `--oro-oscuro` (dorado legible sobre marfil),
  `--carbon` (negro cálido del pie). La letra sobre rosa y dorado se calcula con `oklch(from …)`.
- **Tipografía**: titulares en serif fina de alto contraste del sistema (`Didot`, `Bodoni 72`, `Bodoni MT`, luego
  `Times New Roman`/Georgia), peso normal y tamaño enorme (portada 2,7 rem en móvil, hasta 8,5 rem en escritorio);
  la parte tras la coma va en cursiva (`Cursiva.astro`). Texto en sans humanista del sistema (`Avenir Next`, `Segoe UI`).
  Antetítulos, botones y etiquetas en mayúsculas pequeñas con interletrado .24-.32 em.
- **Formas**: fotos rectas a sangre con un filete dorado fino por dentro (`.marco`); rombos dorados como separadores;
  botones rectangulares con un filete al final que crece al pasar; campos de formulario subrayados, sin caja.
- **Ritmo de bandas**: portada negra a pantalla completa → servicios marfil (foto fija a sangre a la izquierda) →
  equipo negro (retratos en zigzag) → trabajos rosa con mosaico de borde a borde → marcas marfil (nombres en serif
  enorme) → promociones negras (filas con precio enorme rosa) → opiniones rosa (cita enorme) → preguntas marfil
  (titular fijo + acordeón) → reserva 50/50 (foto a sangre + formulario sobre rosa) → contacto marfil (teléfono
  enorme en cursiva) → pie carbón con el nombre enorme.
- **Cabecera**: fija a todo el ancho, transparente sobre la portada y negra al bajar (script corto en `Header.astro`;
  sin JavaScript se queda negra). Menú móvil a pantalla completa con los enlaces en serif cursiva.

## Apartados y listas propias

| id | Banda | Lista / campos propios |
|---|---|---|
| `hero` | negra, foto a sangre | `items` {titulo, icono} |
| `servicios` | marfil + foto | `servicios` {nombre, texto, precio, duracion, categoria, destacado}, `nota` |
| `equipo` | negra | `personas` {nombre, cargo, especialidad, foto, texto} |
| `galeria` | rosa + mosaico | `galeria` [rutas], `cta` |
| `productos` | marfil | `items` {titulo (marca), texto} |
| `ofertas` | negra | `ofertas` {titulo, texto, precio, validez} |
| `opiniones` | rosa | `testimonios` {texto, autor, nota} |
| `preguntas` | marfil | `preguntas` {pregunta, respuesta} |
| `reserva` | foto + rosa | `items` {titulo, texto}, `franjas` («;»), `nota`, `boton_formulario` |
| `contacto` | marfil | `horario` {dia, horas}, `boton_formulario` |
| `texto` | negra | genérico |

## Fotos (`fotos.json`, 11)

Salón con tocadores de espejo dorado y sillones de terciopelo rosa (portada, 16:9), carrito de herramientas (3:4),
ocho trabajos (pelo de espaldas o de perfil sin cara, manos, herramientas, lavacabezas, tocador) y recepción con
peonías (3:4). Siempre sin texto legible, sin logotipos y sin personas reconocibles; luz cálida, fondos oscuros.

## Qué no hacer

- Volver a la caja centrada con tarjetas blancas, a las esquinas redondeadas o a las fotos en arco o círculo.
- Usar negrita en los titulares (rompe la serif fina) o fuentes externas.
- Precios, cifras u opiniones fijos en los componentes: todo sale de `site.yaml`.
