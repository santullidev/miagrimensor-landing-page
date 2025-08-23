"use client"

import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <div className="bg-muted/30 border-t border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            ¿Necesitas un servicio de agrimensura?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Consultas y asesoramiento sin cargo. Presupuestos EN EL DÍA.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/servicios">
                SOLICITAR PRESUPUESTO
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="/servicios">
                VER SERVICIOS
              </Link>
            </Button>
          </div>

          {/* Información de contacto */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center gap-3">
              <Phone className="text-primary" size={20} />
              <span className="font-medium">+54 9 11 6705-8156</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Mail className="text-primary" size={20} />
              <span className="font-medium">contacto@miagrimensor.com</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <MapPin className="text-primary" size={20} />
              <span className="font-medium">Avellaneda, Buenos Aires</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
