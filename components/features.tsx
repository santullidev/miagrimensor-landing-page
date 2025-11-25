"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  BookCheck,
  Navigation,
  Goal,
  Users,
  Zap,
  Home,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const features = [
  {
    icon: Goal,
    title: "Estado Parcelario en la Provincia de Buenos Aires",
    description:
      "El Estado Parcelario en la Provincia de Buenos Aires es obligatorio según la Ley 10.707/94 al momento de una venta, hipoteca o cualquier acto de transmisión de derechos reales. Realizamos la certificación oficial de medidas y límites del inmueble, verificación de documentación catastral ante ARBA e informe técnico completo para escrituración. Nuestro servicio incluye relevamiento técnico, generación del plano georreferenciado, registro en el Catastro y obtención de la cédula catastral.",
    image: "/servicios/estados-parcelarios-1.jpg",
  },
  {
    icon: Goal,
    title: "Estado Parcelario en Ciudad de Buenos Aires (CABA)",
    description:
      "El Estado Parcelario en la Ciudad Autónoma de Buenos Aires es obligatorio según la Ley de Catastro N° 6437 para actos de constitución, modificación y transmisión de derechos reales. Realizamos la certificación oficial cumpliendo con todos los elementos esenciales: nomenclatura catastral, ubicación georreferenciada, límites del inmueble, medidas, restricciones, tipificación de mejoras y partida inmobiliaria. Nuestro servicio incluye la constitución mediante acto de mensura registrado y verificación de subsistencia según plazos establecidos.",
    image: "/servicios/certifParcCaba_Página_1.jpg",
  },
  {
    icon: BookCheck,
    title: "Planos de Mensura para División, Unificación, Anexión o Usucapión",
    description:
      "Este plano es la medición, ubicación y documentación de un inmueble y sus límites conforme a las causas jurídicas que lo originan, es decir, la aplicación del título de propiedad al terreno propiamente dicho. La mensura es la generadora de las parcelas catastrales.",
    image: "/servicios/planos-mensura.jpg",
  },
  {
    icon: Users,
    title: "Declaraciones Juradas (revalúos)",
    description:
      "Servicio especializado en la elaboración de Declaraciones Juradas de Revalúo para la actualización periódica de valores catastrales de inmuebles. A través de un análisis detallado y preciso, determinamos el valor actualizado considerando ubicación, dimensiones, uso del suelo y mejoras realizadas. Estas declaraciones son fundamentales para trámites fiscales ante ARBA, actualizaciones catastrales y procesos legales relacionados con la propiedad, asegurando el cumplimiento de normativas vigentes.",
    image: "/servicios/declaraciones-juradas-1.jpg",
  },
  {
    icon: Navigation,
    title: "Relevamientos topográficos",
    description:
      "Realizamos relevamientos planialtimétricos detallados para obras civiles, infraestructura y estudios de terreno, proporcionando mediciones precisas sobre la forma, dimensiones y características del terreno. Utilizamos equipos avanzados como estaciones totales y sistemas GPS/GNSS de alta precisión para garantizar la exactitud de la información recopilada. Estos relevamientos son fundamentales para la planificación y ejecución de proyectos de construcción, delimitación de propiedades y estudios técnicos, cumpliendo con normativas profesionales vigentes.",
    image: "/servicios/EjemploRelevamientoTopografico.jpg",
  },
  {
    icon: Zap,
    title: "Amojonamientos",
    description:
      "Delimitación física y precisa de los límites de una propiedad mediante la colocación de mojones o hitos en sus vértices, estableciendo de manera permanente los linderos del terreno. Este procedimiento es esencial para prevenir disputas de linderos, facilitar la construcción de cercas o muros perimetrales, y asegurar el respeto de las dimensiones legales del inmueble. Realizado con equipos de alta precisión topográfica y conforme a normativas legales, proporcionando seguridad jurídica y claridad en la extensión de su propiedad.",
    image: "/servicios/amojonamientos.jpg",
  },
  {
    icon: Home,
    title: "Subdivisiones en PH",
    description:
      "Servicio especializado en la división y modificación de unidades funcionales dentro del régimen de Propiedad Horizontal. Realizamos planos técnicos precisos para subdividir unidades existentes, unificar espacios, crear nuevas unidades funcionales o complementarias, y actualizar la documentación catastral y registral correspondiente. Este servicio es fundamental para adaptar los espacios a nuevas necesidades, maximizar el aprovechamiento de los inmuebles y cumplir con todas las normativas legales y reglamentos de copropiedad vigentes.",
    image: "/servicios/subdivisiones.jpg",
  },
];

const Features = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  
  // Límite de caracteres basado en "Estados Parcelarios" (253) y "Planos de Mensura" (272)
  // Usamos 275 para asegurar que estas descripciones de referencia no se trunquen
  const MAX_DESCRIPTION_LENGTH = 275;
  
  const toggleCardExpansion = (index: number) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };
  
  const getTruncatedDescription = (description: string, index: number) => {
    if (description.length <= MAX_DESCRIPTION_LENGTH) {
      return { text: description, needsExpansion: false };
    }
    
    const isExpanded = expandedCards.has(index);
    if (isExpanded) {
      return { text: description, needsExpansion: true };
    }
    
    // Encontrar el último espacio antes del límite para no cortar palabras
    const truncated = description.substring(0, MAX_DESCRIPTION_LENGTH);
    const lastSpace = truncated.lastIndexOf(' ');
    const text = lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated;
    
    return { text: text + '...', needsExpansion: true };
  };

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
        className="max-w-7xl mx-auto w-full py-16 xs:py-24 px-4 sm:px-6"
      >
        {/* Elegant Header with green Accents */}
        <div className="text-center mb-16 xs:mb-20 relative">
          {/* Decorative green line above title */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-green to-transparent"></div>
            <div className="mx-4 w-2 h-2 rounded-full bg-green"></div>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-green to-transparent"></div>
          </div>
          
          <h2 className="text-3xl xs:text-4xl md:text-5xl lg:text-[3.5rem] md:leading-[3.5rem] font-headline font-bold tracking-tight mb-6 break-words text-foreground">
            SERVICIOS DE AGRIMENSURA Y TOPOGRAFIA
          </h2>
          <p className="text-base sm:text-lg font-body leading-relaxed mb-10 max-w-2xl mx-auto text-foreground/75">
            Soluciones precisas en agrimensura y topografía con tecnología avanzada. En cada proyecto aplico precisión, tecnología y conocimiento para garantizar resultados óptimos en mensuras, relevamientos y gestión de inmuebles.
          </p>
          
          <Link 
            href="/servicios"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-modern border-2 border-green/30 hover:border-green bg-background hover:bg-green/5 text-green hover:text-green-300 transition-all duration-300 font-medium text-sm tracking-wide group/link"
          >
            <span>Ver todos los servicios</span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
        
        {/* Elegant Cards Grid with green Borders - Better Proportions */}
        <div className="mt-8 xs:mt-12 w-full mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="flex flex-col border-2 border-green/30 rounded-modern-lg overflow-hidden shadow-soft hover:shadow-soft-lg hover:border-green/60 focus:shadow-soft-lg focus-within:shadow-soft-lg focus:border-green/60 transition-all duration-300 group bg-gradient-to-br from-green-light/20 via-background to-cream/50 hover:from-green-light/30 hover:via-background hover:to-cream/60 relative backdrop-blur-sm"
              tabIndex={0}
            >
              {/* green accent corner decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green/0 via-green/5 to-green/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-bl-full"></div>
              
              {/* Imagen arriba - mejor proporción horizontal con fondo oscuro para contraste */}
              <CardContent className="p-0 relative">
                <div 
                  className="relative w-full aspect-[4/3] overflow-hidden cursor-pointer bg-gradient-to-br from-green/10 via-muted to-green/5 border-b-2 border-green/30 group-hover:border-green/50 transition-all duration-300 shadow-inner"
                  onClick={() => openImageModal(index)}
                >
                  {/* Fondo base para contraste con imágenes blancas */}
                  <div className="absolute inset-0 bg-gradient-to-br from-foreground/12 via-green/10 to-foreground/10 z-0"></div>
                  {/* Contenedor de imagen con filtro para mejor contraste */}
                  <div className="relative z-10 w-full h-full">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="object-cover transition-transform duration-500 group-hover:scale-105 w-full h-full"
                      style={{ filter: 'brightness(0.98) contrast(1.05)' }}
                    />
                  </div>
                  {/* Overlay elegante en hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>
                  <div className="absolute inset-0 bg-green/0 group-hover:bg-green/5 transition-colors duration-300 flex items-center justify-center z-30">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/95 rounded-full p-2.5 border-2 border-green/40 shadow-soft-lg scale-90 group-hover:scale-100 backdrop-blur-sm">
                      <ZoomIn size={18} className="text-green-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardHeader className="cursor-pointer p-5 sm:p-6 relative z-10 flex-1 flex flex-col bg-background/80 backdrop-blur-sm" onClick={() => window.location.href = '/servicios'}>
                {/* Icon with green accent */}
                <div className="mb-3 w-10 h-10 rounded-modern bg-gradient-to-br from-green/15 to-green/25 flex items-center justify-center group-hover:from-green/25 group-hover:to-green/35 transition-all duration-300 shadow-sm border border-green/20">
                  <feature.icon className="text-green-600 w-5 h-5 group-hover:text-green-700 transition-colors duration-300" />
                </div>
                
                <h4 className="mt-2! text-lg sm:text-xl font-headline font-bold tracking-tight group-hover:text-green group-focus:text-green transition-colors duration-300 break-words mb-3">
                  {feature.title}
                </h4>
                
                <div className="mt-1 flex-1">
                  {(() => {
                    const { text, needsExpansion } = getTruncatedDescription(feature.description, index);
                    const isExpanded = expandedCards.has(index);
                    
                    return (
                      <>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed group-hover:text-foreground/80 group-focus:text-foreground/80 transition-colors duration-300 break-words">
                          {text}
                        </p>
                        {needsExpansion && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCardExpansion(index);
                            }}
                            className="mt-2 flex items-center gap-1 text-green hover:text-green-300 text-xs sm:text-sm font-medium transition-colors duration-200 group/expand"
                          >
                            {isExpanded ? (
                              <>
                                <span>Ver menos</span>
                                <ChevronUp size={14} className="transition-transform duration-200" />
                              </>
                            ) : (
                              <>
                                <span>Ver más</span>
                                <ChevronDown size={14} className="transition-transform duration-200" />
                              </>
                            )}
                          </button>
                        )}
                      </>
                    );
                  })()}
                </div>
                
                {/* Elegant CTA */}
                <div className="flex items-center gap-2 text-green-600 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-300 mt-4 pt-3 border-t border-green/30 group-hover:border-green/50">
                  <span className="text-xs sm:text-sm font-medium tracking-wide">Ver más detalles</span>
                  <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </CardHeader>
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
