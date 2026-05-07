
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function activateFaqs() {
  const faqs = await client.fetch('*[_type == "faqItem"] { _id }');
  if (faqs.length > 0) {
    console.log(`Activating ${faqs.length} FAQs...`);
    const transaction = client.transaction();
    faqs.forEach(f => transaction.patch(f._id, { set: { active: true } }));
    await transaction.commit();
    console.log('FAQs activated.');
  } else {
    console.log('No FAQs found.');
  }
}

activateFaqs().catch(console.error);
