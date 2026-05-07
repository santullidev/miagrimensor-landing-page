
import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function checkAll() {
  const types = ['siteSettings', 'heroSection', 'ctaSection', 'navbarConfig', 'workGallery', 'faqItem'];
  for (const type of types) {
    const count = await client.fetch(`count(*[_type == "${type}"])`);
    console.log(`${type}: ${count} documents`);
  }
}

checkAll();
