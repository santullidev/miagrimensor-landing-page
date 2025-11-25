interface StructuredDataProps {
  type?: "Organization" | "ProfessionalService" | "LocalBusiness";
  data?: Record<string, any>;
}

export default function StructuredData({ type = "ProfessionalService", data }: StructuredDataProps) {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": type,
    name: "Agrimensor Pablo Venerus",
    alternateName: "Mi Agrimensor",
    description: "Servicios profesionales de agrimensura y topografía en Avellaneda, Buenos Aires. Más de 14 años de experiencia. Especializado en Estados Parcelarios, Mensuras, Amojonamientos y Relevamientos Topográficos.",
    url: "https://miagrimensor.com",
    logo: {
      "@type": "ImageObject",
      url: "https://miagrimensor.com/logo_miagrimensor.png",
      width: 200,
      height: 60,
    },
    image: {
      "@type": "ImageObject",
      url: "https://miagrimensor.com/og-image.png",
      width: 1200,
      height: 630,
    },
    telephone: "+54 9 11 6705-8156",
    email: "contacto@miagrimensor.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Avellaneda",
      addressLocality: "Avellaneda",
      addressRegion: "Buenos Aires",
      postalCode: "B1870",
      addressCountry: "AR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "-34.6627",
      longitude: "-58.3647",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Ciudad Autónoma de Buenos Aires",
      },
      {
        "@type": "City",
        name: "Avellaneda",
      },
      {
        "@type": "City",
        name: "Lanús",
      },
      {
        "@type": "City",
        name: "Lomas de Zamora",
      },
      {
        "@type": "AdministrativeArea",
        name: "Gran Buenos Aires",
      },
    ],
    priceRange: "$$",
    serviceType: [
      "Estados Parcelarios",
      "Planos de Mensura para División, Unificación, Anexión o Usucapión",
      "Declaraciones Juradas",
      "Relevamientos Topográficos",
      "Amojonamientos",
      "Subdivisiones en PH",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de Agrimensura",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Estados Parcelarios",
            description: "Documentación que acredita la existencia y características esenciales de una parcela mediante un plano registrado.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Planos de Mensura",
            description: "Planos de Mensura para División, Unificación, Anexión o Usucapión",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Relevamientos Topográficos",
            description: "Levantamientos topográficos precisos con GPS geodésico y estación total.",
          },
        },
      ],
    },
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(baseStructuredData) }}
    />
  );
}
