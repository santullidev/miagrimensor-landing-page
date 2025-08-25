"use client"

import { Card } from "@/components/ui/card";
import {
  BookCheck,
  BarChart3,
  FolderSync,
  Goal,
  Users,
  Zap,
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar/navbar";
import ScrollToTop from "@/components/scroll-to-top";

const services = [
  {
    icon: Goal,
    title: "Estados Parcelarios",
    description:
      "El Estado Parcelario - también conocido como cédula catastral - es la tarea que realiza un Agrimensor al momento de una venta o hipoteca de un inmueble. Como establece la Ley 10.707 esta tarea o trámite es obligatorio en la Provincia de Buenos Aires.",
    details: [
      "Certificación de medidas y límites del inmueble",
      "Verificación de documentación catastral",
      "Informe técnico para escrituración",
      "Cumplimiento de normativas provinciales",
      "Asesoramiento legal en el proceso"
    ],
    image: "/servicios/estados-parcelarios-1.jpg",
  },
  {
    icon: BookCheck,
    title: "Planos de Mensura",
    description:
      "Este plano es la medición, ubicación y documentación de un inmueble y sus límites conforme a las causas jurídicas que lo originan, es decir, la aplicación del título de propiedad al terreno propiamente dicho. La mensura es la generadora de las parcelas catastrales.",
    details: [
      "Medición precisa de terrenos",
      "Delimitación de linderos",
      "Documentación técnica completa",
      "Plano catastral oficial",
      "Certificación profesional"
    ],
    image: "/servicios/planos-mensura.jpg",
  },
  {
    icon: BarChart3,
    title: "Subdivisiones urbanas y rurales",
    description:
      "El agrimensor realiza el plano de Subdivisiones que genera y determina derechos sobre un edificio con multiples viviendas, locales y cocheras que han sido adquiridos por distintos propietarios en forma separada pero que tienen ciertos derechos y obligaciones en común.",
    details: [
      "División de propiedades horizontales",
      "Reglamento de copropiedad",
      "Plano de subdivisión oficial",
      "Asesoramiento en propiedad horizontal",
      "Gestión ante organismos oficiales"
    ],
    image: "/servicios/subdivisiones.jpg",
  },
  {
    icon: Users,
    title: "Declaraciones Juradas (revalúos)",
    description:
      "Servicio especializado en la actualización de valores catastrales y declaraciones juradas para inmuebles, asegurando el cumplimiento de las normativas fiscales vigentes.",
    details: [
      "Actualización de valores catastrales",
      "Declaraciones juradas de bienes",
      "Asesoramiento fiscal inmobiliario",
      "Gestión ante organismos recaudadores",
      "Optimización de cargas impositivas"
    ],
    image: "/servicios/declaraciones-juradas-1.jpg",
  },
  {
    icon: FolderSync,
    title: "Urbanizaciones – Loteos",
    description:
      "Desarrollo integral de proyectos urbanísticos y loteos, desde la planificación inicial hasta la aprobación final, cumpliendo con todas las normativas urbanísticas y ambientales.",
    details: [
      "Planificación urbanística completa",
      "Aprobación de loteos",
      "Infraestructura y servicios",
      "Normativas urbanísticas",
      "Gestión ambiental"
    ],
    image: "/servicios/urbanizaciones.jpg",
  },
  {
    icon: Zap,
    title: "Amojonamientos",
    description:
      "Servicio de delimitación física de terrenos mediante la colocación de mojones y marcación de límites, esencial para resolver conflictos de linderos y establecer claramente la propiedad.",
    details: [
      "Colocación de mojones oficiales",
      "Delimitación de linderos",
      "Resolución de conflictos de límites",
      "Acta de amojonamiento",
      "Certificación de límites"
    ],
    image: "/servicios/amojonamientos.jpg",
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
              Servicios de Agrimensura
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Servicios profesionales integrales de agrimensura para particulares, empresas e instituciones. 
              Más de 15 años de experiencia en la Provincia de Buenos Aires.
            </p>
          </div>
        </div>

        {/* Servicios */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid gap-8">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Imagen */}
                  <div 
                    className="relative h-64 md:h-full cursor-pointer group bg-gray-100"
                    onClick={() => openImageModal(index)}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="object-cover transition-transform duration-300 group-hover:scale-105 w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2">
                        <ZoomIn size={24} className="text-gray-700" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Contenido */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <service.icon className="text-primary" size={24} />
                      <h2 className="text-2xl font-bold">{service.title}</h2>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg">Incluye:</h3>
                      <ul className="space-y-2">
                        {service.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
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
