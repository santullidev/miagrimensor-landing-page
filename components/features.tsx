"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  BookCheck,
  BarChart3,
  FolderSync,
  Goal,
  Users,
  Zap,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const features = [
  {
    icon: Goal,
    title: "Estados Parcelarios",
    description:
      "El Estado Parcelario - también conocido como cédula catastral - es la tarea que realiza un Agrimensor al momento de una venta o hipoteca de un inmueble. Como establece la Ley 10.707 esta tarea o trámite es obligatorio en la Provincia de Buenos Aires.",
    image: "/servicios/estados-parcelarios-1.jpg",
  },
  {
    icon: BookCheck,
    title: "Planos de Mensura",
    description:
      "Este plano es la medición, ubicación y documentación de un inmueble y sus límites conforme a las causas jurídicas que lo originan, es decir, la aplicación del título de propiedad al terreno propiamente dicho. La mensura es la generadora de las parcelas catastrales.",
    image: "/servicios/planos-mensura.jpg",
  },
  {
    icon: BarChart3,
    title: "Subdivisiones urbanas y rurales",
    description:
      "El agrimensor realiza el plano de Subdivisiones que genera y determina derechos sobre un edificio con multiples viviendas, locales y cocheras que han sido adquiridos por distintos propietarios en forma separada pero que tienen ciertos derechos y obligaciones en común. ",
    image: "/servicios/subdivisiones.jpg",
  },
  {
    icon: Users,
    title: "Declaraciones Juradas (revalúos)",
    description:
      "Loremipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/servicios/declaraciones-juradas-1.jpg",
  },
  {
    icon: FolderSync,
    title: "Urbanizaciones – Loteos",
    description:
      "Loremipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/servicios/urbanizaciones.jpg",
  },
  {
    icon: Zap,
    title: "Amojonamientos",
    description:
      "Loremipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/servicios/amojonamientos.jpg",
  },
];

const Features = () => {
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
      <div
        id="features"
        className="max-w-7xl mx-auto w-full py-12 xs:py-20 px-4 sm:px-6"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl xs:text-4xl md:text-5xl md:leading-[3.5rem] font-bold tracking-tight mb-4 break-words">
            SERVICIOS DE AGRIMENSURA<br />
            Servicios principales
          </h2>
          <Link 
            href="/servicios"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Ver todos los servicios
            <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="mt-8 xs:mt-14 w-full mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-10 gap-y-8 sm:gap-y-12">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="flex flex-col border rounded-xl overflow-hidden shadow-none hover:shadow-lg focus:shadow-lg focus-within:shadow-lg transition-all duration-300 group p-1"
              tabIndex={0}
            >
              <CardHeader className="cursor-pointer p-4 sm:p-6" onClick={() => window.location.href = '/servicios'}>
                <feature.icon className="text-primary" />
                <h4 className="mt-3! text-xl font-bold tracking-tight group-hover:text-primary group-focus:text-primary transition-colors break-words">
                  {feature.title}
                </h4>
                <p className="mt-1 text-muted-foreground text-sm xs:text-[17px] group-hover:text-foreground/80 group-focus:text-foreground/80 transition-colors break-words">
                  {feature.description}
                </p>
                <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity mt-2">
                  <span className="text-sm font-medium">Ver más detalles</span>
                  <ArrowRight size={14} />
                </div>
              </CardHeader>
              <CardContent className="mt-auto px-0 pb-0">
                <div 
                  className="relative h-52 ml-4 sm:ml-6 rounded-tl-xl overflow-hidden cursor-pointer bg-gray-100"
                  onClick={() => openImageModal(index)}
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="object-cover transition-transform duration-300 group-hover:scale-105 group-focus:scale-105 w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 group-focus:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2">
                      <ZoomIn size={24} className="text-gray-700" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

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
                 src={features[selectedImageIndex].image}
                 alt={features[selectedImageIndex].title}
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
    </>
  );
};

export default Features;
