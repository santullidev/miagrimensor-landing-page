import { sanityFetch } from "@/sanity/lib/client";
import { serviceBySlugQuery, servicesSlugsQuery, siteSettingsQuery, navbarConfigQuery } from "@/sanity/lib/queries";
import type { SanityService, SiteSettings, NavbarData } from "@/sanity/lib/types";
import { SITE_CONFIG } from "@/lib/constants";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle2, 
  Clock, 
  BarChart, 
  ArrowLeft, 
  ArrowUpRight, 
  Phone,
  FileText,
  MapPin,
  Calendar,
  Layers,
  Search,
  CheckCircle,
  DraftingCompass,
  FileCheck,
  ChevronRight,
  Target
} from "lucide-react";
import Link from "next/link";
import ScrollToTop from "@/components/scroll-to-top";
import { urlForImage } from "@/sanity/lib/image";
import { SanityPortableText } from "@/components/portable-text";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: servicesSlugsQuery, tags: ["service"],
  });
  return (slugs || []).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await sanityFetch<SanityService>({ 
    query: serviceBySlugQuery, 
    params: { slug }, 
    tags: [`service:${slug}`] 
  });

  if (!service) return { title: "Servicio no encontrado" };

  return {
    title: `${service.title} | Mi Agrimensor`,
    description: service.subtitle,
    openGraph: {
      title: service.title,
      description: service.subtitle,
      images: [service.imageUrl || "/og-image.png"],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [service, settings, navbar] = await Promise.all([
    sanityFetch<SanityService>({ query: serviceBySlugQuery, params: { slug }, tags: [`service:${slug}`] }),
    sanityFetch<SiteSettings>({ query: siteSettingsQuery, tags: ["siteSettings"] }),
    sanityFetch<NavbarData>({ query: navbarConfigQuery, tags: ["navbarConfig"] }),
  ]);

  if (!service) notFound();

  const safeSettings: SiteSettings = settings || {
    siteName: SITE_CONFIG.siteName, siteDescription: "", phone: SITE_CONFIG.phone,
    phoneHref: SITE_CONFIG.phoneHref, email: SITE_CONFIG.email,
    whatsappUrl: SITE_CONFIG.whatsappUrl, whatsappButtonText: SITE_CONFIG.whatsappButtonText,
    address: SITE_CONFIG.address, linkedinUrl: SITE_CONFIG.linkedinUrl,
    serviceAreas: [], coverageNote: "", yearsExperience: 15, projectsCompleted: 2000,
  };

  const iconMap: Record<string, any> = {
    FileText, MapPin, Calendar, Layers, Search, CheckCircle, DraftingCompass, FileCheck
  };
  const Icon = iconMap[service.iconName] || FileText;

  return (
    <>
      <Navbar data={navbar ? { ...navbar, logoLight: settings?.logoLight, logoDark: settings?.logoDark } : undefined} />
      <div className="min-h-screen bg-background pb-16">
        <div className="w-full bg-muted/30 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <Link 
              href="/servicios"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-green-600 transition-colors mb-6 group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
              <span>Volver a servicios</span>
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
              <div className="p-4 rounded-modern bg-green/10 border border-green/20 w-fit h-fit">
                <Icon size={40} className="text-green-600" strokeWidth={1.5} />
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline" className="bg-green/5 text-green-700 border-green/20">
                    {service.category}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100">
                    <Clock size={12} className="mr-1" /> {service.duration}
                  </Badge>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                  {service.title}
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground mt-4 max-w-3xl leading-relaxed">
                  {service.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Contenido Principal */}
            <div className="lg:col-span-2 space-y-12">
              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  Sobre este servicio
                </h2>
                <div className="prose prose-lg prose-green max-w-none text-muted-foreground leading-relaxed">
                  {Array.isArray(service.description) ? (
                    <SanityPortableText value={service.description} />
                  ) : (
                    typeof service.description === 'string' && (service.description as string).split('\n\n').map((para, i) => (
                      <p key={i} className="mb-4">{para}</p>
                    ))
                  )}
                </div>
              </section>

              <div className="grid sm:grid-cols-2 gap-8">
                <section>
                  <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <CheckCircle2 className="text-green-600" size={24} />
                    Características
                  </h3>
                  <ul className="space-y-4">
                    {(service.features || []).map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground group">
                        <ChevronRight className="text-green-500 mt-1 flex-shrink-0 group-hover:translate-x-1 transition-transform" size={16} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Target className="text-green-600" size={24} />
                    Puntos Clave
                  </h3>
                  <div className="space-y-3">
                    {(service.highlights || []).map((highlight, i) => (
                      <div key={i} className="p-4 rounded-modern bg-muted/30 border border-border/50 text-sm font-medium">
                        {highlight}
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Imagen Destacada */}
              <Card className="overflow-hidden border-green/20 shadow-soft-lg">
                <CardContent className="p-0 aspect-[4/3] relative">
                  <img 
                    src={service.imageUrl} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </CardContent>
              </Card>

              {/* Info Adicional */}
              <Card className="border-green/20 bg-green-light/10 shadow-soft">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center justify-between py-2 border-b border-green/10">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                      <BarChart size={18} />
                      Complejidad
                    </div>
                    <Badge className="bg-green text-white border-none">{service.complexity}</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-green/10">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                      <Clock size={18} />
                      Plazo estimado
                    </div>
                    <span className="font-semibold text-foreground text-sm">{service.duration}</span>
                  </div>
                </CardContent>
              </Card>

              {/* CTA Sidebar */}
              <Card className="bg-foreground text-green-50 border-none shadow-soft-2xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-green/20 transition-all duration-500" />
                <CardContent className="p-8 relative z-10">
                  <h3 className="text-2xl font-bold mb-4">¿Consultas sobre este trabajo?</h3>
                  <p className="text-green-100/80 mb-8 text-sm leading-relaxed">
                    Estamos disponibles para asesorarte sobre este o cualquier otro servicio de agrimensura.
                  </p>
                  <Button 
                    asChild 
                    className="w-full bg-green hover:bg-green-100 text-white border-none py-6 rounded-modern shadow-soft-lg group/btn"
                  >
                    <Link href="/contacto">
                      Consultar Ahora <ArrowUpRight className="ml-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </div>
      <Footer settings={safeSettings} />
      <ScrollToTop />
    </>
  );
}
