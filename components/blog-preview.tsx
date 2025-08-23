"use client"

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getFeaturedPosts } from "@/lib/blog-data";

export default function BlogPreview() {
  const featuredPosts = getFeaturedPosts().slice(0, 3);

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section className="max-w-7xl mx-auto w-full py-12 xs:py-20 px-6">
      <div className="text-center mb-12">
        <Badge className="rounded-full py-1 border-none mb-4">
          Blog de Agrimensura
        </Badge>
        <h2 className="text-3xl xs:text-4xl md:text-5xl md:leading-[3.5rem] font-bold tracking-tight mb-4">
          Últimos Artículos
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Información clara y accesible sobre agrimensura, topografía y su impacto en el mundo inmobiliario.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {featuredPosts.map((post) => (
          <Card
            key={post.id}
            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <Link href={`/blog/${post.slug}`}>
              {/* Imagen destacada */}
              <div className="relative h-48 overflow-hidden">
                {post.featuredImage ? (
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen size={48} className="text-primary/60" />
                    </div>
                  </>
                )}
              </div>

              <CardHeader className="pb-4">
                {/* Categoría y tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Título */}
                <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Extracto */}
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {post.excerpt}
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Metadatos */}
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User size={12} />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(post.publishedAt)}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </div>
                </div>

                {/* Botón leer más */}
                <Button
                  variant="ghost"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  Leer más
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Link href="/blog">
          <Button size="lg" className="flex items-center gap-2 mx-auto">
            Ver todos los artículos
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
    </section>
  );
}
