import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import ThemeToggle from "../theme-toggle";

const Navbar = () => {
  return (
    <nav className="h-16 bg-background border-b border-accent">
      <div className="h-full flex items-center justify-between max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Desktop Menu - Centrado */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <NavMenu />
        </div>

        {/* Botones de la derecha */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <ThemeToggle />
          <Button 
            className="inline-flex bg-green-500 hover:bg-green-600 text-white border-none shadow-sm text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 cursor-pointer"
            size="sm"
            asChild
          >
            <a href="https://api.whatsapp.com/send/?phone=5491167058156&text=Hola%21+Quisiera+un+presupuesto+sobre+un+trabajo+de+Agrimensura" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
              WhatsApp
            </a>
          </Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
