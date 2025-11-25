"use client"

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Calendar,
  Clock,
  User,
  Filter,
  ArrowRight,
  BookOpen,
} from "lucide-react";

import Link from "next/link";
import { useState, useEffect } from "react";
import { blogPosts, categories, tags, type BlogPost } from "@/lib/blog-data";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar/navbar";
import ScrollToTop from "@/components/scroll-to-top";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);

  // Filtrar posts basado en búsqueda, categoría y tag
  useEffect(() => {
    let filtered = blogPosts;

    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filtrar por categoría
    if (selectedCategory) {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filtrar por tag
    if (selectedTag) {
      filtered = filtered.filter(post => post.tags.includes(selectedTag));
    }

    setFilteredPosts(filtered);
  }, [searchQuery, selectedCategory, selectedTag]);

  // Limpiar filtros
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedTag("");
  };

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-b from-primary/10 to-background border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            {/* Volver al inicio - Posicionado como en otras páginas */}
            <div className="mb-6 sm:mb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowRight className="rotate-180" size={16} />
                Volver al inicio
              </Link>
            </div>
            
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="rounded-full py-2 px-4 border-none mb-6 sm:mb-8 text-sm bg-green text-white font-semibold shadow-soft">
                Blog de Agrimensura
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight text-foreground">
                Explorando el Mundo de la Agrimensura:<br className="hidden sm:block" /> Lo que Necesitas Saber
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4 sm:px-0 leading-relaxed">
                Bienvenido a mi blog, donde comparto mi experiencia de más de 15 años en agrimensura y topografía. Aquí encontrarás información clara y accesible sobre estados parcelarios, relevamientos topográficos y cómo estos conceptos afectan directamente tus decisiones inmobiliarias y proyectos de desarrollo.
              </p>
            </div>
          </div>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="bg-card border rounded-xl p-4 sm:p-6 lg:p-8 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Búsqueda */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  placeholder="Buscar artículos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              {/* Filtro por categoría */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2212%22%20height%3D%228%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M1.41.59%206%205.17%2010.59.59%2012%202%206%208%200%202z%22%20fill%3D%22%236B7280%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_12px_center]"
              >
                <option value="">Todas las categorías</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Filtro por tag */}
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2212%22%20height%3D%228%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M1.41.59%206%205.17%2010.59.59%2012%202%206%208%200%202z%22%20fill%3D%22%236B7280%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_12px_center]"
              >
                <option value="">Todos los tags</option>
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>

              {/* Botón limpiar filtros */}
              <Button
                onClick={clearFilters}
                variant="outline"
                className="flex items-center gap-2 h-12"
              >
                <Filter size={16} />
                <span className="hidden sm:inline">Limpiar filtros</span>
                <span className="sm:hidden">Limpiar</span>
              </Button>
            </div>

            {/* Tags activos */}
            {(selectedCategory || selectedTag) && (
              <div className="flex flex-wrap gap-2 mt-6">
                {selectedCategory && (
                  <Badge variant="secondary" className="flex items-center gap-1 py-2 px-3">
                    Categoría: {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory("")}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {selectedTag && (
                  <Badge variant="secondary" className="flex items-center gap-1 py-2 px-3">
                    Tag: {selectedTag}
                    <button
                      onClick={() => setSelectedTag("")}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Resultados */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Artículos ({filteredPosts.length})
              </h2>
              {filteredPosts.length === 0 && (
                <p className="text-muted-foreground text-sm sm:text-base">
                  No se encontraron artículos con los filtros aplicados.
                </p>
              )}
            </div>

            {/* Lista de artículos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <Link href={`/blog/${post.slug}`}>
                    {/* Imagen destacada */}
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      {post.featuredImage ? (
                                          <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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

                    <CardHeader className="pb-4 px-4 sm:px-6">
                      {/* Categoría y tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="secondary" className="text-xs py-1 px-2">
                          {post.category}
                        </Badge>
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs py-1 px-2">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Título */}
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                        {post.title}
                      </h3>

                      {/* Extracto */}
                      <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </CardHeader>

                    <CardContent className="pt-0 px-4 sm:px-6 pb-4 sm:pb-6">
                      {/* Metadatos */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground mb-4 gap-2 sm:gap-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                          <div className="flex items-center gap-1">
                            <User size={12} />
                            <span className="text-xs">{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span className="text-xs">{formatDate(post.publishedAt)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span className="text-xs">{post.readTime}</span>
                        </div>
                      </div>

                      {/* Botón leer más */}
                      <Button
                        variant="ghost"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors h-10"
                      >
                        Leer más
                        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary/5 border rounded-xl p-6 sm:p-8 text-center">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
              ¿Necesitas servicios de agrimensura?
            </h3>
            <p className="text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Ofrecemos consultas sin cargo y presupuestos en el día para todos nuestros servicios de agrimensura y topografía.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://api.whatsapp.com/send/?phone=5491167058156&text=Hola%21+Quisiera+un+presupuesto+sobre+un+trabajo+de+Agrimensura" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto h-12 px-6">
                  Solicitar presupuesto
                </Button>
              </a>
              <Link href="/servicios">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-6">
                  Ver servicios
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </>
  );
}
