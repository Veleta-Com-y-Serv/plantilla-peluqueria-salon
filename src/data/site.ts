// Carga ../../site.yaml en el build y lo expone tipado.
// Es la única fuente de contenido: textos, colores, contacto, menú y secciones.
import datos from '../../site.yaml';

export interface Enlace { texto: string; url: string }
export interface Item { titulo: string; texto?: string; icono?: string; imagen?: string; url?: string }
/** Estilista (sección «equipo»). «especialidad» es una cadena (con comas si son varias). */
export interface Persona { nombre: string; cargo?: string; especialidad?: string; foto?: string; texto?: string }
/** Promoción (sección «ofertas»). Precio siempre como texto; «validez» = hasta cuándo vale. */
export interface Oferta { titulo: string; texto?: string; precio?: string; validez?: string }
export interface Testimonio { texto: string; autor: string; nota?: string }
export interface Horario { dia: string; horas: string }
export interface Pregunta { pregunta: string; respuesta: string }
export interface Proyecto { titulo: string; texto?: string; imagen?: string; categoria?: string; anio?: string }
export interface Noticia { fecha: string; titulo: string; texto?: string; url?: string }
/** Servicio con precio (sección «servicios»). Se agrupan por «categoria» en orden de aparición. Precio siempre como texto. */
export interface Servicio { nombre: string; texto?: string; precio?: string; duracion?: string; categoria?: string; destacado?: boolean }

export interface Seccion {
  activa: boolean;
  titulo?: string;
  antetitulo?: string;
  texto?: string;
  imagen?: string;
  cta?: Enlace;
  cta_secundario?: Enlace;
  nota?: string;
  items: Item[];
  personas: Persona[];
  testimonios: Testimonio[];
  galeria: string[];
  horario: Horario[];
  preguntas: Pregunta[];
  proyectos: Proyecto[];
  noticias: Noticia[];
  servicios: Servicio[];
  ofertas: Oferta[];
  [campo: string]: unknown;
}

export interface Site {
  nombre: string;
  eslogan: string;
  sector: string;
  logo: string;
  colores: { primario: string; acento: string; fondo: string; texto: string };
  contacto: { telefono: string; email: string; direccion: string; horario: string; whatsapp: string };
  redes: { instagram: string; facebook: string; linkedin: string };
  menu: Enlace[];
  /** `url` e `indexable` los escribe la plataforma (opcionales: las webs antiguas no los traen). */
  seo: { titulo: string; descripcion: string; tipo: string; url?: string; indexable?: boolean };
  boton_cabecera: Enlace | null;
  marca_pie: boolean;
  secciones: Record<string, Seccion>;
}

type Crudo = Record<string, any>;
const d = (datos ?? {}) as Crudo;
function lista<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v.filter(Boolean) as T[]) : [];
}
const texto = (v: unknown) => (v == null ? '' : String(v));

function normalizar(s: Crudo = {}): Seccion {
  return {
    ...s,
    activa: s.activa === true,
    nota: texto(s.nota),
    cta: s.cta?.url ? (s.cta as Enlace) : undefined,
    cta_secundario: s.cta_secundario?.url ? (s.cta_secundario as Enlace) : undefined,
    items: lista<Item>(s.items),
    personas: lista<Persona>(s.personas),
    testimonios: lista<Testimonio>(s.testimonios),
    galeria: lista<string>(s.galeria),
    horario: lista<Horario>(s.horario),
    preguntas: lista<Pregunta>(s.preguntas),
    proyectos: lista<Proyecto>(s.proyectos),
    noticias: lista<Noticia>(s.noticias),
    servicios: lista<Servicio>(s.servicios).filter((x) => x && x.nombre),
    ofertas: lista<Oferta>(s.ofertas).filter((x) => x && x.titulo),
  } as Seccion;
}

const secciones: Record<string, Seccion> = {};
for (const [id, s] of Object.entries((d.secciones ?? {}) as Crudo)) secciones[id] = normalizar((s ?? {}) as Crudo);

export const site: Site = {
  nombre: texto(d.nombre) || 'Mi negocio',
  eslogan: texto(d.eslogan),
  sector: texto(d.sector),
  logo: texto(d.logo),
  colores: { primario: '#e2b4ad', acento: '#c19a5b', fondo: '#0d0b0b', texto: '#f7eeea', ...(d.colores ?? {}) },
  contacto: { telefono: '', email: '', direccion: '', horario: '', whatsapp: '', ...(d.contacto ?? {}) },
  redes: { instagram: '', facebook: '', linkedin: '', ...(d.redes ?? {}) },
  menu: lista<Enlace>(d.menu),
  seo: {
    titulo: texto(d.seo?.titulo) || texto(d.nombre),
    descripcion: texto(d.seo?.descripcion) || texto(d.eslogan),
    tipo: texto(d.seo?.tipo) || 'HairSalon',
    ...(texto(d.seo?.url) && { url: texto(d.seo?.url).replace(/\/+$/, '') }),
    ...(typeof d.seo?.indexable === 'boolean' && { indexable: d.seo.indexable as boolean }),
  },
  boton_cabecera: d.boton_cabecera?.url ? (d.boton_cabecera as Enlace) : null,
  marca_pie: d.marca_pie !== false,
  secciones,
};

/** Devuelve la sección si existe y tiene `activa: true`; si no, null. */
export function seccion(id: string): Seccion | null {
  const s = site.secciones[id];
  return s && s.activa ? s : null;
}

/** Ids de las secciones activas, en el orden en que aparecen en site.yaml. */
export function seccionesActivas(): string[] {
  return Object.keys(site.secciones).filter((id) => site.secciones[id].activa);
}

/** Opciones del desplegable «Servicio» de los formularios: nombres de servicios.servicios (sin repetir). */
export function intereses(): string[] {
  const nombres = Object.entries(site.secciones)
    .filter(([id, s]) => s.activa && (id === 'servicios' || s.tipo === 'servicios'))
    .flatMap(([, s]) => s.servicios.map((x) => texto(x.nombre)));
  return [...new Set(nombres.filter(Boolean))];
}

/** Opciones del desplegable «Estilista» de la reserva: nombres de equipo.personas (sin repetir). */
export function estilistas(): string[] {
  const nombres = Object.entries(site.secciones)
    .filter(([id, s]) => s.activa && (id === 'equipo' || s.tipo === 'equipo'))
    .flatMap(([, s]) => s.personas.map((x) => texto(x.nombre)));
  return [...new Set(nombres.filter(Boolean))];
}

/** Agrupa los servicios por «categoria», en el orden en que aparecen (sin categoría: un grupo sin nombre). */
export function porCategoria(servicios: Servicio[]): { categoria: string; servicios: Servicio[] }[] {
  const grupos: { categoria: string; servicios: Servicio[] }[] = [];
  for (const x of servicios) {
    const categoria = texto(x.categoria).trim();
    let g = grupos.find((y) => y.categoria === categoria);
    if (!g) grupos.push((g = { categoria, servicios: [] }));
    g.servicios.push(x);
  }
  return grupos;
}

/** Lista a partir de una cadena separada por «;» (p. ej. «franjas» de la reserva). */
export const puntos = (t?: unknown) => (t ? String(t).split(';').map((p) => p.trim()).filter(Boolean) : []);
/** Lista a partir de una cadena separada por comas o «;» (p. ej. «especialidad» de una estilista). */
export const etiquetas = (t?: unknown) => (t ? String(t).split(/[;,]/).map((p) => p.trim()).filter(Boolean) : []);
/** Texto de un campo libre de la sección ('' si no hay). */
export const campo = (v: unknown) => texto(v).trim();

export const tel = (n?: string) => (n ? 'tel:' + n.replace(/[^\d+]/g, '') : '');
export const whatsapp = (n?: string, mensaje = '') =>
  n ? `https://wa.me/${n.replace(/\D/g, '')}${mensaje ? '?text=' + encodeURIComponent(mensaje) : ''}` : '';
export const mapa = (direccion?: string) =>
  direccion ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(direccion) : '';
/** Párrafos a partir de un texto con líneas en blanco entre párrafos. */
export const parrafos = (t?: string) => (t ? t.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : []);
