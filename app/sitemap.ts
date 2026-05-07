import { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { allPostsQuery, servicesQuery } from "@/sanity/lib/queries";
import type { SanityBlogPost, SanityService } from "@/sanity/lib/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://miagrimensor.com";
  
  const [blogPosts, services] = await Promise.all([
    sanityFetch<SanityBlogPost[]>({ query: allPostsQuery, tags: ["blogPost"] }),
    sanityFetch<SanityService[]>({ query: servicesQuery, tags: ["service"] }),
  ]);

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/acerca-de-mi`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  const blogRoutes = (blogPosts || []).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const serviceRoutes = (services || []).map((service) => ({
    url: `${baseUrl}/servicios/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...blogRoutes, ...serviceRoutes];
}




