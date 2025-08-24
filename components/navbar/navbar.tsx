import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import ThemeToggle from "../theme-toggle";

const Navbar = () => {
  return (
    <nav className="h-16 bg-background border-b border-accent">
      <div className="h-full flex items-center justify-between max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex-shrink-0 min-w-0 flex-1 max-w-[60%] sm:max-w-none">
          <Logo />
        </div>

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block flex-shrink-0" />

        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0">
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
