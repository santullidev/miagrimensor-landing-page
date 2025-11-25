import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios de Agrimensura - Pablo Venerus | Estados Parcelarios, Mensuras y Más",
  description: "Servicios profesionales de agrimensura: Estados Parcelarios, Planos de Mensura, Declaraciones Juradas, Relevamientos Topográficos y Amojonamientos. Zona de cobertura: CABA y Gran Buenos Aires.",
  keywords: [
    "Estados Parcelarios",
    "Planos de Mensura",
    "Declaraciones Juradas",
    "Relevamientos Topográficos",
    "Amojonamientos",
    "Agrimensura",
    "Topografía",
    "Pablo Venerus",
    "Avellaneda",
    "Buenos Aires",
    "CABA",
    "Gran Buenos Aires"
  ],
  openGraph: {
    title: "Servicios de Agrimensura - Pablo Venerus",
    description: "Estados Parcelarios, Planos de Mensura y más servicios de agrimensura profesional en Avellaneda, Buenos Aires.",
    url: "https://miagrimensor.com/servicios",
    siteName: "Agrimensor Pablo Venerus",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Servicios de Agrimensura - Pablo Venerus",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios de Agrimensura - Pablo Venerus",
    description: "Estados Parcelarios, Planos de Mensura y más servicios de agrimensura profesional.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://miagrimensor.com/servicios",
  },
};

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
