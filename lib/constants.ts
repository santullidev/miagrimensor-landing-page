/**
 * Constantes globales del sitio.
 * Son los valores de fallback cuando Sanity no está disponible o en desarrollo.
 * En producción, estos valores se sobreescriben con los datos de Sanity.
 */
export const SITE_CONFIG = {
  phone: '+54 9 11 6705-8156',
  phoneHref: 'tel:+5491167058156',
  email: 'contacto@miagrimensor.com',
  whatsappUrl:
    'https://api.whatsapp.com/send/?phone=5491167058156&text=Hola%21+Quisiera+un+presupuesto+sobre+un+trabajo+de+Agrimensura',
  whatsappButtonText: 'Hablemos en WhatsApp',
  address: 'Avellaneda, Buenos Aires',
  linkedinUrl: 'https://www.linkedin.com/company/miagrimensor',
  baseUrl: 'https://miagrimensor.com',
  siteName: 'Agrimensor Pablo Venerus',
  siteDescription: 'Servicios profesionales de agrimensura, estados parcelarios y mensuras en Avellaneda y alrededores.',
} as const

export type SiteConfig = typeof SITE_CONFIG
