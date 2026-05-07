import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Servicio',
  type: 'document',
  groups: [
    { name: 'main', title: '📋 Principal', default: true },
    { name: 'content', title: '📝 Contenido' },
    { name: 'meta', title: '⚙️ Configuración' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título del servicio',
      type: 'string',
      group: 'main',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'main',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
      description: 'Se genera automáticamente desde el título. Ej: /servicios/estado-parcelario-caba',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
      group: 'main',
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      group: 'main',
      options: {
        list: [
          { title: 'Catastral', value: 'Catastral' },
          { title: 'Topografía', value: 'Topografía' },
          { title: 'Fiscal', value: 'Fiscal' },
          { title: 'Legal', value: 'Legal' },
          { title: 'Cálculos', value: 'Cálculos' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'image',
      title: 'Imagen principal',
      type: 'image',
      group: 'main',
      options: { hotspot: true },
    }),
    defineField({
      name: 'iconName',
      title: 'Ícono (nombre Lucide React)',
      type: 'string',
      group: 'main',
      description: 'Nombre exacto del ícono de lucide-react. Ej: Goal, BookCheck, Navigation, Home...',
      options: {
        list: [
          'BookCheck', 'Navigation', 'Goal', 'Users',
          'Zap', 'Home', 'Calculator',
        ],
      },
    }),

    // ── Contenido
    defineField({
      name: 'description',
      title: 'Contenido del servicio',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }],
      description: 'Describe detalladamente el servicio. Puedes usar negritas, listas, etc.',
    }),
    defineField({
      name: 'features',
      title: 'Características (lista)',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      description: 'Cada ítem es un punto de la lista de características.',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights (badges)',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      description: 'Ej: Obligatorio, Rápido, Oficial',
    }),
    defineField({
      name: 'duration',
      title: 'Duración estimada',
      type: 'string',
      group: 'content',
      description: 'Ej: 24-48 horas, 3-7 días',
    }),
    defineField({
      name: 'complexity',
      title: 'Complejidad',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'Baja', value: 'Baja' },
          { title: 'Media', value: 'Media' },
          { title: 'Alta', value: 'Alta' },
        ],
        layout: 'radio',
      },
    }),

    // ── Configuración
    defineField({
      name: 'relatedBlogPost',
      title: 'Artículo de blog relacionado',
      type: 'reference',
      group: 'meta',
      to: [{ type: 'blogPost' }],
      description: 'Si hay un post relacionado, aparece como card dentro de la página del servicio.',
    }),
    defineField({
      name: 'order',
      title: 'Orden en la página',
      type: 'number',
      group: 'meta',
      description: 'Número menor = aparece primero. Ej: 1, 2, 3...',
    }),
    defineField({
      name: 'active',
      title: 'Activo (visible en el sitio)',
      type: 'boolean',
      group: 'meta',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Orden manual',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
})
