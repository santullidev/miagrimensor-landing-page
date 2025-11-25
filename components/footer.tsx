import { Separator } from "@/components/ui/separator";
import {
  LinkedinIcon,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Logo_2 } from "./navbar/logo_2";

const footerSections = [
  {
    title: "Servicios",
    links: [
      {
        title: "Estados Parcelarios",
        href: "/servicios",
        description: "Certificación catastral obligatoria",
      },
      {
        title: "Planos de Mensura",
        href: "/servicios",
        description: "Medición y documentación oficial",
      },
    ],
  },
  {
    title: "Información",
    links: [
      {
        title: "Acerca de mí",
        href: "/acerca-de-mi",
        description: "Conoce al agrimensor",
      },
      {
        title: "Zona de Cobertura",
        href: "/#cobertura",
        description: "CABA y Gran Buenos Aires",
      },
      {
        title: "Preguntas Frecuentes",
        href: "/#faq",
        description: "Resuelve tus dudas",
      },
    ],
  },
  {
    title: "Blog",
    links: [
      {
        title: "Estado Parcelario CABA",
        href: "/blog/todo-sobre-el-estado-parcelario-en-la-ciudad-autonoma-de-buenos-aires",
        description: "Guía completa para CABA",
      },
      {
        title: "Estado Parcelario Provincia",
        href: "/blog/todo-sobre-el-estado-parcelario-en-la-provincia-de-buenos-aires",
        description: "Información para Provincia",
      },
      {
        title: "Trabajos Realizados",
        href: "/blog/algunos-de-mis-trabajos-realizados",
        description: "Portafolio de proyectos",
      },
      {
        title: "Introducción a la Agrimensura",
        href: "/blog/explorando-el-mundo-de-la-agrimensura",
        description: "Conoce la profesión",
      },
    ],
  },
  {
    title: "Contacto",
    links: [
      {
        title: "Solicitar Presupuesto",
        href: "/#formulario",
        description: "Completa el formulario de contacto",
      },
      {
        title: "WhatsApp",
        href: "https://api.whatsapp.com/send/?phone=5491167058156&text=Hola%21+Quisiera+un+presupuesto+sobre+un+trabajo+de+Agrimensura",
        description: "Chat directo",
      },
    ],
  },
];

const contactInfo = [
  {
    icon: Phone,
    title: "Teléfono",
    value: "+54 9 11 6705-8156",
    href: "tel:+5491167058156",
    ariaLabel: "Llamar a Pablo Venerus",
  },
  {
    icon: Mail,
    title: "Email",
    value: "contacto@miagrimensor.com",
    href: "mailto:contacto@miagrimensor.com",
    ariaLabel: "Enviar email a contacto",
  },
  {
    icon: MapPin,
    title: "Ubicación",
    value: "Avellaneda, Buenos Aires",
    href: "/#cobertura",
    ariaLabel: "Ver zona de cobertura",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="mt-12 xs:mt-20 bg-green-light/20 border-t border-green/10 w-full"
      role="contentinfo"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-5">
          {/* Brand Section - Very compact */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 space-y-2.5">
            {/* Logo */}
            <div className="flex-shrink-0 logo-container mb-2">
              <Logo_2 />
            </div>

            {/* Description - Compact */}
            <p className="text-sm leading-relaxed text-muted-foreground max-w-md">
              Servicios profesionales de agrimensura y topografía en CABA y Gran Buenos Aires. 
              Estados parcelarios, mensura y planos para escriturar.
            </p>

            {/* Contact Information - Compact inline */}
            <address className="not-italic space-y-1" itemScope itemType="https://schema.org/LocalBusiness">
              <meta itemProp="name" content="Pablo Venerus - Agrimensor" />
              <meta itemProp="address" content="Avellaneda, Buenos Aires, Argentina" />
              
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-2 group">
                  <info.icon 
                    className="text-green-600 group-hover:text-green-700 transition-colors duration-200 flex-shrink-0" 
                    size={13} 
                    aria-hidden="true"
                  />
                  <Link 
                    href={info.href}
                    className="text-sm text-muted-foreground hover:text-green-600 transition-colors duration-200 break-words"
                    aria-label={info.ariaLabel}
                    itemProp={info.title === "Teléfono" ? "telephone" : info.title === "Email" ? "email" : undefined}
                  >
                    {info.value}
                  </Link>
                </div>
              ))}
            </address>

            {/* Social Media - Compact */}
            <div className="flex items-center gap-2 pt-0.5">
              <span className="text-sm text-muted-foreground">Síguenos:</span>
              <Link 
                href="https://www.linkedin.com/company/miagrimensor" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-modern bg-green/10 hover:bg-green/20 text-green-600 hover:text-green-700 transition-all duration-200"
                aria-label="Visitar perfil de LinkedIn de Miagrimensor"
              >
                <LinkedinIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Footer Sections - Compact grid */}
          {footerSections.map(({ title, links }) => (
            <nav key={title} className="space-y-2" aria-labelledby={`footer-${title.toLowerCase()}`}>
              <h3 
                id={`footer-${title.toLowerCase()}`}
                className="font-headline font-semibold text-foreground text-sm mb-2 border-b border-green/30 pb-1.5"
              >
                {title}
              </h3>
              <ul className="space-y-1.5" role="list">
                {links.map(({ title: linkTitle, href, description }) => (
                  <li key={linkTitle}>
                    <Link
                      href={href}
                      className="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-green-600 transition-colors duration-200 leading-relaxed"
                      aria-label={description ? `${linkTitle}: ${description}` : linkTitle}
                    >
                      <ArrowRight 
                        size={12} 
                        className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0 text-green-600" 
                        aria-hidden="true"
                      />
                      <span className="group-hover:underline">{linkTitle}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Bottom Bar - Compact */}
      <Separator className="border-green/10" />
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          {/* Copyright - Compact */}
          <div className="text-center sm:text-left space-y-1">
            <p>
              &copy; {currentYear}{" "}
              <Link 
                href="/" 
                className="font-medium text-foreground hover:text-green-600 transition-colors duration-200"
                aria-label="Ir a página de inicio"
              >
                Miagrimensor
              </Link>
              . Todos los derechos reservados.
            </p>
            <p className="text-xs">
              Agrimensor Pablo Venerus - Matrícula profesional habilitada en Provincia de Buenos Aires
            </p>
          </div>

          {/* Developer Credit - Compact */}
          <div>
            Desarrollado por{" "}
            <Link 
              href="https://makebly.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium hover:text-green-600 transition-colors duration-200"
              aria-label="Visitar Makebly.io"
            >
              Makebly.io
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;