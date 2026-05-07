
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

async function populateEverything() {
  console.log("Uploading gallery images...");
  const galleryFiles = [
    'public/assets/trabajo/campo_1.jpeg',
    'public/assets/trabajo/edificio_1.jpeg',
    'public/assets/trabajo/lote_1.jpeg',
    'public/assets/trabajo/costa_1.jpeg',
  ];
  const galleryAssets = [];
  for (const f of galleryFiles) {
    const img = await uploadImage(f);
    if (img) galleryAssets.push({
      _key: Math.random().toString(36).substring(2, 11),
      alt: 'Trabajo realizado',
      category: 'Topografía',
      image: img
    });
  }

  const documents = [
    {
      _type: 'workGallery',
      _id: 'workGallery',
      sectionTitle: 'Galería de Trabajos',
      sectionSubtitle: 'Algunos de nuestros proyectos recientes en diferentes zonas.',
      images: galleryAssets
    },
    {
      _type: 'faqItem',
      _id: 'faq-1',
      question: '¿Qué es el Estado Parcelario?',
      answer: 'Es la certificación técnica y legal de los límites, medidas y mejoras de un inmueble. Es obligatorio para escriturar en CABA y Provincia de Buenos Aires.',
      order: 1,
      active: true
    },
    {
      _type: 'faqItem',
      _id: 'faq-2',
      question: '¿Cuánto tiempo dura el trámite?',
      answer: 'Dependiendo del servicio, un Estado Parcelario suele demorar entre 48 horas y 5 días hábiles.',
      order: 2,
      active: true
    }
  ];

  for (const doc of documents) {
    console.log(`Populating ${doc._type} (${doc._id})...`);
    await client.createOrReplace(doc);
  }
  
  console.log("Done populating gallery and FAQs.");
}

populateEverything().catch(console.error);
