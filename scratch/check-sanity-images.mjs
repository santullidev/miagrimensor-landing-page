
import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function checkServices() {
  try {
    const services = await client.fetch('*[_type == "service"] { _id, title, image, "url": image.asset->url }');
    console.log(JSON.stringify(services, null, 2));
  } catch (error) {
    console.error(error);
  }
}

checkServices();
