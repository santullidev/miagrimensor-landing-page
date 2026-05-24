import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Artículo de Blog',
  type: 'document',
  groups: [
    { name: 'main', title: '📋 Info del artículo', default: true },
    { name: 'content', title: '✍️ Contenido' },
    { name: 'seo', title: '🔍 SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      group: 'main',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL del artículo)',
      type: 'slug',
      group: 'main',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
      description: 'Ej: /blog/estado-parcelario-caba',
    }),
    defineField({
      name: 'excerpt',
      title: 'Extracto (resumen corto)',
      type: 'text',
      group: 'main',
      rows: 3,
    }),
    defineField({
      name: 'featuredImage',
      title: 'Imagen destacada',
      type: 'image',
      group: 'main',
      options: { hotspot: true },
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'string',
      group: 'main',
      initialValue: 'Pablo Venerus',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      group: 'main',
    }),
    defineField({
      name: 'readTime',
      title: 'Tiempo de lectura',
      type: 'string',
      group: 'main',
      description: 'Ej: 5 min read',
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      group: 'main',
      options: {
        list: [
          'Estado Parcelario',
          'Trabajos Realizados',
          'Introducción',
          'Tecnología',
          'Normativas',
          'Casos de Estudio',
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'main',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Destacado (aparece en la home)',
      type: 'boolean',
      group: 'main',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Orden de prioridad',
      type: 'number',
      group: 'main',
      initialValue: 0,
      description: 'Número para ordenar manualmente (ej. 1, 2, 3). Valores menores aparecen primero.',
    }),

    // ── Contenido con editor rico
    defineField({
      name: 'content',
      title: 'Contenido del artículo',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Párrafo', value: 'normal' },
            { title: 'Título H1', value: 'h1' },
            { title: 'Título H2', value: 'h2' },
            { title: 'Título H3', value: 'h3' },
            { title: 'Título H4', value: 'h4' },
            { title: 'Cita', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Negrita', value: 'strong' },
              { title: 'Cursiva', value: 'em' },
              { title: 'Código', value: 'code' },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Descripción de la imagen',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Texto alternativo (SEO)',
            },
          ],
        },
      ],
    }),

    // ── SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        {
          name: 'title',
          title: 'Título para buscadores (60 caracteres máx.)',
          type: 'string',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'description',
          title: 'Meta descripción (160 caracteres máx.)',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          options: { layout: 'tags' },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'featuredImage',
      order: 'order',
    },
    prepare(selection) {
      const { title, subtitle, media, order } = selection
      return {
        title: order !== undefined ? `[${order}] ${title}` : title,
        subtitle: subtitle,
        media: media,
      }
    },
  },
})
