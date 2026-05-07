
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function checkEquipment() {
  const equipment = await client.fetch('*[_type == "specializedEquipment"][0]');
  console.log("Equipment Data:", JSON.stringify(equipment, null, 2));
}

checkEquipment().catch(console.error);
