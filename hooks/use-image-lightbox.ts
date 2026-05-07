"use client"

import { useState, useEffect, useCallback } from "react";

export function useImageLightbox(onClose: () => void) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const resetModal = useCallback(() => {
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  }, []);

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
      setPosition({ x: clientX - dragStart.x, y: clientY - dragStart.y });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape': onClose(); break;
        case '+': case '=': e.preventDefault(); setZoom(prev => Math.min(prev + 0.25, 3)); break;
        case '-': e.preventDefault(); setZoom(prev => Math.max(prev - 0.25, 0.5)); break;
        case 'r': case 'R': setRotation(prev => prev + 90); break;
        case '0': resetModal(); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, resetModal]);

  return {
    zoom,
    setZoom,
    rotation,
    setRotation,
    isDragging,
    position,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    resetModal
  };
}
