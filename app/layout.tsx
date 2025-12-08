import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/structured-data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://miagrimensor.com"),
  title: {
    default: "Agrimensor Pablo Venerus - Excelencia en Agrimensura | Avellaneda, Buenos Aires",
    template: "%s | Agrimensor Pablo Venerus"
  },
  description:
    "Agrimensor Pablo Venerus en Avellaneda. Servicios de agrimensura, topografía e ingeniería con más de 14 años de experiencia. Estados parcelarios, mensuras, amojonamientos y más. Zona de cobertura: CABA y Gran Buenos Aires.",
  keywords: [
    "Agrimensor",
    "Agrimensura",
    "Topografía",
    "Estados Parcelarios",
    "Mensura",
    "Amojonamientos",
    "Avellaneda",
    "Buenos Aires",
    "CABA",
    "Gran Buenos Aires",
    "Pablo Venerus",
    "Ingeniería",
    "Catastro",
    "Propiedad Horizontal",
    "Urbanizaciones",
    "Loteos",
    "Relevamientos Topográficos",
    "GPS Geodésico",
    "Estación Total",
    "Estado Parcelario Provincia Buenos Aires",
    "Estado Parcelario CABA",
    "Declaraciones Juradas",
    "Subdivisiones PH",
  ],
  openGraph: {
    type: "website",
    siteName: "Agrimensor Pablo Venerus",
    locale: "es_AR",
    url: "https://miagrimensor.com",
    title: "Agrimensor Pablo Venerus - Excelencia en Agrimensura",
    description:
      "Servicios profesionales de agrimensura y topografía en Avellaneda, Buenos Aires. Más de 14 años de experiencia. Estados parcelarios, mensuras y amojonamientos.",
    images: [
      {
        url: "https://miagrimensor.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Agrimensor Pablo Venerus - Servicios de Agrimensura",
        type: "image/png",
      },
    ],
  },
  authors: [
    {
      name: "Pablo Venerus",
      url: "https://miagrimensor.com",
    },
  ],
  creator: "Pablo Venerus",
  twitter: {
    card: "summary_large_image",
    title: "Agrimensor Pablo Venerus - Excelencia en Agrimensura",
    description: "Servicios profesionales de agrimensura y topografía en Avellaneda, Buenos Aires. Más de 14 años de experiencia.",
    images: ["https://miagrimensor.com/og-image.png"],
    creator: "@miagrimensor",
  },
  alternates: {
    canonical: "https://miagrimensor.com",
  },
  category: "Professional Services",
  classification: "Agrimensura y Topografía",
  other: {
    "geo.region": "AR-B",
    "geo.placename": "Avellaneda, Buenos Aires",
    "geo.position": "-34.6627;-58.3647",
    "ICBM": "-34.6627, -58.3647",
    "DC.title": "Agrimensor Pablo Venerus",
    "DC.creator": "Pablo Venerus",
    "DC.subject": "Agrimensura, Topografía, Estados Parcelarios",
    "DC.description": "Servicios profesionales de agrimensura y topografía",
    "DC.publisher": "Pablo Venerus",
    "DC.contributor": "Pablo Venerus",
    "DC.date": "2024",
    "DC.type": "Service",
    "DC.format": "text/html",
    "DC.identifier": "https://miagrimensor.com",
    "DC.language": "es-AR",
    "DC.coverage": "Avellaneda, Buenos Aires, Argentina",
    "DC.rights": "Copyright 2024 Pablo Venerus",
    "apple-mobile-web-app-title": "Miagrimensor",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        type: "image/png",
        url: "/web-app-manifest-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "icon",
        type: "image/png",
        url: "/web-app-manifest-512x512.png",
        sizes: "512x512",
      },
    ],
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION || undefined,
  },
  formatDetection: {
    telephone: true,
    date: false,
    address: false,
    email: false,
    url: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" suppressHydrationWarning>
      <head>
        {/* Theme script - debe estar antes de cualquier render */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  if (theme === 'dark' || (!theme && systemPrefersDark)) {
                    document.documentElement.classList.add('dark');
                    if (document.body) {
                      document.body.style.colorScheme = 'dark';
                    }
                  } else {
                    document.documentElement.classList.remove('dark');
                    if (document.body) {
                      document.body.style.colorScheme = 'light';
                    }
                  }
                  
                  // Prevenir parpadeo
                  document.documentElement.style.visibility = 'visible';
                } catch (e) {
                  console.warn('Error applying theme:', e);
                }
              })();
            `,
          }}
        />
        {/* Preconnect para mejorar rendimiento */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased bg-background text-foreground transition-colors duration-200`}>
        <StructuredData type="ProfessionalService" />
        {children}
      </body>
    </html>
  );
}
