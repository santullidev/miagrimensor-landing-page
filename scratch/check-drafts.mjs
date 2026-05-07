
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function checkDrafts() {
  const all = await client.fetch('*[_type == "faqItem"] { _id }');
  console.log("All IDs:", all.map(d => d._id));
}

checkDrafts().catch(console.error);
