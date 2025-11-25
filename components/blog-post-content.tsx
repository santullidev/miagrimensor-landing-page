"use client"

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  User,
  BookOpen,
  ArrowRight,
  LinkedinIcon,
  MessageCircle,
  X,
} from "lucide-react";
import Link from "next/link";

import { type BlogPost } from "@/lib/blog-data";

interface BlogPostContentProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostContent({ post, relatedPosts }: BlogPostContentProps) {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const openImageModal = (src: string, alt: string) => {
    setSelectedImage({ src, alt });
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  // Convertir markdown a HTML (mejorado)
  const renderContent = (content: string) => {
    // Función auxiliar para procesar negritas (**texto**)
    const processBold = (text: string): (string | JSX.Element)[] => {
      const parts = text.split(/(\*\*.*?\*\*)/g);
      return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.substring(2, part.length - 2)}</strong>;
        }
        return part;
      });
    };

    // Secciones que deben ir en cards destacadas
    const cardSections = [
      // Provincia de Buenos Aires
      'Elementos del Estado Parcelario:',
      'Importancia del Estado Parcelario',
      'Artículo 50',
      'Certificado Catastral VS Estado Parcelario',
      'Vigencia del Estado Parcelario',
      '¿A que llaman renovación?',
      'Dispo 6117/15',
      'Resolución Normativa 22/12 ARBA',
      'Provincia de Buenos Aires',
      '¿Por qué la confusión?',
      // CABA
      'Ley de Catastro N° 6437 (CABA)',
      'Resumen General',
      'Objetivos del Catastro:',
      'Principios clave:',
      'Estado Parcelario',
      'Elementos del Estado Parcelario:',
      'Artículo 49',
      'Artículo 51',
      'Artículo 52',
      'Artículo 53°',
      'Artículo 54°',
      'Exentos de Constitución del Estado Parcelario',
      'Obligatoriedad de Constitución y Verificación del estado parcelario',
      'Constitución de Estado Parcelario (en Mensuras)',
      'Ejemplo de Certificado Catastral Del Estado Parcelario'
    ];

    // Primero, detectar y procesar bloques especiales [FLUJO_PROCESO]...[/FLUJO_PROCESO]
    const flujoProcesoRegex = /\[FLUJO_PROCESO\]([\s\S]*?)\[\/FLUJO_PROCESO\]/g;
    const flujoProcesos: Array<{ content: string; index: number }> = [];
    let match;
    let placeholderIndex = 0;
    
    let processedContent = content;
    while ((match = flujoProcesoRegex.exec(content)) !== null) {
      const placeholder = `__FLUJO_PROCESO_${placeholderIndex}__`;
      processedContent = processedContent.replace(match[0], placeholder);
      flujoProcesos.push({
        content: match[1].trim(),
        index: placeholderIndex++
      });
    }

    const lines = processedContent.split('\n');
    const elements: JSX.Element[] = [];
    let currentList: JSX.Element[] = [];
    let listKey = 0;
    let pKey = 0;
    let cardKey = 0;
    let inCardSection = false;
    let cardContent: JSX.Element[] = [];
    let cardTitle = '';
    let isImportantCard = false; // Para Artículo 50 y otras secciones importantes

    lines.forEach((line, index) => {
      // Detectar placeholder de flujo de proceso
      const flujoMatch = line.match(/^__FLUJO_PROCESO_(\d+)__$/);
      if (flujoMatch) {
        const flujoIndex = parseInt(flujoMatch[1]);
        const flujo = flujoProcesos.find(f => f.index === flujoIndex);
        if (flujo) {
          if (currentList.length > 0) {
            elements.push(<ul key={`list-${listKey++}`} className="list-disc ml-6 mb-4 space-y-1">{currentList}</ul>);
            currentList = [];
          }
          // Renderizar card normal con el flujo del proceso
          const processSteps = flujo.content.split('→').map(s => s.trim()).filter(s => s);
          const cardBg = 'bg-gradient-to-br from-blue/5 to-blue/10 border-blue/30';
          elements.push(
            <Card key={`flujo-${index}`} className={`${cardBg} border-2 shadow-soft-lg my-6 sm:my-8 rounded-modern-lg overflow-hidden`}>
              <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6 pt-5 sm:pt-6">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground leading-tight">Flujo del proceso:</h3>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-5 sm:pb-6">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 text-foreground text-sm sm:text-base font-medium text-center leading-relaxed flex-wrap">
                  {processSteps.map((step, stepIndex) => (
                    <React.Fragment key={stepIndex}>
                      <span className="whitespace-normal sm:whitespace-nowrap">{step}</span>
                      {stepIndex < processSteps.length - 1 && (
                        <span className="text-foreground text-lg sm:text-xl md:text-2xl font-bold">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        }
        return;
      }

      // Imágenes markdown ![alt](src)
      if (line.match(/^!\[.*?\]\(.*?\)$/)) {
        const match = line.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (match) {
          const alt = match[1];
          const src = match[2];
          if (currentList.length > 0) {
            elements.push(<ul key={`list-${listKey++}`} className="list-disc ml-6 mb-4 space-y-1">{currentList}</ul>);
            currentList = [];
          }
          elements.push(
            <div key={`img-${index}`} className="my-6 sm:my-8">
              <img 
                src={src} 
                alt={alt} 
                className="w-full rounded-modern shadow-soft-lg border border-green/20 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openImageModal(src, alt)}
              />
              {alt && (
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 text-center">{alt}</p>
              )}
            </div>
          );
        }
        return;
      }

      // Agregar imágenes específicas después de "Catastro revisa..." en el post de Estado Parcelario
      if (line.trim() === 'Catastro revisa, aprueba y recién entonces expide el certificado que usará el escribano para tu venta.' && 
          post.slug === 'todo-sobre-el-estado-parcelario-en-la-provincia-de-buenos-aires') {
        if (currentList.length > 0) {
          elements.push(<ul key={`list-${listKey++}`} className="list-disc ml-6 mb-4 space-y-1">{currentList}</ul>);
          currentList = [];
        }
        // Orden: primero Estados Parcelarios, luego Declaraciones Juradas
        const additionalImages = [
          { src: '/blog/todo-sobre-el-estado-parcelario-en-la-provincia-de-buenos-aires/estados-parcelarios-1.jpg', alt: 'Estados Parcelarios 1', title: 'Estado Parcelario - Ejemplo 1' },
          { src: '/blog/todo-sobre-el-estado-parcelario-en-la-provincia-de-buenos-aires/estados-parcelarios-2.jpg', alt: 'Estados Parcelarios 2', title: 'Estado Parcelario - Ejemplo 2' },
          { src: '/blog/todo-sobre-el-estado-parcelario-en-la-provincia-de-buenos-aires/declaraciones-juradas-1.jpg', alt: 'Declaraciones Juradas 1', title: 'Declaración Jurada - Ejemplo 1' },
          { src: '/blog/todo-sobre-el-estado-parcelario-en-la-provincia-de-buenos-aires/declaraciones-juradas-2.jpg', alt: 'Declaraciones Juradas 2', title: 'Declaración Jurada - Ejemplo 2' }
        ];
        
        additionalImages.forEach((img, imgIndex) => {
          elements.push(
            <div key={`estado-parcelario-img-${imgIndex}`} className="my-6 sm:my-8">
              <h4 className="text-sm sm:text-base font-semibold text-foreground mb-3 text-center">{img.title}</h4>
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full rounded-modern shadow-soft-lg border border-green/20 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openImageModal(img.src, img.alt)}
              />
            </div>
          );
        });
      }

      // Función para cerrar card si está abierta
      const closeCard = () => {
        if (inCardSection && cardContent.length > 0) {
          const cardBg = isImportantCard ? 'bg-gradient-to-br from-green/5 via-blue/5 to-green/5 border-green/30' : 'bg-gradient-to-br from-slate/5 via-slate/10 to-slate/5 border-slate/20';
          elements.push(
            <Card key={`card-${cardKey++}`} className={`${cardBg} border-2 shadow-soft-lg my-6 sm:my-8 rounded-modern-lg overflow-hidden`}>
              <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6 pt-5 sm:pt-6">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground leading-tight">{cardTitle}</h3>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-5 sm:pb-6 space-y-3 sm:space-y-4">
                {cardContent}
              </CardContent>
            </Card>
          );
          cardContent = [];
          inCardSection = false;
          isImportantCard = false;
          cardTitle = '';
        }
        if (currentList.length > 0) {
          const listElement = <ul key={`list-${listKey++}`} className="list-disc ml-4 sm:ml-6 mb-3 sm:mb-4 space-y-2 sm:space-y-2.5">{currentList}</ul>;
          if (inCardSection) {
            cardContent.push(listElement);
          } else {
            elements.push(listElement);
          }
          currentList = [];
        }
      };

      // Headings
      if (line.startsWith('# ')) {
        closeCard();
        const h1Text = line.substring(2);
        elements.push(<h1 key={`h1-${index}`} className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 mt-8 sm:mt-10 first:mt-0 leading-tight">{h1Text}</h1>);
        // Si la siguiente línea es el subtítulo "Qué - Cómo...", darle estilo especial
        if (index + 1 < lines.length && lines[index + 1].trim().includes('Qué - Cómo')) {
          return;
        }
        return;
      }
      
      // Detectar subtítulo especial después del título principal
      if (line.trim() === 'Qué - Cómo - Cuándo - Por qué - Dónde Provincia de Buenos Aires' || 
          line.trim().includes('Qué - Cómo - Cuándo')) {
        closeCard();
        elements.push(
          <p key={`subtitle-${index}`} className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 font-medium tracking-wide">
            {line.trim()}
          </p>
        );
        return;
      }
      
      // Detectar línea "Que - Como - Cuando..." 
      if (line.trim() === 'Que - Como - Cuando - Porque - Donde') {
        closeCard();
        elements.push(
          <div key={`badge-${index}`} className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            {line.trim().split(' - ').map((word, i) => (
              <Badge key={i} variant="secondary" className="text-xs sm:text-sm">
                {word}
              </Badge>
            ))}
          </div>
        );
        return;
      }
      if (line.startsWith('## ')) {
        closeCard();
        const headingText = line.substring(3);
        // Verificar si es una sección que debe ir en card
        const shouldBeCard = cardSections.some(section => headingText.includes(section));
        if (shouldBeCard) {
          inCardSection = true;
          cardTitle = headingText;
          isImportantCard = headingText.includes('Artículo 50') || headingText.includes('Importancia') || headingText.includes('Certificado Catastral') || headingText.includes('Ley de Catastro') || headingText.includes('Estado Parcelario') && !headingText.includes('El Estado Parcelario en la Ciudad');
          return;
        }
        elements.push(<h2 key={`h2-${index}`} className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-5 mt-8 sm:mt-10 leading-tight">{headingText}</h2>);
        return;
      }
      if (line.startsWith('### ')) {
        closeCard();
        const headingText = line.substring(4);
        const shouldBeCard = cardSections.some(section => headingText.includes(section));
        if (shouldBeCard) {
          inCardSection = true;
          cardTitle = headingText;
          isImportantCard = headingText.includes('Artículo') || headingText.includes('Importancia') || headingText.includes('Elementos') || headingText.includes('Resumen General') || headingText.includes('Objetivos') || headingText.includes('Principios');
          return;
        }
        elements.push(<h3 key={`h3-${index}`} className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 mt-6 sm:mt-8">{headingText}</h3>);
        return;
      }
      if (line.startsWith('#### ')) {
        closeCard();
        const headingText = line.substring(5);
        const shouldBeCard = cardSections.some(section => headingText.includes(section));
        if (shouldBeCard) {
          inCardSection = true;
          cardTitle = headingText;
          isImportantCard = headingText.includes('Elementos') || headingText.includes('Esenciales') || headingText.includes('Complementarios');
          return;
        }
        elements.push(<h4 key={`h4-${index}`} className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 mt-4 sm:mt-6">{headingText}</h4>);
        return;
      }
      if (line.startsWith('#### ')) {
        closeCard();
        const headingText = line.substring(5);
        elements.push(<h4 key={`h4-${index}`} className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 mt-4 sm:mt-6">{headingText}</h4>);
        return;
      }

      // Listas
      if (line.startsWith('- ') || line.startsWith('✔ ')) {
        const text = line.substring(2);
        const processedText = processBold(text);
        currentList.push(<li key={`li-${index}`} className="mb-1.5 sm:mb-2 leading-relaxed text-sm sm:text-base">{processedText}</li>);
        return;
      }

      // Si hay una lista pendiente y encontramos una línea vacía o diferente, cerrarla
      if (currentList.length > 0 && (line.trim() === '' || !line.startsWith('- ') && !line.startsWith('✔ '))) {
        const listElement = <ul key={`list-${listKey++}`} className="list-disc ml-4 sm:ml-6 mb-3 sm:mb-4 space-y-2 sm:space-y-2.5">{currentList}</ul>;
        if (inCardSection) {
          cardContent.push(listElement);
        } else {
          elements.push(listElement);
        }
        currentList = [];
      }

      // Texto con negrita
      if (line.includes('**') && !line.startsWith('- ') && !line.startsWith('✔ ')) {
        if (currentList.length > 0) {
          const listElement = <ul key={`list-${listKey++}`} className="list-disc ml-4 sm:ml-6 mb-3 sm:mb-4 space-y-2 sm:space-y-2.5">{currentList}</ul>;
          if (inCardSection) {
            cardContent.push(listElement);
          } else {
            elements.push(listElement);
          }
          currentList = [];
        }
        const formatted = processBold(line);
        const pElement = <p key={`p-${pKey++}`} className="mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">{formatted}</p>;
        if (inCardSection) {
          cardContent.push(pElement);
        } else {
          elements.push(pElement);
        }
        return;
      }

      // Líneas vacías
      if (line.trim() === '') {
        if (currentList.length > 0) {
          const listElement = <ul key={`list-${listKey++}`} className="list-disc ml-4 sm:ml-6 mb-3 sm:mb-4 space-y-2 sm:space-y-2.5">{currentList}</ul>;
          if (inCardSection) {
            cardContent.push(listElement);
          } else {
            elements.push(listElement);
          }
          currentList = [];
        }
        return;
      }

      // Párrafos normales
      if (line.trim() && !line.startsWith('- ') && !line.startsWith('✔ ') && !line.match(/^!\[.*?\]\(.*?\)$/)) {
        if (currentList.length > 0) {
          const listElement = <ul key={`list-${listKey++}`} className="list-disc ml-4 sm:ml-6 mb-3 sm:mb-4 space-y-2 sm:space-y-2.5">{currentList}</ul>;
          if (inCardSection) {
            cardContent.push(listElement);
          } else {
            elements.push(listElement);
          }
          currentList = [];
        }
        
        // Detectar si es un título de sección que debe ir en card (como "Certificado Catastral VS Estado Parcelario")
        const trimmedLine = line.trim();
        // No procesar como título si ya estamos en una card (excepto si es para iniciar una nueva)
        if ((trimmedLine === 'Certificado Catastral VS Estado Parcelario' || 
            trimmedLine.startsWith('Flujo del proceso:')) && !inCardSection) {
          inCardSection = true;
          cardTitle = trimmedLine;
          isImportantCard = trimmedLine.includes('Certificado Catastral') || trimmedLine.includes('Flujo');
          return;
        }
        
        // Si encontramos una línea que empieza con letra seguida de paréntesis (a), b), etc.), es una lista numerada
        if (trimmedLine.match(/^[a-z]\)\s/)) {
          const processedLine = line.includes('**') ? processBold(line) : line;
          const pElement = <p key={`p-${pKey++}`} className="mb-2 sm:mb-3 leading-relaxed text-sm sm:text-base ml-2 sm:ml-4">{processedLine}</p>;
          if (inCardSection) {
            cardContent.push(pElement);
          } else {
            elements.push(pElement);
          }
          return;
        }
        
        // Procesar texto con checkmarks (✔) y negritas
        if (line.includes('✔')) {
          const parts = line.split(/(✔)/g);
          const formatted = parts.map((part, i) => {
            if (part === '✔') {
              return <span key={i} className="text-green mr-1.5">✔</span>;
            }
            // Procesar negritas dentro de cada parte
            return <React.Fragment key={i}>{processBold(part)}</React.Fragment>;
          });
          const pElement = <p key={`p-${pKey++}`} className="mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">{formatted}</p>;
          if (inCardSection) {
            cardContent.push(pElement);
          } else {
            elements.push(pElement);
          }
        } else {
          // Procesar negritas también en párrafos normales
          const processedLine = line.includes('**') ? processBold(line) : line;
          // Si la línea es muy corta y parece un título, hacerla más destacada
          const isTitleLike = trimmedLine.length < 80 && !trimmedLine.includes('.') && !trimmedLine.toLowerCase().startsWith('según') && !trimmedLine.toLowerCase().startsWith('en ');
          const pElement = <p key={`p-${pKey++}`} className={`mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base ${isTitleLike && !inCardSection ? 'font-semibold text-lg sm:text-xl' : ''}`}>{processedLine}</p>;
          if (inCardSection) {
            cardContent.push(pElement);
          } else {
            elements.push(pElement);
          }
        }
      }
    });

    // Cerrar lista pendiente y card al final
    if (currentList.length > 0) {
      const listElement = <ul key={`list-${listKey++}`} className="list-disc ml-4 sm:ml-6 mb-3 sm:mb-4 space-y-2 sm:space-y-2.5">{currentList}</ul>;
      if (inCardSection) {
        cardContent.push(listElement);
      } else {
        elements.push(listElement);
      }
    }
    
    // Cerrar card pendiente al final
    if (inCardSection && cardContent.length > 0) {
      const cardBg = isImportantCard ? 'bg-gradient-to-br from-green/5 via-blue/5 to-green/5 border-green/30' : 'bg-gradient-to-br from-slate/5 via-slate/10 to-slate/5 border-slate/20';
      elements.push(
        <Card key={`card-${cardKey++}`} className={`${cardBg} border-2 shadow-soft-lg my-6 sm:my-8 rounded-modern-lg overflow-hidden`}>
          <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6 pt-5 sm:pt-6">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground leading-tight">{cardTitle}</h3>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-5 sm:pb-6 space-y-3 sm:space-y-4">
            {cardContent}
          </CardContent>
        </Card>
      );
    }

    // Agregar imágenes al final del post sobre Estado Parcelario en CABA
    if (post.slug === 'todo-sobre-el-estado-parcelario-en-la-ciudad-autonoma-de-buenos-aires') {
      const cabaImages = [
        { src: '/blog/todo-sobre-el-estado-parcelario-en-la-ciudad-autonoma-de-buenos-aires/Certificado-pacelario-1.avif', alt: 'Certificado Parcelario CABA 1', title: 'Ejemplo de Certificado Parcelario CABA - 1' },
        { src: '/blog/todo-sobre-el-estado-parcelario-en-la-ciudad-autonoma-de-buenos-aires/Certificado-pacelario-2.avif', alt: 'Certificado Parcelario CABA 2', title: 'Ejemplo de Certificado Parcelario CABA - 2' },
        { src: '/blog/todo-sobre-el-estado-parcelario-en-la-ciudad-autonoma-de-buenos-aires/Certificado-pacelario-3.avif', alt: 'Certificado Parcelario CABA 3', title: 'Ejemplo de Certificado Parcelario CABA - 3' }
      ];

      // Agregar un título de sección antes de las imágenes
      elements.push(
        <h3 key="caba-images-title" className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 mt-8 sm:mt-10">
          Ejemplos de Estados Parcelarios en CABA
        </h3>
      );

      cabaImages.forEach((img, imgIndex) => {
        elements.push(
          <div key={`caba-img-${imgIndex}`} className="my-6 sm:my-8">
            <h4 className="text-sm sm:text-base font-semibold text-foreground mb-3 text-center">{img.title}</h4>
            <img 
              src={img.src} 
              alt={img.alt} 
              className="w-full rounded-modern shadow-soft-lg border border-green/20 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openImageModal(img.src, img.alt)}
            />
          </div>
        );
      });
    }

    return elements;
  };

  // Compartir en redes sociales
  const sharePost = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    // const text = post.excerpt;

    let shareUrl = '';
    switch (platform) {
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
             case 'whatsapp':
         shareUrl = `https://api.whatsapp.com/send/?phone=5491167058156&text=${encodeURIComponent(`${title} ${url}`)}`;
         break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header del artículo */}
      <div className="bg-gradient-to-b from-primary/10 to-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
              <Link href="/" className="hover:text-foreground transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-foreground transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-foreground truncate max-w-[200px] sm:max-w-none">{post.title}</span>
            </div>

            {/* Categoría y tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="text-xs">
                {post.category}
              </Badge>
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - 3}
                </Badge>
              )}
            </div>

            {/* Título */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Extracto */}
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Metadatos */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8">
              <div className="flex items-center gap-2">
                <User size={14} className="sm:w-4 sm:h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="sm:w-4 sm:h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="sm:w-4 sm:h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Botones de compartir - Solo LinkedIn y WhatsApp */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <span className="text-xs sm:text-sm text-muted-foreground">Compartir:</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => sharePost('linkedin')}
                  className="flex items-center gap-2 text-xs h-8 px-3"
                >
                  <LinkedinIcon size={12} />
                  <span className="hidden sm:inline">LinkedIn</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => sharePost('whatsapp')}
                  className="flex items-center gap-2 text-xs h-8 px-3"
                >
                  <MessageCircle size={12} />
                  <span className="hidden sm:inline">WhatsApp</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido del artículo */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
          {/* Imagen destacada */}
          {post.featuredImage && (
            <div className="relative w-full h-64 sm:h-80 lg:h-96 mb-6 sm:mb-8 rounded-xl overflow-hidden">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="bg-card border rounded-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
            {renderContent(post.content)}
          </div>
        </article>

        {/* Artículos relacionados */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Artículos relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <Link href={`/blog/${relatedPost.slug}`}>
                    {/* Imagen destacada */}
                    <div className="relative h-24 sm:h-32 overflow-hidden">
                      {relatedPost.featuredImage ? (
                        <img
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <BookOpen size={24} className="sm:w-8 sm:h-8 text-primary/60" />
                          </div>
                        </>
                      )}
                    </div>

                    <CardHeader className="pb-3 sm:pb-4 px-3 sm:px-4">
                      {/* Categoría */}
                      <Badge variant="secondary" className="text-xs w-fit">
                        {relatedPost.category}
                      </Badge>

                      {/* Título */}
                      <h3 className="text-sm sm:text-lg font-bold tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>

                      {/* Extracto */}
                      <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </CardHeader>

                    <CardContent className="pt-0 px-3 sm:px-4 pb-3 sm:pb-4">
                      {/* Metadatos */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground mb-3 sm:mb-4 gap-1 sm:gap-0">
                        <div className="flex items-center gap-1">
                          <Calendar size={10} className="sm:w-3 sm:h-3" />
                          <span className="text-xs">{formatDate(relatedPost.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={10} className="sm:w-3 sm:h-3" />
                          <span className="text-xs">{relatedPost.readTime}</span>
                        </div>
                      </div>

                      {/* Botón leer más */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors h-8 text-xs"
                      >
                        Leer más
                        <ArrowRight size={12} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-primary/5 border rounded-xl p-4 sm:p-6 lg:p-8 text-center mt-12 sm:mt-16">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">
            ¿Necesitas servicios de agrimensura?
          </h3>
          <p className="text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Ofrecemos consultas sin cargo y presupuestos en el día para todos nuestros servicios de agrimensura y topografía.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a href="https://api.whatsapp.com/send/?phone=5491167058156&text=Hola%21+Quisiera+un+presupuesto+sobre+un+trabajo+de+Agrimensura" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full sm:w-auto h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base">
                Solicitar presupuesto
              </Button>
            </a>
            <Link href="/servicios">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base">
                Ver servicios
              </Button>
            </Link>
          </div>
        </div>

        {/* Volver al blog */}
        <div className="text-center mt-6 sm:mt-8">
          <Link href="/blog">
            <Button variant="ghost" className="flex items-center gap-2 mx-auto text-sm sm:text-base">
              <ArrowRight size={14} className="sm:w-4 sm:h-4 rotate-180" />
              Volver al blog
            </Button>
          </Link>
        </div>
      </div>

      {/* Modal para imagen ampliada */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={closeImageModal}
        >
          {/* Botón cerrar */}
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-[101] bg-black/50 backdrop-blur-sm rounded-full p-2 sm:p-3"
            aria-label="Cerrar"
          >
            <X size={24} className="sm:w-6 sm:h-6" />
          </button>

          {/* Imagen ampliada */}
          <div className="relative max-w-[95vw] max-h-[95vh] flex items-center justify-center">
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Texto de ayuda en mobile */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xs sm:text-sm text-center bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 sm:hidden">
            Toca fuera de la imagen para cerrar
          </div>
        </div>
      )}
    </div>
  );
}
