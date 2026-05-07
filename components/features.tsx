"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChevronDown, ChevronUp, ZoomIn, ArrowRight,
  BookCheck, Navigation, Goal, Users, Zap, Home, Calculator,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn, portableTextToPlainText } from "@/lib/utils";
import type { SanityService } from "@/sanity/lib/types";
import ImageLightbox from "./image-lightbox";

// Map de string a componente Lucide
const iconMap: Record<string, any> = {
  BookCheck, Navigation, Goal, Users, Zap, Home, Calculator,
};

interface FeaturesProps {
  services: SanityService[]
}

const Features = ({ services }: FeaturesProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  
  const MAX_DESCRIPTION_LENGTH = 275;
  
  const toggleCardExpansion = (index: number) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) newSet.delete(index);
      else newSet.add(index);
      return newSet;
    });
  };
  
  const getTruncatedDescription = (description: any, index: number) => {
    const plainText = typeof description === 'string' ? description : portableTextToPlainText(description);
    if (plainText.length <= MAX_DESCRIPTION_LENGTH) return { text: plainText, needsExpansion: false };
    const isExpanded = expandedCards.has(index);
    if (isExpanded) return { text: plainText, needsExpansion: true };
    const truncated = plainText.substring(0, MAX_DESCRIPTION_LENGTH);
    const lastSpace = truncated.lastIndexOf(' ');
    return { text: (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + '...', needsExpansion: true };
  };

  return (
    <>
      <div id="features" className="max-w-7xl mx-auto w-full py-16 xs:py-24 px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16 xs:mb-20 relative">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-green to-transparent"></div>
            <div className="mx-4 w-2 h-2 rounded-full bg-green"></div>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-green to-transparent"></div>
          </div>
          <h2 className="text-3xl xs:text-4xl md:text-5xl lg:text-[3.5rem] md:leading-[3.5rem] font-headline font-bold tracking-tight mb-6 break-words text-foreground uppercase">
            SERVICIOS DE AGRIMENSURA Y TOPOGRAFIA
          </h2>
          <p className="text-base sm:text-lg font-body leading-relaxed mb-10 max-w-2xl mx-auto text-foreground/75">
            Soluciones precisas en agrimensura y topografía con tecnología avanzada.
          </p>
          <Link 
            href="/servicios"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-modern border-2 border-green/30 hover:border-green bg-background hover:bg-green/5 text-green hover:text-green-300 transition-all duration-300 font-medium text-sm tracking-wide group/link"
          >
            <span>Ver todos los servicios</span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
        
        {/* Cards Grid */}
        <div className="mt-8 xs:mt-12 w-full mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Goal;
            return (
              <Card
                key={service._id || `service-${index}`}
                className="flex flex-col border-2 border-green/30 rounded-modern-lg overflow-hidden shadow-soft hover:shadow-soft-lg hover:border-green/60 transition-all duration-300 group bg-gradient-to-br from-green-light/20 via-background to-cream/50 hover:from-green-light/30 hover:via-background hover:to-cream/60 relative backdrop-blur-sm"
                tabIndex={0}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green/0 via-green/5 to-green/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-bl-full"></div>
                
                <CardContent className="p-0 relative">
                  <div 
                    className="relative w-full aspect-[4/3] overflow-hidden cursor-pointer bg-gradient-to-br from-green/10 via-muted to-green/5 border-b-2 border-green/30 group-hover:border-green/50 transition-all duration-300 shadow-inner"
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-foreground/12 via-green/10 to-foreground/10 z-0"></div>
                    <div className="relative z-10 w-full h-full">
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="object-cover transition-transform duration-500 group-hover:scale-105 w-full h-full"
                        style={{ filter: 'brightness(0.98) contrast(1.05)' }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>
                    <div className="absolute inset-0 bg-green/0 group-hover:bg-green/5 transition-colors duration-300 flex items-center justify-center z-30">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/95 rounded-full p-2.5 border-2 border-green/40 shadow-soft-lg scale-90 group-hover:scale-100 backdrop-blur-sm">
                        <ZoomIn size={18} className="text-green-600" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardHeader className="cursor-pointer p-5 sm:p-6 relative z-10 flex-1 flex flex-col bg-background/80 backdrop-blur-sm">
                  <Link href={`/servicios/${service.slug || ""}`} className="flex-1 flex flex-col">
                    <div className="mb-3 w-10 h-10 rounded-modern bg-gradient-to-br from-green/15 to-green/25 flex items-center justify-center group-hover:from-green/25 group-hover:to-green/35 transition-all duration-300 shadow-sm border border-green/20">
                      <IconComponent className="text-green-600 w-5 h-5 group-hover:text-green-700 transition-colors duration-300" />
                    </div>
                    <h4 className="mt-2! text-lg sm:text-xl font-headline font-bold tracking-tight group-hover:text-green group-focus:text-green transition-colors duration-300 break-words mb-3">
                      {service.title}
                    </h4>
                    <div className="mt-1 flex-1">
                      {(() => {
                        const { text, needsExpansion } = getTruncatedDescription(service.description, index);
                        const isExpanded = expandedCards.has(index);
                        return (
                          <>
                            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed group-hover:text-foreground/80 transition-colors duration-300 break-words">
                              {text}
                            </p>
                            {needsExpansion && (
                              <button
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleCardExpansion(index); }}
                                className="mt-2 flex items-center gap-1 text-green hover:text-green-300 text-xs sm:text-sm font-medium transition-colors duration-200"
                              >
                                <span>{isExpanded ? 'Ver menos' : 'Ver más'}</span>
                                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                              </button>
                            )}
                          </>
                        );
                      })()}
                    </div>
                    <div className="flex items-center gap-2 text-green-600 opacity-0 group-hover:opacity-100 transition-all duration-300 mt-4 pt-3 border-t border-green/30 group-hover:border-green/50">
                      <span className="text-xs sm:text-sm font-medium tracking-wide">Ver más detalles</span>
                      <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>

      {selectedImageIndex !== null && (
        <ImageLightbox 
          imageUrl={services[selectedImageIndex].imageUrl} 
          title={services[selectedImageIndex].title} 
          onClose={() => setSelectedImageIndex(null)} 
        />
      )}
    </>
  );
};

export default Features;
