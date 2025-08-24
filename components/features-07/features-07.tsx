import {
  BookCheck,
  BarChart3,
  FolderSync,
  Goal,
  Users,
  Zap,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Goal,
    title: "Relevamientos Topográficos",
    description:
      "Loremipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/otros-servicios/otros-servicios-1.jfif",
  },
  {
    icon: BookCheck,
    title: "Deslinde y Amojonamientos",
    description:
      "Loremipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/otros-servicios/otros-servicios-2.jpg",
  },
  {
    icon: BarChart3,
    title: "Planos de Mensura",
    description:
      "Loremipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/otros-servicios/otros-servicios-3.webp",
  },
  {
    icon: Users,
    title: "Loteos y Barrios Cerrados",
    description:
      "Loremipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/otros-servicios/otros-servicios-4.avif",
  },
  {
    icon: FolderSync,
    title: "Propiedad Horizontal",
    description:
      "Loremipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/otros-servicios/otros-servicios-5.jpg",
  },
  {
    icon: Zap,
    title: "Estados Parcelarios",
    description:
      "Loremipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/otros-servicios/otros-servicios-6.jfif",
  },
  {
    icon: BookCheck,
    title: "Planos de Mensura",
    description:
      "Loremipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/otros-servicios/otros-servicios-7.jfif",
  },
  {
    icon: BarChart3,
    title: "Subdivisión de Propiedades",
    description:
      "Loremipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/otros-servicios/otros-servicios-8.jfif",
  },
  {
    icon: Goal,
    title: "Subdivisión de Propiedades",
    description:
      "Loremipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/otros-servicios/otros-servicios-9.jfif",
  },
];

const Features07Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-xl w-full py-10 px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl md:leading-[3.5rem] font-bold tracking-tight max-w-xl md:text-center md:mx-auto">
            Otros servicios
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Servicios especializados de agrimensura y topografía para necesidades específicas
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.slice(0, 6).map((feature) => (
            <Link key={feature.title} href="/otros-servicios">
              <div className="flex gap-6 hover:ring rounded-lg p-2 -mx-2 sm:mx-0 max-w-lg transition-all duration-300 hover:scale-105">
                <div className="relative h-24 aspect-square shrink-0 rounded-lg bg-gray-100 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="rounded-lg object-cover w-full h-full"
                  />
                </div>
                <div className="">
                  <span className="font-semibold tracking-tight text-lg">
                    {feature.title}
                  </span>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" className="text-lg px-6 py-4 max-w-xs sm:max-w-sm md:max-w-md">
            <Link href="/otros-servicios">
              Ver Todos los Servicios Especializados
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Features07Page;
