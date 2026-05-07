import { groq } from 'next-sanity'

// ── Singletons ──────────────────────────────────────────────────────────────

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName, siteDescription,
    phone, phoneHref, email,
    whatsappUrl, whatsappButtonText,
    address, linkedinUrl,
    serviceAreas, coverageNote, coverageTitle, coverageSubtitle,
    yearsExperience, projectsCompleted,
    ogImage, logoLight, logoDark,
    footerSections
  }
`

export const heroSectionQuery = groq`
  *[_type == "heroSection"][0] {
    badgeText,
    headlineLines,
    subheadline,
    description,
    "images": images[].asset->url,
    backgroundVideo,
    primaryButton,
    secondaryButton
  }
`

export const workGalleryQuery = groq`
  *[_type == "workGallery"][0] {
    sectionTitle,
    sectionSubtitle,
    videoUrl,
    "images": images[] {
      alt,
      category,
      "url": image.asset->url,
      "lqip": image.asset->metadata.lqip
    }
  }
`

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    name, profession, bio, philosophy,
    stats,
    technologies,
    highlightedServices,
    "photos": photos[] {
      alt,
      "url": image.asset->url
    }
  }
`

export const ctaSectionQuery = groq`
  *[_type == "ctaSection"][0] {
    heading, subheading, primaryButton, secondaryButton
  }
`

export const navbarConfigQuery = groq`
  *[_type == "navbarConfig"][0] {
    links, ctaButton
  }
`

export const specializedEquipmentQuery = groq`
  *[_type == "specializedEquipment"][0] {
    active, title, subtitle, description,
    features, benefits, videoUrl,
    "mainImage": mainImage.asset->url,
    "gallery": gallery[] {
      "url": asset->url,
      alt
    }
  }
`

// ── Servicios ────────────────────────────────────────────────────────────────

export const servicesQuery = groq`
  *[_type == "service" && active == true] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    description,
    category,
    iconName,
    "imageUrl": image.asset->url,
    features,
    highlights,
    duration,
    complexity,
    order,
    "relatedBlogPost": relatedBlogPost->{ title, "slug": slug.current }
  }
`

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    description,
    category,
    iconName,
    "imageUrl": image.asset->url,
    features,
    highlights,
    duration,
    complexity,
    "relatedBlogPost": relatedBlogPost->{ title, "slug": slug.current }
  }
`

export const servicesSlugsQuery = groq`
  *[_type == "service" && active == true] { "slug": slug.current }
`

// ── Blog ─────────────────────────────────────────────────────────────────────

export const allPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "featuredImageUrl": featuredImage.asset->url,
    author,
    publishedAt,
    readTime,
    category,
    tags,
    featured
  }
`

export const featuredPostsQuery = groq`
  *[_type == "blogPost" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "featuredImageUrl": featuredImage.asset->url,
    author,
    publishedAt,
    readTime,
    category,
    tags
  }
`

export const postBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    content,
    "featuredImageUrl": featuredImage.asset->url,
    author,
    publishedAt,
    readTime,
    category,
    tags,
    seo
  }
`

export const postsSlugsQuery = groq`
  *[_type == "blogPost"] { "slug": slug.current }
`

// ── FAQ ──────────────────────────────────────────────────────────────────────

export const faqItemsQuery = groq`
  *[_type == "faqItem" && active == true] | order(order asc) {
    _id, question, answer, order
  }
`
