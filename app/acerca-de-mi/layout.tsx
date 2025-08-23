import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acerca de Pablo Venerus - Agrimensor Profesional | 14+ Años de Experiencia",
  description: "Conoce a Pablo Venerus, agrimensor profesional en Avellaneda con más de 14 años de experiencia. Tecnología de última generación: Estación Total, GPS Geodésico y software especializado. Zona de cobertura: CABA y Gran Buenos Aires.",
  keywords: [
    "Pablo Venerus",
    "Agrimensor Profesional",
    "Experiencia Agrimensura",
    "Estación Total",
    "GPS Geodésico",
    "Software Topografía",
    "AutoCAD Civil 3D",
    "TopoCal",
    "Avellaneda",
    "Buenos Aires",
    "Agrimensura Profesional",
    "Topografía Avanzada",
    "Tecnología Agrimensura",
    "Zona de Cobertura"
  ],
  openGraph: {
    title: "Acerca de Pablo Venerus - Agrimensor Profesional",
    description: "Más de 14 años de experiencia en agrimensura y topografía. Tecnología de última generación y atención personalizada en Avellaneda, Buenos Aires.",
    url: "https://miagrimensor.com/acerca-de-mi",
    siteName: "Agrimensor Pablo Venerus",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pablo Venerus - Agrimensor Profesional",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Acerca de Pablo Venerus - Agrimensor Profesional",
    description: "Más de 14 años de experiencia en agrimensura y topografía con tecnología de última generación.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://miagrimensor.com/acerca-de-mi",
  },
};

export default function AcercaDeMiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
