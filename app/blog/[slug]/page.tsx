import { sanityFetch } from "@/sanity/lib/client";
import { postBySlugQuery, allPostsQuery, postsSlugsQuery, siteSettingsQuery, navbarConfigQuery } from "@/sanity/lib/queries";
import type { SanityBlogPost, SiteSettings, NavbarData } from "@/sanity/lib/types";
import { SITE_CONFIG } from "@/lib/constants";
import { notFound } from "next/navigation";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import ScrollToTop from "@/components/scroll-to-top";
import BlogPostContent from "@/components/blog-post-content";

export const revalidate = 3600;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await sanityFetch<SanityBlogPost>({ 
    query: postBySlugQuery, 
    params: { slug }, 
    tags: [`blogPost:${slug}`] 
  });

  if (!post) return { title: "Artículo no encontrado" };

  return {
    title: `${post.seo?.title || post.title} | Mi Agrimensor`,
    description: post.seo?.description || post.excerpt,
    keywords: post.seo?.keywords || post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImageUrl || "/og-image.png"],
    },
  };
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: postsSlugsQuery, tags: ["blogPost"],
  });
  return (slugs || []).map((s) => ({ slug: s.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const [post, allPosts, settings, navbar] = await Promise.all([
    sanityFetch<SanityBlogPost>({ query: postBySlugQuery, params: { slug }, tags: [`blogPost:${slug}`] }),
    sanityFetch<SanityBlogPost[]>({ query: allPostsQuery, tags: ["blogPost"] }),
    sanityFetch<SiteSettings>({ query: siteSettingsQuery, tags: ["siteSettings"] }),
    sanityFetch<NavbarData>({ query: navbarConfigQuery, tags: ["navbarConfig"] }),
  ]);

  if (!post) notFound();

  const safeSettings: SiteSettings = settings || {
    siteName: SITE_CONFIG.siteName, siteDescription: "", phone: SITE_CONFIG.phone,
    phoneHref: SITE_CONFIG.phoneHref, email: SITE_CONFIG.email,
    whatsappUrl: SITE_CONFIG.whatsappUrl, whatsappButtonText: SITE_CONFIG.whatsappButtonText,
    address: SITE_CONFIG.address, linkedinUrl: SITE_CONFIG.linkedinUrl,
    serviceAreas: [], coverageNote: "", yearsExperience: 15, projectsCompleted: 2000,
  };

  // Related posts: same category or shared tags
  const relatedPosts = (allPosts || [])
    .filter(p =>
      p._id !== post._id &&
      (p.category === post.category || (p.tags || []).some(tag => (post.tags || []).includes(tag)))
    )
    .slice(0, 3);

  // Transform to the format blog-post-content expects
  const legacyPost = {
    id: post._id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: typeof post.content === 'string' ? post.content : post.excerpt,
    featuredImage: post.featuredImageUrl,
    author: post.author,
    publishedAt: post.publishedAt,
    readTime: post.readTime,
    category: post.category,
    tags: post.tags || [],
    featured: post.featured || false,
    contentAny: post.content,
    seo: post.seo || { title: post.title, description: post.excerpt, keywords: post.tags || [] },
  };

  const legacyRelated = relatedPosts.map(p => ({
    id: p._id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: '',
    featuredImage: p.featuredImageUrl,
    author: p.author,
    publishedAt: p.publishedAt,
    readTime: p.readTime,
    category: p.category,
    tags: p.tags || [],
    featured: p.featured || false,
    seo: { title: p.title, description: p.excerpt, keywords: p.tags || [] },
  }));

  return (
    <>
      <Navbar data={navbar ? { ...navbar, logoLight: settings?.logoLight, logoDark: settings?.logoDark } : undefined} />
      <BlogPostContent post={legacyPost} relatedPosts={legacyRelated} />
      <Footer settings={safeSettings} />
      <ScrollToTop />
    </>
  );
}
