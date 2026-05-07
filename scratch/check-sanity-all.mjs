
import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function checkAll() {
  try {
    const services = await client.fetch('*[_type == "service"] { _id, title, "slug": slug.current, image }');
    const posts = await client.fetch('*[_type == "blogPost"] { _id, title, "slug": slug.current, featuredImage }');
    console.log("SERVICES:", JSON.stringify(services, null, 2));
    console.log("POSTS:", JSON.stringify(posts, null, 2));
  } catch (error) {
    console.error(error);
  }
}

checkAll();
