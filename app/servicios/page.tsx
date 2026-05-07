import { sanityFetch } from "@/sanity/lib/client";
import { servicesQuery, siteSettingsQuery, navbarConfigQuery } from "@/sanity/lib/queries";
import type { SanityService, SiteSettings, NavbarData } from "@/sanity/lib/types";
import { SITE_CONFIG } from "@/lib/constants";
import ServiciosContent from "./servicios-content";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";

export const revalidate = 3600;

export default async function ServiciosPage() {
  const [services, settings, navbar] = await Promise.all([
    sanityFetch<SanityService[]>({ query: servicesQuery, tags: ["service"] }),
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
      <ServiciosContent
        services={services || []}
        settings={safeSettings}
      />
      <Footer settings={safeSettings} />
      <ScrollToTop />
    </>
  );
}
