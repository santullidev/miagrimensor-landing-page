import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Otros Servicios Especializados - Pablo Venerus | Relevamientos, Peritajes y Más",
  description: "Servicios especializados de agrimensura: Relevamientos Topográficos, Certificados de Dominio, Peritajes Judiciales, Cálculos de Superficie y más. Tecnología de vanguardia en Avellaneda, Buenos Aires.",
  keywords: [
    "Relevamientos Topográficos",
    "Certificados de Dominio",
    "Peritajes Judiciales",
    "Cálculos de Superficie",
    "Relevamientos Ambientales",
    "Mensura para Automotores",
    "Agrimensura Especializada",
    "Topografía Avanzada",
    "GPS Geodésico",
    "Estación Total",
    "Pablo Venerus",
    "Avellaneda",
    "Buenos Aires",
    "Servicios Especializados"
  ],
  openGraph: {
    title: "Otros Servicios Especializados - Pablo Venerus",
    description: "Relevamientos Topográficos, Certificados de Dominio, Peritajes Judiciales y más servicios especializados de agrimensura con tecnología de vanguardia.",
    url: "https://miagrimensor.com/otros-servicios",
    siteName: "Agrimensor Pablo Venerus",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Otros Servicios Especializados - Pablo Venerus",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Otros Servicios Especializados - Pablo Venerus",
    description: "Relevamientos Topográficos, Certificados de Dominio, Peritajes Judiciales y más servicios especializados.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://miagrimensor.com/otros-servicios",
  },
};

export default function OtrosServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
