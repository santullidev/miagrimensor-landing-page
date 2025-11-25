"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowUpRight, DraftingCompass, Send, CheckCircle } from "lucide-react";

import { useState } from "react";

const Hero = () => {
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

    // Simulación de envío de email (aquí puedes integrar con tu servicio de email)
    try {
      // Simular delay de envío
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aquí iría la lógica real de envío de email
      console.log("Datos del formulario:", formData);
      
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
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden pt-16 lg:pt-8">
      {/* Background estático */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-background.jpeg')"
        }}
      >
        {/* Overlay para mejorar legibilidad del texto sobre la imagen */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/40 to-slate-900/60 z-10" />
      </div>
      
      {/* Gradiente de difuminado en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
      
      {/* Contenido principal */}
      <div className="relative z-50 w-full flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="max-w-7xl w-full flex flex-col lg:flex-row mx-auto items-center justify-between gap-y-8 lg:gap-y-14 gap-x-10 px-4 sm:px-6 py-8 lg:py-12 overflow-hidden">
          <div className="max-w-xl w-full lg:order-1">
            <Badge className="rounded-modern py-2 px-4 border border-green-200/50 bg-green/90 text-white hover:bg-green shadow-soft backdrop-blur-sm transition-all duration-250 font-medium">
              Agrimensor Pablo Venerus
            </Badge>
            <div className="mt-8 relative">
              {/* Línea decorativa vertical sutil */}
              <div className="absolute -left-2 sm:-left-3 top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-green-400/70 via-green-300/50 to-green-200/30 rounded-full hidden lg:block"></div>
              
              <h1 className="font-headline text-white drop-shadow-xl relative pl-0 lg:pl-4">
                {/* Título principal - palabras completas sin cortar */}
                <span className="block text-4xl xs:text-5xl sm:text-6xl lg:text-[3.75rem] xl:text-[4.25rem] 2xl:text-[4.75rem] font-black mb-1 sm:mb-2 leading-[0.9] tracking-[-0.04em] text-white drop-shadow-2xl whitespace-nowrap">
                  Agrimensura
                </span>
                <span className="block text-4xl xs:text-5xl sm:text-6xl lg:text-[3.75rem] xl:text-[4.25rem] 2xl:text-[4.75rem] font-black mb-4 sm:mb-5 leading-[0.9] tracking-[-0.04em] text-white drop-shadow-2xl whitespace-nowrap">
                  y Topografía
                </span>
                
                {/* Subtítulo con valor y línea decorativa - palabras completas juntas */}
                <div className="relative mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/20">
                  <div className="absolute left-0 top-0 w-12 sm:w-16 h-0.5 sm:h-1 bg-gradient-to-r from-green-400/80 via-green-300/60 to-transparent rounded-full"></div>
                  <span className="block text-lg xs:text-xl sm:text-2xl lg:text-[1.75rem] xl:text-[2rem] font-bold leading-tight tracking-[-0.01em] text-white/95 drop-shadow-lg pt-2 sm:pt-3">
                    Precisión, experiencia y confianza
                  </span>
                </div>
              </h1>
            </div>
            <p className="mt-6 max-w-[60ch] xs:text-lg text-white/90 break-words leading-relaxed drop-shadow-md">
              Estados parcelarios, mensura y planos para escriturar con rapidez y respaldo.
              Desde principios del año 2010,  ofrezco mis servicios, con dedicación, con entusiasmo a esta hermosa profesión, resolviendo rápida y eficazmente las necesidades de cada uno de nuestros clientes. 
            </p>
            <div className="mt-10 lg:mt-12 flex flex-col sm:flex-row items-center gap-4 w-full">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-modern text-base bg-green hover:bg-green-100 text-white shadow-soft-lg hover:shadow-soft-xl min-h-[48px] transition-all duration-250 font-semibold focus:ring-2 focus:ring-green-50 focus:ring-offset-2"
                asChild
              >
                <a href="https://api.whatsapp.com/send/?phone=5491167058156&text=Hola%21+Quisiera+un+presupuesto+sobre+un+trabajo+de+Agrimensura" target="_blank" rel="noopener noreferrer">
                  Hablemos en Whatsapp <ArrowUpRight className="h-5 w-5 ml-2" strokeWidth={2} />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-modern text-base shadow-soft bg-white/95 hover:bg-white text-foreground border-green/40 hover:border-green/50 min-h-[48px] transition-all duration-250 font-medium backdrop-blur-sm"
                asChild
              >
                <a href="/servicios">
                  <DraftingCompass className="h-5 w-5 mr-2" strokeWidth={2} /> Mis Servicios
                </a>
              </Button>
            </div>
          </div>
          
          {/* Formulario de contacto */}
          <div id="formulario" className="relative lg:max-w-lg xl:max-w-xl w-full lg:order-2 scroll-mt-20">
            <Card className="border border-green/30 bg-white shadow-soft-xl rounded-modern-lg">
              <CardHeader className="pb-4 px-4 sm:px-6 pt-6">
                <h2 className="font-headline text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
                  Solicita tu presupuesto
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
        </div>
      </div>
    </div>
  );
};

export default Hero;
