"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ZoomIn, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Full pool of images to rotate through
const allImages = [
  { src: "/assets/trabajo/barrio_privado_1.jpeg", alt: "Relevamiento en barrio privado" },
  { src: "/assets/trabajo/barrio_privado_2.jpeg", alt: "Infraestructura en barrio cerrado" },
  { src: "/assets/trabajo/campo_1.jpeg", alt: "Medición de campo extensivo" },
  { src: "/assets/trabajo/campo_2.jpeg", alt: "Topografía rural" },
  { src: "/assets/trabajo/campo_3.jpeg", alt: "Agrimensura rural" },
  { src: "/assets/trabajo/campo_4.jpeg", alt: "Trabajo de campo" },
  { src: "/assets/trabajo/costa_1.jpeg", alt: "Relevamiento costero" },
  { src: "/assets/trabajo/costa_2.jpeg", alt: "Medición en zona de costa" },
  { src: "/assets/trabajo/costa_3.jpeg", alt: "Topografía de ribera" },
  { src: "/assets/trabajo/costa_4.jpeg", alt: "Obras civiles en costa" },
  { src: "/assets/trabajo/costa_5.jpeg", alt: "Proyecto costero" },
  { src: "/assets/trabajo/costa_6.jpeg", alt: "Agrimensura en zona costera" },
  { src: "/assets/trabajo/costa_7.jpeg", alt: "Relevamiento de terreno costero" },
  { src: "/assets/trabajo/costa_8.jpeg", alt: "Detalle de medición en costa" },
  { src: "/assets/trabajo/costa_9.jpeg", alt: "Trabajo técnico en costa" },
  { src: "/assets/trabajo/costa_10.jpeg", alt: "Vista panorámica costera" },
  { src: "/assets/trabajo/edificio_1.jpeg", alt: "Obra en edificio vertical" },
  { src: "/assets/trabajo/edificio_2.jpeg", alt: "Medición de estructura edilicia" },
  { src: "/assets/trabajo/lote_1.jpeg", alt: "Amojonamiento de lote" },
  { src: "/assets/trabajo/lote_6.jpeg", alt: "Mensura de lote urbano" },
];

// Initial layout configuration
const initialLayout = [
  { className: "md:col-span-2 md:row-span-2 h-[300px] md:h-[600px]" },
  { className: "md:col-span-1 md:row-span-1 h-[300px]" },
  { className: "md:col-span-1 md:row-span-1 h-[300px]" },
  { className: "md:col-span-1 h-[300px]" },
  { className: "md:col-span-1 h-[300px]" },
  { className: "md:col-span-1 h-[300px]" },
  { className: "md:col-span-2 h-[300px]" },
  { className: "md:col-span-1 h-[300px]" },
];

export default function WorkGallery({ className }: { className?: string }) {
  const [visibleImages, setVisibleImages] = useState(() => {
    // Initial selection
    const images = [];
    for (let i = 0; i < initialLayout.length; i++) {
      images.push({
        ...initialLayout[i],
        image: allImages[i % allImages.length],
        id: `slot-${i}-${Date.now()}`
      });
    }
    return images;
  });

  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleImages((currentImages) => {
        const newImages = [...currentImages];

        // 1. Pick a random slot to change
        const slotToChange = Math.floor(Math.random() * newImages.length);

        // 2. Get currently visible URLs to avoid duplicates in the same view (optional but good)
        const currentUrls = new Set(newImages.map(img => img.image.src));

        // 3. Find available images (not currently displayed)
        // If pool is small, might need to relax this, but we have 15 images and 8 slots.
        const availableImages = allImages.filter(img => !currentUrls.has(img.src));

        if (availableImages.length > 0) {
          // 4. Pick a random new image
          const newImage = availableImages[Math.floor(Math.random() * availableImages.length)];

          // 5. Update the slot
          newImages[slotToChange] = {
            ...newImages[slotToChange],
            image: newImage,
            id: `slot-${slotToChange}-${Date.now()}` // Force re-render for animation
          };
        }

        return newImages;
      });
    }, 3500); // Change image every 3.5 seconds for a relaxed pace

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxImage && e.key === "Escape") {
        setLightboxImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImage]);

  const openLightbox = (src: string) => {
    setLoadingImage(true);
    setLightboxImage(src);
  };

  return (
    <section className={cn("bg-background py-16 xs:py-24 overflow-hidden", className)}>
      <div className="container px-4 sm:px-6 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Galería de Trabajos
            </h2>
            <p className="text-lg text-muted-foreground">
              Una muestra dinámica de nuestros proyectos recientes en agrimensura y topografía.
            </p>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visibleImages.map((item, index) => (
            <div
              key={index}
              className={cn("relative overflow-hidden rounded-xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-muted group", item.className)}
              onClick={() => openLightbox(item.image.src)}
            >
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <div className="bg-white/90 dark:bg-black/80 rounded-full p-3 backdrop-blur-sm transform scale-90 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-6 h-6 text-foreground" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-[70] hover:scale-110 active:scale-95"
              onClick={() => setLightboxImage(null)}
            >
              <X className="w-10 h-10 drop-shadow-md" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-6xl h-full max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {loadingImage && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-12 h-12 text-white animate-spin" />
                </div>
              )}

              <Image
                src={lightboxImage}
                alt="Vista ampliada"
                fill
                className={cn(
                  "object-contain transition-opacity duration-300",
                  loadingImage ? "opacity-0" : "opacity-100"
                )}
                sizes="100vw"
                quality={95}
                priority
                onLoad={() => setLoadingImage(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
