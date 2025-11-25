'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

type HeroBackgroundProps = React.ComponentProps<'div'> & {
  children?: React.ReactNode;
  currentImageIndex?: number;
  backgroundImages?: string[];
};

// Imágenes de fondo del hero para el carrusel
const defaultBackgroundImages = [
  '/hero/pablo-trabajando-1.jpeg',
  '/hero/pablo-trabajando-2.jpg',
  '/hero/pablo-trabajando-3.jpg',
  '/hero/pablo-trabajando-4.jpeg',
  '/hero/pablo-trabajando-5.jpeg',
  '/hero/pablo-trabajando-6.jpeg'
];

function HeroBackground({
  className,
  children,
  currentImageIndex = 0,
  backgroundImages = defaultBackgroundImages,
  ...props
}: HeroBackgroundProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Valores fijos para evitar problemas de hidratación
  const dotPositions = [
    { top: '15%', left: '25%', delay: '0.5s', duration: '3.2s' },
    { top: '35%', left: '75%', delay: '1.2s', duration: '4.1s' },
    { top: '55%', left: '15%', delay: '0.8s', duration: '3.8s' },
    { top: '75%', left: '85%', delay: '1.5s', duration: '3.5s' },
    { top: '25%', left: '45%', delay: '0.3s', duration: '4.3s' },
    { top: '45%', left: '65%', delay: '1.8s', duration: '3.1s' },
    { top: '65%', left: '35%', delay: '0.7s', duration: '3.9s' },
    { top: '85%', left: '55%', delay: '1.1s', duration: '3.6s' },
    { top: '10%', left: '80%', delay: '0.9s', duration: '4.0s' },
    { top: '30%', left: '10%', delay: '1.4s', duration: '3.4s' },
    { top: '50%', left: '90%', delay: '0.6s', duration: '3.7s' },
    { top: '70%', left: '20%', delay: '1.3s', duration: '4.2s' },
    { top: '90%', left: '70%', delay: '0.4s', duration: '3.3s' },
    { top: '20%', left: '60%', delay: '1.6s', duration: '3.0s' },
    { top: '40%', left: '30%', delay: '0.2s', duration: '4.4s' },
    { top: '60%', left: '50%', delay: '1.0s', duration: '3.8s' },
    { top: '80%', left: '40%', delay: '0.8s', duration: '3.5s' },
    { top: '5%', left: '15%', delay: '1.7s', duration: '3.9s' },
    { top: '95%', left: '85%', delay: '0.1s', duration: '4.1s' },
    { top: '15%', left: '95%', delay: '1.9s', duration: '3.2s' },
  ];

  const currentImage = backgroundImages[currentImageIndex] || backgroundImages[0];

  return (
    <div
      className={cn(
        'relative size-full overflow-hidden',
        className,
      )}
      {...props}
    >
      {/* Imágenes de fondo del carrusel */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url('${image}')`,
          }}
        />
      ))}
      
      {/* Fallback gradient en caso de que no se cargue la imagen */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-10" /> */}
      
      {/* Patrón de puntos sutil */}
      {isClient && (
        <div className="absolute inset-0 opacity-5 z-30">
          <div className="absolute top-0 left-0 w-full h-full">
            {dotPositions.map((pos, i) => (
              <div
                key={`dot-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{ 
                  top: pos.top, 
                  left: pos.left,
                  animationDelay: pos.delay,
                  animationDuration: pos.duration
                }}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Overlay para mejorar legibilidad del texto sobre la imagen */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/40 to-slate-900/60 z-20" />
      
      {/* Patrón sutil de líneas topográficas */}
      <div className="absolute inset-0 opacity-8 z-30">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Líneas horizontales */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full h-px bg-white/15"
              style={{ top: `${(i + 1) * 15}%` }}
            />
          ))}
          
          {/* Líneas verticales */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full w-px bg-white/15"
              style={{ left: `${(i + 1) * 20}%` }}
            />
          ))}
          
          {/* Puntos de coordenadas */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`dot-${i}`}
              className="absolute w-1 h-1 bg-white/25 rounded-full"
              style={{ 
                top: `${25 + (i * 8)}%`, 
                left: `${20 + (i * 10)}%` 
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Efecto de brillo sutil */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-transparent z-40" />
      
      {children}
    </div>
  );
}

export { HeroBackground, type HeroBackgroundProps };
