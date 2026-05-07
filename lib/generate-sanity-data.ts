import * as fs from 'fs';

// --- UTILS ---
function generateKey() { return Math.random().toString(36).substring(2, 11); }

function markdownToPortableText(markdown: string): any[] {
  if (!markdown) return [];
  const lines = markdown.split('\n');
  const blocks: any[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const headerMatch = line.match(/^(#{1,4})\s+(.*)/);
    if (headerMatch) {
      blocks.push({ _type: 'block', _key: generateKey(), style: `h${headerMatch[1].length}`, children: [{ _type: 'span', _key: generateKey(), text: headerMatch[2] }] });
      continue;
    }
    const bulletMatch = line.match(/^[-*]\s+(.*)/);
    if (bulletMatch) {
      blocks.push({ _type: 'block', _key: generateKey(), style: 'normal', listItem: 'bullet', level: 1, children: [{ _type: 'span', _key: generateKey(), text: bulletMatch[1] }] });
      continue;
    }
    blocks.push({ _type: 'block', _key: generateKey(), style: 'normal', children: [{ _type: 'span', _key: generateKey(), text: line }] });
  }
  return blocks;
}

// --- DATA ---

const SERVICES = [
  {
    slug: "estado-parcelario-provincia-buenos-aires",
    title: "Estado Parcelario en la Provincia de Buenos Aires",
    subtitle: "Certificación catastral obligatoria - Ley 10.707",
    description: "El Estado Parcelario en la Provincia de Buenos Aires es obligatorio según la Ley 10.707/94 al momento de una venta, hipoteca o cualquier acto de transmisión de derechos reales. Realizamos la certificación oficial de medidas y límites del inmueble, verificación de documentación catastral ante ARBA e informe técnico completo para escrituración.",
    features: ["Certificación de medidas y límites", "Verificación ante ARBA", "Relevamiento técnico", "Plano georreferenciado", "Obtención de cédula catastral"],
    category: "Catastral",
    iconName: "Goal",
    order: 1,
    highlights: ["Obligatorio", "Rápido", "Oficial"]
  },
  {
    slug: "estado-parcelario-caba",
    title: "Estado Parcelario en Ciudad de Buenos Aires (CABA)",
    subtitle: "Certificación catastral obligatoria - Ley 6437",
    description: "El Estado Parcelario en la Ciudad Autónoma de Buenos Aires es obligatorio según la Ley de Catastro N° 6437 para actos de constitución, modificación y transmisión de derechos reales. Realizamos la certificación oficial cumpliendo con todos los elementos esenciales: nomenclatura catastral, ubicación georreferenciada, límites del inmueble y medidas.",
    features: ["Certificación Ley 6437", "Acto de mensura registrado", "Elementos esenciales", "Verificación de subsistencia", "Certificado oficial"],
    category: "Catastral",
    iconName: "Goal",
    order: 2,
    highlights: ["Obligatorio", "Oficial", "CABA"]
  },
  {
    slug: "planos-mensura",
    title: "Planos de Mensura para División, Unificación, Anexión o Usucapión",
    subtitle: "Medición y documentación oficial",
    description: "Este plano es la medición, ubicación y documentación de un inmueble y sus límites conforme a las causas jurídicas que lo originan, es decir, la aplicación del título de propiedad al terreno propiamente dicho.",
    features: ["Medición precisa", "Delimitación de linderos", "Documentación técnica", "Plano catastral oficial"],
    category: "Catastral",
    iconName: "BookCheck",
    order: 3,
    highlights: ["Preciso", "Oficial", "Completo"]
  }
  // ... se pueden agregar más aquí
];

const BLOG_POSTS = [
  {
    slug: "todo-sobre-el-estado-parcelario-en-la-ciudad-autonoma-de-buenos-aires",
    title: "Todo sobre el Estado Parcelario en la Ciudad Autónoma de Buenos Aires",
    excerpt: "El estado parcelario en la Ciudad Autónoma de Buenos Aires, todo lo que tenés que saber y entender.",
    category: "Estado Parcelario",
    content: "# Todo sobre el Estado Parcelario en CABA\n\nLa ley establece el marco normativo del Catastro de la Ciudad Autónoma de Buenos Aires...\n\n## Objetivos del Catastro\n- Proveer información para el ordenamiento territorial.\n- Servir como base de la infraestructura de datos.",
    tags: ["CABA", "Estado Parcelario", "Catastro"]
  }
];

// --- GENERATION ---

function generate() {
  const servicesJsonnd = SERVICES.map(s => JSON.stringify({
    _type: 'service',
    _id: `service-${s.slug}`,
    title: s.title,
    slug: { _type: 'slug', current: s.slug },
    subtitle: s.subtitle,
    category: s.category,
    iconName: s.iconName,
    order: s.order,
    active: true,
    description: markdownToPortableText(s.description),
    features: s.features,
    highlights: s.highlights,
    duration: "24-48 horas",
    complexity: "Media"
  })).join('\n');

  const blogJsonnd = BLOG_POSTS.map(p => JSON.stringify({
    _type: 'blogPost',
    _id: `post-${p.slug}`,
    title: p.title,
    slug: { _type: 'slug', current: p.slug },
    excerpt: p.excerpt,
    category: p.category,
    author: "Pablo Venerus",
    publishedAt: new Date().toISOString(),
    featured: true,
    tags: p.tags,
    content: markdownToPortableText(p.content),
    seo: { title: p.title, description: p.excerpt }
  })).join('\n');

  fs.writeFileSync('import-services.jsonnd', servicesJsonnd);
  fs.writeFileSync('import-blog.jsonnd', blogJsonnd);
  
  console.log('✅ Archivos .jsonnd generados correctamente.');
}

generate();
