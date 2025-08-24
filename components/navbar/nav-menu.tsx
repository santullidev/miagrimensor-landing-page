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

export const NavMenu = (props: NavigationMenuProps) => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <NavigationMenu {...props}>
             <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:space-y-1">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
                         <Link href="/" className="block py-1.5 px-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-slate-100 font-medium">
              Inicio
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
                         <Link href="/acerca-de-mi" className="block py-1.5 px-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-slate-100 font-medium">
              Acerca de mí
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
                         <Link href="/servicios" className="block py-1.5 px-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-slate-100 font-medium">
              Servicios
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
                         <Link href="/otros-servicios" className="block py-1.5 px-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-slate-100 font-medium">
              Otros Servicios
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
                         <Link href="/#faq" className="block py-1.5 px-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-slate-100 font-medium">
              Preguntas Frecuentes
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
                         <Link href="/#testimonials" className="block py-1.5 px-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-slate-100 font-medium">
              Testimonios
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
                         <Link href="/blog" className="block py-1.5 px-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-slate-100 font-medium">
              Blog
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
                         <Link href="/contacto" className="block py-1.5 px-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-slate-100 font-medium">
              Contacto
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
