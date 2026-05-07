
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

async function finalPopulation() {
  console.log("Uploading logos...");
  const logoLight = await uploadImage('public/logo_miagrimensor.svg');
  const logoDark = await uploadImage('public/logo_miagrimensor_2.svg');

  console.log("Updating siteSettings with logos and coverage titles...");
  await client.patch('siteSettings').set({
    logoLight,
    logoDark,
    coverageTitle: 'Zonas de Cobertura',
    coverageSubtitle: 'Ofrezco mis servicios profesionales de agrimensura en CABA y Gran Buenos Aires'
  }).commit();

  console.log("Populating specializedEquipment...");
  const equipmentImg = await uploadImage('public/assets/trabajo/edificio_2.jpeg');
  await client.createOrReplace({
    _type: 'specializedEquipment',
    _id: 'specializedEquipment',
    active: true,
    title: 'Relevamientos con ME PLUS + N80',
    subtitle: 'Tecnología de vanguardia para la captura de datos 3D.',
    description: 'Utilizamos tecnología de escaneo láser y fotogrametría avanzada para generar modelos 3D precisos de cualquier estructura o terreno. El escáner Stonex X120GO es ideal para relevamientos rápidos y precisos.',
    features: ['Nube de puntos de alta densidad', 'Gemelos digitales (Digital Twins)', 'Escaneo 3D para arquitectura e ingeniería'],
    benefits: [
      { title: 'Precisión centimétrica', description: 'Captura cada detalle con exactitud absoluta.' },
      { title: 'Rapidez extrema', description: 'Reducción de tiempos en campo hasta en un 70%.' },
      { title: 'Documentación visual', description: 'Registros fotográficos y métricos integrados.' },
    ],
    mainImage: equipmentImg
  });

  console.log("Final population done!");
}

finalPopulation().catch(console.error);
