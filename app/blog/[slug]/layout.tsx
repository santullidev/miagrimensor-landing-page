import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { postBySlugQuery } from "@/sanity/lib/queries";
import type { SanityBlogPost } from "@/sanity/lib/types";

interface BlogPostLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostLayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<SanityBlogPost>({ 
    query: postBySlugQuery, 
    params: { slug }, 
    tags: [`blogPost:${slug}`] 
  });

  if (!post) {
    return {
      title: "Artículo no encontrado - Blog de Agrimensura",
      description: "El artículo que buscas no existe.",
    };
  }

  const baseUrl = "https://miagrimensor.com";
  const postUrl = `${baseUrl}/blog/${slug}`;
  const postImage = post.featuredImageUrl || `${baseUrl}/og-image.png`;
  
  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    keywords: post.seo?.keywords || post.tags || [],
    authors: [{ name: post.author }],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt,
      type: "article",
      url: postUrl,
      siteName: "Agrimensor Pablo Venerus",
      locale: "es_AR",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags || [],
      images: [
        {
          url: postImage,
          width: 1200,
          height: 630,
          alt: post.seo?.title || post.title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt,
      images: [postImage],
    },
  };
}

export default function BlogPostLayout({ children }: BlogPostLayoutProps) {
  return children;
}
