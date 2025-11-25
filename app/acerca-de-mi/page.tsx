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
  ArrowUpRight,
  DraftingCompass,
} from "lucide-react";

import Link from "next/link";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar/navbar";
import ScrollToTop from "@/components/scroll-to-top";
import ServiceCoverage from "@/components/service-coverage";

// Imágenes estáticas - integradas en el diseño
const images = [
  {
    src: "/acerca-de-mi/pablo-trabajando-1.jpeg",
    alt: "Pablo trabajando en agrimensura - Estados Parcelarios",
  },
  {
    src: "/acerca-de-mi/pablo-trabajando-9.jpeg",
    alt: "Pablo trabajando en agrimensura - Planos de Mensura",
  },
  {
    src: "/acerca-de-mi/pablo-trabajando-11.jpeg",
    alt: "Pablo trabajando en agrimensura - Subdivisiones",
  },
];

const technologies = [
  {
    icon: "📐",
    title: "Estación Total",
    description: "Instrumento electrónico de última generación que mide ángulos y distancias con precisión milimétrica. Es fundamental para trabajos de topografía y agrimensura. Utilizo equipos de alta precisión que garantizan mediciones exactas en condiciones de terreno diversas, permitiendo realizar levantamientos topográficos detallados y confiables para proyectos de construcción, mensura y subdivisiones."
  },
  {
    icon: "🛰️",
    title: "GPS Geodésico (GNSS)",
    description: "Sistema de posicionamiento global que permite obtener coordenadas precisas a través de satélites, ideal para relevamientos extensos y trabajos catastrales. Esta tecnología me permite georreferenciar puntos con exactitud submétrica, esencial para el establecimiento de marcos de referencia y el registro de coordenadas en el sistema geodésico nacional argentino."
  },
  {
    icon: "💻",
    title: "Software de Topografía y CAD",
    description: "Utilizo programas profesionales como AutoCAD Civil 3D, TopoCal y software especializado para procesar datos topográficos, elaborar planos técnicos precisos y analizar terrenos. Estos herramientas me permiten generar documentación técnica de alta calidad, realizar cálculos complejos de superficies y crear planos que cumplen con todas las normativas vigentes en la Provincia de Buenos Aires."
  }
];

export default function AcercaDeMiPage() {

  return (
    <>
      {/* Navbar */}
      <Navbar />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-b from-green-light/20 via-background to-background border-b border-green/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-green-600 transition-colors mb-6 group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
              <span>Volver al inicio</span>
            </Link>
            <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
              Acerca de mí
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              Conocimiento y precisión en agrimensura con más de 14 años de experiencia
            </p>
          </div>
        </div>

        {/* Información principal con imágenes integradas - Responsive First */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="space-y-8 sm:space-y-12">
            {/* Sección 1: Header con imagen en móvil, lado a lado en desktop */}
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
              {/* Columna izquierda - Información personal */}
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-foreground">
                    Pablo Venerus
                  </h2>
                  <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                    Agrimensor profesional con sede en Avellaneda, ofrece servicios integrales de topografía e ingeniería con más de catorce años de experiencia continua. 
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Me especializo en adaptar cada proyecto a las necesidades específicas de mis clientes, utilizando tecnología de última generación y metodologías probadas para garantizar resultados precisos y confiables en cada trabajo.
                  </p>
                </div>

                {/* Experiencia y logros */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-modern bg-green-light/20 border border-green/20 hover:shadow-soft transition-all duration-250">
                    <div className="p-1.5 sm:p-2 rounded-modern bg-green/10 border border-green/20 flex-shrink-0">
                      <Calendar className="text-green-600" size={20} strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="font-headline font-semibold text-sm sm:text-base text-foreground mb-0.5 sm:mb-1">Más de 14 años de experiencia</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">Desde 2010 brindando servicios profesionales de agrimensura y topografía</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-modern bg-green-light/20 border border-green/20 hover:shadow-soft transition-all duration-250">
                    <div className="p-1.5 sm:p-2 rounded-modern bg-green/10 border border-green/20 flex-shrink-0">
                      <Award className="text-green-600" size={20} strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="font-headline font-semibold text-sm sm:text-base text-foreground mb-0.5 sm:mb-1">Excelencia en Agrimensura</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">Servicios profesionales de calidad con precisión y atención al detalle</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-modern bg-green-light/20 border border-green/20 hover:shadow-soft transition-all duration-250">
                    <div className="p-1.5 sm:p-2 rounded-modern bg-green/10 border border-green/20 flex-shrink-0">
                      <Users className="text-green-600" size={20} strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="font-headline font-semibold text-sm sm:text-base text-foreground mb-0.5 sm:mb-1">Atención personalizada</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">Cada cliente recibe un servicio adaptado a sus necesidades específicas</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Primera imagen - Alineada con el contenido de la izquierda, sin espacios laterales */}
              <Card className="border-green/20 overflow-hidden shadow-soft-lg hover:shadow-soft-xl transition-all duration-250 w-full">
                <CardContent className="p-0">
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-gradient-to-br from-green/10 to-cream/30">
                    <img
                      src={images[0].src}
                      alt={images[0].alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filosofía de trabajo */}
            <Card className="border-green/30 bg-gradient-to-br from-green-light/30 to-cream/30 shadow-soft-lg">
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-headline text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-foreground">Mi Filosofía</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed italic">
                  &ldquo;Desde principios del año 2010, ofrezco mis servicios con dedicación y entusiasmo a esta hermosa profesión, resolviendo rápida y eficazmente las necesidades de cada uno de nuestros clientes.&rdquo;
                </p>
              </CardContent>
            </Card>

            {/* Sección 2: Tecnología y segunda imagen */}
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
              <div className="space-y-4 sm:space-y-6">
                <h3 className="font-headline text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-foreground">Tecnología de Última Generación</h3>
                <div className="space-y-3 sm:space-y-4">
                  {technologies.map((tech, index) => (
                    <Card key={index} className="border-green/20 hover:border-green/40 transition-all duration-250 shadow-soft hover:shadow-soft-lg">
                      <CardContent className="p-4 sm:p-5">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <span className="text-2xl sm:text-3xl flex-shrink-0">{tech.icon}</span>
                          <div>
                            <h4 className="font-headline font-semibold mb-1 sm:mb-2 text-sm sm:text-base text-foreground">{tech.title}</h4>
                            {/* Texto corto en móvil, completo en desktop */}
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                              <span className="sm:hidden">
                                {tech.description.split('. ')[0]}.
                              </span>
                              <span className="hidden sm:inline">
                                {tech.description}
                              </span>
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Segunda imagen - Alineada con el contenido de la izquierda, sin espacios laterales */}
              <Card className="border-green/20 overflow-hidden shadow-soft-lg hover:shadow-soft-xl transition-all duration-250 w-full">
                <CardContent className="p-0">
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-gradient-to-br from-green/10 to-cream/30">
                    <img
                      src={images[1].src}
                      alt={images[1].alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Servicios destacados - Contenido ampliado, texto reducido en móvil */}
            <Card className="border-green/30 bg-gradient-to-br from-green/5 to-green-light/20 shadow-soft-lg">
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-headline text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-foreground">Servicios Destacados</h3>
                {/* Párrafo introductorio solo visible en desktop */}
                <p className="hidden sm:block text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                  Ofrezco una amplia gama de servicios profesionales de agrimensura y topografía, adaptados a las necesidades específicas de cada cliente. Cada trabajo se realiza con precisión, cumpliendo con todas las normativas vigentes y utilizando tecnología de última generación.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-600 flex-shrink-0" size={16} strokeWidth={2} />
                      <span className="font-semibold text-foreground text-sm">Estados Parcelarios</span>
                    </div>
                    <p className="hidden sm:block text-xs text-muted-foreground ml-6 leading-relaxed">Certificación catastral obligatoria para escrituras y transferencias de dominio en CABA y Provincia de Buenos Aires.</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-600 flex-shrink-0" size={16} strokeWidth={2} />
                      <span className="font-semibold text-foreground text-sm">Planos de Mensura</span>
                    </div>
                    <p className="hidden sm:block text-xs text-muted-foreground ml-6 leading-relaxed">Elaboración de planos técnicos precisos para mensura y subdivisiones, cumpliendo con normativas vigentes.</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-600 flex-shrink-0" size={16} strokeWidth={2} />
                      <span className="font-semibold text-foreground text-sm">Subdivisiones urbanas y rurales</span>
                    </div>
                    <p className="hidden sm:block text-xs text-muted-foreground ml-6 leading-relaxed">División de parcelas y creación de propiedad horizontal, con todos los planos y documentación necesaria.</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-600 flex-shrink-0" size={16} strokeWidth={2} />
                      <span className="font-semibold text-foreground text-sm">Declaraciones Juradas</span>
                    </div>
                    <p className="hidden sm:block text-xs text-muted-foreground ml-6 leading-relaxed">Revalúos y actualizaciones catastrales para optimizar la valuación fiscal de inmuebles.</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-600 flex-shrink-0" size={16} strokeWidth={2} />
                      <span className="font-semibold text-foreground text-sm">Relevamientos topográficos</span>
                    </div>
                    <p className="hidden sm:block text-xs text-muted-foreground ml-6 leading-relaxed">Levantamientos topográficos detallados para proyectos de ingeniería, construcción y planificación urbana.</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-600 flex-shrink-0" size={16} strokeWidth={2} />
                      <span className="font-semibold text-foreground text-sm">Amojonamientos</span>
                    </div>
                    <p className="hidden sm:block text-xs text-muted-foreground ml-6 leading-relaxed">Marcación y delimitación precisa de linderos para establecer y verificar los límites de propiedades.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tercera imagen - Separador entre secciones, centrada y sin espacios laterales */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <Card className="border-green/20 overflow-hidden shadow-soft-lg hover:shadow-soft-xl transition-all duration-250 max-w-2xl mx-auto">
            <CardContent className="p-0">
              <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-gradient-to-br from-green/10 to-cream/30">
                <img
                  src={images[2].src}
                  alt={images[2].alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Zona de cobertura - Mismo diseño que landing */}
        <ServiceCoverage />

        {/* CTA Section - Mejorado */}
        <section className="bg-green-light/20 border-t border-b border-green/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="text-center">
              <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                ¿Necesitas un servicio de agrimensura?
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Consultas y asesoramiento sin cargo. Presupuestos EN EL DÍA.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button 
                  asChild 
                  size="lg" 
                  className="text-lg px-8 py-6 min-h-[48px] bg-green hover:bg-green-100 text-white border border-green-300 rounded-modern shadow-soft-lg hover:shadow-soft-xl font-semibold transition-all duration-250 focus:ring-2 focus:ring-green-50 focus:ring-offset-2"
                >
                  <a href="https://api.whatsapp.com/send/?phone=5491167058156&text=Hola%21+Quisiera+un+presupuesto+sobre+un+trabajo+de+Agrimensura" target="_blank" rel="noopener noreferrer">
                    Hablemos en WhatsApp <ArrowUpRight className="ml-2 h-5 w-5" strokeWidth={2} />
                  </a>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-6 min-h-[48px] bg-background hover:bg-green/5 text-foreground border-green/30 hover:border-green/50 rounded-modern shadow-soft font-medium transition-all duration-250"
                >
                  <Link href="/servicios">
                    <DraftingCompass className="mr-2 h-5 w-5" strokeWidth={2} />
                    VER SERVICIOS
                  </Link>
                </Button>
              </div>

              {/* Información de contacto */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center gap-3 p-6 rounded-modern bg-card border border-green/20 hover:border-green/40 transition-all duration-250 hover:shadow-soft">
                  <div className="p-3 rounded-modern bg-green/10 border border-green/20">
                    <Phone className="text-green-600" size={24} strokeWidth={2} />
                  </div>
                  <span className="font-medium text-foreground">+54 9 11 6705-8156</span>
                </div>
                <div className="flex flex-col items-center gap-3 p-6 rounded-modern bg-card border border-green/20 hover:border-green/40 transition-all duration-250 hover:shadow-soft">
                  <div className="p-3 rounded-modern bg-green/10 border border-green/20">
                    <Mail className="text-green-600" size={24} strokeWidth={2} />
                  </div>
                  <span className="font-medium text-foreground">contacto@miagrimensor.com</span>
                </div>
                <div className="flex flex-col items-center gap-3 p-6 rounded-modern bg-card border border-green/20 hover:border-green/40 transition-all duration-250 hover:shadow-soft">
                  <div className="p-3 rounded-modern bg-green/10 border border-green/20">
                    <MapPin className="text-green-600" size={24} strokeWidth={2} />
                  </div>
                  <span className="font-medium text-foreground">Avellaneda, Buenos Aires</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
      <ScrollToTop />
    </>
  );
}


