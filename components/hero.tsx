"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowUpRight, DraftingCompass, Send, CheckCircle } from "lucide-react";

import { HeroBackground } from "./animate-ui/backgrounds/hero-background";
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
      {/* Background con imagen y overlay */}
      <HeroBackground className="absolute inset-0 w-full h-full" />
      
      {/* Gradiente de difuminado en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
      
      {/* Contenido principal */}
      <div className="relative z-50 w-full flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="max-w-7xl w-full flex flex-col lg:flex-row mx-auto items-center justify-between gap-y-8 lg:gap-y-14 gap-x-10 px-4 sm:px-6 py-8 lg:py-12 overflow-hidden">
          <div className="max-w-xl w-full lg:order-1">
            <Badge className="rounded-full py-1 border-none bg-white/90 text-slate-900 hover:bg-white shadow-lg backdrop-blur-sm">
              Agrimensor Pablo Venerus
            </Badge>
            <h1 className="mt-6 max-w-[20ch] text-3xl xs:text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold leading-[1.2] tracking-tight text-white break-words">
              Servicios integrales de agrimensura y topografía
            </h1>
            <p className="mt-6 max-w-[60ch] xs:text-lg text-slate-200 break-words">
              Estados parcelarios, mensura y planos para escriturar con rapidez y respaldo.
              Desde principios del año 2010,  ofrezco mis servicios, con dedicación, con entusiasmo a esta hermosa profesión, resolviendo rápida y eficazmente las necesidades de cada uno de nuestros clientes. 
            </p>
            <div className="mt-8 lg:mt-12 flex flex-col sm:flex-row items-center gap-4 w-full">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full text-base bg-green-500 hover:bg-green-600 text-white shadow-lg min-w-0"
                asChild
              >
                <a href="https://api.whatsapp.com/send/?phone=5491167058156&text=Hola%21+Quisiera+un+presupuesto+sobre+un+trabajo+de+Agrimensura" target="_blank" rel="noopener noreferrer">
                  Hablemos en Whatsapp <ArrowUpRight className="h-5 w-5 ml-2" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-full text-base shadow-none bg-white/90 hover:bg-white dark:bg-slate-800/90 dark:hover:bg-slate-800 dark:text-white dark:border-slate-600 border-gray-300 min-w-0"
                asChild
              >
                <a href="/servicios">
                  <DraftingCompass className="h-5 w-5 mr-2" /> Mis Servicios
                </a>
              </Button>
            </div>
          </div>
          
          {/* Formulario de contacto */}
          <div className="relative lg:max-w-lg xl:max-w-xl w-full lg:order-2">
            <Card className="border-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-2xl">
              <CardHeader className="pb-4 px-4 sm:px-6 pt-6">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
                  Solicita tu presupuesto
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground mt-2">
                  Completa el formulario y te responderemos a la brevedad.
                </p>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-6">
                {submitSuccess ? (
                  <div className="text-center py-8">
                    <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
                    <h4 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">
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
                        className="bg-background"
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
                        className="bg-background"
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
                        className="bg-background"
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
                        className="bg-background resize-none"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-green-500 hover:bg-green-600 text-white shadow-lg" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send size={16} className="mr-2" />
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
