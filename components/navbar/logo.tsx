"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export const Logo = () => {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    setMounted(true);
    
    // Obtener tema del localStorage o preferencia del sistema
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
    
    // Escuchar cambios en el tema
    const handleStorageChange = () => {
      const newTheme = localStorage.getItem("theme") as "light" | "dark";
      if (newTheme) {
        setTheme(newTheme);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Escuchar cambios en el DOM para detectar cambios de tema
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      observer.disconnect();
    };
  }, []);

  // Determinar qué logo usar basado en el tema
  const logoSrc = theme === "dark" ? "/logo_miagrimensor_2.svg" : "/logo_miagrimensor.svg";

  // Evitar hidratación incorrecta
  if (!mounted) {
    return (
      <Image
        src="/logo_miagrimensor.svg"
        alt="Logo Mi Agrimensor"
        width={285}
        height={66}
        priority
        className="w-20 sm:w-24 md:w-28 lg:w-32 h-auto min-w-0 max-w-full"
        style={{ height: 'auto' }}
      />
    );
  }

  if (isHome) {
    return (
      <Image
        src={logoSrc}
        alt="Logo Mi Agrimensor"
        width={285}
        height={66}
        priority
        className="w-20 sm:w-24 md:w-28 lg:w-32 h-auto min-w-0 max-w-full"
        style={{ height: 'auto' }}
      />
    );
  }

  return (
    <Link href="/" className="hover:opacity-80 transition-opacity">
      <Image
        src={logoSrc}
        alt="Logo Mi Agrimensor"
        width={285}
        height={66}
        priority
        className="w-20 sm:w-24 md:w-28 lg:w-32 h-auto min-w-0 max-w-full"
        style={{ height: 'auto' }}
      />
    </Link>
  );
};