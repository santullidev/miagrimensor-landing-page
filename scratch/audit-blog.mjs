
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function checkBlogPosts() {
  const posts = await client.fetch('*[_type == "blogPost"] { _id, title, "slug": slug.current, excerpt, content[0..1] }');
  console.log(`Found ${posts.length} blog posts:`);
  posts.forEach(p => {
    const firstBlock = p.content?.[0]?.children?.[0]?.text || 'No text';
    console.log(`- ${p.title} (${p.slug}) | ID: ${p._id} | Snippet: ${firstBlock.substring(0, 50)}...`);
  });
}

checkBlogPosts().catch(console.error);
