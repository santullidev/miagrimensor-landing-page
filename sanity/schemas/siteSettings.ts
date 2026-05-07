import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Configuración del Sitio',
  type: 'document',
  groups: [
    { name: 'contact', title: '📞 Contacto' },
    { name: 'coverage', title: '📍 Zona de Cobertura' },
    { name: 'stats', title: '📊 Estadísticas' },
    { name: 'seo', title: '🔍 SEO' },
  ],
  fields: [
    // ── Info básica
    defineField({
      name: 'siteName',
      title: 'Nombre del sitio',
      type: 'string',
      initialValue: 'Agrimensor Pablo Venerus',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Descripción del sitio',
      type: 'text',
      rows: 3,
    }),

    // ── Contacto
    defineField({
      name: 'phone',
      title: 'Teléfono (visible)',
      type: 'string',
      group: 'contact',
      initialValue: '+54 9 11 6705-8156',
    }),
    defineField({
      name: 'phoneHref',
      title: 'Teléfono (href tel:)',
      type: 'string',
      group: 'contact',
      initialValue: 'tel:+5491167058156',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
      initialValue: 'contacto@miagrimensor.com',
    }),
    defineField({
      name: 'whatsappUrl',
      title: 'URL de WhatsApp (con texto pre-cargado)',
      type: 'string',
      group: 'contact',
      description: 'URL completa incluyendo el texto del mensaje',
      initialValue:
        'https://api.whatsapp.com/send/?phone=5491167058156&text=Hola%21+Quisiera+un+presupuesto+sobre+un+trabajo+de+Agrimensura',
    }),
    defineField({
      name: 'whatsappButtonText',
      title: 'Texto del botón WhatsApp',
      type: 'string',
      group: 'contact',
      initialValue: 'Hablemos en WhatsApp',
    }),
    defineField({
      name: 'address',
      title: 'Dirección / Ciudad',
      type: 'string',
      group: 'contact',
      initialValue: 'Avellaneda, Buenos Aires',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'string',
      group: 'contact',
      initialValue: 'https://www.linkedin.com/company/miagrimensor',
    }),
    defineField({
      name: 'licenseInfo',
      title: 'Información de Matrícula / Legal',
      type: 'string',
      group: 'contact',
      initialValue: 'Agrimensor Pablo Venerus - Matrícula profesional habilitada en Provincia de Buenos Aires',
    }),

    // ── Zonas de cobertura
    defineField({
      name: 'coverageTitle',
      title: 'Título de la sección de cobertura',
      type: 'string',
      group: 'coverage',
      initialValue: 'Zonas de Cobertura',
    }),
    defineField({
      name: 'coverageSubtitle',
      title: 'Subtítulo de la sección de cobertura',
      type: 'string',
      group: 'coverage',
      initialValue: 'Ofrezco mis servicios profesionales en CABA y Gran Buenos Aires',
    }),
    defineField({
      name: 'serviceAreas',
      title: 'Zonas de Cobertura',
      type: 'array',
      group: 'coverage',
      of: [{ type: 'string' }],
      description: 'Cada localidad es un ítem de la lista',
      initialValue: [
        'CABA', 'Tigre', 'Avellaneda', 'Lanús', 'Lomas de Zamora',
        'Vicente López', 'San Fernando', 'San Isidro', 'La Matanza',
        'San Martín', 'Ituzaingó', 'Quilmes', 'Berazategui',
        'Florencio Varela', 'Morón', 'Tres de Febrero',
      ],
    }),
    defineField({
      name: 'coverageNote',
      title: 'Nota de cobertura (pie de sección)',
      type: 'text',
      group: 'coverage',
      rows: 2,
      initialValue:
        'Si tu localidad no está en la lista, no dudes en contactarnos. Evaluamos proyectos en toda la Provincia de Buenos Aires.',
    }),

    // ── Estadísticas
    defineField({
      name: 'yearsExperience',
      title: 'Años de experiencia',
      type: 'number',
      group: 'stats',
      initialValue: 15,
    }),
    defineField({
      name: 'projectsCompleted',
      title: 'Proyectos completados',
      type: 'number',
      group: 'stats',
      initialValue: 2000,
    }),

    // ── SEO & Branding
    defineField({
      name: 'ogImage',
      title: 'OG Image (redes sociales)',
      type: 'image',
      group: 'seo',
    }),
    defineField({
      name: 'logoLight',
      title: 'Logo (Tema claro)',
      type: 'image',
      group: 'seo',
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo (Tema oscuro)',
      type: 'image',
      group: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Configuración del Sitio' }),
  },
})
