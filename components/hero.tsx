"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, DraftingCompass, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import { HexagonBackground } from "./animate-ui/backgrounds/hexagon";
import { useState, useEffect } from "react";

// Imágenes del carrusel del hero
const heroImages = [
  {
    src: "/pablo-trabajando-1.jpeg",
    alt: "Pablo Venerus trabajando en campo con Estación Total",
    title: "Trabajando en campo con Estación Total"
  },
  {
    src: "/pablo-trabajando-2.jpeg",
    alt: "Pablo Venerus con GPS Geodésico",
    title: "Utilizando GPS Geodésico (GNSS)"
  },
  {
    src: "/pablo-trabajando-3.jpeg",
    alt: "Pablo Venerus en oficina procesando datos",
    title: "Procesando datos con software especializado"
  },
  {
    src: "/pablo-trabajando-4.jpeg",
    alt: "Pablo Venerus asesorando a clientes",
    title: "Asesorando a clientes"
  },
  {
    src: "/pablo-trabajando-5.jpeg",
    alt: "Pablo Venerus realizando mediciones precisas",
    title: "Realizando mediciones precisas"
  },
  {
    src: "/pablo-trabajando-6.jpeg",
    alt: "Pablo Venerus en trabajo de campo",
    title: "Trabajos de agrimensura profesional"
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden">
      {/* Background con animación */}
      <HexagonBackground className="absolute inset-0 w-full h-full" />
      
      {/* Gradiente de difuminado en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
      
      {/* Contenido principal */}
      <div className="relative z-20 w-full flex items-center justify-center h-full">
        <div className="max-w-7xl w-full flex flex-col lg:flex-row mx-auto items-center justify-between gap-y-14 gap-x-10 px-6 py-12 lg:py-0">
          <div className="max-w-xl">
            <Badge className="rounded-full py-1 border-none">
              Agrimensor Pablo Venerus
            </Badge>
            <h1 className="mt-6 max-w-[20ch] text-3xl xs:text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold leading-[1.2]! tracking-tight">
              Servicios integrales de agrimensura y topografía
            </h1>
            <p className="mt-6 max-w-[60ch] xs:text-lg">
              Estados parcelarios, mensura y planos para escriturar con rapidez y respaldo.
              Desde principios del año 2010,  ofrezco mis servicios, con dedicación, con entusiasmo a esta hermosa profesión, resolviendo rápida y eficazmente las necesidades de cada uno de nuestros clientes. 
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full text-base"
                asChild
              >
                <a href="https://api.whatsapp.com/send/?phone=5491167058156&text=Hola%21+Quisiera+un+presupuesto+sobre+un+trabajo+de+Agrimensura" target="_blank" rel="noopener noreferrer">
                  Hablemos en Whatsapp <ArrowUpRight className="h-5! w-5!" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-full text-base shadow-none"
                asChild
              >
                <a href="#features">
                  <DraftingCompass className="h-5! w-5!" /> Mis Servicios
                </a>
              </Button>
            </div>
          </div>
          
          {/* Carrusel de imágenes */}
          <div className="relative lg:max-w-lg xl:max-w-xl w-full bg-accent rounded-xl aspect-square overflow-hidden">
            {/* Imagen actual */}
            <Image
              src={heroImages[currentImageIndex].src}
              fill
              alt={heroImages[currentImageIndex].alt}
              className="object-cover rounded-xl transition-opacity duration-500"
            />
            
            {/* Overlay con título */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-white text-sm font-medium">
                {heroImages[currentImageIndex].title}
              </p>
            </div>
            
            {/* Controles del carrusel */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={20} />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
              aria-label="Siguiente imagen"
            >
              <ChevronRight size={20} />
            </button>
            
            {/* Indicadores */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
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
