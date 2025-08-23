import { Separator } from "@/components/ui/separator";
import {
  LinkedinIcon,
  Phone,
  Mail,
  MapPin,
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
      },
      {
        title: "Planos de Mensura",
        href: "/servicios",
      },
      {
        title: "Subdivisiones",
        href: "/servicios",
      },
      {
        title: "Relevamientos Topográficos",
        href: "/servicios",
      }
    ],
  },
  {
    title: "Información",
    links: [
      {
        title: "Acerca de mí",
        href: "/acerca-de-mi",
      },
      {
        title: "Zona de Cobertura",
        href: "/acerca-de-mi",
      },
      {
        title: "Tecnología Utilizada",
        href: "/acerca-de-mi",
      },
      {
        title: "Experiencia",
        href: "/acerca-de-mi",
      }
    ],
  },
  {
    title: "Blog",
    links: [
      {
        title: "Estado Parcelario CABA",
        href: "/blog/todo-sobre-el-estado-parcelario-en-la-ciudad-autonoma-de-buenos-aires",
      },
      {
        title: "Estado Parcelario Provincia",
        href: "/blog/todo-sobre-el-estado-parcelario-en-la-provincia-de-buenos-aires",
      },
      {
        title: "Trabajos Realizados",
        href: "/blog/algunos-de-mis-trabajos-realizados",
      },
      {
        title: "Introducción a la Agrimensura",
        href: "/blog/explorando-el-mundo-de-la-agrimensura",
      }
    ],
  },
  {
    title: "Contacto",
    links: [
      {
        title: "Solicitar Presupuesto",
        href: "/contacto",
      },
      {
        title: "Consultas",
        href: "/contacto",
      },
      {
        title: "WhatsApp",
        href: "https://api.whatsapp.com/send/?phone=5491167058156&text=Hola%21+Quisiera+un+presupuesto+sobre+un+trabajo+de+Agrimensura",
      },
      {
        title: "Llamar",
        href: "tel:+5491167058156",
      }
    ],
  }
];

const contactInfo = [
  {
    icon: Phone,
    title: "Teléfono",
    value: "+54 9 11 6705-8156",
    href: "tel:+5491167058156"
  },
  {
    icon: Mail,
    title: "Email",
    value: "contacto@miagrimensor.com",
    href: "mailto:contacto@miagrimensor.com"
  },
  {
    icon: MapPin,
    title: "Ubicación",
    value: "Avellaneda, Buenos Aires",
    href: "#"
  }
];

const Footer = () => {
  return (
    <footer className="mt-12 xs:mt-20 dark bg-background border-t">
      <div className="max-w-7xl mx-auto py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-x-8 gap-y-10 px-6">
        <div className="col-span-full xl:col-span-2">
          {/* Logo */}
          <Logo_2/>

          <p className="mt-4 text-muted-foreground">
            Estados parcelarios, mensura y planos para escriturar con rapidez y respaldo. Desde principios del año 2010, ofrezco mis servicios, con dedicación, con entusiasmo a esta hermosa profesión, resolviendo rápida y eficazmente las necesidades de cada uno de nuestros clientes.
          </p>

          {/* Información de contacto */}
          <div className="mt-6 space-y-3">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-center gap-3">
                <info.icon className="text-primary" size={16} />
                <Link 
                  href={info.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {info.value}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {footerSections.map(({ title, links }) => (
          <div key={title} className="xl:justify-self-end">
            <h6 className="font-semibold text-foreground">{title}</h6>
            <ul className="mt-6 space-y-4">
              {links.map(({ title, href }) => (
                <li key={title}>
                  <Link
                    href={href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Separator />
      <div className="max-w-7xl mx-auto py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6">
        {/* Copyright */}
        <span className="text-muted-foreground text-center xs:text-start text-sm">
          &copy; {new Date().getFullYear()}{" "}
          <Link href="/" className="hover:text-foreground transition-colors">
            Miagrimensor
          </Link>
          . Todos los derechos reservados.
        </span>

        {/* Redes sociales - Solo LinkedIn */}
        <div className="flex items-center gap-5 text-muted-foreground">
          <Link 
            href="https://www.linkedin.com/company/miagrimensor" 
            target="_blank"
            className="hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
