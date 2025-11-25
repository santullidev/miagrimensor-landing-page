"use client"

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { useState } from "react";

export const NavigationSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <VisuallyHidden>
        <SheetTitle>Navigation Drawer</SheetTitle>
      </VisuallyHidden>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="border-green-300 hover:bg-green/10 hover:border-green text-foreground">
          <Menu className="text-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-gradient-to-b from-green/70 via-green/75 to-green/70 border-l-2 border-green/40 w-[280px] sm:w-[320px] shadow-soft-xl backdrop-blur-md [&>button]:text-foreground [&>button]:hover:bg-white/20 [&>button]:hover:text-foreground [&>button]:border-white/30 [&>button]:rounded-modern">
        <div className="flex flex-col h-full">
          <div className="flex-shrink-0 p-4 border-b-2 border-green-300/60">
            <Logo />
          </div>
          
          <div className="flex-1 mt-4 px-4">
            <NavMenu orientation="vertical" className="space-y-1" onLinkClick={handleLinkClick} />
          </div>

          <div className="flex-shrink-0 mt-4 pt-4 border-t-2 border-green-300/50 px-4 pb-4">
            <Button 
              className="w-full bg-foreground hover:bg-foreground/90 text-green-50 border-2 border-green-400 shadow-soft-lg hover:shadow-soft-xl text-sm cursor-pointer transition-all duration-300 font-medium"
              size="sm"
              asChild
            >
              <a 
                href="https://api.whatsapp.com/send/?phone=5491167058156&text=Hola%21+Quisiera+un+presupuesto+sobre+un+trabajo+de+Agrimensura" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cursor-pointer"
                onClick={handleLinkClick}
              >
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
