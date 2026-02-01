"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Send, CheckCircle } from "lucide-react";
import { useState } from "react";

const BudgetForm = () => {
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
  );
};

export default BudgetForm;
