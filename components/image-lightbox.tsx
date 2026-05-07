"use client"

import { useState, useEffect } from "react";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { useImageLightbox } from "@/hooks/use-image-lightbox";

interface ImageLightboxProps {
  imageUrl: string;
  title: string;
  onClose: () => void;
}

export default function ImageLightbox({ imageUrl, title, onClose }: ImageLightboxProps) {
  const {
    zoom, setZoom, rotation, setRotation, position,
    handleMouseDown, handleMouseMove, handleMouseUp, resetModal
  } = useImageLightbox(onClose);

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-300" 
      onClick={onClose}
    >
      {/* Controls */}
      <div 
        className="absolute top-2 sm:top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 sm:gap-4 bg-black/50 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 text-white z-[60]" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={(e) => { e.stopPropagation(); setZoom(prev => Math.max(prev - 0.25, 0.5)); }} 
          className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <ZoomOut size={16} />
        </button>
        <span className="text-xs sm:text-sm font-medium min-w-[40px] text-center">{Math.round(zoom * 100)}%</span>
        <button 
          onClick={(e) => { e.stopPropagation(); setZoom(prev => Math.min(prev + 0.25, 3)); }} 
          className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <ZoomIn size={16} />
        </button>
        <div className="w-px h-4 bg-white/30 mx-1"></div>
        <button 
          onClick={(e) => { e.stopPropagation(); setRotation(prev => prev + 90); }} 
          className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <RotateCcw size={16} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); resetModal(); }} 
          className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <span className="text-xs sm:text-sm font-bold">⟲</span>
        </button>
      </div>

      <button 
        onClick={onClose} 
        className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white hover:text-gray-300 transition-colors z-[60] bg-black/50 backdrop-blur-sm rounded-full p-2"
      >
        <X size={20} />
      </button>

      <div className="relative max-w-[95vw] max-h-[95vh] mt-16 z-10">
        <div 
          className="relative w-full h-full cursor-grab active:cursor-grabbing touch-none"
          style={{ willChange: 'transform', userSelect: 'none' }}
          onMouseDown={handleMouseDown} 
          onMouseMove={handleMouseMove} 
          onMouseUp={handleMouseUp} 
          onMouseLeave={handleMouseUp}
          onTouchStart={(e) => { e.preventDefault(); handleMouseDown(e); }}
          onTouchMove={(e) => { e.preventDefault(); handleMouseMove(e); }}
          onTouchEnd={(e) => { e.preventDefault(); handleMouseUp(); }}
        >
          <img
            src={imageUrl}
            alt={title}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
            style={{ 
              transform: `scale(${zoom}) rotate(${rotation}deg) translate(${position.x / zoom}px, ${position.y / zoom}px)`, 
              transformOrigin: 'center center' 
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    </div>
  );
}
