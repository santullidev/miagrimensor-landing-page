import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import type { NavbarData } from "@/sanity/lib/types";
import { SITE_CONFIG } from "@/lib/constants";

interface NavbarProps {
  data?: Partial<NavbarData>
}

const defaultData: NavbarData = {
  links: [
    { label: 'Acerca de mí', href: '/acerca-de-mi', isHashLink: false },
    { label: 'Servicios', href: '/servicios', isHashLink: false },
    { label: 'Preguntas Frecuentes', href: '/#faq', isHashLink: true },
    { label: 'Blog', href: '/blog', isHashLink: false },
    { label: 'Contacto', href: '/contacto', isHashLink: false },
  ],
  ctaButton: { text: 'WhatsApp', href: SITE_CONFIG.whatsappUrl }
};

const Navbar = ({ data: propData }: NavbarProps) => {
  const data = { ...defaultData, ...propData } as NavbarData;

  return (
    <nav className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-green/20 sticky top-0 z-50 shadow-soft">
      <div className="h-full flex items-center justify-between max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Logo */}
        <div className="flex-shrink-0 min-w-0 flex-1 md:flex-none logo-container">
          <Logo logoLight={propData?.logoLight} logoDark={propData?.logoDark} />
        </div>

        {/* Desktop Menu - Centrado */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <NavMenu links={data.links} />
        </div>

        {/* Botones de la derecha */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <Button 
            className="inline-flex bg-green hover:bg-green-100 text-white border border-green-300 shadow-soft hover:shadow-soft-lg rounded-modern text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 min-h-[36px] cursor-pointer transition-all duration-250 font-medium focus:ring-2 focus:ring-green-50"
            size="sm"
            asChild
          >
            <a href={data.ctaButton.href || "#"} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
              {data.ctaButton.text}
            </a>
          </Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet data={data} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
