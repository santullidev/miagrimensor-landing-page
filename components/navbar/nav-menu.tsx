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

  const linkClassName = "block py-2 px-3 rounded-modern hover:bg-white/25 active:bg-white/35 transition-all duration-200 text-foreground font-medium text-sm border border-transparent hover:border-white/40 hover:shadow-sm";
  const verticalLinkClassName = "block py-2 px-3 rounded-modern hover:bg-white/25 active:bg-white/35 transition-all duration-200 text-foreground font-medium text-sm border border-transparent hover:border-white/40";

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-2 data-[orientation=horizontal]:gap-4 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:space-y-1">
        
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/acerca-de-mi" className={props.orientation === "vertical" ? verticalLinkClassName : linkClassName} onClick={handleLinkClick}>
              Acerca de mí
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/servicios" className={props.orientation === "vertical" ? verticalLinkClassName : linkClassName} onClick={handleLinkClick}>
              Servicios
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link 
              href="/#faq" 
              className={props.orientation === "vertical" ? verticalLinkClassName : linkClassName}
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
            <Link href="/blog" className={props.orientation === "vertical" ? verticalLinkClassName : linkClassName} onClick={handleLinkClick}>
              Blog
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/contacto" className={props.orientation === "vertical" ? verticalLinkClassName : linkClassName} onClick={handleLinkClick}>
              Contacto
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
