"use client"

import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Función para detectar el scroll
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Función para scroll al inicio
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Event listener para el scroll
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="hidden md:flex fixed bottom-6 right-6 z-50 rounded-full w-12 h-12 p-0 bg-primary hover:bg-primary/90 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Volver al inicio"
        >
          <ChevronUp size={20} />
        </Button>
      )}
    </>
  );
}
