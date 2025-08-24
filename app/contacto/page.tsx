"use client"


import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import Link from "next/link";
import { useState, useEffect } from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar/navbar";
import ScrollToTop from "@/components/scroll-to-top";

// Imágenes del carrusel (reemplaza con las fotos reales de contacto/oficina)
const carouselImages = [
  {
    src: "/contacto-oficina-1.jpeg",
    alt: "Oficina de agrimensura",
    title: "Nuestra oficina profesional"
  },
  {
    src: "/contacto-oficina-2.jpeg",
    alt: "Equipamiento de agrimensura",
    title: "Tecnología de última generación"
  },
  {
    src: "/contacto-oficina-3.jpeg",
    alt: "Atención al cliente",
    title: "Atención personalizada"
  },
  {
    src: "/contacto-oficina-4.jpeg",
    alt: "Trabajo de campo",
    title: "Servicios en campo"
  },
  {
    src: "/contacto-oficina-5.jpeg",
    alt: "Equipo de trabajo",
    title: "Equipo profesional"
  }
];

const contactInfo = [
  {
    icon: Phone,
    title: "Teléfono",
    value: "+54 9 11 6705-8156",
    description: "Llamadas y WhatsApp"
  },
  {
    icon: Mail,
    title: "Email",
    value: "contacto@miagrimensor.com",
    description: "Consultas y presupuestos"
  },
  {
    icon: MapPin,
    title: "Ubicación",
    value: "Avellaneda, Buenos Aires",
    description: "Zona de cobertura GBA"
  },
  {
    icon: Clock,
    title: "Horarios",
    value: "Lun - Vie: 8:00 - 18:00",
    description: "Sábados: 8:00 - 12:00"
  }
];

export default function ContactoPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    celular: "",
    mensaje: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Auto-play del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

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
        celular: "",
        mensaje: ""
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
    <>
      {/* Navbar */}
      <Navbar />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-b from-primary/10 to-background border-b">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft size={16} />
              Volver al inicio
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Contacto
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Estamos aquí para ayudarte. Contáctanos para obtener un presupuesto personalizado 
              y asesoramiento profesional sobre servicios de agrimensura.
            </p>
          </div>
        </div>

        {/* Carrusel de imágenes */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
            {/* Imagen actual */}
            <ImageWithFallback
              src={carouselImages[currentImageIndex].src}
              alt={carouselImages[currentImageIndex].alt}
              fill
              className="object-contain transition-all duration-500"
            />
            
            {/* Overlay con título */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                {carouselImages[currentImageIndex].title}
              </h3>
            </div>

            {/* Controles del carrusel */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
            >
              <ChevronRight size={24} />
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Información de contacto y formulario */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Columna izquierda - Información de contacto */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Información de Contacto
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Estamos disponibles para atenderte en nuestros horarios de trabajo. 
                  Consultas y presupuestos sin cargo.
                </p>
              </div>

              {/* Información de contacto */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <info.icon className="text-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{info.title}</h4>
                      <p className="text-foreground font-medium">{info.value}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Zona de cobertura */}
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Zona de Cobertura</h3>
                <p className="text-muted-foreground mb-4">
                  Ofrecemos servicios en CABA y Gran Buenos Aires:
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={14} />
                    <span>Avellaneda</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={14} />
                    <span>Lanús</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={14} />
                    <span>Lomas de Zamora</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={14} />
                    <span>Vicente López</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={14} />
                    <span>San Fernando</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={14} />
                    <span>San Isidro</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={14} />
                    <span>Tigre</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={14} />
                    <span>La Matanza</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={14} />
                    <span>San Martín</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={14} />
                    <span>Ituzaingó</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={14} />
                    <span>CABA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha - Formulario de contacto */}
            <div>
              <Card className="border-2">
                <CardHeader>
                  <h3 className="text-2xl font-bold">Envíanos un mensaje</h3>
                  <p className="text-muted-foreground">
                    Completa el formulario y nos pondremos en contacto contigo lo antes posible.
                  </p>
                </CardHeader>
                <CardContent>
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
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nombre">Nombre y Apellido *</Label>
                          <Input
                            id="nombre"
                            name="nombre"
                            type="text"
                            required
                            value={formData.nombre}
                            onChange={handleInputChange}
                            placeholder="Tu nombre completo"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="tu@email.com"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="celular">Celular *</Label>
                        <Input
                          id="celular"
                          name="celular"
                          type="tel"
                          required
                          value={formData.celular}
                          onChange={handleInputChange}
                          placeholder="+54 9 11 6705-8156"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="mensaje">Mensaje *</Label>
                        <Textarea
                          id="mensaje"
                          name="mensaje"
                          required
                          value={formData.mensaje}
                          onChange={handleInputChange}
                          placeholder="Cuéntanos sobre tu proyecto o consulta..."
                          rows={5}
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full" 
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
                            Enviar Mensaje
                          </>
                        )}
                      </Button>
                      
                      <p className="text-xs text-muted-foreground text-center">
                        * Campos obligatorios. Tus datos están seguros con nosotros.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary/5 border-t">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                ¿Necesitas un servicio urgente?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Para consultas urgentes o emergencias, puedes contactarnos directamente 
                por teléfono o WhatsApp. Atendemos de lunes a sábados.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link href="tel:+5491167058156">
                    <Phone size={20} className="mr-2" />
                    Llamar Ahora
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                  <Link href="https://api.whatsapp.com/send/?phone=5491167058156&text=Hola%21+Quisiera+un+presupuesto+sobre+un+trabajo+de+Agrimensura">
                    WhatsApp
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
      <ScrollToTop />
    </>
  );
}
