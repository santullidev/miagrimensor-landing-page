
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const newFaqs = [
  {
    question: "¿Cuándo se realiza un estado parcelario o cédula catastral (Ley Provincial de Catastro | Ley 10.707)?",
    answer: "Se realiza previo a toda transmisión o modificación en la titularidad del dominio, siempre y cuando dicho estado parcelario no se encuentre vigente."
  },
  {
    question: "¿Que tipos de Trabajo Realizo?",
    answer: "Ejerciendo Agrimensura en todos sus aspectos, a saber: Topografía, Geodesia, Fotogrametría, Agrimensura legal, etc. Para mayor información acerca de las tareas que brindo a realizar en ejercicio profesional diríjase a la sección \"SERVICIOS\", o bien, contáctactame a traves de WhatsApp."
  },
  {
    question: "¿Cuál es la vigencia de un estado parcelario?",
    answer: "En parcelas urbanas baldías: 2 años (Art 15 Ley 10.707)\n\nEn parcelas urbanas edificadas: 3 años (Disp. 6117/2015)\n\nEn parcelas rurales: 3 años (Disp. 6117/2015)\n\nEn sub parcelas PH, ubicadas en planta baja o planta superior que contengan superficie descubierta (terraza), también son 3 años por la Disp. 6117/2015.\n\nOtra de las novedades que trajo la Disposición 6117/2015 es que las sub parcelas de PH, ubicadas en planta 1er piso o superiores como así también en subsuelo y cuyo plano origen sea anterior al año 1994, deberán constituir el estado parcelario correspondiente.\n\nComo siempre, las sub parcelas, cocheras o bauleras que no contengan superficie descubierta, están exceptuadas de constituir el Estado Parcelario por la resolución 22/2012."
  },
  {
    question: "¿El estado parcelario o cédula catastral incluye el amojonamiento de la parcela?",
    answer: "No. Se puede hacer, pero debe haberse solicitado para que se presupueste adecuadamente. Son trabajos distintos."
  }
];

async function updateFaqs() {
  const existingFaqs = await client.fetch('*[_type == "faqItem"] { question }');
  const existingQuestions = existingFaqs.map(f => f.question.toLowerCase().trim());

  for (const faq of newFaqs) {
    if (!existingQuestions.includes(faq.question.toLowerCase().trim())) {
      console.log(`Adding FAQ: ${faq.question}`);
      await client.create({
        _type: 'faqItem',
        question: faq.question,
        answer: faq.answer,
        order: existingFaqs.length + 1
      });
    } else {
      console.log(`FAQ already exists: ${faq.question}`);
    }
  }
  console.log("FAQ update finished.");
}

updateFaqs().catch(console.error);
