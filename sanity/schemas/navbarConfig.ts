import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'navbarConfig',
  title: 'Menú de Navegación',
  type: 'document',
  fields: [
    defineField({
      name: 'links',
      title: 'Links del menú',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navLink',
          options: { modal: { type: 'popover', width: 1 } },
          fields: [
            { name: 'label', title: 'Texto del link', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'href', title: 'URL o anchor', type: 'string', description: 'Ej: /servicios  o  #faq', validation: (Rule: any) => Rule.required() },
            { name: 'isHashLink', title: 'Es anchor interno (#)', type: 'boolean', description: 'Activar si el link es #faq, #cobertura, etc.', initialValue: false },
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        },
      ],
      initialValue: [
        { label: 'Acerca de mí', href: '/acerca-de-mi', isHashLink: false },
        { label: 'Servicios', href: '/servicios', isHashLink: false },
        { label: 'Preguntas Frecuentes', href: '/#faq', isHashLink: true },
        { label: 'Blog', href: '/blog', isHashLink: false },
        { label: 'Contacto', href: '/contacto', isHashLink: false },
      ],
    }),
    defineField({
      name: 'ctaButton',
      title: 'Botón CTA del menú (WhatsApp)',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'text', title: 'Texto', type: 'string', initialValue: 'WhatsApp' },
        { name: 'href', title: 'URL', type: 'string' },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Menú de Navegación' }),
  },
})
