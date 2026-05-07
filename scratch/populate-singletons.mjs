
import { createClient } from '@sanity/client';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error('SANITY_API_TOKEN is missing');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function uploadImage(path) {
  const filePath = join(process.cwd(), path);
  if (!existsSync(filePath)) return null;
  const asset = await client.assets.upload('image', readFileSync(filePath), {
    filename: path.split('/').pop(),
  });
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id }
  };
}

async function populateSingletons() {
  console.log("Uploading hero images...");
  const heroImg1 = await uploadImage('public/hero-background_1.jpeg');
  const heroImg2 = await uploadImage('public/hero-background_2.jpeg');
  const heroImg3 = await uploadImage('public/hero-background_3.jpeg');
  const heroImages = [heroImg1, heroImg2, heroImg3].filter(Boolean);

  const documents = [
    {
      _type: 'siteSettings',
      _id: 'siteSettings',
      siteName: 'Agrimensor Pablo Venerus',
      siteDescription: 'Servicios profesionales de agrimensura y topografía en CABA y GBA.',
      phone: '+54 9 11 6705-8156',
      phoneHref: 'tel:+5491167058156',
      email: 'contacto@miagrimensor.com',
      whatsappUrl: 'https://api.whatsapp.com/send/?phone=5491167058156&text=Hola%21+Quisiera+un+presupuesto+sobre+un+trabajo+de+Agrimensura',
      whatsappButtonText: 'Hablemos en WhatsApp',
      address: 'Avellaneda, Buenos Aires',
      linkedinUrl: 'https://www.linkedin.com/company/miagrimensor',
      yearsExperience: 15,
      projectsCompleted: 2000,
      serviceAreas: ['CABA', 'Avellaneda', 'Lanús', 'Lomas de Zamora', 'Vicente López', 'San Isidro', 'Tigre', 'San Martín', 'Ituzaingó'],
      coverageNote: 'Consultar por otras zonas en Gran Buenos Aires.'
    },
    {
      _type: 'heroSection',
      _id: 'heroSection',
      badgeText: "Agrimensor Pablo Venerus",
      headlineLines: ["Agrimensura", "y Topografía"],
      subheadline: "Precisión, experiencia y confianza",
      description: "Estados parcelarios, mensura y planos para escriturar con rapidez y respaldo.",
      primaryButton: { text: "Hablemos en Whatsapp", href: 'https://api.whatsapp.com/send/?phone=5491167058156&text=Hola%21+Quisiera+un+presupuesto+sobre+un+trabajo+de+Agrimensura' },
      secondaryButton: { text: "Mis Servicios", href: "/servicios" },
      images: heroImages
    },
    {
      _type: 'ctaSection',
      _id: 'ctaSection',
      heading: "¿Necesitas un servicio de agrimensura?",
      subheading: "Consultas y asesoramiento sin cargo. Presupuestos EN EL DÍA.",
      primaryButton: { text: "SOLICITAR PRESUPUESTO", href: 'https://api.whatsapp.com/send/?phone=5491167058156&text=Hola%21+Quisiera+un+presupuesto+sobre+un+trabajo+de+Agrimensura' },
      secondaryButton: { text: "VER SERVICIOS", href: "/servicios" },
    },
    {
      _type: 'navbarConfig',
      _id: 'navbarConfig',
      links: [
        { label: 'Acerca de mí', href: '/acerca-de-mi', isHashLink: false },
        { label: 'Servicios', href: '/servicios', isHashLink: false },
        { label: 'Preguntas Frecuentes', href: '/#faq', isHashLink: true },
        { label: 'Blog', href: '/blog', isHashLink: false },
        { label: 'Contacto', href: '/contacto', isHashLink: false },
      ],
      ctaButton: { text: 'WhatsApp', href: 'https://api.whatsapp.com/send/?phone=5491167058156&text=Hola%21+Quisiera+un+presupuesto+sobre+un+trabajo+de+Agrimensura' }
    }
  ];

  for (const doc of documents) {
    console.log(`Populating ${doc._type}...`);
    await client.createOrReplace(doc);
    console.log(`Successfully populated ${doc._id}`);
  }
}

populateSingletons().catch(console.error);
