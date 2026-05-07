
import { createClient } from '@sanity/client';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function uploadImage(path) {
  // Remove leading slash if present
  const relPath = path.startsWith('/') ? path.substring(1) : path;
  const filePath = join(process.cwd(), 'public', relPath);
  
  if (!existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return null;
  }
  
  try {
    const asset = await client.assets.upload('image', readFileSync(filePath), {
      filename: path.split('/').pop(),
    });
    return {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id }
    };
  } catch (err) {
    console.error(`Error uploading ${path}:`, err.message);
    return null;
  }
}

async function markdownToBlocks(markdown, postSlug) {
  if (!markdown) return [];
  
  const lines = markdown.split('\n');
  const blocks = [];

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.*)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      blocks.push({
        _type: 'block',
        _key: Math.random().toString(36).substring(2, 11),
        style: `h${level}`,
        children: [{ _type: 'span', text: headingMatch[2] }],
        markDefs: []
      });
      continue;
    }

    // Lists
    const listMatch = line.match(/^[-*•✔]\s+(.*)/);
    if (listMatch) {
      blocks.push({
        _type: 'block',
        _key: Math.random().toString(36).substring(2, 11),
        level: 1,
        listItem: 'bullet',
        style: 'normal',
        children: [{ _type: 'span', text: listMatch[1] }],
        markDefs: []
      });
      continue;
    }

    // Images
    const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)/);
    if (imgMatch) {
        const alt = imgMatch[1];
        const src = imgMatch[2];
        const img = await uploadImage(src);
        if (img) {
            blocks.push({
                ...img,
                _key: Math.random().toString(36).substring(2, 11),
                alt: alt,
                caption: alt
            });
        }
        continue;
    }

    // Paragraphs
    blocks.push({
      _type: 'block',
      _key: Math.random().toString(36).substring(2, 11),
      style: 'normal',
      children: [{ _type: 'span', text: line.replace(/\*\*/g, '') }], // Remove bold markers for simple span
      markDefs: []
    });
  }

  // Handle post-specific hardcoded images
  if (postSlug === 'todo-sobre-el-estado-parcelario-en-la-provincia-de-buenos-aires') {
      const extraImages = [
          '/blog/todo-sobre-el-estado-parcelario-en-la-provincia-de-buenos-aires/estados-parcelarios-1.jpg',
          '/blog/todo-sobre-el-estado-parcelario-en-la-provincia-de-buenos-aires/estados-parcelarios-2.jpg',
          '/blog/todo-sobre-el-estado-parcelario-en-la-provincia-de-buenos-aires/declaraciones-juradas-1.jpg',
          '/blog/todo-sobre-el-estado-parcelario-en-la-provincia-de-buenos-aires/declaraciones-juradas-2.jpg'
      ];
      for (const src of extraImages) {
          const img = await uploadImage(src);
          if (img) {
              blocks.push({
                  ...img,
                  _key: Math.random().toString(36).substring(2, 11),
                  caption: 'Ejemplo de documento'
              });
          }
      }
  }

  if (postSlug === 'todo-sobre-el-estado-parcelario-en-la-ciudad-autonoma-de-buenos-aires') {
      const extraImages = [
          '/blog/todo-sobre-el-estado-parcelario-en-la-ciudad-autonoma-de-buenos-aires/Certificado-pacelario-1.avif',
          '/blog/todo-sobre-el-estado-parcelario-en-la-ciudad-autonoma-de-buenos-aires/Certificado-pacelario-2.avif',
          '/blog/todo-sobre-el-estado-parcelario-en-la-ciudad-autonoma-de-buenos-aires/Certificado-pacelario-3.avif'
      ];
      for (const src of extraImages) {
          const img = await uploadImage(src);
          if (img) {
              blocks.push({
                  ...img,
                  _key: Math.random().toString(36).substring(2, 11),
                  caption: 'Ejemplo de Certificado Parcelario CABA'
              });
          }
      }
  }

  return blocks;
}

const postsToMigrate = [
    {
        slug: "todo-sobre-el-estado-parcelario-en-la-ciudad-autonoma-de-buenos-aires",
        featuredImage: "/blog/post-blog-1.jpeg",
        content: `
# Todo sobre el Estado Parcelario en la Ciudad Autónoma de Buenos Aires
El estado parcelario en la Ciudad Autónoma de Buenos Aires, todo lo que tenés que saber y entender.
## Ley de Catastro N° 6437 (CABA)
### Resumen General
La ley establece el marco normativo del Catastro de la Ciudad Autónoma de Buenos Aires, definiéndolo como un registro público que documenta los datos de los objetos territoriales legales (parcelas, unidades funcionales, etc.) tanto del dominio público como privado.
### Objetivos del Catastro:
- Proveer información para el ordenamiento territorial y tributario.
- Servir como base de la infraestructura de datos espaciales de la Ciudad.
- Regular actos de mensura, registro, nomenclatura, georreferenciación y certificación catastral.
### Principios clave:
- Especialidad y determinación: precisión en la individualización del inmueble.
- Publicidad y trazabilidad: acceso público y trazabilidad de los datos.
- Multifinalidad y actualización continua: uso múltiple de datos y obligación de mantenerlos actualizados.
## Estado Parcelario
Regulado en el Título 7 de la ley, se refiere al conjunto de elementos esenciales y complementarios que describen la situación actual de una parcela. Es clave para la validez de actos jurídicos sobre inmuebles.
### Artículo 49 — Definición:
Es el estado de hecho registrado de un objeto territorial legal parcelario, utilizado para publicitar su condición en el momento de constituir, modificar o transmitir derechos reales.
### Elementos del Estado Parcelario:
#### A. Esenciales:
1. Nomenclatura catastral
2. Ubicación georreferenciada del objeto territorial legal parcelario
3. Límites del inmueble, en relación a las causas jurídicas que les dan origen
4. Medidas lineales, angulares y de superficie del inmueble
5. Restricciones y afectaciones que le correspondan
6. Tipificación de las mejoras y demás accesiones con sus características constructivas y data
7. Partida Inmobiliaria
#### B. Complementarios:
1. Inscripción en el Registro de la Propiedad
2. Valuación fiscal
3. Zonificación y/o áreas indicadas en el Código Urbanístico
4. Permisos o concesiones administrativas
5. Linderos
6. Notas de referencia recíproca con otros objetos territoriales legales parcelarios registrados
7. Otros elementos que el profesional y/o el organismo catastral considere necesarios como datos censales o ambientales
### Artículo 51 — Constitución
El estado parcelario se constituye mediante un acto de mensura registrado por un profesional autorizado y queda asentado en el organismo catastral.
### Artículo 52 — Verificación de la Subsistencia
Con posterioridad a la determinación y constitución del estado parcelario, debe efectuarse su verificación antes de actos registrales según los siguientes plazos:
- 2 años para inmuebles baldíos
- 6 años para inmuebles edificados
- 6 años para unidades funcionales con superficie descubierta o último piso (no implementado)
### Artículo 53°- Certificado del Estado Parcelario
La vigencia del estado parcelario se acredita con el Certificado del Estado Parcelario otorgado por el Organismo Catastral, a petición de la parte interesada.
### Artículo 54°. Sobre Inscripciones
El escribano interviniente debe acreditar la vigencia del estado parcelario y transcribir en los instrumentos públicos el contenido del certificado catastral, consignando, la nomenclatura catastral, las observaciones, restricciones o aclaraciones que constaren y la descripción de la parcela según las constancias de la misma.
## Exentos de Constitución del Estado Parcelario
1. Barrios en proceso de regularización dominial
2. Transferencias de dominio en el marco de PROCREAR u otros programas oficiales de escrituración
3. Escrituras de Inmuebles del Estado
4. Actos por los cuales se procede a constituir, modificar, transmitir o cancelar Derechos Reales de Hipoteca, Uso, Habitación, Usufructo, Servidumbre y Propiedad Horizontal
5. Transferencia de dominio de parcelas con plano de propiedad horizontal registrado
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
Que - Como - Cuando - Porque - Donde
### Ejemplo de Certificado Catastral Del Estado Parcelario
El certificado incluye toda la información esencial y complementaria del inmueble, siendo un documento fundamental para cualquier operación inmobiliaria en la Ciudad de Buenos Aires.
        `
    },
    {
        slug: "todo-sobre-el-estado-parcelario-en-la-provincia-de-buenos-aires",
        featuredImage: "/blog/post-blog-4.jpeg",
        content: `
# Todo sobre el Estado Parcelario en la Provincia de Buenos Aires
Qué - Cómo - Cuándo - Por qué - Dónde Provincia de Buenos Aires
## ¿Qué es el Estado Parcelario según la Ley 10.707/94?
Que - Como - Cuando - Porque - Donde
La Ley 10.707 de Catastro Territorial de la Provincia de Buenos Aires establece el marco legal para el registro, valuación y administración de los inmuebles en la provincia.
### Definición legal (Art. 4 y 5)
- Parcela: Porción de tierra continua, delimitada por una poligonal cerrada, perteneciente a uno o más titulares (propietarios o poseedores).
- Estado Parcelario: Documentación que acredita su existencia y características esenciales mediante un plano registrado en el organismo catastral.
### Elementos del Estado Parcelario:
Deben constar obligatoriamente en el registro:
✔ Ubicación georreferenciada (coordenadas).  
✔ Límites legales (según títulos de propiedad o posesión).  
✔ Medidas exactas (superficie, ángulos, linderos).
También incluyen:
✔ Valuación fiscal (valor impositivo).  
✔ Linderos (colindancias con otras parcelas).
## ¿Cómo se constituye?
**1. Relevamiento técnico:**
- Realizado por un agrimensor matriculado.
- Se genera un plano georreferenciado, con: Límites (muros, mojones, cercos, accidentes naturales), superficie, linderos, y las mejoras existentes.
- Se informan datos del relevamiento realizado (medidas, superficie y linderos)
- Se informan edificaciones existentes en el inmueble, y se las contrasta con los antecedentes registrados en Arba.
- Se informan datos dominiales, (medidas, superficie, linderos, inscripciones vigentes, titulares).
**2. Registro en el Catastro:**
- El plano y el informe técnico se inscriben en El Catastro de la Pcia. de Bs As (Arba).
- Luego el estado parcelario quedará conformado por una cédula catastral (documento único de identificación del inmueble) y por un resumen valuatorio.
## Importancia del Estado Parcelario
- Base para transacciones: Sin él, no se pueden vender, dividir o gravar inmuebles (Art. 50).
- Seguridad jurídica: Evita superposiciones de dominio o límites imprecisos.
- Tributación: Determina el valor fiscal para el pago de impuestos (Arts. 53–84).
### Artículo 50
Declárase obligatorio para los escribanos de Registros Públicos y para cualquier otro funcionario que autorice actos de transmisión, constitución, declaración o modificación de derechos reales sobre inmuebles ubicados en el territorio de la Provincia y sometidos a su jurisdicción, lo siguiente:
a) Requerir a la Agencia de Recaudación de la Provincia de Buenos Aires, antes del otorgamiento del acto, el certificado catastral correspondiente al inmueble, especificando la inscripción de su dominio vigente y la nomenclatura catastral o preexistente, así como los números de las partidas que le correspondan en los padrones del impuesto inmobiliario o en los establecidos por leyes especiales que correspondieren;
b) Transcribir en los instrumentos públicos el contenido de dicho certificado catastral, haciendo constar, la nomenclatura catastral, las observaciones, restricciones o aclaraciones que constaren y la descripción del inmueble según las constancias del mismo.
Certificado Catastral VS Estado Parcelario
1. El Estado Parcelario (Arts. 4-8 Ley 10.707):
- Lo crea el agrimensor mediante un relevamiento técnico (mensura).
- Incluye plano georreferenciado, medidas exactas y linderos.
- Es un requisito PREVIO para obtener el certificado.
2. El Certificado Catastral (Arts. 49-52):
- Lo emite EXCLUSIVAMENTE la Dirección de Catastro.
- Sintetiza la información registrada en sus bases de datos.
- Certifica que el Estado Parcelario está aprobado y vigente.
**Flujo del proceso:**
Agrimensor → Realiza mensura → Catastro aprueba y registra → Emite certificado
¿Por qué la confusión?
- El certificado NO lo emite el agrimensor, pero DEPENDE de su trabajo.
- Sin mensura válida (hecha por agrimensor matriculado), Catastro no puede emitir el certificado.
**Ejemplo real:**
Un agrimensor mide el terreno y presenta:
- Plano técnico.
- Informe de mensura.
- Declaración jurada.
Catastro revisa, aprueba y recién entonces expide el certificado que usará el escribano para tu venta.
## Vigencia del Estado Parcelario
Según el Art. 15 de la Ley 10.707/94:
a) Doce (12) años para inmuebles ubicados en la planta sub-rural o rural.  
b) Seis (6) años para inmuebles ubicados en la planta sub-urbana o planta urbana que se encuentren edificados.  
c) Dos (2) años para inmuebles ubicados en la planta sub-urbana o planta urbana, que se encuentren baldíos.  
d) Seis (6) años para las unidades funcionales de los edificios afectados al régimen de Propiedad Horizontal, ubicados en Planta Baja y doce (12) años para Unidades Funcionales contenidas en las restantes Plantas, si las hubiere.
**Otras situaciones por la que se expide el Certificado Catastral**
- Legajo Parcelario: Permite registrar nuevas parcelas originadas por un Plano de Mensura o por uno de Propiedad Horizontal.
- PH Decreto 947: Permite registrar las modificaciones realizadas sobre el estado constructivo y/o actualizar superficie edificada de una Unidad Funcional o Complementaria.
- PH Artículo 6to (en los términos del artículo 6º, del Decreto 2.489/63): Permite habilitar la Emisión del Certificado Catastral por la unidad funcional o unidad complementaria (a construir o en construcción), posibilitando la transferencia de los derechos reales del Inmueble, mediante una disposición emitida por el Organismo de Control.
## ¿Qué es el Estado Parcelario según la Ley 10.707/94?
El Estado Parcelario es el conjunto de datos técnicos y jurídicos que definen y caracterizan una parcela (inmueble individualizado) dentro del Catastro Territorial de la Provincia de Buenos Aires.
Declárase obligatorio para los escribanos de Registros Públicos y para cualquier otro funcionario que autorice actos de transmisión, constitución, declaración o modificación de derechos reales sobre inmuebles ubicados en el territorio de la Provincia y sometidos a su jurisdicción, lo siguiente:
a) Requerir a la Agencia de Recaudación de la Provincia de Buenos Aires, antes del otorgamiento del acto, el certificado catastral correspondiente al inmueble, especificando la inscripción de su dominio vigente y la nomenclatura catastral o preexistente, así como los números de las partidas que le correspondan en los padrones del impuesto inmobiliario o en los establecidos por leyes especiales que correspondieran;
b) Transcribir en los instrumentos públicos el contenido de dicho certificado catastral, haciendo constar, la nomenclatura catastral, las observaciones, restricciones o aclaraciones que constaren y la descripción del inmueble según las constancias del mismo.
## Certificado Catastral VS Estado Parcelario
1. El Estado Parcelario (Arts. 4-8 Ley 10.707):
- Lo crea el agrimensor mediante un relevamiento técnico (mensura).
- Incluye plano georreferenciado, medidas exactas y linderos.
- Es un requisito PREVIO para obtener el certificado.
1. El Certificado Catastral (Arts. 49-52):
- Lo emite EXCLUSIVAMENTE la Dirección de Catastro.
- Sintetiza la información registrada en sus bases de datos.
- Certifica que el Estado Parcelario está aprobado y vigente.
### ¿Por qué la confusión?
- El certificado NO lo emite el agrimensor, pero DEPENDE de su trabajo.
- Sin mensura válida (hecha por agrimensor matriculado), Catastro no puede emitir el certificado.
## ¿A que llaman renovación?
Subsistencia de Estado Parcelario (Formulario B): Permite verificar la continuidad de la situación relevada en el Estado Parcelario. Superadas las vigencias de éste último, su subsistencia se prolonga de acuerdo al tiempo estipulado para cada una de las características catastrales de la parcela.
Artículo 8vo - Actualización de Valuación Fiscal (Formulario C): Es el trámite mediante el cual se verifica el estado de hecho del inmueble, para los casos en que el Estado Parcelario se encuentre vigente, con fecha de registración posterior a 36 meses, con el objeto de posibilitar la emisión del Certificado Catastral. Se confecciona durante la vigencia del Estado Parcelario. Vencido los plazos del Estado Parcelario también se vence el Artículo 8vo.
### Dispo 6117/15 - Modificada por Dispo 1258/16 ARBA
En parcelas urbanas edificadas: 3 años (Disp. 6117/2015).  
En parcelas rurales: 3 años (Disp. 6117/2015)  
En sub parcelas PH, ubicadas en planta baja o planta superior que contengan superficie descubierta (terraza), también son 3 años por la Disp. 6117/2015.
Otra de las novedades que trajo la Disposición 6117/2015 es que las sub parcelas de PH, ubicadas en planta 1er piso o superiores como así también en subsuelo y cuyo plano origen sea anterior al año 1994, deberán constituir el estado parcelario correspondiente.
### Resolución Normativa 22/12 ARBA - (Excepciones)
Artículo 1º: Exceptuar de la obligación de verificar la subsistencia del estado parcelario, prevista en el artículo 15 de la Ley 10.707 y modificatorias, como requisito previo a la expedición del certificado catastral, a las subparcelas sometidas al régimen de Propiedad Horizontal instituido por la Ley 13.512, cuando las mismas sean unidades funcionales y/o complementarias construidas, ubicadas en planta primer piso y siguientes en altura o en planta subsuelo. Esta excepción no alcanzará a las subparcelas ubicadas total o parcialmente en planta baja ni a las subparcelas que contengan polígonos con superficie descubierta, cualquiera sea la planta en que se encuentren.
Artículo 2º: Exceptuar de las obligaciones de constituir estado parcelario y verificar su subsistencia, previstas en los artículos 12 y 15 de la Ley 10.707 y modificatorias, así como de actualizar la valuación fiscal, deber establecido por el artículo 8° de la Disposición 2.010/94 de la ex Dirección Provincial de Catastro Territorial, como requisito previo a la expedición del certificado catastral, en relación a las unidades funcionales y/o complementarias destinadas a cocheras, bauleras o destinos similares, cuyas superficies, según plano de propiedad horizontal, correspondan al rubro cubierto o semicubierto.
A efectos de verificar la procedencia de la excepción, en los casos de cocheras, podrá acompañarse constancia municipal, instrumento notarial u otro elemento que permita su debida individualización y destino. Asimismo, podrá agregarse certificación del escribano autorizante en la cual conste que ha tenido a la vista el Reglamento de Copropiedad y Administración del cual surge el destino cochera de la unidad funcional o unidad complementaria objeto de la operación, con la correspondiente individualización del inmueble.
### Provincia de Buenos Aires
"Artículo 8º: Transcurridos treinta y seis (36) meses desde la constitución o verificación de la subsistencia del estado parcelario, deberá procederse a la actualización de la valuación fiscal de las accesiones introducidas en las parcelas, sin cuyo requisito no se expedirá el certificado catastral. No corresponderá la actualización de la valuación fiscal de subparcelas sometidas al régimen de Propiedad Horizontal, cuando las mismas sean unidades funcionales y/o complementarias construidas, ubicadas en planta primer piso y siguientes en altura o en planta subsuelo. Esta excepción no alcanza a las subparcelas ubicadas total o parcialmente en planta baja ni a las subparcelas que contenga polígonos con superficies descubiertas, cualquiera sea la planta en que se encuentren".
**Dispo 6117/15 - Modificada por Dispo 1258/16 ARBA**
        `
    },
    {
        slug: "algunos-de-mis-trabajos-realizados",
        featuredImage: "/blog/post-blog-2.jpeg",
        content: `
# Algunos de mis trabajos realizados
Estados Parcelarios en Provincia de Buenos Aires, Estados Parcelarios en CABA, Mensura Rural, Subdivisión de un PH, entre otros.
## Modelo de Invasión De Linderos
![Modelo de Invasión De Linderos](/blog/algunos-de-mis-trabajos-realizados/Modelo de Invasión De Linderos.jpg)
## Ejemplo Mensura Rural
![Ejemplo Mensura Rural](/blog/algunos-de-mis-trabajos-realizados/Ejemplo Mensura Rural.jpg)
## Modelo de Relevamiento Topografico
![Modelo de Relevamiento Topografico](/blog/algunos-de-mis-trabajos-realizados/Modelo de Relevamiento Topografico.jpg)
## Modelo de Deslinde y Amojonamiento
![Modelo de Deslinde y Amojonamiento](/blog/algunos-de-mis-trabajos-realizados/Modelo de Deslinde y Amojonamiento.jpg)
## Ejemplo Subdivision En PH
![Ejemplo Subdivision En PH](/blog/algunos-de-mis-trabajos-realizados/Ejemplo Subdivision En PH.jpg)
## Modelo de Estado Parcelario Provincia de Buenos Aires
![Modelo de Estado Parcelario Provincia de Buenos Aires 1](/blog/algunos-de-mis-trabajos-realizados/estados-parcelarios-1.jpg)
![Modelo de Estado Parcelario Provincia de Buenos Aires 2](/blog/algunos-de-mis-trabajos-realizados/estados-parcelarios-2.jpg)
## Modelo de Estado Parcelario CABA
![Modelo de Estado Parcelario CABA 1](/blog/algunos-de-mis-trabajos-realizados/Certificado-pacelario-1.avif)
![Modelo de Estado Parcelario CABA 2](/blog/algunos-de-mis-trabajos-realizados/Certificado-pacelario-2.avif)
![Modelo de Estado Parcelario CABA 3](/blog/algunos-de-mis-trabajos-realizados/Certificado-pacelario-3.avif)
## RESUMEN VALUATORIO
![RESUMEN VALUATORIO 1](/blog/algunos-de-mis-trabajos-realizados/declaraciones-juradas-1.jpg)
![RESUMEN VALUATORIO 2](/blog/algunos-de-mis-trabajos-realizados/declaraciones-juradas-2.jpg)
## Modelo de Relevamiento con Altimetria
![Modelo de Relevamiento con Altimetria](/blog/algunos-de-mis-trabajos-realizados/Modelo de Relevamiento con Altimetria.jpg)
        `
    },
    {
        slug: "explorando-el-mundo-de-la-agrimensura",
        featuredImage: "/blog/post-blog-3.jpeg",
        content: `
# Explorando el Mundo de la Agrimensura: Lo que Necesitas Saber
Bienvenidos a MI BLOG donde exploramos temas relevantes y de interés general sobre la agrimensura y su impacto en el mundo inmobiliario.
## Nuestro Objetivo
Nuestro objetivo es brindar información clara y accesible para todos, sin importar su nivel de conocimiento técnico.
Aquí encontrarás artículos que te ayudarán a entender mejor los conceptos fundamentales relacionados con la agrimensura y cómo estos afectan tus decisiones inmobiliarias.
## ¿Qué es la Agrimensura?
La agrimensura es la ciencia que se encarga de la medición, delimitación y representación gráfica de la superficie terrestre. Es fundamental para:
- Determinar límites de propiedades
- Elaborar planos catastrales
- Realizar subdivisiones de terrenos
- Establecer derechos reales sobre inmuebles
- Planificar desarrollos urbanos
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
- Seguridad jurídica en la propiedad
- Prevención de conflictos de límites
- Valorización del inmueble
- Facilitación de trámites administrativos
### Para Inversores
- Información precisa para decisiones de inversión
- Evaluación de riesgos inmobiliarios
- Planificación de desarrollos
- Cumplimiento normativo
### Para Profesionales
- Base técnica para proyectos
- Documentación legal requerida
- Precisión en mediciones
- Cumplimiento de regulaciones
## Zona de Servicios
Ofrecemos servicios en CABA y en una amplia zona del Gran Buenos Aires, incluyendo:
- Avellaneda
- Lanús
- Lomas de Zamora
- Vicente López
- San Isidro
- Tigre
- San Martín
- Ituzaingó
## Consultas y Asesoramiento
- Consultas sin cargo
- Presupuestos en el día
- Atención personalizada
- Seguimiento completo de cada trabajo
### Contacto
- Teléfono: +54 9 11 6705-8156
- Email: contacto@miagrimensor.com
## Próximos Artículos
En este blog encontrarás información sobre:
- Estados Parcelarios en CABA y Provincia
- Procedimientos de Mensura
- Tecnología en Agrimensura
- Casos de estudio
- Novedades normativas
- Consejos para propietarios
¡Mantente atento a nuestras publicaciones para estar informado sobre todo lo relacionado con la agrimensura!
        `
    }
];

async function migrate() {
    for (const postData of postsToMigrate) {
        console.log(`\n--- Migrating ${postData.slug} ---`);
        
        // Find document
        const posts = await client.fetch('*[_type == "blogPost" && slug.current == $slug]', { slug: postData.slug });
        if (posts.length === 0) {
            console.log(`Post not found: ${postData.slug}`);
            continue;
        }
        const postId = posts[0]._id;

        // Upload featured image
        let featuredImage = null;
        if (postData.featuredImage) {
            console.log(`Uploading featured image: ${postData.featuredImage}`);
            featuredImage = await uploadImage(postData.featuredImage);
        }

        // Convert content
        console.log(`Converting content to blocks and uploading images...`);
        const blocks = await markdownToBlocks(postData.content, postData.slug);
        
        // Patch document
        const patchData = { content: blocks };
        if (featuredImage) patchData.featuredImage = featuredImage;
        
        await client.patch(postId).set(patchData).commit();
        console.log(`Successfully updated ${postData.slug}`);
    }
    console.log("\nMigration finished with images.");
}

migrate().catch(console.error);
