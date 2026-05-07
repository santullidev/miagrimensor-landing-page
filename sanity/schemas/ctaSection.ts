import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ctaSection',
  title: 'Sección CTA (Llamada a la Acción)',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Título del CTA',
      type: 'string',
      initialValue: '¿Necesitas un servicio de agrimensura?',
    }),
    defineField({
      name: 'subheading',
      title: 'Subtítulo / descripción',
      type: 'text',
      rows: 2,
      initialValue: 'Consultas y asesoramiento sin cargo. Presupuestos EN EL DÍA.',
    }),
    defineField({
      name: 'primaryButton',
      title: 'Botón principal',
      type: 'object',
      fields: [
        { name: 'text', title: 'Texto', type: 'string', initialValue: 'Hablemos en WhatsApp' },
        { name: 'href', title: 'URL', type: 'string' },
      ],
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Botón secundario',
      type: 'object',
      fields: [
        { name: 'text', title: 'Texto', type: 'string', initialValue: 'VER SERVICIOS' },
        { name: 'href', title: 'URL', type: 'string', initialValue: '/servicios' },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Sección CTA — Llamada a la Acción' }),
  },
})
