"use client"

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Star,
  Award,
  Clock,
  CheckCircle,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Target,
  TrendingUp,
  FileText,
  Calculator,
  Building,
  Home,
  Car,
  TreePine,
} from "lucide-react";

import Link from "next/link";
import { useState, useEffect } from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar/navbar";
import ScrollToTop from "@/components/scroll-to-top";

const otrosServicios = [
  {
    id: 1,
    icon: Building,
    title: "Relevamientos Topográficos",
    subtitle: "Mediciones precisas para proyectos de ingeniería",
    description: "Servicios especializados de relevamiento topográfico para proyectos de ingeniería civil, arquitectura y construcción. Utilizamos tecnología de última generación para garantizar la máxima precisión.",
    features: [
      "Levantamiento topográfico completo",
      "Curvas de nivel detalladas",
      "Plano de situación y ubicación",
      "Coordenadas georreferenciadas",
      "Informe técnico completo"
    ],
    image: "/otros-servicos-page/otros-servicios-page-1.jpg",
    category: "Topografía",
    duration: "2-5 días",
    complexity: "Media",
    price: "Desde $150.000",
    highlights: ["Precisión milimétrica", "Tecnología GNSS", "Entrega digital"]
  },
  {
    id: 2,
    icon: Home,
    title: "Certificados de Dominio",
    subtitle: "Verificación legal de la propiedad",
    description: "Certificación oficial que acredita la titularidad dominial de un inmueble, incluyendo la verificación de gravámenes, embargos y restricciones de dominio.",
    features: [
      "Verificación de titularidad",
      "Análisis de gravámenes",
      "Certificado oficial",
      "Informe detallado",
      "Asesoramiento legal"
    ],
    image: "/otros-servicos-page/otros-servicios-page-2.jpg",
    category: "Legal",
    duration: "1-3 días",
    complexity: "Baja",
    price: "Desde $80.000",
    highlights: ["Oficial", "Rápido", "Confiable"]
  },
  {
    id: 3,
    icon: Car,
    title: "Plano de Mensura para Automotores",
    subtitle: "Documentación para vehículos",
    description: "Plano de mensura especializado para automotores, necesario para trámites de transferencia, sucesiones y regularización de documentación vehicular.",
    features: [
      "Mensura vehicular completa",
      "Documentación técnica",
      "Certificación profesional",
      "Gestión ante organismos",
      "Asesoramiento integral"
    ],
    image: "/otros-servicos-page/otros-servicios-page-3.jpg",
    category: "Automotor",
    duration: "1-2 días",
    complexity: "Baja",
    price: "Desde $60.000",
    highlights: ["Especializado", "Rápido", "Oficial"]
  },
  {
    id: 4,
    icon: TreePine,
    title: "Relevamientos Ambientales",
    subtitle: "Estudios para proyectos sustentables",
    description: "Relevamientos topográficos especializados para estudios de impacto ambiental, proyectos sustentables y evaluaciones ecológicas.",
    features: [
      "Relevamiento ambiental",
      "Análisis de vegetación",
      "Estudio de suelos",
      "Informe técnico",
      "Recomendaciones ambientales"
    ],
    image: "/otros-servicos-page/otros-servicios-page-4.jpg",
    category: "Ambiental",
    duration: "3-7 días",
    complexity: "Alta",
    price: "Desde $200.000",
    highlights: ["Especializado", "Completo", "Certificado"]
  },
  {
    id: 5,
    icon: Calculator,
    title: "Cálculos de Superficie",
    subtitle: "Determinación precisa de áreas",
    description: "Cálculos especializados de superficies para terrenos irregulares, propiedades complejas y proyectos que requieren máxima precisión en la determinación de áreas.",
    features: [
      "Cálculo de superficies",
      "Análisis de irregularidades",
      "Certificación profesional",
      "Informe detallado",
      "Asesoramiento técnico"
    ],
    image: "/otros-servicos-page/otros-servicios-page-5.png",
    category: "Cálculos",
    duration: "1-2 días",
    complexity: "Media",
    price: "Desde $50.000",
    highlights: ["Preciso", "Certificado", "Rápido"]
  },
  {
    id: 6,
    icon: FileText,
    title: "Peritajes Judiciales",
    subtitle: "Asesoramiento técnico legal",
    description: "Peritajes técnicos para causas judiciales relacionadas con propiedades, límites, mediciones y conflictos inmobiliarios.",
    features: [
      "Peritaje técnico completo",
      "Informe judicial",
      "Asesoramiento legal",
      "Presentación en juicio",
      "Seguimiento del caso"
    ],
    image: "/otros-servicos-page/otros-servicios-page-6.jpg",
    category: "Judicial",
    duration: "5-15 días",
    complexity: "Alta",
    price: "Desde $300.000",
    highlights: ["Especializado", "Legal", "Confidencial"]
  }
];

const testimonials = [
  {
    name: "María González",
    service: "Relevamiento Topográfico",
    text: "Excelente trabajo en el relevamiento de nuestro terreno. Muy profesional y preciso.",
    rating: 5
  },
  {
    name: "Carlos Rodríguez",
    service: "Certificado de Dominio",
    text: "Rápido y confiable. Resolvió mi problema de documentación en tiempo récord.",
    rating: 5
  },
  {
    name: "Ana Martínez",
    service: "Peritaje Judicial",
    text: "Profesionalismo total. Su peritaje fue fundamental para ganar el juicio.",
    rating: 5
  }
];

export default function OtrosServiciosPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const openImageModal = (imageIndex: number) => {
    setSelectedImageIndex(imageIndex);
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const closeImageModal = () => {
    setSelectedImageIndex(null);
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };



  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRotation(prev => prev + 90);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        switch (e.key) {
          case 'Escape':
            closeImageModal();
            break;
          case '+':
          case '=':
            e.preventDefault();
            setZoom(prev => Math.min(prev + 0.25, 3));
            break;
          case '-':
            e.preventDefault();
            setZoom(prev => Math.max(prev - 0.25, 0.5));
            break;
          case 'r':
          case 'R':
            setRotation(prev => prev + 90);
            break;
          case '0':
            setZoom(1);
            setRotation(0);
            setPosition({ x: 0, y: 0 });
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  const filteredServices = selectedCategory 
    ? otrosServicios.filter(service => service.category === selectedCategory)
    : otrosServicios;

  const categories = [...new Set(otrosServicios.map(service => service.category))];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-background">
        {/* Header con diseño mejorado */}
        <div className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-background border-b overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto px-6 py-16">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Volver al inicio
            </Link>
            
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="rounded-full py-2 px-6 border-none mb-6 bg-primary/20 text-primary">
                Servicios Especializados
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Otros Servicios
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Servicios especializados de agrimensura y topografía para necesidades específicas. 
                Tecnología de vanguardia y experiencia profesional a tu disposición.
              </p>
              
              {/* Estadísticas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">6+</div>
                  <div className="text-sm text-muted-foreground">Servicios Especializados</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Años de Experiencia</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Proyectos Completados</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Satisfacción Cliente</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-muted/30 border-b">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                variant={selectedCategory === "" ? "default" : "outline"}
                onClick={() => setSelectedCategory("")}
                className="rounded-full"
              >
                Todos los Servicios
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Servicios */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid gap-12">
            {filteredServices.map((service, index) => (
              <Card key={service.id} className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Imagen con overlay mejorado */}
                  <div 
                    className="relative h-80 lg:h-full cursor-pointer group bg-gray-100"
                    onClick={() => openImageModal(index)}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="object-cover transition-transform duration-500 group-hover:scale-110 w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 rounded-full p-4 backdrop-blur-sm">
                        <ZoomIn size={32} className="text-gray-700" />
                      </div>
                    </div>
                    
                    {/* Badge de categoría */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary/90 text-white border-none">
                        {service.category}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Contenido mejorado */}
                  <div className="p-8 lg:p-12">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="bg-primary/10 p-3 rounded-xl">
                        <service.icon className="text-primary" size={32} />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">{service.title}</h2>
                        <p className="text-lg text-primary font-medium mb-4">{service.subtitle}</p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                      {service.description}
                    </p>
                    
                    {/* Características principales */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg flex items-center gap-2">
                          <CheckCircle className="text-primary" size={20} />
                          Características
                        </h4>
                        <ul className="space-y-2">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg flex items-center gap-2">
                          <Award className="text-primary" size={20} />
                          Información
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock size={16} className="text-muted-foreground" />
                            <span className="font-medium">Duración:</span> {service.duration}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Target size={16} className="text-muted-foreground" />
                            <span className="font-medium">Complejidad:</span> {service.complexity}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <TrendingUp size={16} className="text-muted-foreground" />
                            <span className="font-medium">Precio:</span> {service.price}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {service.highlights.map((highlight, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Botones de acción */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button asChild size="lg" className="flex-1">
                        <a href="https://api.whatsapp.com/send/?phone=5491167058156&text=Hola%21+Quisiera+un+presupuesto+sobre+un+trabajo+de+Agrimensura" target="_blank" rel="noopener noreferrer">
                          Solicitar Presupuesto
                          <ArrowRight size={16} className="ml-2" />
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="lg">
                        <Link href={`tel:+5491167058156`}>
                          <Phone size={16} className="mr-2" />
                          Llamar
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonios */}
        <div className="bg-muted/30 border-t border-b">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Lo que dicen nuestros clientes</h2>
              <p className="text-xl text-muted-foreground">
                Experiencias reales de clientes satisfechos con nuestros servicios especializados
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.service}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section mejorado */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">
                ¿Necesitas un servicio especializado?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Consultas sin cargo y presupuestos personalizados. Nuestro equipo est&aacute; listo para ayudarte con cualquier proyecto de agrimensura.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <a href="https://api.whatsapp.com/send/?phone=5491167058156&text=Hola%21+Quisiera+un+presupuesto+sobre+un+trabajo+de+Agrimensura" target="_blank" rel="noopener noreferrer">
                    Solicitar Presupuesto
                    <ArrowRight size={20} className="ml-2" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                  <Link href="/contacto">
                    Contacto
                  </Link>
                </Button>
              </div>

              {/* Información de contacto */}
              <div className="grid md:grid-cols-3 gap-8">
                <div className="flex items-center justify-center gap-3">
                  <Phone className="text-primary" size={24} />
                  <div className="text-left">
                    <p className="font-medium">+54 9 11 6705-8156</p>
                    <p className="text-sm text-muted-foreground">Llamadas y WhatsApp</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Mail className="text-primary" size={24} />
                  <div className="text-left">
                    <p className="font-medium">contacto@miagrimensor.com</p>
                    <p className="text-sm text-muted-foreground">Consultas y presupuestos</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <MapPin className="text-primary" size={24} />
                  <div className="text-left">
                    <p className="font-medium">Avellaneda, Buenos Aires</p>
                    <p className="text-sm text-muted-foreground">Zona de cobertura GBA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Modal mejorado para imagen grande */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={closeImageModal}
        >
          {/* Controles superiores */}
          <div 
            className="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/70 backdrop-blur-sm rounded-full px-6 py-3 text-white z-[60]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              title="Zoom Out (-)"
            >
              <ZoomOut size={20} />
            </button>
            <span className="text-sm font-medium min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              title="Zoom In (+)"
            >
              <ZoomIn size={20} />
            </button>
            <div className="w-px h-6 bg-white/30 mx-2"></div>
            <button
              onClick={handleRotate}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              title="Rotate (R)"
            >
              <RotateCcw size={20} />
            </button>
            <button
              onClick={handleReset}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              title="Reset (0)"
            >
              <span className="text-sm font-bold">⟲</span>
            </button>
          </div>

          {/* Botón cerrar */}
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-[60] bg-black/70 backdrop-blur-sm rounded-full p-3"
            title="Close (ESC)"
          >
            <X size={24} />
          </button>



          {/* Contenedor de imagen */}
          <div className="relative max-w-[95vw] max-h-[95vh] mt-16 z-10">
            <div 
              className="relative w-full h-full cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <img
                src={otrosServicios[selectedImageIndex].image}
                alt={otrosServicios[selectedImageIndex].title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg transition-transform duration-300 ease-out"
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                  transformOrigin: 'center center',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  perspective: '1000px',
                  imageRendering: 'crisp-edges',
                }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              />
            </div>
          </div>



          {/* Atajos de teclado */}
          <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-3 text-white text-xs opacity-0 hover:opacity-100 transition-opacity z-[60]">
            <div>+ - Zoom</div>
            <div>R Rotar</div>
            <div>0 Reset</div>
            <div>ESC Cerrar</div>
          </div>
        </div>
      )}
      
      <ScrollToTop />
    </>
  );
}
