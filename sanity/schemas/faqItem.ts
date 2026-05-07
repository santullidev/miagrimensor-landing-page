import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faqItem',
  title: 'Pregunta Frecuente',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Pregunta',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Respuesta',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Orden (1 = primera)',
      type: 'number',
      description: 'Número menor aparece primero.',
    }),
    defineField({
      name: 'active',
      title: 'Activa (visible en el sitio)',
      type: 'boolean',
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
    select: { title: 'question' },
    prepare: ({ title }) => ({
      title,
      subtitle: 'Pregunta frecuente',
    }),
  },
})
