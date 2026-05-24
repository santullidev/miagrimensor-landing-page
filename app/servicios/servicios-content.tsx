"use client"

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, X, ZoomIn, ZoomOut, RotateCcw, ArrowRight,
  CheckCircle, Phone, BookOpen,
  BookCheck, Navigation, Goal, Users, Zap, Home, Calculator,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { SanityService, SiteSettings } from "@/sanity/lib/types";

import { SanityPortableText } from "@/components/portable-text";

import ImageLightbox from "@/components/image-lightbox";

const iconMap: Record<string, any> = { BookCheck, Navigation, Goal, Users, Zap, Home, Calculator };

interface ServiciosContentProps {
  services: SanityService[]
  settings: SiteSettings
}

export default function ServiciosContent({ services, settings }: ServiciosContentProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openImageModal = (i: number) => { setSelectedImageIndex(i); };
  const closeImageModal = () => { setSelectedImageIndex(null); };

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-background border-b overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4 sm:mb-6 group">
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
                Ofrezco soluciones precisas y eficientes en agrimensura, topografía e ingeniería para cada cliente.
              </p>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-green mb-1 sm:mb-2">{settings.yearsExperience}+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Años de Experiencia</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-green mb-1 sm:mb-2">{settings.projectsCompleted}+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Proyectos Completados</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services list */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid gap-8 sm:gap-12">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.iconName] || Goal;
              return (
                <Card key={service._id} className="overflow-hidden border-2 hover:border-green/50 transition-all duration-300 hover:shadow-soft-lg">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div 
                      className="relative h-64 sm:h-80 lg:h-full cursor-pointer group bg-gray-100 overflow-hidden"
                      onClick={() => openImageModal(index)}
                    >
                      <img src={service.imageUrl} alt={service.title} className="object-cover transition-transform duration-500 group-hover:scale-110 w-full h-full" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 rounded-full p-3 sm:p-4 backdrop-blur-sm"><ZoomIn size={24} className="sm:w-8 sm:h-8 text-gray-700" /></div>
                      </div>
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                        <Badge className="bg-green/90 text-white border-none text-xs sm:text-sm px-2 sm:px-3 py-1">{service.category}</Badge>
                      </div>
                    </div>
                    
                    <div className="p-4 sm:p-6 lg:p-8 xl:p-12">
                      <Link href={`/servicios/${service.slug || ""}`} className="block">
                        <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                          <div className="bg-green/10 p-2 sm:p-3 rounded-modern flex-shrink-0">
                            <IconComponent className="text-green w-6 h-6 sm:w-8 sm:h-8" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-headline font-bold mb-1 sm:mb-2 break-words">{service.title}</h2>
                            <p className="text-sm sm:text-base lg:text-lg text-green font-medium mb-2 sm:mb-4 break-words">{service.subtitle}</p>
                          </div>
                        </div>
                        <div className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed break-words line-clamp-3">
                          {Array.isArray(service.description) ? (
                            <SanityPortableText value={service.description} />
                          ) : (
                            service.description
                          )}
                        </div>
                      </Link>

                      <div className="mb-6 sm:mb-8">
                        <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2 mb-3"><CheckCircle className="text-green w-4 h-4 sm:w-5 sm:h-5" /> Características</h4>
                        <ul className="space-y-1.5 sm:space-y-2">
                          {(service.features || []).slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                              <span className="break-words">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Related blog post from Sanity */}
                      {service.relatedBlogPost && (
                        <Link href={`/blog/${service.relatedBlogPost?.slug || ""}`} className="block mb-6 sm:mb-8">
                          <Card className="border-green/30 bg-gradient-to-br from-green/5 to-green-light/10 hover:from-green/10 hover:to-green-light/20 transition-all duration-250 hover:shadow-soft hover:border-green/50 cursor-pointer">
                            <CardContent className="p-4 sm:p-5">
                              <div className="flex items-center gap-3 sm:gap-4">
                                <div className="flex-shrink-0 p-2 sm:p-3 bg-green/10 rounded-modern border border-green/20">
                                  <BookOpen className="text-green w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-1">Lee nuestro blog</h4>
                                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{service.relatedBlogPost.title}</p>
                                </div>
                                <ArrowRight className="text-green w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" strokeWidth={2} />
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      )}

                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
                        {(service.highlights || []).map((highlight, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-green/10 text-green border-green/20 text-xs px-2 py-1">{highlight}</Badge>
                        ))}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <Button asChild size="lg" className="flex-1 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 bg-green hover:bg-green-300 text-white">
                          <Link href="/contacto">Solicitar Presupuesto <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" /></Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 border-green/30 hover:border-green text-green">
                          <Link href={`tel:${settings.phoneHref || ""}`}><Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> Llamar</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <ImageLightbox 
          imageUrl={services[selectedImageIndex].imageUrl}
          title={services[selectedImageIndex].title}
          onClose={closeImageModal}
        />
      )}
    </>
  );
}
