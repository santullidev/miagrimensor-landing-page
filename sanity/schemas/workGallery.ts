import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'workGallery',
  title: 'Galería de Trabajos',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Título de la sección',
      type: 'string',
      initialValue: 'Galería de Trabajos',
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'Subtítulo de la sección',
      type: 'string',
      initialValue: 'Algunos de los proyectos realizados en CABA y Gran Buenos Aires',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video de fondo para la sección (URL)',
      type: 'string',
      description: 'URL directa a un archivo .mp4 para el fondo de la galería (opcional).',
    }),
    defineField({
      name: 'images',
      title: 'Fotos de trabajos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'galleryImage',
          title: 'Foto',
          fields: [
            {
              name: 'image',
              title: 'Imagen',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'alt',
              title: 'Descripción de la foto',
              type: 'string',
              description: 'Breve descripción. Ej: Estado Parcelario en Avellaneda',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'category',
              title: 'Categoría',
              type: 'string',
              options: {
                list: [
                  { title: 'Campo', value: 'campo' },
                  { title: 'Costa', value: 'costa' },
                  { title: 'Edificio', value: 'edificio' },
                  { title: 'Lote', value: 'lote' },
                  { title: 'Otro', value: 'otro' },
                ],
              },
            },
          ],
          preview: {
            select: { title: 'alt', media: 'image' },
          },
        },
      ],
      description: 'Estas fotos rotan automáticamente en la galería animada del sitio.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Galería de Trabajos' }),
  },
})
