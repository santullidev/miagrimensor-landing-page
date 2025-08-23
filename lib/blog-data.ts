export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  images?: string[];
  featured: boolean;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: "estado-parcelario-caba",
    title: "Todo sobre el Estado Parcelario en la Ciudad Autónoma de Buenos Aires",
    slug: "todo-sobre-el-estado-parcelario-en-la-ciudad-autonoma-de-buenos-aires",
    excerpt: "El estado parcelario en la Ciudad Autónoma de Buenos Aires, todo lo que tenés que saber y entender.",
    featuredImage: "/post-blog-1.jpeg",
    content: `
# Todo sobre el Estado Parcelario en la Ciudad Autónoma de Buenos Aires

El estado parcelario en la Ciudad Autónoma de Buenos Aires, todo lo que tenés que saber y entender.

## Ley de Catastro N° 6437 (CABA)

### 🏛 Resumen General

La ley establece el marco normativo del Catastro de la Ciudad Autónoma de Buenos Aires, definiéndolo como un registro público que documenta los datos de los objetos territoriales legales (parcelas, unidades funcionales, etc.) tanto del dominio público como privado.

### Objetivos del Catastro:

- Proveer información para el ordenamiento territorial y tributario.
- Servir como base de la infraestructura de datos espaciales de la Ciudad.
- Regular actos de mensura, registro, nomenclatura, georreferenciación y certificación catastral.

### Principios clave:

- **Especialidad y determinación**: precisión en la individualización del inmueble.
- **Publicidad y trazabilidad**: acceso público y trazabilidad de los datos.
- **Multifinalidad y actualización continua**: uso múltiple de datos y obligación de mantenerlos actualizados.

## Estado Parcelario

Regulado en el Título 7 de la ley, se refiere al conjunto de elementos esenciales y complementarios que describen la situación actual de una parcela. Es clave para la validez de actos jurídicos sobre inmuebles.

### Artículo 49 — Definición:
Es el estado de hecho registrado de un objeto territorial legal parcelario, utilizado para publicitar su condición en el momento de constituir, modificar o transmitir derechos reales.

### Elementos del Estado Parcelario:

#### A. Esenciales:

1. **Nomenclatura catastral**
2. **Ubicación georreferenciada** del objeto territorial legal parcelario
3. **Límites del inmueble**, en relación a las causas jurídicas que les dan origen
4. **Medidas lineales, angulares y de superficie** del inmueble
5. **Restricciones y afectaciones** que le correspondan
6. **Tipificación de las mejoras** y demás accesiones con sus características constructivas y data
7. **Partida Inmobiliaria**

#### B. Complementarios:

1. **Inscripción en el Registro de la Propiedad**
2. **Valuación fiscal**
3. **Zonificación y/o áreas indicadas** en el Código Urbanístico
4. **Permisos o concesiones administrativas**
5. **Linderos**
6. **Notas de referencia recíproca** con otros objetos territoriales legales parcelarios registrados
7. **Otros elementos** que el profesional y/o el organismo catastral considere necesarios como datos censales o ambientales

### Artículo 51 — Constitución
El estado parcelario se constituye mediante un acto de mensura registrado por un profesional autorizado y queda asentado en el organismo catastral.

### Artículo 52 — Verificación de la Subsistencia
Con posterioridad a la determinación y constitución del estado parcelario, debe efectuarse su verificación antes de actos registrales según los siguientes plazos:

- **2 años** para inmuebles baldíos
- **6 años** para inmuebles edificados
- **6 años** para unidades funcionales con superficie descubierta o último piso (no implementado)

### Artículo 53°- Certificado del Estado Parcelario
La vigencia del estado parcelario se acredita con el Certificado del Estado Parcelario otorgado por el Organismo Catastral, a petición de la parte interesada.

### Artículo 54°. Sobre Inscripciones
El escribano interviniente debe acreditar la vigencia del estado parcelario y transcribir en los instrumentos públicos el contenido del certificado catastral, consignando, la nomenclatura catastral, las observaciones, restricciones o aclaraciones que constaren y la descripción de la parcela según las constancias de la misma.

## Exentos de Constitución del Estado Parcelario

1. **Barrios en proceso de regularización dominial**
2. **Transferencias de dominio** en el marco de PROCREAR u otros programas oficiales de escrituración
3. **Escrituras de Inmuebles del Estado**
4. **Actos por los cuales se procede** a constituir, modificar, transmitir o cancelar Derechos Reales de Hipoteca, Uso, Habitación, Usufructo, Servidumbre y Propiedad Horizontal
5. **Transferencia de dominio** de parcelas con plano de propiedad horizontal registrado

## Obligatoriedad de Constitución y Verificación del estado parcelario

### a) Para inmuebles no divididos en propiedad horizontal
La obligatoriedad para la constitución y verificación del estado parcelario, en ocasión de realizarse cualquier acto de constitución, modificación y transmisión de derechos reales (con las excepciones previstas anteriormente).

### b) Para Derecho real de superficie
La obligatoriedad para la constitución y verificación del estado parcelario, en ocasión de realizarse cualquier acto de constitución, modificación y transmisión de derechos reales, con las excepciones previstas.

## Constitución de Estado Parcelario (en Mensuras)

### a) Mensuras posteriores al 01/01/2023
Aquellas Mensuras que se tramiten con posterioridad al 01/01/2023 deberán constituir el estado parcelario de los Objetos territoriales que surjan de la misma al momento de su registro, dentro del mismo trámite.

### b) Mensuras para prescripción adquisitiva
En los casos de mensuras para prescripción adquisitiva de Parcelas, deberá constituirse estado parcelario una vez dictada la sentencia judicial.

## El Estado Parcelario en la Ciudad Autónoma de Buenos Aires

**Que - Como - Cuando - Porque - Donde**

### Ejemplo de Certificado Catastral Del Estado Parcelario

El certificado incluye toda la información esencial y complementaria del inmueble, siendo un documento fundamental para cualquier operación inmobiliaria en la Ciudad de Buenos Aires.
    `,
    author: "Pablo Venerus",
    publishedAt: "2025-01-06",
    readTime: "5 min read",
    category: "Estado Parcelario",
    tags: ["CABA", "Estado Parcelario", "Catastro", "Mensura", "Derechos Reales"],
    featured: true,
    seo: {
      title: "Estado Parcelario CABA - Todo lo que necesitas saber | Agrimensor Pablo Venerus",
      description: "Guía completa sobre el Estado Parcelario en la Ciudad Autónoma de Buenos Aires. Información detallada sobre la Ley de Catastro N° 6437 y sus requisitos.",
      keywords: ["estado parcelario", "CABA", "catastro", "mensura", "agrimensura", "Buenos Aires"]
    }
  },
  {
    id: "estado-parcelario-provincia",
    title: "Todo sobre el Estado Parcelario en la Provincia de Buenos Aires",
    slug: "todo-sobre-el-estado-parcelario-en-la-provincia-de-buenos-aires",
    excerpt: "Guía completa sobre el Estado Parcelario en la Provincia de Buenos Aires, requisitos y procedimientos.",
    featuredImage: "/post-blog-4.jpeg",
    content: `
# Todo sobre el Estado Parcelario en la Provincia de Buenos Aires

## Marco Legal Provincial

La Provincia de Buenos Aires cuenta con su propia normativa para el Estado Parcelario, que difiere en algunos aspectos de la Ciudad Autónoma de Buenos Aires.

### Ley Provincial de Catastro

La Provincia de Buenos Aires regula el catastro a través de su propia legislación, estableciendo los requisitos específicos para la constitución y verificación del estado parcelario.

## Diferencias con CABA

### 1. Plazos de Verificación
Los plazos para la verificación del estado parcelario pueden variar según el municipio y el tipo de inmueble.

### 2. Documentación Requerida
Cada municipio puede establecer requisitos específicos de documentación adicional.

### 3. Procedimientos Administrativos
Los trámites y procedimientos pueden diferir entre los distintos municipios de la provincia.

## Requisitos Generales

### Documentación Básica
- Plano de mensura actualizado
- Certificado de dominio
- Constancia de libre deuda municipal
- Certificado catastral

### Elementos del Estado Parcelario Provincial

#### Esenciales:
1. **Nomenclatura catastral municipal**
2. **Ubicación georreferenciada**
3. **Límites y medidas**
4. **Mejoras y características constructivas**
5. **Partida inmobiliaria provincial**

#### Complementarios:
1. **Inscripción en el Registro de la Propiedad**
2. **Valuación fiscal municipal**
3. **Zonificación local**
4. **Permisos municipales**
5. **Linderos y referencias**

## Municipios de Cobertura

Ofrecemos servicios en los siguientes partidos de la Provincia de Buenos Aires:

- **Avellaneda**
- **Lanús**
- **Lomas de Zamora**
- **Vicente López**
- **San Fernando**
- **San Isidro**
- **Tigre**
- **La Matanza**
- **San Martín**
- **Ituzaingó**

## Procedimientos Específicos

### Constitución del Estado Parcelario
1. **Relevamiento topográfico** con Estación Total
2. **Procesamiento de datos** con software especializado
3. **Elaboración del plano** de mensura
4. **Presentación ante el organismo** catastral correspondiente
5. **Seguimiento del trámite** hasta su aprobación

### Verificación de Subsistencia
- **Relevamiento de campo** para verificar el estado actual
- **Comparación con documentación** existente
- **Actualización de datos** si corresponde
- **Emisión del certificado** de verificación

## Ventajas del Estado Parcelario Provincial

### 1. Seguridad Jurídica
Garantiza la correcta identificación y descripción del inmueble.

### 2. Agilización de Trámites
Facilita los procedimientos administrativos y registrales.

### 3. Prevención de Conflictos
Evita problemas de límites y medidas en futuras operaciones.

### 4. Valor Agregado
Aumenta el valor y la confiabilidad del inmueble en el mercado.

## Consultas y Asesoramiento

Ofrecemos consultas sin cargo y presupuestos en el día para todos los servicios relacionados con el Estado Parcelario en la Provincia de Buenos Aires.

### Contacto
- **Teléfono**: +54 9 11 6705-8156
- **Email**: contacto@miagrimensor.com
- **Zona de cobertura**: CABA y Gran Buenos Aires
    `,
    author: "Pablo Venerus",
    publishedAt: "2025-01-06",
    readTime: "4 min read",
    category: "Estado Parcelario",
    tags: ["Provincia de Buenos Aires", "Estado Parcelario", "Catastro", "Mensura", "Gran Buenos Aires"],
    featured: true,
    seo: {
      title: "Estado Parcelario Provincia de Buenos Aires - Guía Completa | Agrimensor Pablo Venerus",
      description: "Información completa sobre el Estado Parcelario en la Provincia de Buenos Aires. Servicios en Avellaneda, Lanús, Lomas de Zamora y más.",
      keywords: ["estado parcelario", "provincia de Buenos Aires", "catastro", "mensura", "agrimensura", "Gran Buenos Aires"]
    }
  },
  {
    id: "trabajos-realizados",
    title: "Algunos de mis trabajos realizados",
    slug: "algunos-de-mis-trabajos-realizados",
    excerpt: "Estados Parcelarios en Provincia de Buenos Aires, Estados Parcelarios en CABA, Mensura Rural, Subdivisión de un PH, entre otros.",
    featuredImage: "/post-blog-2.jpeg",
    content: `
# Algunos de mis trabajos realizados

Estados Parcelarios en Provincia de Buenos Aires, Estados Parcelarios en CABA, Mensura Rural, Subdivisión de un PH, entre otros.

## Galería de Trabajos

### 1. Modelo de Invasión De Linderos
Trabajo especializado en la determinación y documentación de invasiones de linderos, fundamental para resolver conflictos de límites entre propiedades.

### 2. Ejemplo Mensura Rural
Mensuras completas en zonas rurales, incluyendo relevamiento topográfico, determinación de límites y elaboración de planos catastrales.

### 3. Modelo de Relevamiento Topográfico
Relevamientos topográficos detallados utilizando Estación Total y GPS Geodésico para máxima precisión en la medición.

### 4. Modelo de Deslinde y Amojonamiento
Servicios de deslinde y amojonamiento para establecer claramente los límites entre propiedades contiguas.

### 5. Ejemplo Subdivisión En PH
Subdivisiones en Propiedad Horizontal, incluyendo la división de unidades funcionales y actualización de planos.

### 6. Modelo de Estado Parcelario Provincia de Buenos Aires
Constitución y verificación de Estados Parcelarios en diversos municipios de la Provincia de Buenos Aires.

### 7. Modelo de Estado Parcelario CABA
Estados Parcelarios en la Ciudad Autónoma de Buenos Aires, cumpliendo con la Ley de Catastro N° 6437.

### 8. RESUMEN VALUATORIO
Elaboración de resúmenes valuatorios para diversos tipos de inmuebles y finalidades.

### 9. Modelo de Relevamiento con Altimetría
Relevamientos topográficos que incluyen información altimétrica para proyectos que requieren datos de elevación.

## Tecnología Utilizada

### Estación Total
Instrumento electrónico que mide ángulos y distancias con gran precisión. Es fundamental para trabajos de topografía y agrimensura.

### GPS Geodésico (GNSS)
Permite obtener coordenadas precisas a través de satélites, ideal para relevamientos extensos y trabajos catastrales.

### Software de Topografía y CAD
Programas como AutoCAD Civil 3D, TopoCal se utilizan para procesar datos, elaborar planos y analizar terrenos.

## Experiencia y Especialización

Con más de catorce años de experiencia en el sector, ofrecemos servicios especializados en:

- **Estados Parcelarios** (CABA y Provincia de Buenos Aires)
- **Mensuras Rurales**
- **Subdivisiones en PH**
- **Relevamientos Topográficos**
- **Deslindes y Amojonamientos**
- **Resúmenes Valuatorios**

## Zona de Cobertura

Ofrecemos servicios en CABA y en una amplia zona del Gran Buenos Aires, que incluye los partidos de:

- **Avellaneda**
- **Lanús**
- **Lomas de Zamora**
- **Vicente López**
- **San Fernando**
- **San Isidro**
- **Tigre**
- **La Matanza**
- **San Martín**
- **Ituzaingó**

## Consultas y Presupuestos

- **Consultas sin cargo**
- **Presupuestos en el día**
- **Atención personalizada**
- **Seguimiento completo** de cada trabajo

### Contacto
- **Teléfono**: +54 9 11 6705-8156
- **Email**: contacto@miagrimensor.com
    `,
    author: "Pablo Venerus",
    publishedAt: "2025-01-06",
    readTime: "3 min read",
    category: "Trabajos Realizados",
    tags: ["Trabajos", "Estados Parcelarios", "Mensura", "Topografía", "Ejemplos"],
    featured: true,
    seo: {
      title: "Trabajos Realizados - Agrimensor Pablo Venerus | Estados Parcelarios y Mensuras",
      description: "Galería de trabajos realizados: Estados Parcelarios, Mensuras Rurales, Subdivisiones PH, Relevamientos Topográficos y más.",
      keywords: ["trabajos realizados", "estados parcelarios", "mensura", "topografía", "agrimensura", "ejemplos"]
    }
  },
  {
    id: "blog-introduccion",
    title: "Explorando el Mundo de la Agrimensura: Lo que Necesitas Saber",
    slug: "explorando-el-mundo-de-la-agrimensura",
    excerpt: "Bienvenidos a MI BLOG donde exploramos temas relevantes y de interés general sobre la agrimensura y su impacto en el mundo inmobiliario.",
    featuredImage: "/post-blog-3.jpeg",
    content: `
# Explorando el Mundo de la Agrimensura: Lo que Necesitas Saber

Bienvenidos a MI BLOG donde exploramos temas relevantes y de interés general sobre la agrimensura y su impacto en el mundo inmobiliario.

## Nuestro Objetivo

Nuestro objetivo es brindar información clara y accesible para todos, sin importar su nivel de conocimiento técnico.

Aquí encontrarás artículos que te ayudarán a entender mejor los conceptos fundamentales relacionados con la agrimensura y cómo estos afectan tus decisiones inmobiliarias.

## ¿Qué es la Agrimensura?

La agrimensura es la ciencia que se encarga de la medición, delimitación y representación gráfica de la superficie terrestre. Es fundamental para:

- **Determinar límites** de propiedades
- **Elaborar planos** catastrales
- **Realizar subdivisiones** de terrenos
- **Establecer derechos reales** sobre inmuebles
- **Planificar desarrollos** urbanos

## Servicios Principales

### Estados Parcelarios
Documento fundamental que describe la situación actual de una parcela, incluyendo:
- Límites y medidas
- Mejoras y características constructivas
- Restricciones y afectaciones
- Ubicación georreferenciada

### Mensuras
Proceso de medición y delimitación de terrenos para:
- Subdivisiones
- Unificaciones
- Prescripción adquisitiva
- Conflictos de límites

### Relevamientos Topográficos
Medición detallada del terreno incluyendo:
- Altimetría
- Planimetría
- Curvas de nivel
- Elementos naturales y artificiales

## Tecnología de Vanguardia

### Estación Total
Instrumento electrónico que mide ángulos y distancias con gran precisión, fundamental para trabajos de topografía y agrimensura.

### GPS Geodésico (GNSS)
Permite obtener coordenadas precisas a través de satélites, ideal para relevamientos extensos y trabajos catastrales.

### Software Especializado
Utilizamos programas como AutoCAD Civil 3D y TopoCal para procesar datos, elaborar planos y analizar terrenos.

## ¿Por qué es Importante?

### Para Propietarios
- **Seguridad jurídica** en la propiedad
- **Prevención de conflictos** de límites
- **Valorización** del inmueble
- **Facilitación** de trámites administrativos

### Para Inversores
- **Información precisa** para decisiones de inversión
- **Evaluación de riesgos** inmobiliarios
- **Planificación** de desarrollos
- **Cumplimiento** normativo

### Para Profesionales
- **Base técnica** para proyectos
- **Documentación** legal requerida
- **Precisión** en mediciones
- **Cumplimiento** de regulaciones

## Zona de Servicios

Ofrecemos servicios en CABA y en una amplia zona del Gran Buenos Aires, incluyendo:

- **Avellaneda**
- **Lanús**
- **Lomas de Zamora**
- **Vicente López**
- **San Fernando**
- **San Isidro**
- **Tigre**
- **La Matanza**
- **San Martín**
- **Ituzaingó**

## Consultas y Asesoramiento

- **Consultas sin cargo**
- **Presupuestos en el día**
- **Atención personalizada**
- **Seguimiento completo** de cada trabajo

### Contacto
- **Teléfono**: +54 9 11 6705-8156
- **Email**: contacto@miagrimensor.com

## Próximos Artículos

En este blog encontrarás información sobre:
- Estados Parcelarios en CABA y Provincia
- Procedimientos de Mensura
- Tecnología en Agrimensura
- Casos de estudio
- Novedades normativas
- Consejos para propietarios

¡Mantente atento a nuestras publicaciones para estar informado sobre todo lo relacionado con la agrimensura!
    `,
    author: "Pablo Venerus",
    publishedAt: "2025-01-06",
    readTime: "4 min read",
    category: "Introducción",
    tags: ["Agrimensura", "Introducción", "Servicios", "Tecnología"],
    featured: true,
    seo: {
      title: "Blog de Agrimensura - Agrimensor Pablo Venerus | Información y Servicios",
      description: "Blog especializado en agrimensura. Información clara sobre servicios, tecnología y temas relevantes del sector inmobiliario.",
      keywords: ["blog agrimensura", "agrimensor", "servicios topografía", "estados parcelarios", "mensura"]
    }
  }
];

export const categories = [
  "Estado Parcelario",
  "Trabajos Realizados", 
  "Introducción",
  "Tecnología",
  "Normativas",
  "Casos de Estudio"
];

export const tags = [
  "CABA",
  "Provincia de Buenos Aires", 
  "Estado Parcelario",
  "Catastro",
  "Mensura",
  "Topografía",
  "Agrimensura",
  "Trabajos",
  "Ejemplos",
  "Tecnología",
  "GPS",
  "Estación Total",
  "Gran Buenos Aires"
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => post.tags.includes(tag));
}

export function searchPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}
