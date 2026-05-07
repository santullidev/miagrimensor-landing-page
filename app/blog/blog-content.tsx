"use client"

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Clock, User, Filter, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import type { SanityBlogPost, SiteSettings } from "@/sanity/lib/types";

interface BlogContentProps {
  posts: SanityBlogPost[]
  settings: SiteSettings
}

export default function BlogContent({ posts, settings }: BlogContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");

  // Extract unique categories and tags from the actual data
  const categories = useMemo(() => [...new Set(posts.map(p => p.category).filter(Boolean))], [posts]);
  const tags = useMemo(() => [...new Set(posts.flatMap(p => p.tags || []))], [posts]);

  const filteredPosts = useMemo(() => {
    let filtered = posts;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        (post.tags || []).some(tag => tag.toLowerCase().includes(q))
      );
    }
    if (selectedCategory) filtered = filtered.filter(post => post.category === selectedCategory);
    if (selectedTag) filtered = filtered.filter(post => (post.tags || []).includes(selectedTag));
    return filtered;
  }, [posts, searchQuery, selectedCategory, selectedTag]);

  const clearFilters = () => { setSearchQuery(""); setSelectedCategory(""); setSelectedTag(""); };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/10 to-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="mb-6 sm:mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowRight className="rotate-180" size={16} /> Volver al inicio
            </Link>
          </div>
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="rounded-full py-2 px-4 border-none mb-6 sm:mb-8 text-sm bg-green text-white font-semibold shadow-soft">Blog de Agrimensura</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight text-foreground">
              Explorando el Mundo de la Agrimensura:<br className="hidden sm:block" /> Lo que Necesitas Saber
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4 sm:px-0 leading-relaxed">
              Información clara y accesible sobre agrimensura, topografía y su impacto en el mundo inmobiliario.
            </p>
          </div>
        </div>
      </div>

      {/* Filters & Posts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="bg-card border rounded-xl p-4 sm:p-6 lg:p-8 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input placeholder="Buscar artículos..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 h-12" />
            </div>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="">Todas las categorías</option>
              {categories.map((category) => (<option key={category} value={category}>{category}</option>))}
            </select>
            <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)} className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="">Todos los tags</option>
              {tags.map((tag) => (<option key={tag} value={tag}>{tag}</option>))}
            </select>
            <Button onClick={clearFilters} variant="outline" className="flex items-center gap-2 h-12">
              <Filter size={16} /> <span>Limpiar filtros</span>
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold">Artículos ({filteredPosts.length})</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post) => (
              <Card key={post._id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <Link href={`/blog/${post.slug || ""}`}>
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    {post.featuredImageUrl ? (
                      <img src={post.featuredImageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <BookOpen size={48} className="text-primary/60" />
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-4 px-4 sm:px-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs py-1 px-2">{post.category}</Badge>
                      {(post.tags || []).slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs py-1 px-2">{tag}</Badge>
                      ))}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight group-hover:text-primary transition-colors line-clamp-2 leading-tight">{post.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  </CardHeader>
                  <CardContent className="pt-0 px-4 sm:px-6 pb-4 sm:pb-6">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                        <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(post.publishedAt)}</span>
                      </div>
                      <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                    </div>
                    <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors h-10">
                      Leer más <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary/5 border rounded-xl p-6 sm:p-8 text-center">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">¿Necesitas servicios de agrimensura?</h3>
          <p className="text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Ofrecemos consultas sin cargo y presupuestos en el día.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto" className="w-full sm:w-auto">
              <Button size="lg" className="w-full h-12 px-6">Solicitar presupuesto</Button>
            </Link>
            <Link href="/servicios" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full h-12 px-6">Ver servicios</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
