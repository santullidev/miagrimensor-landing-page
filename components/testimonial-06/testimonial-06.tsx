"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import { useEffect, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Carlos Mendoza",
    designation: "Arquitecto",
    company: "Estudio Mendoza & Asociados",
    testimonial:
      "Pablo ha sido fundamental en todos nuestros proyectos de desarrollo urbano. Su precisión y profesionalismo son excepcionales. " +
      "Los levantamientos topográficos que realiza son de la más alta calidad y siempre cumple con los plazos establecidos.",
    avatar: "/testimonios/persona-1.jfif",
    workImage: "/servicios/estados-parcelarios-1.jpg",
  },
  {
    id: 2,
    name: "María González",
    designation: "Ingeniera Civil",
    company: "Constructora del Sur",
    testimonial:
      "Trabajar con Pablo ha sido una experiencia excelente. Su conocimiento técnico y atención al detalle nos han ayudado a evitar problemas costosos. " +
      "Sus informes son claros, precisos y siempre están listos cuando los necesitamos.",
    avatar: "/testimonios/persona-2.jfif",
    workImage: "/servicios/planos-mensura.jpg",
  },
  {
    id: 3,
    name: "Roberto Silva",
    designation: "Desarrollador Inmobiliario",
    company: "Inmobiliaria Silva",
    testimonial:
      "Pablo es nuestro agrimensor de confianza desde hace más de 5 años. Su trabajo es impecable y su ética profesional es admirable. " +
      "Ha sido clave en el éxito de nuestros proyectos residenciales y comerciales.",
    avatar: "/testimonios/persona-3.jfif",
    workImage: "/servicios/subdivisiones.jpg",
  },
  {
    id: 4,
    name: "Ana Torres",
    designation: "Abogada",
    company: "Estudio Jurídico Torres",
    testimonial:
      "Para casos de litigios de propiedad, Pablo es el profesional que recomiendo. Sus peritajes son técnicamente sólidos y sus informes son claros para los tribunales. " +
      "Su testimonio experto ha sido determinante en varios casos exitosos.",
    avatar: "/testimonios/persona-4.jfif",
    workImage: "/servicios/declaraciones-juradas-1.jpg",
  },
  {
    id: 5,
    name: "Luis Ramírez",
    designation: "Productor Agrícola",
    company: "Hacienda San Luis",
    testimonial:
      "Pablo nos ayudó a resolver un complejo problema de límites de propiedad que teníamos desde hace años. " +
      "Su trabajo fue minucioso y profesional. Ahora tenemos la tranquilidad de saber exactamente dónde están nuestros límites.",
    avatar: "/testimonios/persona-5.jfif",
    workImage: "/servicios/amojonamientos.jpg",
  },
  {
    id: 6,
    name: "Carmen Vega",
    designation: "Directora de Obras",
    company: "Municipalidad de San Pedro",
    testimonial:
      "Como municipalidad, necesitamos agrimensores confiables y Pablo cumple con todos nuestros estándares. " +
      "Sus trabajos de urbanización y subdivisiones siempre cumplen con las normativas vigentes.",
    avatar: "/testimonios/persona-6.jfif",
    workImage: "/servicios/urbanizaciones.jpg",
  },
];

const Testimonial06 = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Auto-play del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Cambia testimonio cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="testimonials" className="min-h-screen w-full flex justify-center items-center py-12 px-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full">
        <h2 className="mb-14 text-5xl md:text-6xl font-bold text-center tracking-tight">
          Lo que dicen mis clientes
        </h2>
        <div className="container w-full lg:max-w-screen-lg xl:max-w-screen-xl mx-auto px-12">
          {/* Testimonio actual */}
          <div className="relative">
            <div className="transition-opacity duration-500 ease-in-out">
              <TestimonialCard testimonial={testimonials[currentTestimonialIndex]} />
            </div>
          </div>
          
          {/* Indicadores */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonialIndex(index)}
                className={cn("h-3.5 w-3.5 rounded-full border-2 transition-all duration-300", {
                  "bg-primary border-primary": currentTestimonialIndex === index,
                  "border-gray-300 dark:border-gray-600 hover:border-primary/50": currentTestimonialIndex !== index,
                })}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) => (
  <div className="mb-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl py-8 px-6 sm:py-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-500">
    <div className="flex items-center justify-between gap-20">
      <div className="hidden lg:block relative shrink-0 aspect-[3/4] max-w-[18rem] w-full rounded-xl border border-slate-200/30 dark:border-slate-600/30 overflow-hidden">
        <img
          src={testimonial.workImage}
          alt={`Trabajo de ${testimonial.name} - ${testimonial.designation}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-0 translate-x-1/2 h-12 w-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
          <svg
            width="102"
            height="102"
            viewBox="0 0 102 102"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
          >
            <path
              d="M26.0063 19.8917C30.0826 19.8625 33.7081 20.9066 36.8826 23.024C40.057 25.1414 42.5746 28.0279 44.4353 31.6835C46.2959 35.339 47.2423 39.4088 47.2744 43.8927C47.327 51.2301 44.9837 58.4318 40.2444 65.4978C35.4039 72.6664 28.5671 78.5755 19.734 83.2249L2.54766 74.1759C8.33598 71.2808 13.2548 67.9334 17.3041 64.1335C21.2515 60.3344 23.9203 55.8821 25.3105 50.7765C20.5179 50.4031 16.6348 48.9532 13.6612 46.4267C10.5864 44.0028 9.03329 40.5999 9.00188 36.2178C8.97047 31.8358 10.5227 28.0029 13.6584 24.7192C16.693 21.5381 20.809 19.9289 26.0063 19.8917ZM77.0623 19.5257C81.1387 19.4965 84.7641 20.5406 87.9386 22.6581C91.1131 24.7755 93.6306 27.662 95.4913 31.3175C97.3519 34.9731 98.2983 39.0428 98.3304 43.5268C98.383 50.8642 96.0397 58.0659 91.3004 65.1319C86.4599 72.3005 79.6231 78.2095 70.79 82.859L53.6037 73.8099C59.392 70.9149 64.3108 67.5674 68.3601 63.7676C72.3075 59.9685 74.9763 55.5161 76.3665 50.4105C71.5739 50.0372 67.6908 48.5873 64.7172 46.0608C61.6424 43.6369 60.0893 40.2339 60.0579 35.8519C60.0265 31.4698 61.5787 27.6369 64.7145 24.3532C67.7491 21.1722 71.865 19.563 77.0623 19.5257Z"
              className="fill-primary-foreground"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex items-center justify-between gap-1">
          <div className="hidden sm:flex md:hidden items-center gap-4">
            <Avatar className="w-8 h-8 md:w-10 md:h-10">
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
              <AvatarFallback className="text-xl font-medium bg-primary text-primary-foreground">
                {testimonial.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{testimonial.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.designation}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <StarIcon className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
            <StarIcon className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
            <StarIcon className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
            <StarIcon className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
            <StarIcon className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
          </div>
        </div>
        <p className="mt-6 text-lg sm:text-2xl lg:text-[1.75rem] xl:text-3xl leading-normal lg:!leading-normal font-semibold tracking-tight text-slate-800 dark:text-slate-200">
          &quot;{testimonial.testimonial}&quot;
        </p>
        <div className="flex sm:hidden md:flex mt-6 items-center gap-4">
          <Avatar>
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback className="text-xl font-medium bg-primary text-primary-foreground">
              {testimonial.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{testimonial.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.designation}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Testimonial06;
