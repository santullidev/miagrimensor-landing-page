
import { createClient } from '@sanity/client';
import { randomKey } from '@sanity/util/content'; // Or just a simple random string

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function fixKeys() {
  const documents = await client.fetch('*[_type in ["navbarConfig", "heroSection", "siteSettings", "ctaSection", "aboutPage", "specializedEquipment"]]');
  
  for (const doc of documents) {
    let hasChanges = false;
    const newDoc = JSON.parse(JSON.stringify(doc));

    // Recursive function to find arrays and add keys
    const processObject = (obj) => {
      if (!obj || typeof obj !== 'object') return;

      Object.keys(obj).forEach(key => {
        const val = obj[key];
        if (Array.isArray(val)) {
          val.forEach((item, index) => {
            if (item && typeof item === 'object' && !item._key) {
              item._key = Math.random().toString(36).substring(2, 11);
              hasChanges = true;
            }
            processObject(item);
          });
        } else if (val && typeof val === 'object') {
          processObject(val);
        }
      });
    };

    processObject(newDoc);

    if (hasChanges) {
      console.log(`Fixing keys for ${doc._type} (${doc._id})...`);
      await client.patch(doc._id).set(newDoc).commit();
    }
  }

  // Also check blog posts
  const blogPosts = await client.fetch('*[_type == "blogPost"]');
  for (const post of blogPosts) {
    let hasChanges = false;
    const newPost = JSON.parse(JSON.stringify(post));
    
    const processPost = (obj) => {
        if (!obj || typeof obj !== 'object') return;
        Object.keys(obj).forEach(key => {
            const val = obj[key];
            if (Array.isArray(val)) {
                val.forEach(item => {
                    if (item && typeof item === 'object' && !item._key) {
                        item._key = Math.random().toString(36).substring(2, 11);
                        hasChanges = true;
                    }
                    processPost(item);
                });
            } else if (val && typeof val === 'object') {
                processPost(val);
            }
        });
    };

    processPost(newPost);
    if (hasChanges) {
        console.log(`Fixing keys for blogPost ${post.slug?.current || post._id}...`);
        await client.patch(post._id).set(newPost).commit();
    }
  }

  console.log("Finished fixing missing keys.");
}

fixKeys().catch(console.error);
