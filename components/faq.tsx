import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";

const faq = [
  {
    question: "¿En dónde trabajo?",
    answer:
      "Ofrezco servicios en CABA y en una amplia zona del Gran Buenos Aires, que incluye los partidos de Avellaneda, Lanús, Lomas de Zamora, Vicente López, San Fernando, San Isidro, Tigre, La Matanza, San Martín e Ituzaingó.",
  },
  {
    question: "¿Qué tipos de trabajo realizo?",
    answer:
      "Ejerciendo Agrimensura en todos sus aspectos, a saber: Topografía, Geodesia, Fotogrametría, Agrimensura legal, etc. Para mayor información acerca de las tareas que brindo a realizar en ejercicio profesional diríjase a la sección SERVICIOS, o bien, contáctactame a través de WhatsApp.",
  },
  {
    question: "¿Cuándo se realiza un estado parcelario o cédula catastral (Ley Provincial de Catastro | Ley 10.707)?",
    answer:
      "Se realiza previo a toda transmisión o modificación en la titularidad del dominio, siempre y cuando dicho estado parcelario no se encuentre vigente.",
  },
  {
    question: "¿Cuál es la vigencia de un estado parcelario?",
    answer:
      "• En parcelas urbanas baldías: 2 años (Art 15 Ley 10.707)\n" +
      "• En parcelas urbanas edificadas: 3 años (Disp. 6117/2015)\n" +
      "• En parcelas rurales: 3 años (Disp. 6117/2015)\n" +
      "• En sub parcelas PH, ubicadas en planta baja o planta superior que contengan superficie descubierta (terraza), también son 3 años por la Disp. 6117/2015.\n\n" +
      "Otra de las novedades que trajo la Disposición 6117/2015 es que las sub parcelas de PH, ubicadas en planta 1er piso o superiores como así también en subsuelo y cuyo plano origen sea anterior al año 1994, deberán constituir el estado parcelario correspondiente.\n\n" +
      "Como siempre, las sub parcelas, cocheras o bauleras que no contengan superficie descubierta, están exceptuadas de constituir el Estado Parcelario por la resolución 22/2012.",
  },
  {
    question: "¿Cuánto tiempo tarda un trabajo de agrimensura?",
    answer:
      "Los tiempos varían según el tipo de trabajo. Los estados parcelarios suelen completarse en 24-48 horas, mientras que trabajos más complejos como subdivisiones o relevamientos topográficos pueden tomar entre 1-2 semanas. Siempre te proporciono un cronograma detallado al inicio del proyecto.",
  },
  {
    question: "¿Qué documentación necesito para solicitar un servicio?",
    answer:
      "Para la mayoría de los trabajos necesitarás: título de propiedad, plano de mensura vigente, y documentación municipal actualizada. Para casos específicos, te asesoro sobre la documentación adicional requerida según el tipo de trabajo a realizar.",
  },
];

const FAQ = () => {
  return (
    <div
      id="faq"
      className="w-full max-w-7xl mx-auto py-12 xs:py-20 px-3 sm:px-6"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl xs:text-4xl md:text-5xl leading-[1.15] font-bold tracking-tight mb-4 break-words">
          Preguntas Frecuentes
        </h2>
        <p className="xs:text-lg text-muted-foreground max-w-2xl mx-auto break-words">
          Resuelve tus dudas más comunes sobre los servicios de agrimensura
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Accordion
          type="single"
          collapsible
          className="space-y-3"
        >
          {faq.map(({ question, answer }, index) => (
            <AccordionItem
              key={question}
              value={`question-${index}`}
              className="group"
            >
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger
                  className={cn(
                    "flex flex-1 items-start justify-between w-full p-3 sm:p-4 md:p-6 text-left",
                    "bg-background border border-green/20 rounded-xl",
                    "hover:bg-green/5 transition-all duration-300 ease-out",
                    "group-data-[state=open]:bg-green/10 group-data-[state=open]:border-green/30",
                    "group-data-[state=open]:shadow-lg",
                    "font-semibold text-sm sm:text-base md:text-lg leading-tight sm:leading-relaxed"
                  )}
                >
                  <span className="pr-2 sm:pr-4 break-words min-w-0 flex-1 text-left leading-relaxed whitespace-normal hyphens-auto overflow-wrap-anywhere">
                    {question}
                  </span>
                  <ChevronDownIcon 
                    className={cn(
                      "h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-muted-foreground transition-all duration-300 ease-out ml-2 sm:ml-3 mt-0.5",
                      "group-data-[state=open]:rotate-180 group-data-[state=open]:text-green-600"
                    )} 
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent 
                className={cn(
                  "overflow-hidden transition-all duration-500 ease-out",
                  "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
                )}
              >
                <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6 pt-2">
                  <div className="text-muted-foreground leading-relaxed whitespace-pre-line break-words text-sm sm:text-base">
                    {answer}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
