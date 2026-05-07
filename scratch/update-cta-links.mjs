
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function updateLinks() {
  console.log("Updating CTA Section link...");
  await client.patch('ctaSection').set({
    'primaryButton.href': '/contacto'
  }).commit();
  
  console.log("Updating Hero Section link if it has 'Solicitar Presupuesto'...");
  const hero = await client.fetch('*[_id == "heroSection"][0]');
  if (hero && hero.primaryButton && hero.primaryButton.text.toUpperCase() === 'SOLICITAR PRESUPUESTO') {
    await client.patch('heroSection').set({
      'primaryButton.href': '/contacto'
    }).commit();
  }

  console.log("Done updating links in Sanity.");
}

updateLinks().catch(console.error);
