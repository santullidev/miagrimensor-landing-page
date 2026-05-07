import siteSettings from './siteSettings'
import heroSection from './heroSection'
import service from './service'
import blogPost from './blogPost'
import faqItem from './faqItem'
import workGallery from './workGallery'
import aboutPage from './aboutPage'
import ctaSection from './ctaSection'
import navbarConfig from './navbarConfig'
import specializedEquipment from './specializedEquipment'

const schemas = [
  // Singletons
  siteSettings,
  heroSection,
  workGallery,
  aboutPage,
  ctaSection,
  navbarConfig,
  specializedEquipment,
  // Colecciones
  service,
  blogPost,
  faqItem,
]

export default schemas
