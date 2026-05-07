
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function cleanDrafts() {
  const drafts = await client.fetch('*[_id in drafts || _id match "drafts.**"] { _id }');
  if (drafts.length > 0) {
    console.log(`Deleting ${drafts.length} drafts...`);
    const transaction = client.transaction();
    drafts.forEach(d => transaction.delete(d._id));
    await transaction.commit();
    console.log('Drafts deleted.');
  } else {
    console.log('No drafts found.');
  }
}

cleanDrafts().catch(console.error);
