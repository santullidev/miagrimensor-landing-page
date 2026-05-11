/**
 * Tipos TypeScript para los datos que vienen de Sanity.
 * Todos los componentes refactorizados usan estos tipos como props.
 */

// ── Site Settings ────────────────────────────────────────────────────────────
export interface FooterLink {
  title: string
  href: string
  description?: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface SiteSettings {
  siteName: string
  siteDescription: string
  phone: string
  phoneHref: string
  email: string
  whatsappUrl: string
  whatsappButtonText: string
  address: string
  linkedinUrl: string
  serviceAreas: string[]
  coverageNote: string
  yearsExperience: number
  projectsCompleted: number
  coverageTitle?: string
  coverageSubtitle?: string
  licenseInfo?: string
  ogImage?: SanityImage
  logoLight?: SanityImage
  logoDark?: SanityImage
  footerSections?: FooterSection[]
}

// ── Hero ─────────────────────────────────────────────────────────────────────
export interface HeroData {
  badgeText: string
  headlineLines: string[]
  subheadline: string
  description: string
  images: string[] // URLs resueltas
  backgroundVideo?: string
  primaryButton: { text: string; href: string }
  secondaryButton: { text: string; href: string }
}

// ── Service ──────────────────────────────────────────────────────────────────
export interface SanityService {
  _id: string
  title: string
  slug: string
  subtitle: string
  description: any[]
  category: string
  iconName: string
  imageUrl: string
  features: string[]
  highlights: string[]
  duration: string
  complexity: string
  order: number
  relatedBlogPost?: { title: string; slug: string }
}

// ── Blog Post ────────────────────────────────────────────────────────────────
export interface SanityBlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  featuredImageUrl: string
  author: string
  publishedAt: string
  readTime: string
  category: string
  tags: string[]
  featured: boolean
  content?: any[] // Portable Text blocks
  seo?: {
    title: string
    description: string
    keywords: string[]
  }
}

// ── FAQ ──────────────────────────────────────────────────────────────────────
export interface SanityFaqItem {
  _id: string
  question: string
  answer: string
  order: number
}

// ── Work Gallery ─────────────────────────────────────────────────────────────
export interface GalleryImage {
  url: string
  alt: string
  category: string
  lqip?: string
}

export interface WorkGalleryData {
  sectionTitle: string
  sectionSubtitle: string
  videoUrl?: string
  images: GalleryImage[]
}

// ── About Page ───────────────────────────────────────────────────────────────
export interface AboutPageData {
  name: string
  profession: string
  bio: string
  philosophy: string
  stats: { iconName: string; title: string; description: string }[]
  technologies: {
    emoji: string
    title: string
    descriptionShort: string
    descriptionFull: string
  }[]
  highlightedServices: { title: string; description: string }[]
  photos: { url: string; alt: string }[]
}

// ── CTA Section ──────────────────────────────────────────────────────────────
export interface CtaData {
  heading: string
  subheading: string
  primaryButton: { text: string; href: string }
  secondaryButton: { text: string; href: string }
}

// ── Navbar Config ────────────────────────────────────────────────────────────
export interface NavLink {
  label: string
  href: string
  isHashLink: boolean
}

export interface NavbarData {
  links: NavLink[]
  ctaButton: { text: string; href: string }
  logoLight?: SanityImage
  logoDark?: SanityImage
}

export interface SpecializedEquipmentData {
  active: boolean
  title: string
  subtitle: string
  description: string
  features: string[]
  benefits: { title: string; description: string }[]
  badgeText?: string
  videoUrl?: string
  mainImage?: string
  gallery?: { url: string; alt?: string }[]
}

// ── Sanity Internals ─────────────────────────────────────────────────────────
export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
}
