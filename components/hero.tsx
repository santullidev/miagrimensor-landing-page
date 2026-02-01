"use client"

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, DraftingCompass } from "lucide-react";
import { cn } from "@/lib/utils";

const heroImages = [
  "/hero-background_1.jpeg",
  "/hero-background_2.jpeg",
  "/hero-background_3.jpeg"
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden pt-16 lg:pt-8 bg-slate-900">
      {/* Background Carrusel */}
      {heroImages.map((image, index) => (
        <div 
          key={image}
          className={cn(
            "absolute inset-0 w-full h-full bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out",
            image.includes("hero-background_4") ? "bg-contain" : "bg-cover",
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          )}
          style={{
            backgroundImage: `url('${image}')`
          }}
        >
          {/* Overlay para mejorar legibilidad del texto sobre la imagen */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/40 to-slate-900/60 z-10" />
        </div>
      ))}
      
      {/* Gradiente de difuminado en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
      
      {/* Contenido principal */}
      <div className="relative z-50 w-full flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="max-w-7xl w-full flex flex-col lg:flex-row mx-auto items-center justify-center gap-y-8 lg:gap-y-14 gap-x-10 px-4 sm:px-6 py-8 lg:py-12 overflow-hidden">
          <div className="max-w-xl w-full text-center lg:text-left">
            <Badge className="rounded-modern py-2 px-4 border border-green-200/50 bg-green/90 text-white hover:bg-green shadow-soft backdrop-blur-sm transition-all duration-250 font-medium">
              Agrimensor Pablo Venerus
            </Badge>
            <div className="mt-8 relative inline-block text-left">
              {/* Línea decorativa vertical sutil */}
              <div className="absolute -left-2 sm:-left-3 top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-green-400/70 via-green-300/50 to-green-200/30 rounded-full hidden lg:block"></div>
              
              <h1 className="font-headline text-white drop-shadow-xl relative pl-0 lg:pl-4">
                {/* Título principal - palabras completas sin cortar */}
                <span className="block text-4xl xs:text-5xl sm:text-6xl lg:text-[3.75rem] xl:text-[4.25rem] 2xl:text-[4.75rem] font-black mb-1 sm:mb-2 leading-[0.9] tracking-[-0.04em] text-white drop-shadow-2xl whitespace-nowrap">
                  Agrimensura
                </span>
                <span className="block text-4xl xs:text-5xl sm:text-6xl lg:text-[3.75rem] xl:text-[4.25rem] 2xl:text-[4.75rem] font-black mb-4 sm:mb-5 leading-[0.9] tracking-[-0.04em] text-white drop-shadow-2xl whitespace-nowrap">
                  y Topografía
                </span>
                
                {/* Subtítulo con valor y línea decorativa - palabras completas juntas */}
                <div className="relative mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/20">
                  <div className="absolute left-0 top-0 w-12 sm:w-16 h-0.5 sm:h-1 bg-gradient-to-r from-green-400/80 via-green-300/60 to-transparent rounded-full"></div>
                  <span className="block text-lg xs:text-xl sm:text-2xl lg:text-[1.75rem] xl:text-[2rem] font-bold leading-tight tracking-[-0.01em] text-white/95 drop-shadow-lg pt-2 sm:pt-3">
                    Precisión, experiencia y confianza
                  </span>
                </div>
              </h1>
            </div>
            <p className="mt-6 max-w-[60ch] xs:text-lg text-white/90 break-words leading-relaxed drop-shadow-md mx-auto lg:mx-0">
              Estados parcelarios, mensura y planos para escriturar con rapidez y respaldo.
              Desde principios del año 2010,  ofrezco mis servicios, con dedicación, con entusiasmo a esta hermosa profesión, resolviendo rápida y eficazmente las necesidades de cada uno de nuestros clientes. 
            </p>
            <div className="mt-10 lg:mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-modern text-base bg-green hover:bg-green-100 text-white shadow-soft-lg hover:shadow-soft-xl min-h-[48px] transition-all duration-250 font-semibold focus:ring-2 focus:ring-green-50 focus:ring-offset-2"
                asChild
              >
                <a href="https://api.whatsapp.com/send/?phone=5491167058156&text=Hola%21+Quisiera+un+presupuesto+sobre+un+trabajo+de+Agrimensura" target="_blank" rel="noopener noreferrer">
                  Hablemos en Whatsapp <ArrowUpRight className="h-5 w-5 ml-2" strokeWidth={2} />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-modern text-base shadow-soft bg-white/95 hover:bg-white text-foreground border-green/40 hover:border-green/50 min-h-[48px] transition-all duration-250 font-medium backdrop-blur-sm"
                asChild
              >
                <a href="/servicios">
                  <DraftingCompass className="h-5 w-5 mr-2" strokeWidth={2} /> Mis Servicios
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
