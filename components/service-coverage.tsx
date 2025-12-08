"use client"

import { MapPin, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const serviceAreas = [
  "CABA",
  "Tigre",
  "Avellaneda",
  "Lanús",
  "Lomas de Zamora",
  "Vicente López",
  "San Isidro",
  "San Martín",
  "Ituzaingó",
  "Quilmes",
  "Berazategui",
  "Morón"
];

const ServiceCoverage = () => {
  return (
    <section id="cobertura" className="relative py-section section-lg bg-green-light/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Algunas de las Zonas donde Trabajo
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ofrezco mis servicios profesionales de agrimensura en CABA y Gran Buenos Aires
          </p>
        </div>

        {/* Map container with neighborhoods list */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Interactive map with CABA image */}
          <Card className="border-soft rounded-modern-lg shadow-soft-lg bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-[4/3] bg-gradient-to-br from-green/10 to-cream/50">
                {/* CABA Map Image */}
                <img
                  src="/Mapa-CABA-Barrios-Nombres.svg.png"
                  alt="Mapa de CABA con barrios"
                  className="w-full h-full object-cover"
                />
                {/* Overlay with text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end">
                  <div className="w-full p-6 text-white">
                    <h3 className="font-headline text-xl sm:text-2xl font-semibold mb-2 drop-shadow-lg">
                      CABA + Gran Buenos Aires
                    </h3>
                    <p className="text-sm sm:text-base text-white/95 drop-shadow-md">
                      Servicios en todos los Barrios de CABA
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Neighborhoods list in elegant typography */}
          <div className="space-y-4">
            <div className="mb-6">
              <h3 className="font-headline text-2xl font-semibold mb-3 text-foreground">
                Barrios y Localidades
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Ofrezco servicios en las siguientes zonas del Gran Buenos Aires y CABA.
                Consulta sin cargo para verificar cobertura en tu zona específica.
              </p>
            </div>

            {/* Elegant grid list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {serviceAreas.map((area, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-3 p-3 rounded-modern bg-card border-soft hover:border-green/30 hover:shadow-soft transition-all duration-250 cursor-default"
                >
                  <CheckCircle 
                    className="w-5 h-5 text-green-400 flex-shrink-0 group-hover:text-green-500 transition-colors duration-250" 
                    strokeWidth={1.5}
                  />
                  <span className="font-medium text-foreground group-hover:text-foreground/90 transition-colors duration-250">
                    {area}
                  </span>
                </div>
              ))}
            </div>

            {/* Additional info */}
            <div className="mt-8 p-4 rounded-modern bg-green-light/30 border border-green/20">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="font-semibold text-foreground">Nota:</strong> Si tu localidad no está en la lista, 
                no dudes en contactarnos. Evaluamos proyectos en toda el área metropolitana de Buenos Aires.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCoverage;

