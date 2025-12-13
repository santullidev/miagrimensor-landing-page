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

const provinceAreas = [
  "La Plata",
  "Pilar",
  "Escobar",
  "Campana",
  "Zárate",
  "Cañuelas",
  "San Vicente",
  "Luján",
  "Brandsen",
  "Chascomús",
  "Costa Atlántica",
  "Mar del Plata"
];

const ServiceCoverage = () => {
  return (
    <section id="cobertura" className="relative py-12 md:py-16 bg-green-light/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-10">
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Algunas de las Zonas donde Trabajo
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ofrezco mis servicios profesionales de agrimensura en CABA y toda la Provincia de Buenos Aires
          </p>
        </div>

        {/* Map container with neighborhoods list */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          {/* Maps Column */}
          <div className="space-y-4">
            {/* Interactive map with CABA image */}
            <Card className="border-soft rounded-modern-lg shadow-soft-lg bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gradient-to-br from-green/10 to-cream/50">
                  {/* CABA Map Image */}
                  <img
                    src="/Mapa-CABA-Barrios-Nombres.svg.png"
                    alt="Mapa de CABA con barrios"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay with text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                    <div className="w-full p-4 text-white">
                      <h3 className="font-headline text-lg sm:text-xl font-semibold mb-1 drop-shadow-lg">
                        CABA + Gran Buenos Aires
                      </h3>
                      <p className="text-sm text-white/95 drop-shadow-md font-medium">
                        Servicios en todos los Barrios de CABA
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Province Map Image */}
            <Card className="border-soft rounded-modern-lg shadow-soft-lg bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gradient-to-br from-green/10 to-cream/50">
                  {/* Province Map Image */}
                  <img
                    src="/Mapa_Provicia_de Buenos_Aires.png"
                    alt="Mapa de Provincia de Buenos Aires"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay with text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                    <div className="w-full p-4 text-white">
                      <h3 className="font-headline text-lg sm:text-xl font-semibold mb-1 drop-shadow-lg">
                        Provincia de Buenos Aires
                      </h3>
                      <p className="text-sm text-white/95 drop-shadow-md font-medium">
                        Cobertura en toda la provincia de Buenos Aires.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Neighborhoods list in elegant typography */}
          <div className="space-y-6">
            {/* CABA & GBA List */}
            <div>
              <div className="mb-3">
                <h3 className="font-headline text-xl font-semibold mb-2 text-foreground">
                  CABA y Gran Buenos Aires
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Principales zonas de cobertura en el área metropolitana.
                </p>
              </div>

              {/* Elegant grid list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {serviceAreas.map((area, index) => (
                  <div
                    key={index}
                    className="group flex items-center gap-2 p-2 rounded-modern bg-card border-soft hover:border-green/30 hover:shadow-soft transition-all duration-250 cursor-default"
                  >
                    <CheckCircle
                      className="w-4 h-4 text-green-400 flex-shrink-0 group-hover:text-green-500 transition-colors duration-250"
                      strokeWidth={1.5}
                    />
                    <span className="text-sm font-medium text-foreground group-hover:text-foreground/90 transition-colors duration-250">
                      {area}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Province List */}
            <div>
              <div className="mb-3">
                <h3 className="font-headline text-xl font-semibold mb-2 text-foreground">
                  Partidos de la Provincia
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  También llegamos a localidades como:
                </p>
              </div>

              {/* Elegant grid list - Province */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {provinceAreas.map((area, index) => (
                  <div
                    key={index}
                    className="group flex items-center gap-2 p-2 rounded-modern bg-card border-soft hover:border-green/30 hover:shadow-soft transition-all duration-250 cursor-default"
                  >
                    <CheckCircle
                      className="w-4 h-4 text-green-400 flex-shrink-0 group-hover:text-green-500 transition-colors duration-250"
                      strokeWidth={1.5}
                    />
                    <span className="text-sm font-medium text-foreground group-hover:text-foreground/90 transition-colors duration-250">
                      {area}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional info */}
            <div className="mt-6 p-3 rounded-modern bg-green-light/30 border border-green/20">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
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

