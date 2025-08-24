"use client";

import { useState, useEffect } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Obtener tema del localStorage o preferencia del sistema
    const savedTheme = localStorage.getItem("theme") as Theme;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
    
    // Aplicar tema al DOM
    applyTheme(initialTheme);
    
    // Escuchar cambios en la preferencia del sistema
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        const newTheme = e.matches ? "dark" : "light";
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    if (newTheme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    
    // Forzar re-renderizado de componentes que puedan no estar usando las variables CSS
    document.body.style.colorScheme = newTheme;
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  const setThemeMode = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return {
    theme,
    mounted,
    toggleTheme,
    setThemeMode,
  };
}
