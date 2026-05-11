import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'Página Acerca de mí',
  type: 'document',
  groups: [
    { name: 'main', title: '👤 Información personal', default: true },
    { name: 'technologies', title: '🔧 Tecnologías' },
    { name: 'services', title: '✅ Servicios destacados' },
    { name: 'photos', title: '📸 Fotos' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre completo',
      type: 'string',
      group: 'main',
      initialValue: 'Pablo Venerus',
    }),
    defineField({
      name: 'profession',
      title: 'Profesión',
      type: 'string',
      group: 'main',
      initialValue: 'Agrimensor',
    }),
    defineField({
      name: 'bio',
      title: 'Biografía principal',
      type: 'text',
      group: 'main',
      rows: 5,
      initialValue:
        'Agrimensor profesional con sede en Avellaneda, ofrece servicios integrales de topografía e ingeniería con más de catorce años de experiencia continua.',
    }),
    defineField({
      name: 'philosophy',
      title: 'Filosofía / Cita personal',
      type: 'text',
      group: 'main',
      rows: 3,
      description: 'Esta cita aparece en la sección "Mi Filosofía".',
      initialValue:
        'Desde principios del año 2010, ofrezco mis servicios con dedicación y entusiasmo a esta hermosa profesión, resolviendo rápida y eficazmente las necesidades de cada uno de nuestros clientes.',
    }),
    defineField({
      name: 'stats',
      title: 'Logros / Estadísticas',
      type: 'array',
      group: 'main',
      of: [
        {
          type: 'object',
          name: 'stat',
          options: { modal: { type: 'popover', width: 1 } },
          fields: [
            { name: 'iconName', title: 'Ícono (Lucide)', type: 'string', description: 'Ej: Calendar, Award, Users' },
            { name: 'title', title: 'Título', type: 'string' },
            { name: 'description', title: 'Descripción', type: 'string' },
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        },
      ],
    }),

    // ── Tecnologías
    defineField({
      name: 'technologies',
      title: 'Tecnologías que uso',
      type: 'array',
      group: 'technologies',
      of: [
        {
          type: 'object',
          name: 'technology',
          options: { modal: { type: 'popover', width: 1 } },
          fields: [
            { name: 'emoji', title: 'Emoji', type: 'string', description: 'Ej: 📐' },
            { name: 'title', title: 'Nombre de la tecnología', type: 'string' },
            { name: 'descriptionShort', title: 'Descripción corta (móvil)', type: 'string' },
            { name: 'descriptionFull', title: 'Descripción completa (desktop)', type: 'text', rows: 4 },
          ],
          preview: { select: { title: 'title', subtitle: 'emoji' } },
        },
      ],
    }),

    // ── Servicios destacados
    defineField({
      name: 'highlightedServices',
      title: 'Servicios destacados',
      type: 'array',
      group: 'services',
      of: [
        {
          type: 'object',
          name: 'highlightedService',
          options: { modal: { type: 'popover', width: 1 } },
          fields: [
            { name: 'title', title: 'Nombre del servicio', type: 'string' },
            { name: 'description', title: 'Descripción corta', type: 'text', rows: 3 },
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),

    // ── Fotos
    defineField({
      name: 'photos',
      title: 'Fotos de trabajo',
      type: 'array',
      group: 'photos',
      of: [
        {
          type: 'object',
          name: 'photo',
          options: { modal: { type: 'popover', width: 1 } },
          fields: [
            { name: 'image', title: 'Imagen', type: 'image', options: { hotspot: true } },
            { name: 'alt', title: 'Descripción (alt)', type: 'string' },
          ],
          preview: { select: { title: 'alt', media: 'image' } },
        },
      ],
      description: 'Las fotos aparecen en el layout de la página "Acerca de mí".',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Acerca de mí — Pablo Venerus' }),
  },
})
