import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto - Agrimensor Pablo Venerus | Consultas y Presupuestos Gratuitos",
  description: "Contacta a Pablo Venerus para consultas y presupuestos gratuitos de agrimensura. Teléfono: +54 9 11 6705-8156, Email: contacto@miagrimensor.com. Zona de cobertura: CABA y Gran Buenos Aires.",
  keywords: [
    "Contacto Agrimensor",
    "Pablo Venerus Contacto",
    "Presupuesto Agrimensura",
    "Consulta Agrimensura",
    "Teléfono Agrimensor",
    "Email Agrimensor",
    "WhatsApp Agrimensor",
    "Avellaneda Agrimensor",
    "Buenos Aires Agrimensura",
    "CABA Agrimensura",
    "Gran Buenos Aires Agrimensura",
    "Consultas Gratuitas",
    "Presupuestos Gratuitos"
  ],
  openGraph: {
    title: "Contacto - Agrimensor Pablo Venerus",
    description: "Consultas y presupuestos gratuitos de agrimensura. Contacta directamente por teléfono, WhatsApp o email. Zona de cobertura: CABA y Gran Buenos Aires.",
    url: "https://miagrimensor.com/contacto",
    siteName: "Agrimensor Pablo Venerus",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contacto - Agrimensor Pablo Venerus",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto - Agrimensor Pablo Venerus",
    description: "Consultas y presupuestos gratuitos de agrimensura. Contacta directamente por teléfono, WhatsApp o email.",
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
