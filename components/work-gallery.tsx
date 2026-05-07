"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ZoomIn, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import type { WorkGalleryData } from "@/sanity/lib/types";

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

interface WorkGalleryProps {
  gallery: WorkGalleryData
  className?: string
}

export default function WorkGallery({ gallery, className }: WorkGalleryProps) {
  const allImages = gallery.images || [];

  const [visibleImages, setVisibleImages] = useState(() => {
    const images = [];
    const slotsCount = Math.min(initialLayout.length, allImages.length);
    for (let i = 0; i < slotsCount; i++) {
      images.push({
        ...initialLayout[i % initialLayout.length],
        image: { src: allImages[i].url, alt: allImages[i].alt },
        id: `slot-${i}-init`,
      });
    }
    return images;
  });

  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    if (allImages.length <= initialLayout.length) return;

    const interval = setInterval(() => {
      setVisibleImages((currentImages) => {
        const newImages = [...currentImages];
        const slotToChange = Math.floor(Math.random() * newImages.length);
        const currentUrls = new Set(newImages.map(img => img.image.src));
        const availableImages = allImages.filter(img => !currentUrls.has(img.url));

        if (availableImages.length > 0) {
          const newImage = availableImages[Math.floor(Math.random() * availableImages.length)];
          newImages[slotToChange] = {
            ...newImages[slotToChange],
            image: { src: newImage.url, alt: newImage.alt },
            id: `slot-${slotToChange}-${Math.random().toString(36).slice(2)}`,
          };
        }
        return newImages;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [allImages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxImage && e.key === "Escape") setLightboxImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImage]);

  if (allImages.length === 0) return null;

  return (
    <section className={cn("relative bg-background py-16 xs:py-24 overflow-hidden", className)}>
      {/* Background Video (Optional) */}
      {gallery.videoUrl && (
        <div className="absolute inset-0 w-full h-full z-0 opacity-10 pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={gallery.videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
        </div>
      )}

      <div className="relative z-10 container px-4 sm:px-6 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            {gallery.sectionTitle || "Galería de Trabajos"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {gallery.sectionSubtitle || "Una muestra dinámica de nuestros proyectos recientes."}
          </p>
        </div>
      </div>

      <div className="relative z-10 container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visibleImages.map((item, index) => (
            <div
              key={index}
              className={cn("relative overflow-hidden rounded-xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-muted group", item.className)}
              onClick={() => { setLoadingImage(true); setLightboxImage(item.image.src); }}
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
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setLightboxImage(null)}
          >
            <button className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-[70]" onClick={() => setLightboxImage(null)}>
              <X className="w-10 h-10 drop-shadow-md" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
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
                className={cn("object-contain transition-opacity duration-300", loadingImage ? "opacity-0" : "opacity-100")}
                sizes="100vw" quality={95} priority
                onLoad={() => setLoadingImage(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
