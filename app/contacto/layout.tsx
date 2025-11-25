import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto - Pablo Venerus | Solicita tu presupuesto",
  description: "Contacta con Pablo Venerus para solicitar presupuesto de servicios de agrimensura. Estados parcelarios, mensuras y topografía en CABA y Gran Buenos Aires.",
  keywords: [
    "Contacto agrimensor",
    "Presupuesto agrimensura",
    "Pablo Venerus contacto",
    "Estados Parcelarios",
    "Agrimensura Buenos Aires",
    "CABA",
    "Gran Buenos Aires"
  ],
  openGraph: {
    title: "Contacto - Pablo Venerus",
    description: "Solicita tu presupuesto de servicios de agrimensura. Contacto directo por WhatsApp, teléfono o formulario.",
    url: "https://miagrimensor.com/contacto",
    siteName: "Agrimensor Pablo Venerus",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contacto - Pablo Venerus",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto - Pablo Venerus",
    description: "Solicita tu presupuesto de servicios de agrimensura.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://miagrimensor.com/contacto",
  },
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
