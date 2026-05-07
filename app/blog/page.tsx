import { sanityFetch } from "@/sanity/lib/client";
import { allPostsQuery, siteSettingsQuery, navbarConfigQuery } from "@/sanity/lib/queries";
import type { SanityBlogPost, SiteSettings, NavbarData } from "@/sanity/lib/types";
import { SITE_CONFIG } from "@/lib/constants";
import BlogContent from "./blog-content";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";

export const revalidate = 3600;

export default async function BlogPage() {
  const [posts, settings, navbar] = await Promise.all([
    sanityFetch<SanityBlogPost[]>({ query: allPostsQuery, tags: ["blogPost"] }),
    sanityFetch<SiteSettings>({ query: siteSettingsQuery, tags: ["siteSettings"] }),
    sanityFetch<NavbarData>({ query: navbarConfigQuery, tags: ["navbarConfig"] }),
  ]);

  const safeSettings: SiteSettings = settings || {
    siteName: SITE_CONFIG.siteName, siteDescription: "", phone: SITE_CONFIG.phone,
    phoneHref: SITE_CONFIG.phoneHref, email: SITE_CONFIG.email,
    whatsappUrl: SITE_CONFIG.whatsappUrl, whatsappButtonText: SITE_CONFIG.whatsappButtonText,
    address: SITE_CONFIG.address, linkedinUrl: SITE_CONFIG.linkedinUrl,
    serviceAreas: [], coverageNote: "", yearsExperience: 15, projectsCompleted: 2000,
  };

  return (
    <>
      <Navbar data={navbar ? { ...navbar, logoLight: settings?.logoLight, logoDark: settings?.logoDark } : undefined} />
      <BlogContent posts={posts || []} settings={safeSettings} />
      <Footer settings={safeSettings} />
      <ScrollToTop />
    </>
  );
}
