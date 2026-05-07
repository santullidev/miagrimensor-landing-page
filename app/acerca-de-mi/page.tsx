import { sanityFetch } from "@/sanity/lib/client";
import { aboutPageQuery, siteSettingsQuery, workGalleryQuery, ctaSectionQuery, navbarConfigQuery } from "@/sanity/lib/queries";
import type { AboutPageData, SiteSettings, WorkGalleryData, CtaData, NavbarData } from "@/sanity/lib/types";
import { SITE_CONFIG } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, MapPin, Phone, Mail, Calendar, Award, Users,
  CheckCircle, ArrowUpRight, DraftingCompass,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import ScrollToTop from "@/components/scroll-to-top";
import ServiceCoverage from "@/components/service-coverage";
import WorkGallery from "@/components/work-gallery";
import CTASection from "@/components/cta-section";

export const revalidate = 3600;

// Fallback data
const defaultImages = [
  { src: "/acerca-de-mi/pablo-trabajando-1.jpeg", alt: "Pablo trabajando en agrimensura - Estados Parcelarios" },
  { src: "/acerca-de-mi/pablo-trabajando-9.jpeg", alt: "Pablo trabajando en agrimensura - Planos de Mensura" },
  { src: "/acerca-de-mi/pablo-trabajando-11.jpeg", alt: "Pablo trabajando en agrimensura - Subdivisiones" },
];

const defaultTechnologies = [
  { emoji: "📐", title: "Estación Total", descriptionShort: "Instrumento electrónico de última generación que mide ángulos y distancias con precisión milimétrica.", descriptionFull: "Instrumento electrónico de última generación que mide ángulos y distancias con precisión milimétrica. Es fundamental para trabajos de topografía y agrimensura." },
  { emoji: "🛰️", title: "GPS Geodésico (GNSS)", descriptionShort: "Sistema de posicionamiento global que permite obtener coordenadas precisas a través de satélites.", descriptionFull: "Sistema de posicionamiento global que permite obtener coordenadas precisas a través de satélites, ideal para relevamientos extensos y trabajos catastrales." },
  { emoji: "💻", title: "Software de Topografía y CAD", descriptionShort: "Programas profesionales como AutoCAD Civil 3D y TopoCal para procesar datos topográficos.", descriptionFull: "Utilizo programas profesionales como AutoCAD Civil 3D, TopoCal y software especializado para procesar datos topográficos y elaborar planos técnicos precisos." },
];

export async function generateMetadata() {
  const about = await sanityFetch<AboutPageData>({ query: aboutPageQuery, tags: ["aboutPage"] });
  return {
    title: `Acerca de mí | ${about?.name || "Pablo Venerus"}`,
    description: about?.bio || SITE_CONFIG.siteDescription,
  };
}

export default async function AcercaDeMiPage() {
  const [about, settings, gallery, cta, navbar] = await Promise.all([
    sanityFetch<AboutPageData>({ query: aboutPageQuery, tags: ["aboutPage"] }),
    sanityFetch<SiteSettings>({ query: siteSettingsQuery, tags: ["siteSettings"] }),
    sanityFetch<WorkGalleryData>({ query: workGalleryQuery, tags: ["workGallery"] }),
    sanityFetch<CtaData>({ query: ctaSectionQuery, tags: ["ctaSection"] }),
    sanityFetch<NavbarData>({ query: navbarConfigQuery, tags: ["navbarConfig"] }),
  ]);

  const safeSettings: SiteSettings = settings || {
    siteName: SITE_CONFIG.siteName, siteDescription: "", phone: SITE_CONFIG.phone,
    phoneHref: SITE_CONFIG.phoneHref, email: SITE_CONFIG.email,
    whatsappUrl: SITE_CONFIG.whatsappUrl, whatsappButtonText: SITE_CONFIG.whatsappButtonText,
    address: SITE_CONFIG.address, linkedinUrl: SITE_CONFIG.linkedinUrl,
    serviceAreas: [], coverageNote: "", yearsExperience: 15, projectsCompleted: 2000,
  };

  const safeCta: CtaData = cta || {
    heading: "¿Necesitas un servicio de agrimensura?",
    subheading: "Consultas y asesoramiento sin cargo. Presupuestos EN EL DÍA.",
    primaryButton: { text: "SOLICITAR PRESUPUESTO", href: "/contacto" },
    secondaryButton: { text: "VER SERVICIOS", href: "/servicios" },
  };

  const photos = about?.photos?.length ? about.photos : defaultImages.map(i => ({ url: i.src, alt: i.alt }));
  const technologies = about?.technologies?.length ? about.technologies : defaultTechnologies;
  const name = about?.name || "Pablo Venerus";
  const bio = about?.bio || "Agrimensor profesional con sede en Avellaneda, ofrece servicios integrales de topografía e ingeniería con más de catorce años de experiencia continua.";
  const philosophy = about?.philosophy || "Desde principios del año 2010, ofrezco mis servicios con dedicación y entusiasmo a esta hermosa profesión, resolviendo rápida y eficazmente las necesidades de cada uno de nuestros clientes.";

  return (
    <>
      <Navbar data={navbar ? { ...navbar, logoLight: settings?.logoLight, logoDark: settings?.logoDark } : undefined} />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-b from-green-light/20 via-background to-background border-b border-green/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-green-600 transition-colors mb-6 group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
              <span>Volver al inicio</span>
            </Link>
            <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">Acerca de mí</h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              Conocimiento y precisión en agrimensura con más de {safeSettings.yearsExperience} años de experiencia
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="space-y-8 sm:space-y-12">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-foreground">{name}</h2>
                  <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">{bio}</p>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {(about?.stats || [
                    { iconName: "Calendar", title: `Más de ${safeSettings.yearsExperience} años de experiencia`, description: "Desde 2010 brindando servicios profesionales de agrimensura y topografía" },
                    { iconName: "Award", title: "Excelencia en Agrimensura", description: "Servicios profesionales de calidad con precisión y atención al detalle" },
                    { iconName: "Users", title: "Atención personalizada", description: "Cada cliente recibe un servicio adaptado a sus necesidades específicas" },
                  ]).map((stat, index) => {
                    const iconMap: Record<string, any> = { Calendar, Award, Users };
                    const Icon = iconMap[stat.iconName] || Calendar;
                    return (
                      <div key={index} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-modern bg-green-light/20 border border-green/20 hover:shadow-soft transition-all duration-250">
                        <div className="p-1.5 sm:p-2 rounded-modern bg-green/10 border border-green/20 flex-shrink-0">
                          <Icon className="text-green-600" size={20} strokeWidth={2} />
                        </div>
                        <div>
                          <h4 className="font-headline font-semibold text-sm sm:text-base text-foreground mb-0.5 sm:mb-1">{stat.title}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{stat.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {photos[0] && (
                <Card className="border-green/20 overflow-hidden shadow-soft-lg hover:shadow-soft-xl transition-all duration-250 w-full">
                  <CardContent className="p-0">
                    <div className="relative w-full aspect-[3/4] overflow-hidden bg-gradient-to-br from-green/10 to-cream/30">
                      <img src={photos[0].url} alt={photos[0].alt} className="w-full h-full object-cover" />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Philosophy */}
            <Card className="border-green/30 bg-gradient-to-br from-green-light/30 to-cream/30 shadow-soft-lg">
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-headline text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-foreground">Mi Filosofía</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed italic">&ldquo;{philosophy}&rdquo;</p>
              </CardContent>
            </Card>

            {/* Technology */}
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
              <div className="space-y-4 sm:space-y-6">
                <h3 className="font-headline text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-foreground">Tecnología de Última Generación</h3>
                <div className="space-y-3 sm:space-y-4">
                  {technologies.map((tech, index) => (
                    <Card key={index} className="border-green/20 hover:border-green/40 transition-all duration-250 shadow-soft hover:shadow-soft-lg">
                      <CardContent className="p-4 sm:p-5">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <span className="text-2xl sm:text-3xl flex-shrink-0">{tech.emoji}</span>
                          <div>
                            <h4 className="font-headline font-semibold mb-1 sm:mb-2 text-sm sm:text-base text-foreground">{tech.title}</h4>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                              <span className="sm:hidden">{tech.descriptionShort}</span>
                              <span className="hidden sm:inline">{tech.descriptionFull}</span>
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              {photos[1] && (
                <Card className="border-green/20 overflow-hidden shadow-soft-lg hover:shadow-soft-xl transition-all duration-250 w-full">
                  <CardContent className="p-0">
                    <div className="relative w-full aspect-[3/4] overflow-hidden bg-gradient-to-br from-green/10 to-cream/30">
                      <img src={photos[1].url} alt={photos[1].alt} className="w-full h-full object-cover" />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Third photo */}
        {photos[2] && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            <Card className="border-green/20 overflow-hidden shadow-soft-lg hover:shadow-soft-xl transition-all duration-250 max-w-2xl mx-auto">
              <CardContent className="p-0">
                <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-gradient-to-br from-green/10 to-cream/30">
                  <img src={photos[2].url} alt={photos[2].alt} className="w-full h-full object-cover" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Service coverage */}
        {safeSettings.serviceAreas?.length > 0 && (
          <ServiceCoverage areas={safeSettings.serviceAreas} note={safeSettings.coverageNote} />
        )}

        {/* CTA */}
        <CTASection cta={safeCta} settings={safeSettings} />

        {/* Work Gallery */}
        {gallery && gallery.images?.length > 0 && (
          <WorkGallery gallery={gallery} className="bg-green-light/10 border-b border-green/20 pb-12" />
        )}
      </div>

      <Footer settings={safeSettings} />
      <ScrollToTop />
    </>
  );
}
