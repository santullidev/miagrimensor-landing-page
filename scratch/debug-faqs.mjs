
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function checkFaqs() {
  const faqs = await client.fetch('*[_type == "faqItem" && active == true]');
  console.log(`Found ${faqs.length} active FAQs:`);
  faqs.forEach((f, i) => console.log(`${i+1}. ${f.question} (ID: ${f._id}, active: ${f.active})`));
}

checkFaqs().catch(console.error);
