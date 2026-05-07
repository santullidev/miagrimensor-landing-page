import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'specializedEquipment',
  title: 'Equipamiento Especializado (ME PLUS + N80)',
  type: 'document',
  fields: [
    defineField({
      name: 'active',
      title: 'Activo',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      initialValue: 'Relevamientos con ME PLUS + N80',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
      initialValue: 'Tecnología de vanguardia para la captura de datos 3D.',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      initialValue: 'Utilizamos tecnología de escaneo láser y fotogrametría avanzada para generar modelos 3D precisos de cualquier estructura o terreno.',
    }),
    defineField({
      name: 'features',
      title: 'Características/Servicios',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['Nube de puntos de alta densidad', 'Gemelos digitales (Digital Twins)', 'Escaneo 3D para arquitectura e ingeniería'],
    }),
    defineField({
      name: 'benefits',
      title: 'Beneficios',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Título', type: 'string' },
            { name: 'description', title: 'Descripción', type: 'string' },
          ],
        },
      ],
      initialValue: [
        { title: 'Precisión centimétrica', description: 'Captura cada detalle con exactitud absoluta.' },
        { title: 'Rapidez extrema', description: 'Reducción de tiempos en campo hasta en un 70%.' },
        { title: 'Documentación visual', description: 'Registros fotográficos y métricos integrados.' },
      ],
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen Principal',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video demostrativo (URL)',
      type: 'string',
      description: 'URL de YouTube, Vimeo o archivo MP4 directo.',
    }),
    defineField({
      name: 'gallery',
      title: 'Galería de ejemplos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Texto alternativo', type: 'string' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
