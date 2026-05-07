'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import schemas from './sanity/schemas'

const SINGLETONS = [
  'heroSection', 'workGallery', 'aboutPage',
  'ctaSection', 'siteSettings', 'navbarConfig',
  'specializedEquipment',
]

export default defineConfig({
  name: 'mi-agrimensor',
  title: '🌿 Mi Agrimensor',
  projectId: 'q9dxbo03',
  dataset: 'production',
  apiVersion: '2024-01-01',
  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Panel de Contenido')
          .items([
            // ── 🏠 LANDING PRINCIPAL ────────
            S.listItem()
              .title('🏠 Landing Principal')
              .icon(() => '🏠')
              .child(
                S.list()
                  .title('Secciones del Inicio')
                  .items([
                    S.listItem()
                      .title('🎯 Hero & Carrusel')
                      .child(
                        S.document()
                          .schemaType('heroSection')
                          .documentId('heroSection'),
                      ),
                    S.listItem()
                      .title('📸 Galería de Trabajos')
                      .child(
                        S.document()
                          .schemaType('workGallery')
                          .documentId('workGallery'),
                      ),
                    S.listItem()
                      .title('🛡️ Equipamiento Especializado')
                      .child(
                        S.document()
                          .schemaType('specializedEquipment')
                          .documentId('specializedEquipment'),
                      ),
                    S.listItem()
                      .title('❓ Preguntas Frecuentes')
                      .child(
                        S.documentTypeList('faqItem')
                          .title('Preguntas frecuentes'),
                      ),
                    S.listItem()
                      .title('📞 Llamada a la Acción (CTA)')
                      .child(
                        S.document()
                          .schemaType('ctaSection')
                          .documentId('ctaSection'),
                      ),
                  ]),
              ),

            S.divider(),

            // ── 🔧 SERVICIOS ─────────────
            S.listItem()
              .title('🔧 Catálogo de Servicios')
              .child(
                S.documentTypeList('service')
                  .title('Todos los servicios'),
              ),

            // ── 📝 BLOG ──────────────────
            S.listItem()
              .title('📝 Blog & Artículos')
              .child(
                S.documentTypeList('blogPost')
                  .title('Artículos del Blog'),
              ),

            // ── 👤 PERFIL PROFESIONAL ──────
            S.listItem()
              .title('👤 Perfil Profesional (Acerca de)')
              .child(
                S.document()
                  .schemaType('aboutPage')
                  .documentId('aboutPage'),
              ),

            S.divider(),

            // ── ⚙️ CONFIGURACIÓN ──────────
            S.listItem()
              .title('⚙️ Configuración del Sitio')
              .child(
                S.list()
                  .title('Ajustes Globales')
                  .items([
                    S.listItem()
                      .title('🌐 Datos, Redes & SEO')
                      .child(
                        S.document()
                          .schemaType('siteSettings')
                          .documentId('siteSettings'),
                      ),
                    S.listItem()
                      .title('🔗 Menú de Navegación')
                      .child(
                        S.document()
                          .schemaType('navbarConfig')
                          .documentId('navbarConfig'),
                      ),
                  ]),
              ),
          ]),
    }),

    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],

  schema: {
    types: schemas,
    // Ocultar singletons del menú "new document"
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },

  document: {
    // Para singletons: no permitir crear ni eliminar
    actions: (prev, { schemaType }) => {
      if (SINGLETONS.includes(schemaType)) {
        return prev.filter(({ action }) =>
          action
            ? ['publish', 'discardChanges', 'restore'].includes(action)
            : true,
        )
      }
      return prev
    },
  },
})
