import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Principal',
  type: 'document',
  fields: [
    defineField({
      name: 'badgeText',
      title: 'Texto del badge (encima del título)',
      type: 'string',
      initialValue: 'Agrimensor Pablo Venerus',
    }),
    defineField({
      name: 'headlineLines',
      title: 'Líneas del título principal',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Cada ítem es una línea del título. Ej: "Agrimensura" y "y Topografía".',
      initialValue: ['Agrimensura', 'y Topografía'],
    }),
    defineField({
      name: 'subheadline',
      title: 'Subtítulo (debajo del título)',
      type: 'string',
      initialValue: 'Precisión, experiencia y confianza',
    }),
    defineField({
      name: 'description',
      title: 'Párrafo de descripción',
      type: 'text',
      rows: 3,
      initialValue:
        'Estados parcelarios, mensura y planos para escriturar con rapidez y respaldo. Desde principios del año 2010, ofrezco mis servicios con dedicación y entusiasmo a esta hermosa profesión.',
    }),
    defineField({
      name: 'images',
      title: 'Imágenes del carrusel (mín. 1, máx. 5)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      description: 'Las imágenes rotan automáticamente cada 5 segundos.',
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Video de fondo (URL directa)',
      type: 'string',
      description: 'URL directa a un archivo .mp4 (opcional). Si se proporciona, reemplazará al carrusel de imágenes.',
    }),
    defineField({
      name: 'primaryButton',
      title: 'Botón principal (WhatsApp)',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'text', title: 'Texto del botón', type: 'string', initialValue: 'Hablemos en Whatsapp' },
        { name: 'href', title: 'URL', type: 'string' },
      ],
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Botón secundario',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'text', title: 'Texto del botón', type: 'string', initialValue: 'Mis Servicios' },
        { name: 'href', title: 'URL interna', type: 'string', initialValue: '/servicios' },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Hero — Página de Inicio' }),
  },
})
