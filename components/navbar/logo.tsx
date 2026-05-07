"use client"

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/types";

interface LogoProps {
  logoLight?: SanityImage;
  logoDark?: SanityImage;
}

export const Logo = ({ logoLight, logoDark }: LogoProps) => {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Detectar tema inicial
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    
    // Observar cambios de clase en html (para cambios de tema en tiempo real)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isNowDark = document.documentElement.classList.contains("dark");
          setTheme(isNowDark ? "dark" : "light");
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });

    return () => observer.disconnect();
  }, []);

  // Determinar la fuente de la imagen
  let currentLogoSrc = theme === "dark" ? "/logo_miagrimensor_2.svg" : "/logo_miagrimensor.svg";
  
  if (mounted) {
    if (theme === "dark" && logoDark) {
      currentLogoSrc = urlForImage(logoDark).url();
    } else if (theme === "light" && logoLight) {
      currentLogoSrc = urlForImage(logoLight).url();
    }
  }

  const LogoImage = (
    <Image
      src={currentLogoSrc}
      alt="Logo Mi Agrimensor"
      width={285}
      height={66}
      priority
      unoptimized
      className="w-20 sm:w-24 md:w-28 lg:w-32 h-auto min-w-0 max-w-full transition-opacity duration-300"
      style={{ height: 'auto' }}
    />
  );

  if (pathname === "/") {
    return LogoImage;
  }

  return (
    <Link href="/" className="hover:opacity-80 transition-opacity">
      {LogoImage}
    </Link>
  );
};