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
import type { NavLink } from "@/sanity/lib/types";

interface NavMenuProps extends NavigationMenuProps {
  onLinkClick?: () => void;
  links: NavLink[];
}

export const NavMenu = ({ onLinkClick, links, ...props }: NavMenuProps) => {
  const pathname = usePathname();

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
        {links.map((link, idx) => (
          <NavigationMenuItem key={`${link.label}-${idx}`}>
            <NavigationMenuLink asChild>
              <Link 
                href={link.href || "#"} 
                className={props.orientation === "vertical" ? verticalLinkClassName : linkClassName} 
                onClick={(e) => {
                  handleLinkClick();
                  if (link.isHashLink && window.location.pathname === '/') {
                    e.preventDefault();
                    const targetId = link.href.split('#')[1];
                    setTimeout(() => {
                      const element = document.getElementById(targetId);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 300);
                  }
                }}
              >
                {link.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
