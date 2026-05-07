
import { createClient } from '@sanity/client';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error('SANITY_API_TOKEN is missing');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const servicesMapping = [
  { slug: "estado-parcelario-provincia-buenos-aires", path: "public/servicios/estados-parcelarios-1.jpg" },
  { slug: "estado-parcelario-caba", path: "public/servicios/certifParcCaba_Página_1.jpg" },
  { slug: "planos-mensura", path: "public/servicios/planos-mensura.jpg" },
  { slug: "declaraciones-juradas-revaluos", path: "public/servicios/declaraciones-juradas-1.jpg" },
  { slug: "relevamientos-topograficos", path: "public/servicios/EjemploRelevamientoTopografico.jpg" },
  { slug: "amojonamientos", path: "public/servicios/amojonamientos.jpg" },
  { slug: "subdivisiones-ph", path: "public/servicios/subdivisiones.jpg" },
  { slug: "calculos-superficie", path: "public/servicios/calculos-de-superficie.avif" },
  { slug: "certificados-dominio", path: "public/servicios/EjemploInvasiónDeLinderos.jpg" },
];

const blogMapping = [
  { slug: "todo-sobre-el-estado-parcelario-en-la-ciudad-autonoma-de-buenos-aires", path: "public/blog/post-blog-1.jpeg" },
  { slug: "todo-sobre-el-estado-parcelario-en-la-provincia-de-buenos-aires", path: "public/blog/post-blog-4.jpeg" },
  { slug: "algunos-de-mis-trabajos-realizados", path: "public/blog/post-blog-2.jpeg" },
  { slug: "explorando-el-mundo-de-la-agrimensura", path: "public/blog/post-blog-3.jpeg" },
];

async function uploadAndLink(mapping, type, fieldName) {
  for (const item of mapping) {
    const filePath = join(process.cwd(), item.path);
    if (!existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }

    try {
      console.log(`Uploading ${item.path}...`);
      const imageAsset = await client.assets.upload('image', readFileSync(filePath), {
        filename: item.path.split('/').pop(),
      });

      console.log(`Linking asset ${imageAsset._id} to ${type} ${item.slug}...`);
      
      const doc = await client.fetch(`*[_type == "${type}" && slug.current == $slug][0]`, { slug: item.slug });
      
      if (doc) {
        await client
          .patch(doc._id)
          .set({
            [fieldName]: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageAsset._id,
              },
            },
          })
          .commit();
        console.log(`Successfully updated ${item.slug}`);
      } else {
        console.error(`${type} not found for slug: ${item.slug}`);
      }
    } catch (err) {
      console.error(`Error processing ${item.slug}:`, err);
    }
  }
}

async function run() {
  console.log("Starting services images upload...");
  await uploadAndLink(servicesMapping, 'service', 'image');
  console.log("\nStarting blog images upload...");
  await uploadAndLink(blogMapping, 'blogPost', 'featuredImage');
  console.log("\nDone!");
}

run();
