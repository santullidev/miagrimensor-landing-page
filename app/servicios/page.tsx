"use client"

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookCheck,
  Navigation,
  Goal,
  Users,
  Zap,
  ArrowLeft,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ArrowRight,
  CheckCircle,
  Clock,
  Target,
  Award,
  Calculator,
  Home,
  Phone,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar/navbar";
import ScrollToTop from "@/components/scroll-to-top";

const services = [
  {
    id: 1,
    icon: Goal,
    title: "Estado Parcelario en la Provincia de Buenos Aires",
    subtitle: "Certificación catastral obligatoria - Ley 10.707",
    description:
      "El Estado Parcelario en la Provincia de Buenos Aires es obligatorio según la Ley 10.707/94 al momento de una venta, hipoteca o cualquier acto de transmisión de derechos reales. Realizamos la certificación oficial de medidas y límites del inmueble, verificación de documentación catastral ante ARBA e informe técnico completo para escrituración. Nuestro servicio incluye el relevamiento técnico, generación del plano georreferenciado, registro en el Catastro y obtención de la cédula catastral correspondiente.",
    features: [
      "Certificación de medidas y límites del inmueble conforme a Ley 10.707",
      "Verificación de documentación catastral ante ARBA",
      "Relevamiento técnico y plano georreferenciado",
      "Constitución y verificación de Estado Parcelario",
      "Obtención de cédula catastral y resumen valuatorio",
      "Asesoramiento legal en el proceso"
    ],
    image: "/servicios/estados-parcelarios-1.jpg",
    category: "Catastral",
    duration: "24-48 horas",
    complexity: "Baja",
    highlights: ["Obligatorio", "Rápido", "Oficial"]
  },
  {
    id: 9,
    icon: Goal,
    title: "Estado Parcelario en Ciudad de Buenos Aires (CABA)",
    subtitle: "Certificación catastral obligatoria - Ley 6437",
    description:
      "El Estado Parcelario en la Ciudad Autónoma de Buenos Aires es obligatorio según la Ley de Catastro N° 6437 para actos de constitución, modificación y transmisión de derechos reales. Realizamos la certificación oficial cumpliendo con todos los elementos esenciales: nomenclatura catastral, ubicación georreferenciada, límites del inmueble, medidas, restricciones, tipificación de mejoras y partida inmobiliaria. Nuestro servicio incluye la constitución mediante acto de mensura registrado y la verificación de subsistencia según los plazos establecidos.",
    features: [
      "Certificación conforme a Ley de Catastro N° 6437",
      "Constitución mediante acto de mensura registrado",
      "Elementos esenciales y complementarios del Estado Parcelario",
      "Verificación de subsistencia según plazos vigentes",
      "Certificado del Estado Parcelario otorgado por el Organismo Catastral",
      "Asesoramiento en normativas específicas de CABA"
    ],
    image: "/servicios/certifParcCaba_Página_1.jpg",
    category: "Catastral",
    duration: "3-5 días",
    complexity: "Media",
    highlights: ["Obligatorio", "Oficial", "CABA"]
  },
  {
    id: 2,
    icon: BookCheck,
    title: "Planos de Mensura para División, Unificación, Anexión o Usucapión",
    subtitle: "Medición y documentación oficial",
    description:
      "Este plano es la medición, ubicación y documentación de un inmueble y sus límites conforme a las causas jurídicas que lo originan, es decir, la aplicación del título de propiedad al terreno propiamente dicho. La mensura es la generadora de las parcelas catastrales y constituye la base legal para la identificación precisa de los límites y superficie de cada propiedad.",
    features: [
      "Medición precisa de terrenos",
      "Delimitación de linderos",
      "Documentación técnica completa",
      "Plano catastral oficial",
      "Certificación profesional"
    ],
    image: "/servicios/planos-mensura.jpg",
    category: "Catastral",
    duration: "3-7 días",
    complexity: "Media",
    highlights: ["Preciso", "Oficial", "Completo"]
  },
  {
    id: 3,
    icon: Users,
    title: "Declaraciones Juradas (revalúos)",
    subtitle: "Actualización de valores catastrales",
    description:
      "Servicio especializado en la elaboración de Declaraciones Juradas de Revalúo para la actualización periódica de valores catastrales de inmuebles ante ARBA. A través de un análisis detallado y preciso, determinamos el valor actualizado considerando ubicación, dimensiones, uso del suelo y mejoras realizadas. Estas declaraciones son fundamentales para trámites fiscales, actualizaciones catastrales y procesos legales relacionados con la propiedad.",
    features: [
      "Elaboración de Declaraciones Juradas de Revalúo",
      "Actualización de valores catastrales ante ARBA",
      "Análisis detallado de ubicación, dimensiones y mejoras",
      "Cumplimiento de normativas fiscales vigentes",
      "Asesoramiento fiscal inmobiliario",
      "Gestión ante organismos recaudadores"
    ],
    image: "/servicios/declaraciones-juradas-1.jpg",
    category: "Fiscal",
    duration: "2-5 días",
    complexity: "Media",
    highlights: ["Oficial", "Actualizado", "Fiscal"]
  },
  {
    id: 4,
    icon: Navigation,
    title: "Relevamientos topográficos",
    subtitle: "Mediciones precisas para proyectos",
    description:
      "Realizamos relevamientos planialtimétricos detallados para obras civiles, infraestructura y estudios de terreno, proporcionando mediciones precisas sobre la forma, dimensiones y características del terreno. Utilizamos equipos avanzados como estaciones totales y sistemas GPS/GNSS de alta precisión para garantizar la exactitud de la información recopilada. Estos relevamientos son fundamentales para la planificación y ejecución de proyectos de construcción.",
    features: [
      "Relevamientos planialtimétricos detallados",
      "Mediciones precisas de forma, dimensiones y características",
      "Equipos avanzados: estaciones totales y GPS/GNSS",
      "Aplicación en obras civiles e infraestructura",
      "Estudios técnicos para planificación de proyectos",
      "Cumplimiento con normativas profesionales vigentes"
    ],
    image: "/servicios/EjemploRelevamientoTopografico.jpg",
    category: "Topografía",
    duration: "2-5 días",
    complexity: "Media",
    highlights: ["Preciso", "Tecnología GNSS", "Completo"]
  },
  {
    id: 5,
    icon: Zap,
    title: "Amojonamientos",
    subtitle: "Delimitación física de límites",
    description:
      "Delimitación física y precisa de los límites de una propiedad mediante la colocación de mojones o hitos en sus vértices, estableciendo de manera permanente los linderos del terreno. Este procedimiento es esencial para prevenir disputas de linderos, facilitar la construcción de cercas o muros perimetrales, y asegurar el respeto de las dimensiones legales del inmueble. Realizado con equipos de alta precisión topográfica y conforme a normativas legales.",
    features: [
      "Colocación de mojones oficiales en vértices del terreno",
      "Delimitación física precisa de límites y linderos",
      "Prevención y resolución de conflictos de límites",
      "Equipos de alta precisión topográfica",
      "Acta de amojonamiento conforme a normativas legales",
      "Certificación de límites para seguridad jurídica"
    ],
    image: "/servicios/amojonamientos.jpg",
    category: "Topografía",
    duration: "1-3 días",
    complexity: "Media",
    highlights: ["Preciso", "Oficial", "Seguridad jurídica"]
  },
  {
    id: 8,
    icon: Home,
    title: "Subdivisiones en PH",
    subtitle: "División y modificación de unidades en Propiedad Horizontal",
    description:
      "Servicio especializado en la división y modificación de unidades funcionales dentro del régimen de Propiedad Horizontal. Realizamos planos técnicos precisos para subdividir unidades existentes, unificar espacios, crear nuevas unidades funcionales o complementarias, y actualizar la documentación catastral y registral correspondiente. Este servicio es fundamental para adaptar los espacios a nuevas necesidades, maximizar el aprovechamiento de los inmuebles y cumplir con todas las normativas legales y reglamentos de copropiedad vigentes.",
    features: [
      "Planos técnicos para subdivisión de unidades funcionales",
      "Unificación de unidades existentes",
      "Creación de nuevas unidades funcionales o complementarias",
      "Actualización de documentación catastral y registral",
      "Cumplimiento con reglamentos de copropiedad",
      "Asesoramiento técnico y legal en el proceso"
    ],
    image: "/servicios/subdivisiones.jpg",
    category: "Catastral",
    duration: "5-10 días",
    complexity: "Alta",
    highlights: ["Preciso", "Oficial", "Completo"]
  },
  {
    id: 6,
    icon: Calculator,
    title: "Cálculos de Superficie",
    subtitle: "Determinación precisa de áreas",
    description:
      "Cálculos especializados de superficies para terrenos irregulares, propiedades complejas y proyectos que requieren máxima precisión en la determinación de áreas. Realizamos cálculos detallados considerando todas las irregularidades del terreno, utilizando métodos topográficos avanzados y software especializado para garantizar la exactitud en la medición de áreas cubiertas, semicubiertas y descubiertas.",
    features: [
      "Cálculo de superficies para terrenos irregulares",
      "Análisis detallado de áreas cubiertas y descubiertas",
      "Certificación profesional de superficies",
      "Informe técnico detallado con metodología empleada",
      "Asesoramiento técnico en mediciones de área",
      "Aplicación en proyectos de construcción y división"
    ],
    image: "/servicios/calculos-de-superficie.avif",
    category: "Cálculos",
    duration: "1-2 días",
    complexity: "Media",
    highlights: ["Preciso", "Certificado", "Rápido"]
  },
  {
    id: 7,
    icon: Home,
    title: "Certificados de Dominio",
    subtitle: "Verificación legal de la propiedad",
    description:
      "Certificación oficial que acredita la titularidad dominial de un inmueble, incluyendo la verificación de gravámenes, embargos y restricciones de dominio. Este documento es fundamental para transacciones inmobiliarias, ya que proporciona información detallada sobre el estado jurídico del inmueble, permitiendo verificar que no existan impedimentos legales para su transferencia o transacción.",
    features: [
      "Verificación de titularidad dominial",
      "Análisis completo de gravámenes y embargos",
      "Certificado oficial ante registro de la propiedad",
      "Informe detallado del estado jurídico",
      "Asesoramiento legal en el proceso",
      "Actualización de información catastral"
    ],
    image: "/servicios/amojonamientos.jpg",
    category: "Legal",
    duration: "1-3 días",
    complexity: "Baja",
    highlights: ["Oficial", "Rápido", "Confiable"]
  },
];

export default function ServiciosPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const openImageModal = (imageIndex: number) => {
    setSelectedImageIndex(imageIndex);
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const closeImageModal = () => {
    setSelectedImageIndex(null);
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };



  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRotation(prev => prev + 90);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      setDragStart({ x: clientX - position.x, y: clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (isDragging && zoom > 1) {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      setPosition({
        x: clientX - dragStart.x,
        y: clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleMouseDown(e);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    handleMouseMove(e);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    handleMouseUp();
  };

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        switch (e.key) {
          case 'Escape':
            closeImageModal();
            break;

          case '+':
          case '=':
            e.preventDefault();
            setZoom(prev => Math.min(prev + 0.25, 3));
            break;
          case '-':
            e.preventDefault();
            setZoom(prev => Math.max(prev - 0.25, 0.5));
            break;
          case 'r':
          case 'R':
            setRotation(prev => prev + 90);
            break;
          case '0':
            setZoom(1);
            setRotation(0);
            setPosition({ x: 0, y: 0 });
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  return (
    <>
      {/* Navbar */}
      <Navbar />
      
      <div className="min-h-screen bg-background">
        {/* Header con diseño mejorado */}
        <div className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-background border-b overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4 sm:mb-6 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm sm:text-base">Volver al inicio</span>
            </Link>
            
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="rounded-full py-1.5 sm:py-2 px-4 sm:px-6 border-none mb-3 sm:mb-4 bg-green text-white font-semibold text-xs sm:text-sm shadow-soft">
                Servicios Profesionales
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 sm:mb-4 text-foreground break-words">
                Servicios de Agrimensura
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 sm:mb-6 leading-relaxed break-words max-w-4xl mx-auto">
                Ofrezco soluciones precisas y eficientes en agrimensura, topografía e ingeniería para cada cliente. En cada trabajo aplico precisión, tecnología y conocimiento para garantizar resultados óptimos. Desde mensuras hasta relevamientos avanzados, brindo soluciones confiables para el desarrollo y la gestión de inmuebles y territorios. Con más de 15 años de experiencia en la Provincia de Buenos Aires.
              </p>
              
              {/* Estadísticas */}
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-green mb-1 sm:mb-2">15+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground break-words">Años de Experiencia</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-green mb-1 sm:mb-2">2000+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground break-words">Proyectos Completados</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Servicios con diseño mejorado */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid gap-8 sm:gap-12">
            {services.map((service, index) => (
              <Card key={service.id} className="overflow-hidden border-2 hover:border-green/50 transition-all duration-300 hover:shadow-soft-lg">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Imagen con overlay mejorado */}
                  <div 
                    className="relative h-64 sm:h-80 lg:h-full cursor-pointer group bg-gray-100 overflow-hidden"
                    onClick={() => openImageModal(index)}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="object-cover transition-transform duration-500 group-hover:scale-110 w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 rounded-full p-3 sm:p-4 backdrop-blur-sm">
                        <ZoomIn size={24} className="sm:w-8 sm:h-8 text-gray-700" />
                      </div>
                    </div>
                    
                    {/* Badge de categoría */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                      <Badge className="bg-green/90 text-white border-none text-xs sm:text-sm px-2 sm:px-3 py-1">
                        {service.category}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Contenido mejorado */}
                  <div className="p-4 sm:p-6 lg:p-8 xl:p-12">
                    <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="bg-green/10 p-2 sm:p-3 rounded-modern flex-shrink-0">
                        <service.icon className="text-green w-6 h-6 sm:w-8 sm:h-8" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-headline font-bold mb-1 sm:mb-2 break-words">{service.title}</h2>
                        <p className="text-sm sm:text-base lg:text-lg text-green font-medium mb-2 sm:mb-4 break-words">{service.subtitle}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed break-words">
                      {service.description}
                    </p>
                    
                    {/* Características principales */}
                    <div className="mb-6 sm:mb-8">
                      <div className="space-y-3 sm:space-y-4">
                        <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                          <CheckCircle className="text-green w-4 h-4 sm:w-5 sm:h-5" />
                          Características
                        </h4>
                        <ul className="space-y-1.5 sm:space-y-2">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                              <span className="break-words">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Card de blog para Estado Parcelario Provincia de Buenos Aires */}
                    {service.id === 1 && (
                      <Link href="/blog/todo-sobre-el-estado-parcelario-en-la-provincia-de-buenos-aires" className="block mb-6 sm:mb-8">
                        <Card className="border-green/30 bg-gradient-to-br from-green/5 to-green-light/10 hover:from-green/10 hover:to-green-light/20 transition-all duration-250 hover:shadow-soft hover:border-green/50 cursor-pointer">
                          <CardContent className="p-4 sm:p-5">
                            <div className="flex items-center gap-3 sm:gap-4">
                              <div className="flex-shrink-0 p-2 sm:p-3 bg-green/10 rounded-modern border border-green/20">
                                <BookOpen className="text-green w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-sm sm:text-base text-foreground mb-1">
                                  Lee nuestro blog sobre Estado Parcelario
                                </h4>
                                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                                  Información completa sobre el Estado Parcelario en la Provincia de Buenos Aires
                                </p>
                              </div>
                              <ArrowRight className="text-green w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" strokeWidth={2} />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    )}
                    
                    {/* Card de blog para Estado Parcelario CABA */}
                    {service.id === 9 && (
                      <Link href="/blog/todo-sobre-el-estado-parcelario-en-la-ciudad-autonoma-de-buenos-aires" className="block mb-6 sm:mb-8">
                        <Card className="border-green/30 bg-gradient-to-br from-green/5 to-green-light/10 hover:from-green/10 hover:to-green-light/20 transition-all duration-250 hover:shadow-soft hover:border-green/50 cursor-pointer">
                          <CardContent className="p-4 sm:p-5">
                            <div className="flex items-center gap-3 sm:gap-4">
                              <div className="flex-shrink-0 p-2 sm:p-3 bg-green/10 rounded-modern border border-green/20">
                                <BookOpen className="text-green w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-sm sm:text-base text-foreground mb-1">
                                  Lee nuestro blog sobre Estado Parcelario
                                </h4>
                                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                                  Información completa sobre el Estado Parcelario en la Ciudad Autónoma de Buenos Aires
                                </p>
                              </div>
                              <ArrowRight className="text-green w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" strokeWidth={2} />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    )}
                    
                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
                      {service.highlights.map((highlight, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-green/10 text-green border-green/20 text-xs px-2 py-1">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Botones de acción */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <Button asChild size="lg" className="flex-1 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 bg-green hover:bg-green-300 text-white">
                        <Link href="/contacto">
                          Solicitar Presupuesto
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="lg" className="text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 border-green/30 hover:border-green text-green">
                        <Link href={`tel:+5491167058156`}>
                          <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          Llamar
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer original */}
      <Footer />

      {/* Modal mejorado para imagen grande */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-300"
          onClick={closeImageModal}
        >
          {/* Controles superiores - Z-index alto para estar siempre arriba */}
          <div 
            className="absolute top-2 sm:top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 sm:gap-4 bg-black/50 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 text-white z-[60] max-w-[90vw] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleZoomOut}
              className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors"
              title="Zoom Out (-)"
            >
              <ZoomOut size={16} className="sm:w-5 sm:h-5" />
            </button>
            <span className="text-xs sm:text-sm font-medium min-w-[40px] sm:min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors"
              title="Zoom In (+)"
            >
              <ZoomIn size={16} className="sm:w-5 sm:h-5" />
            </button>
            <div className="w-px h-4 sm:h-6 bg-white/30 mx-1 sm:mx-2"></div>
            <button
              onClick={handleRotate}
              className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors"
              title="Rotate (R)"
            >
              <RotateCcw size={16} className="sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors"
              title="Reset (0)"
            >
              <span className="text-xs sm:text-sm font-bold">⟲</span>
            </button>
          </div>

          {/* Botón cerrar - Z-index alto */}
          <button
            onClick={closeImageModal}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white hover:text-gray-300 transition-colors z-[60] bg-black/50 backdrop-blur-sm rounded-full p-2"
            title="Close (ESC)"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>



          {/* Contenedor de imagen - Z-index más bajo */}
          <div className="relative max-w-[95vw] max-h-[95vh] mt-16 z-10">
            <div 
              className="relative w-full h-full cursor-grab active:cursor-grabbing touch-none"
              style={{
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                WebkitTouchCallout: 'none',
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
                             <img
                 src={services[selectedImageIndex].image}
                 alt={services[selectedImageIndex].title}
                 className="max-w-full max-h-[80vh] object-contain rounded-lg"
                 style={{
                   transform: `scale(${zoom}) rotate(${rotation}deg) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                   transformOrigin: 'center center',
                   willChange: 'transform',
                   backfaceVisibility: 'hidden',
                   perspective: '1000px',
                   imageRendering: 'crisp-edges',
                 }}
                 onClick={(e: React.MouseEvent) => e.stopPropagation()}
               />
            </div>
          </div>



          {/* Atajos de teclado - Z-index alto */}
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-xs opacity-0 hover:opacity-100 transition-opacity z-[60]">
            <div>+ - Zoom</div>
            <div>R Rotar</div>
            <div>0 Reset</div>
            <div>ESC Cerrar</div>
          </div>
        </div>
      )}
      <ScrollToTop />
    </>
  );
}
