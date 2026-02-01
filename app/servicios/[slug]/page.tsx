"use client"

import { useParams } from "next/navigation";
import { services } from "@/lib/services";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  CheckCircle, 
  ArrowRight,
  Phone,
  BookOpen
} from "lucide-react";
import Link from "next/link";

export default function ServicePage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Servicio no encontrado</h1>
          <Button asChild>
            <Link href="/servicios">Volver a servicios</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pb-16">
        {/* Header simple sin imagen de fondo */}
        <div className="w-full bg-muted/30 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <Link 
              href="/servicios"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group w-fit"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span>Volver a servicios</span>
            </Link>
            
            <div className="space-y-4 max-w-4xl">
              <Badge className="bg-green/10 text-green border-green/20 hover:bg-green/20 transition-colors text-sm px-3 py-1">
                {service.category}
              </Badge>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
                {service.title}
              </h1>
              
              <p className="text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
                {service.subtitle}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contenido Principal */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-foreground">
                  <div className="bg-green/10 p-2 rounded-lg">
                    <service.icon className="text-green w-6 h-6" />
                  </div>
                  Descripción del Servicio
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
              


              <div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Características Principales</h3>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-card p-3 rounded-lg border shadow-sm">
                      <CheckCircle className="text-green w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Enlaces a Blog si corresponden */}
              {service.id === 1 && (
                <Link href="/blog/todo-sobre-el-estado-parcelario-en-la-provincia-de-buenos-aires" className="block mt-8">
                  <Card className="border-green/30 bg-gradient-to-br from-green/5 to-green-light/10 hover:from-green/10 hover:to-green-light/20 transition-all duration-250 hover:shadow-soft hover:border-green/50 cursor-pointer">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="p-3 bg-green/10 rounded-full">
                        <BookOpen className="text-green w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1">Lee más en nuestro Blog</h4>
                        <p className="text-muted-foreground">Todo sobre el Estado Parcelario en Provincia de Buenos Aires</p>
                      </div>
                      <ArrowRight className="text-green w-5 h-5" />
                    </CardContent>
                  </Card>
                </Link>
              )}

              {service.id === 9 && (
                <Link href="/blog/todo-sobre-el-estado-parcelario-en-la-ciudad-autonoma-de-buenos-aires" className="block mt-8">
                  <Card className="border-green/30 bg-gradient-to-br from-green/5 to-green-light/10 hover:from-green/10 hover:to-green-light/20 transition-all duration-250 hover:shadow-soft hover:border-green/50 cursor-pointer">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="p-3 bg-green/10 rounded-full">
                        <BookOpen className="text-green w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1">Lee más en nuestro Blog</h4>
                        <p className="text-muted-foreground">Todo sobre el Estado Parcelario en CABA</p>
                      </div>
                      <ArrowRight className="text-green w-5 h-5" />
                    </CardContent>
                  </Card>
                </Link>
              )}
            </div>

            {/* Sidebar / CTA */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <Card className="border-green/30 shadow-soft-xl overflow-hidden">
                  <div className="bg-green/10 p-4 border-b border-green/10">
                    <h3 className="font-bold text-lg text-green-900">Solicitar Presupuesto</h3>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Escribinos para consultarnos sobre el trámite de <span className="font-semibold text-foreground">{service.title}</span>. Te pasamos un presupuesto a medida.
                    </p>
                    
                    <Button asChild size="lg" className="w-full bg-green hover:bg-green-100 text-white shadow-soft font-semibold">
                      <Link href="/contacto">
                        Solicitar ahora
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    
                    <div className="relative">
                      <div className="relative flex justify-center text-xs text-muted-foreground">
                        <span>O también por</span>
                      </div>
                    </div>

                    <Button asChild variant="outline" size="lg" className="w-full border-green/30 hover:border-green text-green hover:bg-green/5">
                      <Link href="https://api.whatsapp.com/send/?phone=5491167058156&text=Hola%21+Quisiera+consultar+sobre+el+servicio+de+Agrimensura" target="_blank">
                        <Phone className="w-4 h-4 mr-2" />
                        WhatsApp
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <div className="bg-muted/50 rounded-xl p-6">
                  <h4 className="font-bold mb-3">¿Por qué elegirnos?</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                    <li className="flex items-center gap-2">
                       <CheckCircle className="w-4 h-4 text-green" />
                       <span>Atención personalizada</span>
                    </li>
                    <li className="flex items-center gap-2">
                       <CheckCircle className="w-4 h-4 text-green" />
                       <span>Presupuestos claros</span>
                    </li>
                    <li className="flex items-center gap-2">
                       <CheckCircle className="w-4 h-4 text-green" />
                       <span>Experiencia comprobada</span>
                    </li>
                    <li className="flex items-center gap-2">
                       <CheckCircle className="w-4 h-4 text-green" />
                       <span>Tecnología de punta</span>
                    </li>
                  </ul>
                  <div className="pt-3 border-t border-border/50">
                    <Link href="/acerca-de-mi" className="text-xs text-muted-foreground hover:text-green transition-colors flex items-center gap-1 group">
                      <span>Conoce más sobre mi trayectoria</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
