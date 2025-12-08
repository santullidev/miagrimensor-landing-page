"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowUpRight, Send, CheckCircle, Phone, Mail, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar/navbar";
import ScrollToTop from "@/components/scroll-to-top";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
    numeroPartida: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el formulario');
      }
      
      setSubmitSuccess(true);
      setFormData({
        nombre: "",
        email: "",
        mensaje: "",
        numeroPartida: ""
      });
      
      // Resetear mensaje de éxito después de 5 segundos
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert(error instanceof Error ? error.message : 'Error al enviar el formulario. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <div className="relative bg-gradient-to-br from-green/10 via-green-light/20 to-cream/30 border-b border-green/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4 sm:mb-6 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm sm:text-base">Volver al inicio</span>
            </Link>
            
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="rounded-full py-1.5 sm:py-2 px-4 sm:px-6 border-none mb-3 sm:mb-4 bg-green text-white font-semibold text-xs sm:text-sm shadow-soft">
                Contacto
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 sm:mb-4 text-foreground break-words">
                Solicita tu presupuesto
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 sm:mb-6 leading-relaxed break-words max-w-4xl mx-auto">
                Completa el formulario y te responderemos a la brevedad. También puedes contactarnos directamente por WhatsApp o teléfono.
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            {/* Formulario */}
            <div className="order-2 lg:order-1">
              <Card className="border border-green/30 bg-white shadow-soft-xl rounded-modern-lg">
                <CardHeader className="pb-4 px-4 sm:px-6 pt-6">
                  <h2 className="font-headline text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
                    Formulario de contacto
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">
                    Completa el formulario y te responderemos a la brevedad.
                  </p>
                </CardHeader>
                <CardContent className="px-4 sm:px-6 pb-6">
                  {submitSuccess ? (
                    <div className="text-center py-8">
                      <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
                      <h4 className="text-xl font-bold text-green-600 mb-2">
                        ¡Mensaje enviado exitosamente!
                      </h4>
                      <p className="text-muted-foreground">
                        Gracias por contactarnos. Te responderemos en breve.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="nombre" className="text-foreground">
                          Nombre *
                        </Label>
                        <Input
                          id="nombre"
                          name="nombre"
                          type="text"
                          required
                          value={formData.nombre}
                          onChange={handleInputChange}
                          placeholder="Tu nombre completo"
                          className="bg-white"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground">
                          Correo electrónico *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="tu@email.com"
                          className="bg-white"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="numeroPartida" className="text-foreground">
                          Número de Partida <span className="text-xs text-muted-foreground">(Opcional pero fundamental)</span>
                        </Label>
                        <Input
                          id="numeroPartida"
                          name="numeroPartida"
                          type="text"
                          value={formData.numeroPartida}
                          onChange={handleInputChange}
                          placeholder="Ej: 12345-67890/2024"
                          className="bg-white"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="mensaje" className="text-foreground">
                          Mensaje o consulta específica *
                        </Label>
                        <Textarea
                          id="mensaje"
                          name="mensaje"
                          required
                          value={formData.mensaje}
                          onChange={handleInputChange}
                          placeholder="Cuéntanos sobre tu proyecto o consulta..."
                          rows={4}
                          className="bg-white resize-none"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-green hover:bg-green-100 text-white shadow-soft-lg hover:shadow-soft-xl rounded-modern min-h-[48px] transition-all duration-250 font-semibold focus:ring-2 focus:ring-green-50 focus:ring-offset-2" 
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-foreground mr-2" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send size={16} className="mr-2" strokeWidth={2} />
                            Enviar consulta
                          </>
                        )}
                      </Button>
                      
                      <p className="text-xs text-muted-foreground text-center pt-2">
                        * Campos obligatorios. Tus datos están seguros con nosotros.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Información de contacto */}
            <div className="order-1 lg:order-2 space-y-6">
              <Card className="border border-green/30 bg-gradient-to-br from-green/5 to-green-light/20 shadow-soft-lg">
                <CardHeader>
                  <h3 className="font-headline text-xl sm:text-2xl font-bold text-foreground">
                    Otras formas de contacto
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mt-2">
                    También puedes contactarnos directamente por estos medios
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    asChild 
                    size="lg" 
                    className="w-full text-base px-6 py-6 min-h-[48px] bg-green hover:bg-green-100 text-white border border-green-300 rounded-modern shadow-soft-lg hover:shadow-soft-xl font-semibold transition-all duration-250 focus:ring-2 focus:ring-green-50 focus:ring-offset-2"
                  >
                    <a href="https://api.whatsapp.com/send/?phone=5491167058156&text=Hola%21+Quisiera+un+presupuesto+sobre+un+trabajo+de+Agrimensura" target="_blank" rel="noopener noreferrer">
                      Hablemos en WhatsApp <ArrowUpRight className="ml-2 h-5 w-5" strokeWidth={2} />
                    </a>
                  </Button>
                  
                  <div className="grid gap-4 pt-4">
                    <div className="flex items-center gap-4 p-4 rounded-modern bg-card border border-green/20 hover:border-green/40 transition-all duration-250 hover:shadow-soft">
                      <div className="p-3 rounded-modern bg-green/10 border border-green/20 flex-shrink-0">
                        <Phone className="text-green-600" size={24} strokeWidth={2} />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Teléfono</p>
                        <Link href="tel:+5491167058156" className="text-sm text-muted-foreground hover:text-green transition-colors">
                          +54 9 11 6705-8156
                        </Link>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 rounded-modern bg-card border border-green/20 hover:border-green/40 transition-all duration-250 hover:shadow-soft">
                      <div className="p-3 rounded-modern bg-green/10 border border-green/20 flex-shrink-0">
                        <Mail className="text-green-600" size={24} strokeWidth={2} />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Email</p>
                        <Link href="mailto:contacto@miagrimensor.com" className="text-sm text-muted-foreground hover:text-green transition-colors">
                          contacto@miagrimensor.com
                        </Link>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 rounded-modern bg-card border border-green/20 hover:border-green/40 transition-all duration-250 hover:shadow-soft">
                      <div className="p-3 rounded-modern bg-green/10 border border-green/20 flex-shrink-0">
                        <MapPin className="text-green-600" size={24} strokeWidth={2} />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Ubicación</p>
                        <p className="text-sm text-muted-foreground">
                          Avellaneda, Buenos Aires
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </>
  );
}
