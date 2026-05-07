import { sanityFetch } from "@/sanity/lib/client";
import {
  siteSettingsQuery,
  heroSectionQuery,
  servicesQuery,
  faqItemsQuery,
  featuredPostsQuery,
  ctaSectionQuery,
  workGalleryQuery,
  navbarConfigQuery,
  specializedEquipmentQuery,
} from "@/sanity/lib/queries";
import type {
  SiteSettings,
  HeroData,
  SanityService,
  SanityFaqItem,
  SanityBlogPost,
  CtaData,
  WorkGalleryData,
  NavbarData,
  SpecializedEquipmentData,
} from "@/sanity/lib/types";
import { SITE_CONFIG } from "@/lib/constants";

import FAQ from "@/components/faq";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { Navbar } from "@/components/navbar";
import BlogPreview from "@/components/blog-preview";
import CTASection from "@/components/cta-section";
import ScrollToTop from "@/components/scroll-to-top";
import ServiceCoverage from "@/components/service-coverage";
import WorkGallery from "@/components/work-gallery";
import SpecializedEquipment from "@/components/specialized-equipment";
import { urlForImage } from "@/sanity/lib/image";

export const revalidate = 3600; // ISR: 1 hora de fallback

export async function generateMetadata() {
  const settings = await sanityFetch<SiteSettings>({ query: siteSettingsQuery, tags: ["siteSettings"] });
  return {
    title: settings?.siteName || SITE_CONFIG.siteName,
    description: settings?.siteDescription || SITE_CONFIG.siteDescription,
    openGraph: {
      title: settings?.siteName || SITE_CONFIG.siteName,
      description: settings?.siteDescription || SITE_CONFIG.siteDescription,
      images: [settings?.ogImage ? urlForImage(settings.ogImage).url() : "/og-image.png"],
    },
  };
}

export default async function Home() {
  // Fetch paralelo de todos los datos — máxima performance
  const [settings, hero, services, faqItems, featuredPosts, cta, gallery, navbar, equipment] =
    await Promise.all([
      sanityFetch<SiteSettings>({ query: siteSettingsQuery, tags: ["siteSettings"] }),
      sanityFetch<HeroData>({ query: heroSectionQuery, tags: ["heroSection"] }),
      sanityFetch<SanityService[]>({ query: servicesQuery, tags: ["service"] }),
      sanityFetch<SanityFaqItem[]>({ query: faqItemsQuery, tags: ["faqItem"] }),
      sanityFetch<SanityBlogPost[]>({ query: featuredPostsQuery, tags: ["blogPost"] }),
      sanityFetch<CtaData>({ query: ctaSectionQuery, tags: ["ctaSection"] }),
      sanityFetch<WorkGalleryData>({ query: workGalleryQuery, tags: ["workGallery"] }),
      sanityFetch<NavbarData>({ query: navbarConfigQuery, tags: ["navbarConfig"] }),
      sanityFetch<SpecializedEquipmentData>({ query: specializedEquipmentQuery, tags: ["specializedEquipment"] }),
    ]);

  // Fallbacks — si Sanity está vacío, usar los valores por defecto
  const safeSettings: SiteSettings = settings || {
    siteName: SITE_CONFIG.siteName,
    siteDescription: "",
    phone: SITE_CONFIG.phone,
    phoneHref: SITE_CONFIG.phoneHref,
    email: SITE_CONFIG.email,
    whatsappUrl: SITE_CONFIG.whatsappUrl,
    whatsappButtonText: SITE_CONFIG.whatsappButtonText,
    address: SITE_CONFIG.address,
    linkedinUrl: SITE_CONFIG.linkedinUrl,
    serviceAreas: [],
    coverageNote: "",
    yearsExperience: 15,
    projectsCompleted: 2000,
  };

  const safeHero: HeroData = hero || {
    badgeText: "Agrimensor Pablo Venerus",
    headlineLines: ["Agrimensura", "y Topografía"],
    subheadline: "Precisión, experiencia y confianza",
    description: "Estados parcelarios, mensura y planos para escriturar con rapidez y respaldo.",
    images: ["/hero-background_1.jpeg", "/hero-background_2.jpeg", "/hero-background_3.jpeg"],
    primaryButton: { text: "Hablemos en Whatsapp", href: SITE_CONFIG.whatsappUrl },
    secondaryButton: { text: "Mis Servicios", href: "/servicios" },
  };

  const safeCta: CtaData = cta || {
    heading: "¿Necesitas un servicio de agrimensura?",
    subheading: "Consultas y asesoramiento sin cargo. Presupuestos EN EL DÍA.",
    primaryButton: { text: "SOLICITAR PRESUPUESTO", href: "/contacto" },
    secondaryButton: { text: "VER SERVICIOS", href: "/servicios" },
  };

  return (
    <>
      <Navbar data={navbar ? { ...navbar, logoLight: settings?.logoLight, logoDark: settings?.logoDark } : undefined} />
      <Hero hero={safeHero} />
      {equipment && <SpecializedEquipment data={equipment} />}
      {(services && services.length > 0) && <Features services={services} />}
      <CTASection cta={safeCta} settings={safeSettings} />
      {(safeSettings.serviceAreas && safeSettings.serviceAreas.length > 0) && (
        <ServiceCoverage
          areas={safeSettings.serviceAreas}
          note={safeSettings.coverageNote}
          sectionTitle={safeSettings.coverageTitle}
          sectionSubtitle={safeSettings.coverageSubtitle}
        />
      )}
      {(featuredPosts && featuredPosts.length > 0) && <BlogPreview posts={featuredPosts} />}
      {(faqItems && faqItems.length > 0) && <FAQ items={faqItems} />}
      {gallery && gallery.images && gallery.images.length > 0 && (
        <WorkGallery gallery={gallery} />
      )}
      <Footer settings={safeSettings} />
      <ScrollToTop />
    </>
  );
}
