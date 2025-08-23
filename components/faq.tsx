import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { PlusIcon } from "lucide-react";

const faq = [
  {
    question: "¿En dónde trabajo?",
    answer:
      "Ofrezco servicios en CABA y en una amplia zona del Gran Buenos Aires, que incluye los partidos de Avellaneda, Lanús, Lomas de Zamora, Vicente López, San Fernando, San Isidro, Tigre, La Matanza, San Martín e Ituzaingó.",
  },
  {
    question: "¿Que tipos de Trabajo Realizo?",
    answer:
      "Ejerciendo Agrimensura en todos sus aspectos, a saber: Topografía, Geodesia, Fotogrametría, Agrimensura legal, etc. Para mayor información acerca de las tareas que brindo a realizar en ejercicio profesional diríjase a la sección SERVICIOS, o bien, contáctactame a traves de WhatsApp.",
  },
  {
    question: "¿Cuándo se realiza un estado parcelario o cédula catastral (Ley Provincial de Catastro | Ley 10.707)?",
    answer:
      "Se realiza previo a toda transmisión o modificación en la titularidad del dominio, siempre y cuando dicho estado parcelario no se encuentre vigente.",
  },
  {
    question: "¿Cuál es la vigencia de un estado parcelario?",
    answer:
      "En parcelas urbanas baldías: 2 años (Art 15 Ley 10.707)" +      
      "En parcelas urbanas edificadas: 3 años (Disp. 6117/2015)" +
      "En parcelas rurales: 3 años (Disp. 6117/2015)" +
      "En sub parcelas PH, ubicadas en planta baja o planta superior que contengan superficie descubierta (terraza), también son 3 años por la Disp. 6117/2015." +
      "Otra de las novedades que trajo la Disposición 6117/2015 es que las sub parcelas de PH, ubicadas en planta 1er piso o superiores como así también en subsuelo y cuyo plano origen sea anterior al año 1994, deberán constituir el estado parcelario correspondiente." +
      "Como siempre, las sub parcelas, cocheras o bauleras que no contengan superficie descubierta, están exceptuadas de constituir el Estado Parcelario por la resolución 22/2012."
  },
  {
    question: "LoremIpsum?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "Lorem Ipsum?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

const FAQ = () => {
  return (
    <div
      id="faq"
      className="w-full max-w-7xl mx-auto py-8 xs:py-16 px-6"
    >
      <h2 className="md:text-center text-3xl xs:text-4xl md:text-5xl leading-[1.15]! font-bold tracking-tighter">
        Preguntas Frecuentes
      </h2>
      <p className="mt-1.5 md:text-center xs:text-lg text-muted-foreground">
        Resuelve tus dudas más comunes sobre los servicios de agrimensura.
      </p>

      <div className="min-h-[550px] md:min-h-[320px] xl:min-h-[300px]">
        <Accordion
          type="single"
          collapsible
          className="mt-8 space-y-4 md:columns-2 gap-4"
        >
          {faq.map(({ question, answer }, index) => (
            <AccordionItem
              key={question}
              value={`question-${index}`}
              className="bg-accent py-1 px-4 rounded-xl border-none mt-0! mb-4! break-inside-avoid"
            >
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger
                  className={cn(
                    "flex flex-1 items-center justify-between py-4 font-semibold tracking-tight transition-all hover:underline [&[data-state=open]>svg]:rotate-45",
                    "text-start text-lg"
                  )}
                >
                  {question}
                  <PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="text-[15px]">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
