import type { Metadata } from "next";
import { getBlogPostBySlug } from "@/lib/blog-data";

interface BlogPostLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostLayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Artículo no encontrado - Blog de Agrimensura",
      description: "El artículo que buscas no existe.",
    };
  }

  const baseUrl = "https://miagrimensor.com";
  const postUrl = `${baseUrl}/blog/${slug}`;
  
  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords,
    authors: [{ name: post.author }],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      type: "article",
      url: postUrl,
      siteName: "Agrimensor Pablo Venerus",
      locale: "es_AR",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: post.image || `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: post.seo.title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo.title,
      description: post.seo.description,
      images: [post.image || `${baseUrl}/og-image.png`],
    },
  };
}

export default function BlogPostLayout({ children }: BlogPostLayoutProps) {
  return children;
}
