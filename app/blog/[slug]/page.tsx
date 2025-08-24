import { notFound } from "next/navigation";
import { getBlogPostBySlug, blogPosts, type BlogPost } from "@/lib/blog-data";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar/navbar";
import ScrollToTop from "@/components/scroll-to-top";
import BlogPostContent from "@/components/blog-post-content";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generar rutas estáticas para todos los artículos
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Obtener artículos relacionados
  const getRelatedPosts = (currentPost: BlogPost): BlogPost[] => {
    return blogPosts
      .filter(post => 
        post.id !== currentPost.id && 
        (post.category === currentPost.category || 
         post.tags.some(tag => currentPost.tags.includes(tag)))
      )
      .slice(0, 3);
  };

  const relatedPosts = getRelatedPosts(post);

  return (
    <>
      <Navbar />
      <BlogPostContent post={post} relatedPosts={relatedPosts} />
      <Footer />
      <ScrollToTop />
    </>
  );
}
