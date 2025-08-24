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

export const NavigationSheet = () => {
  return (
    <Sheet>
      <VisuallyHidden>
        <SheetTitle>Navigation Drawer</SheetTitle>
      </VisuallyHidden>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 w-[280px] sm:w-[320px]">
        <div className="flex flex-col h-full">
          <div className="flex-shrink-0 p-4">
            <Logo />
          </div>
          
          <div className="flex-1 mt-4 px-4">
            <NavMenu orientation="vertical" className="space-y-1" />
          </div>

          <div className="flex-shrink-0 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 px-4 pb-4">
            <Button 
              className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm text-sm"
              size="sm"
              asChild
            >
              <a href="https://api.whatsapp.com/send/?phone=5491167058156&text=Hola%21+Quisiera+un+presupuesto+sobre+un+trabajo+de+Agrimensura" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
