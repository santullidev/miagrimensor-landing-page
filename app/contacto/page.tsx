import { sanityFetch } from "@/sanity/lib/client";
import { siteSettingsQuery, navbarConfigQuery } from "@/sanity/lib/queries";
import type { SiteSettings, NavbarData } from "@/sanity/lib/types";
import { SITE_CONFIG } from "@/lib/constants";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import ScrollToTop from "@/components/scroll-to-top";
import ContactoContent from "@/components/contacto-content";

export const revalidate = 3600;

export default async function ContactoPage() {
  const [settings, navbar] = await Promise.all([
    sanityFetch<SiteSettings>({ query: siteSettingsQuery, tags: ["siteSettings"] }),
    sanityFetch<NavbarData>({ query: navbarConfigQuery, tags: ["navbarConfig"] }),
  ]);

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

  return (
    <>
      <Navbar data={navbar ? { ...navbar, logoLight: settings?.logoLight, logoDark: settings?.logoDark } : undefined} />
      <ContactoContent settings={safeSettings} />
      <Footer settings={safeSettings} />
      <ScrollToTop />
    </>
  );
}
