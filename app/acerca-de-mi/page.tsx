"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Award,
  Users,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Link from "next/link";
import { useState, useEffect } from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar/navbar";
import ScrollToTop from "@/components/scroll-to-top";

// Imágenes del carrusel (Pablo trabajando)
const carouselImages = [
  {
    src: "/acerca-de-mi/pablo-trabajando-1.jpeg",
    alt: "Pablo trabajando en agrimensura - Estados Parcelarios",
    title: "Estados Parcelarios"
  },
  {
    src: "/acerca-de-mi/pablo-trabajando-2.jpg",
    alt: "Pablo trabajando en agrimensura - Planos de Mensura",
    title: "Planos de Mensura"
  },
  {
    src: "/acerca-de-mi/pablo-trabajando-3.jpg",
    alt: "Pablo trabajando en agrimensura - Subdivisiones",
    title: "Subdivisiones"
  },
  {
    src: "/acerca-de-mi/pablo-trabajando-4.jpeg",
    alt: "Pablo trabajando en agrimensura - Declaraciones Juradas",
    title: "Declaraciones Juradas"
  },
  {
    src: "/acerca-de-mi/pablo-trabajando-5.jpeg",
    alt: "Pablo trabajando en agrimensura - Urbanizaciones",
    title: "Urbanizaciones"
  },
  {
    src: "/acerca-de-mi/pablo-trabajando-6.jpeg",
    alt: "Pablo trabajando en agrimensura - Amojonamientos",
    title: "Amojonamientos"
  }
];

const technologies = [
  {
    icon: "📐",
    title: "Estación Total",
    description: "Instrumento electrónico que mide ángulos y distancias con gran precisión. Es fundamental para trabajos de topografía y agrimensura."
  },
  {
    icon: "🛰️",
    title: "GPS Geodésico (GNSS)",
    description: "Permite obtener coordenadas precisas a través de satélites, ideal para relevamientos extensos y trabajos catastrales."
  },
  {
    icon: "💻",
    title: "Software de Topografía y CAD",
    description: "Programas como AutoCAD Civil 3D, TopoCal se utilizan para procesar datos, elaborar planos y analizar terrenos."
  }
];

const serviceAreas = [
  "Avellaneda",
  "Lanús", 
  "Lomas de Zamora",
  "Vicente López",
  "San Fernando",
  "San Isidro",
  "Tigre",
  "La Matanza",
  "San Martín",
  "Ituzaingó",
  "CABA"
];

export default function AcercaDeMiPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-play del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000); // Cambia imagen cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-b from-primary/10 to-background border-b">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft size={16} />
              Volver al inicio
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Acerca de mí
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Conocimiento y precisión en agrimensura con más de 14 años de experiencia
            </p>
          </div>
        </div>

        {/* Carrusel de imágenes */}
        <div className="max-w-7xl mx-auto px-6 py-12">
                     <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden shadow-2xl bg-gray-100">
             {/* Imagen actual */}
             <img
               src={carouselImages[currentImageIndex].src}
               alt={carouselImages[currentImageIndex].alt}
               className="object-contain transition-all duration-500 w-full h-full"
             />
            
            {/* Overlay con título */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                {carouselImages[currentImageIndex].title}
              </h3>
            </div>

            {/* Controles del carrusel */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
            >
              <ChevronRight size={24} />
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Información principal */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Columna izquierda - Información personal */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Pablo Venerus
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Agrimensor en Avellaneda, ofrece servicios de topografía e ingeniería con más de catorce años de experiencia, adaptándose a las necesidades de cada cliente con tecnología de última generación.
                </p>
              </div>

              {/* Experiencia y logros */}
              <div className="grid gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="text-primary" size={20} />
                  <div>
                    <h4 className="font-semibold">Más de 14 años de experiencia</h4>
                    <p className="text-sm text-muted-foreground">Desde 2010 en la profesión</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="text-primary" size={20} />
                  <div>
                    <h4 className="font-semibold">Excelencia en Agrimensura</h4>
                    <p className="text-sm text-muted-foreground">Servicios profesionales de calidad</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="text-primary" size={20} />
                  <div>
                    <h4 className="font-semibold">Atención personalizada</h4>
                    <p className="text-sm text-muted-foreground">Adaptándose a cada cliente</p>
                  </div>
                </div>
              </div>

              {/* Filosofía de trabajo */}
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Mi Filosofía</h3>
                <p className="text-muted-foreground leading-relaxed">
                  &ldquo;Desde principios del año 2010, ofrezco mis servicios con dedicaci&oacute;n y entusiasmo a esta hermosa profesi&oacute;n, resolviendo r&aacute;pida y eficazmente las necesidades de cada uno de nuestros clientes.&rdquo;
                </p>
              </div>
            </div>

            {/* Columna derecha - Tecnología y servicios */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Tecnología de Última Generación</h3>
                <div className="space-y-4">
                  {technologies.map((tech, index) => (
                    <Card key={index} className="border-l-4 border-l-primary">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{tech.icon}</span>
                          <div>
                            <h4 className="font-semibold mb-1">{tech.title}</h4>
                            <p className="text-sm text-muted-foreground">{tech.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Servicios destacados */}
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Servicios Destacados</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={16} />
                    <span className="font-medium">Estados Parcelarios</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={16} />
                    <span className="font-medium">Planos de Mensura</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={16} />
                    <span className="font-medium">Subdivisiones urbanas y rurales</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={16} />
                    <span className="font-medium">Declaraciones Juradas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={16} />
                    <span className="font-medium">Urbanizaciones y Loteos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={16} />
                    <span className="font-medium">Amojonamientos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

                 {/* Zona de cobertura */}
         <div className="bg-muted/50 border-t border-b">
           <div className="max-w-7xl mx-auto px-6 py-12">
             <div className="text-center mb-8">
               <h2 className="text-3xl font-bold mb-4">Zona de Cobertura</h2>
               <p className="text-lg text-muted-foreground">
                 Ofrezco servicios en CABA y en una amplia zona del Gran Buenos Aires
               </p>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
               {serviceAreas.map((area, index) => (
                 <div key={index} className="flex items-center gap-2 bg-background p-3 rounded-lg border">
                   <MapPin className="text-primary" size={16} />
                   <span className="font-medium">{area}</span>
                 </div>
               ))}
             </div>
           </div>
         </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              ¿Necesitas un servicio de agrimensura?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Consultas y asesoramiento sin cargo. Presupuestos EN EL DÍA.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="text-lg px-8 py-6 bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-white dark:text-white border-2 border-black dark:border-white shadow-2xl font-bold"
              >
                <a href="https://api.whatsapp.com/send/?phone=5491167058156&text=Hola%21+Quisiera+un+presupuesto+sobre+un+trabajo+de+Agrimensura" target="_blank" rel="noopener noreferrer">
                  SOLICITAR PRESUPUESTO
                </a>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-900 dark:text-white border-gray-300 dark:border-slate-600 shadow-sm"
              >
                <Link href="/servicios">
                  VER SERVICIOS
                </Link>
              </Button>
            </div>

            {/* Información de contacto */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center gap-3">
                <Phone className="text-primary" size={20} />
                <span className="font-medium">+54 9 11 6705-8156</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Mail className="text-primary" size={20} />
                <span className="font-medium">contacto@miagrimensor.com</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <MapPin className="text-primary" size={20} />
                <span className="font-medium">Avellaneda, Buenos Aires</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
      <ScrollToTop />
    </>
  );
}
