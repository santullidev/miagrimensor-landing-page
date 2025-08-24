"use client"

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
} from "lucide-react";
import Link from "next/link";

import { type BlogPost } from "@/lib/blog-data";

interface BlogPostContentProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostContent({ post, relatedPosts }: BlogPostContentProps) {
  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Convertir markdown a HTML (simplificado)
  const renderContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-2xl sm:text-3xl font-bold mb-4 mt-8 first:mt-0">{line.substring(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-xl sm:text-2xl font-bold mb-3 mt-6">{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-lg sm:text-xl font-bold mb-2 mt-4">{line.substring(4)}</h3>;
        }
        if (line.startsWith('#### ')) {
          return <h4 key={index} className="text-base sm:text-lg font-bold mb-2 mt-3">{line.substring(5)}</h4>;
        }
        if (line.startsWith('- ')) {
          return <li key={index} className="ml-4 mb-1">{line.substring(2)}</li>;
        }
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={index} className="mb-4"><strong>{line.substring(2, line.length - 2)}</strong></p>;
        }
        if (line.trim() === '') {
          return <br key={index} />;
        }
        if (line.trim()) {
          return <p key={index} className="mb-4 leading-relaxed">{line}</p>;
        }
        return null;
      });
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
    </div>
  );
}
