import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog de Agrimensura - Pablo Venerus | Información y Consejos Profesionales",
  description: "Blog especializado en agrimensura y topografía. Información clara sobre estados parcelarios, mensuras, amojonamientos y más. Consejos profesionales de Pablo Venerus, agrimensor en Avellaneda.",
  keywords: [
    "Blog Agrimensura",
    "Información Agrimensura",
    "Estados Parcelarios Blog",
    "Mensura Blog",
    "Amojonamientos Blog",
    "Consejos Agrimensura",
    "Agrimensura Información",
    "Topografía Blog",
    "Pablo Venerus Blog",
    "Agrimensura Profesional",
    "Catastro Blog",
    "Propiedad Horizontal Blog",
    "Urbanizaciones Blog",
    "Loteos Blog"
  ],
  openGraph: {
    title: "Blog de Agrimensura - Pablo Venerus",
    description: "Información clara y consejos profesionales sobre agrimensura, topografía y servicios catastrales. Blog especializado de Pablo Venerus.",
    url: "https://miagrimensor.com/blog",
    siteName: "Agrimensor Pablo Venerus",
    images: [
      {
        url: "https://miagrimensor.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Blog de Agrimensura - Pablo Venerus",
        type: "image/png",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog de Agrimensura - Pablo Venerus",
    description: "Información clara y consejos profesionales sobre agrimensura y topografía.",
    images: ["https://miagrimensor.com/og-image.png"],
  },
  alternates: {
    canonical: "https://miagrimensor.com/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
