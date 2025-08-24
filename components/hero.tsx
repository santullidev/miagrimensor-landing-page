"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, DraftingCompass } from "lucide-react";


import { HeroBackground } from "./animate-ui/backgrounds/hero-background";
import { useState, useEffect } from "react";

// Imágenes del carrusel del hero (Pablo trabajando)
const heroImages = [
  {
    src: "/hero/pablo-trabajando-1.jpeg",
    alt: "Pablo trabajando en agrimensura - Estados Parcelarios",
    title: "Estados Parcelarios"
  },
  {
    src: "/hero/pablo-trabajando-2.jpg",
    alt: "Pablo trabajando en agrimensura - Planos de Mensura",
    title: "Planos de Mensura"
  },
  {
    src: "/hero/pablo-trabajando-3.jpg",
    alt: "Pablo trabajando en agrimensura - Subdivisiones",
    title: "Subdivisiones"
  },
  {
    src: "/hero/pablo-trabajando-4.jpeg",
    alt: "Pablo trabajando en agrimensura - Declaraciones Juradas",
    title: "Declaraciones Juradas"
  },
  {
    src: "/hero/pablo-trabajando-5.jpeg",
    alt: "Pablo trabajando en agrimensura - Urbanizaciones",
    title: "Urbanizaciones"
  },
  {
    src: "/hero/pablo-trabajando-6.jpeg",
    alt: "Pablo trabajando en agrimensura - Amojonamientos",
    title: "Amojonamientos"
  }
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-play del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000); // Cambia imagen cada 4 segundos

    return () => clearInterval(interval);
  }, []);



  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden pt-16 lg:pt-8">
      {/* Background con imagen y overlay */}
      <HeroBackground className="absolute inset-0 w-full h-full" />
      
      {/* Gradiente de difuminado en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
      
      {/* Contenido principal */}
      <div className="relative z-20 w-full flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="max-w-7xl w-full flex flex-col lg:flex-row mx-auto items-center justify-between gap-y-14 gap-x-10 px-6 py-12 lg:py-8 xl:py-12">
          <div className="max-w-xl">
            <Badge className="rounded-full py-1 border-none bg-white/90 text-slate-900 hover:bg-white shadow-lg backdrop-blur-sm">
              Agrimensor Pablo Venerus
            </Badge>
            <h1 className="mt-6 max-w-[20ch] text-3xl xs:text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold leading-[1.2]! tracking-tight text-white">
              Servicios integrales de agrimensura y topografía
            </h1>
            <p className="mt-6 max-w-[60ch] xs:text-lg text-slate-200">
              Estados parcelarios, mensura y planos para escriturar con rapidez y respaldo.
              Desde principios del año 2010,  ofrezco mis servicios, con dedicación, con entusiasmo a esta hermosa profesión, resolviendo rápida y eficazmente las necesidades de cada uno de nuestros clientes. 
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full text-base bg-green-500 hover:bg-green-600 text-white shadow-lg"
                asChild
              >
                <a href="https://api.whatsapp.com/send/?phone=5491167058156&text=Hola%21+Quisiera+un+presupuesto+sobre+un+trabajo+de+Agrimensura" target="_blank" rel="noopener noreferrer">
                  Hablemos en Whatsapp <ArrowUpRight className="h-5 w-5 ml-2" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-full text-base shadow-none bg-white/90 hover:bg-white dark:bg-slate-800/90 dark:hover:bg-slate-800 dark:text-white dark:border-slate-600 border-gray-300"
                asChild
              >
                <a href="/servicios">
                  <DraftingCompass className="h-5 w-5 mr-2" /> Mis Servicios
                </a>
              </Button>
            </div>
          </div>
          
          {/* Carrusel de imágenes */}
          <div className="relative lg:max-w-lg xl:max-w-xl w-full bg-gray-100 rounded-xl aspect-[3/4] overflow-hidden">
            {/* Imagen actual */}
            <img
              src={heroImages[currentImageIndex].src}
              alt={heroImages[currentImageIndex].alt}
              className="object-cover object-top rounded-xl transition-opacity duration-500 w-full h-full"
            />
            

            
            {/* Overlay con título */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 z-10">
              <p className="text-white text-sm font-medium">
                {heroImages[currentImageIndex].title}
              </p>
            </div>
            
            {/* Indicadores */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
