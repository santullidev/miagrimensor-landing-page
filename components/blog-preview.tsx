import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import type { SanityBlogPost } from "@/sanity/lib/types";

interface BlogPreviewProps {
  posts: SanityBlogPost[]
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  if (!posts || posts.length === 0) return null;

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
        {posts.slice(0, 3).map((post) => (
          <Card
            key={post._id}
            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <Link href={`/blog/${post.slug || ""}`}>
              <CardContent className="p-0">
                <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                  <img
                    src={post.featuredImageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-3 left-3 bg-green/90 text-white border-none">
                    {post.category}
                  </Badge>
                </div>
              </CardContent>
              <CardHeader className="p-5">
                <h3 className="text-lg font-bold mb-2 group-hover:text-green transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User size={12} /> {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {formatDate(post.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>
              </CardHeader>
            </Link>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button asChild variant="outline" size="lg" className="rounded-modern border-green/30 hover:border-green hover:bg-green/5">
          <Link href="/blog">
            <BookOpen className="mr-2 h-5 w-5" /> Ver todos los artículos <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
