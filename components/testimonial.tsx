"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "María González",
    designation: "Estado Parcelario",
    company: "Avellaneda",
    testimonial:
      "Excelente trabajo realizado por Pablo. El estado parcelario se completó en tiempo récord y con total precisión. " +
      "Muy profesional y responsable en todo el proceso. Lo recomiendo ampliamente.",
    avatar: "/persona-1.jfif",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    designation: "Plano de Mensura",
    company: "Lanús",
    testimonial:
      "Pablo es un agrimensor de primera. Realizó el plano de mensura de mi terreno con tecnología de última generación. " +
      "El resultado fue impecable y el trámite salió sin problemas.",
    avatar: "/persona-2.jfif",
  },
  {
    id: 3,
    name: "Ana Martínez",
    designation: "Subdivisión PH",
    company: "Lomas de Zamora",
    testimonial:
      "Contraté a Pablo para la subdivisión de mi propiedad. Su experiencia y conocimiento técnico fueron fundamentales. " +
      "El trabajo se realizó con la máxima calidad y cumpliendo todos los plazos establecidos.",
    avatar: "/persona-3.jfif",
  },
  {
    id: 4,
    name: "Roberto Fernández",
    designation: "Relevamiento Topográfico",
    company: "Vicente López",
    testimonial:
      "Pablo realizó un relevamiento topográfico completo de mi terreno. Su equipo y metodología son de primer nivel. " +
      "Los planos entregados fueron exactos y detallados. Muy satisfecho con el servicio.",
    avatar: "/persona-4.jfif",
  },
  {
    id: 5,
    name: "Laura Pérez",
    designation: "Estado Parcelario",
    company: "CABA",
    testimonial:
      "Necesitaba un estado parcelario urgente y Pablo lo resolvió en el día. Su eficiencia y profesionalismo son excepcionales. " +
      "Definitivamente volveré a contratarlo para futuros trabajos.",
    avatar: "/persona-5.jfif",
  },
  {
    id: 6,
    name: "Diego Silva",
    designation: "Plano de Mensura",
    company: "San Isidro",
    testimonial:
      "Pablo es sin duda el mejor agrimensor que he conocido. Su atención al detalle y precisión técnica son sobresalientes. " +
      "El plano de mensura superó todas mis expectativas. Totalmente recomendado.",
    avatar: "/persona-6.jfif",
  },
];
const Testimonial = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div
      id="testimonials"
      className="w-full max-w-7xl mx-auto py-6 xs:py-12 px-6"
    >
      <h2 className="mb-8 xs:mb-14 text-4xl md:text-5xl font-bold text-center tracking-tight">
        Mis Clientes
      </h2>
      <div className="container w-full mx-auto">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn("h-3.5 w-3.5 rounded-full border-2", {
                "bg-primary border-primary": current === index + 1,
              })}
            />
          ))}
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
  <div className="mb-8 bg-accent rounded-xl py-8 px-6 sm:py-6">
    <div className="flex items-center justify-between gap-20">
      <div className="hidden lg:block relative shrink-0 aspect-3/4 max-w-[18rem] w-full bg-muted-foreground/20 rounded-xl">
        <Image
          src={testimonial.avatar}
          fill
          alt={`${testimonial.name} - ${testimonial.designation}`}
          className="object-cover rounded-xl"
        />

        <div className="absolute top-1/4 right-0 translate-x-1/2 h-12 w-12 bg-primary rounded-full flex items-center justify-center">
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
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
              <AvatarFallback className="text-xl font-medium bg-primary text-primary-foreground">
                {testimonial.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.designation}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <StarIcon className="w-5 h-5 fill-muted-foreground stroke-muted-foreground" />
            <StarIcon className="w-5 h-5 fill-muted-foreground stroke-muted-foreground" />
            <StarIcon className="w-5 h-5 fill-muted-foreground stroke-muted-foreground" />
            <StarIcon className="w-5 h-5 fill-muted-foreground stroke-muted-foreground" />
            <StarIcon className="w-5 h-5 fill-muted-foreground stroke-muted-foreground" />
          </div>
        </div>
        <p className="mt-6 text-lg sm:text-2xl lg:text-[1.75rem] xl:text-3xl leading-normal lg:leading-normal! font-semibold tracking-tight">
          &quot;{testimonial.testimonial}&quot;
        </p>
        <div className="flex sm:hidden md:flex mt-6 items-center gap-4">
          <Avatar>
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
            <AvatarFallback className="text-xl font-medium bg-primary text-primary-foreground">
              {testimonial.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.designation}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Testimonial;
