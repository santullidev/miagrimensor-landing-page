"use client"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavMenuProps extends NavigationMenuProps {
  onLinkClick?: () => void;
}

export const NavMenu = ({ onLinkClick, ...props }: NavMenuProps) => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-4 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:space-y-1">
        
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/acerca-de-mi" className="block py-1.5 px-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-slate-100 font-medium text-sm" onClick={handleLinkClick}>
              Acerca de mí
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/servicios" className="block py-1.5 px-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-slate-100 font-medium text-sm" onClick={handleLinkClick}>
              Servicios
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link 
              href="/#faq" 
              className="block py-1.5 px-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-slate-100 font-medium text-sm" 
              onClick={(e) => {
                handleLinkClick();
                // Si estamos en la página principal, hacer scroll suave después de cerrar el menú
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  setTimeout(() => {
                    const element = document.getElementById('faq');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 300); // Esperar 300ms para que el menú se cierre
                }
              }}
            >
              Preguntas Frecuentes
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link 
              href="/#testimonials" 
              className="block py-1.5 px-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-slate-100 font-medium text-sm" 
              onClick={(e) => {
                handleLinkClick();
                // Si estamos en la página principal, hacer scroll suave después de cerrar el menú
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  setTimeout(() => {
                    const element = document.getElementById('testimonials');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 300); // Esperar 300ms para que el menú se cierre
                }
              }}
            >
              Testimonios
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/blog" className="block py-1.5 px-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-slate-100 font-medium text-sm" onClick={handleLinkClick}>
              Blog
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
