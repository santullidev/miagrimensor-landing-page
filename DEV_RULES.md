# 📜 Guía de Desarrollo y Buenas Prácticas - Mi Agrimensor

Este documento centraliza la lógica del proyecto, el stack tecnológico y las reglas de arquitectura para mantener la coherencia del código y evitar redundancias.

> [!IMPORTANT]
> **REVISAR SIEMPRE** este documento antes de instalar nuevas dependencias o realizar cambios estructurales profundos.

---

## 🛠 Stack Tecnológico y Dependencias

Para mantener el proyecto liviano y eficiente, centralizamos el uso de las siguientes librerías:

### Core
- **Next.js 14 (App Router)**: Framework principal.
- **TypeScript**: Tipado estricto en todo el proyecto.
- **Tailwind CSS**: Estilado basado en utilidades y variables CSS.

### CMS (Sanity)
- **`sanity` & `next-sanity`**: Integración con el CMS.
- **`@portabletext/react`**: Renderizado de texto enriquecido (Rich Text).
- **`@sanity/image-url`**: Procesamiento de imágenes dinámicas.

### UI & UX
- **Radix UI**: Primitivas accesibles (Accordion, Dialog, Tabs, etc.).
- **Lucide React**: Set de íconos oficial. Usar siempre este antes de buscar otros.
- **Framer Motion**: Animaciones complejas y micro-interacciones.
- **Embla Carousel**: Sistema de sliders y galerías.
- **`clsx` & `tailwind-merge`**: Gestión de clases condicionales.

### Otros
- **Resend**: Envío de correos electrónicos desde el formulario de contacto.

---

## 🏗 Arquitectura del Proyecto

Mantenemos una estructura modular y limpia:

- `app/`: Rutas, layouts y Server Components. Máxima prioridad a la performance.
- `components/`: Componentes reutilizables.
    - `ui/`: Componentes base (Shadcn/UI style).
    - `navbar/`, `footer/`: Componentes globales complejos.
- `lib/`: Utilidades, constantes (`constants.ts`) y lógica de negocio compartida.
- `sanity/`: Todo lo relacionado con el CMS.
    - `schemas/`: Definición de documentos y objetos.
    - `lib/`: Cliente, fetching (`client.ts`), consultas (`queries.ts`) y tipos (`types.ts`).
- `public/`: Assets estáticos (logos, favicons, imágenes de fallback).

---

## 🍃 Buenas Prácticas con Sanity CMS

Para asegurar que "TODO sea editable" y el sitio sea performante:

### 1. Estrategia de Fetching
- Usar siempre `sanityFetch` con **Tags de Revalidación**.
- **Tags**: Seguir el patrón `type` o `type:slug` para revalidación selectiva mediante Webhooks.
- **ISR**: Mantener `revalidate = 3600` (1 hora) como red de seguridad.

### 2. Consultas GROQ
- **Proyecciones**: Pedir solo los campos necesarios.
- **Assets**: Resolver URLs de imágenes en la consulta o usar `urlForImage`.
- **Slugs**: Siempre proyectar como `slug: slug.current`.

### 3. Texto Rico (PortableText)
- No usar strings planos para contenido largo. Usar `array` de `block`.
- Renderizar siempre con el componente centralizado `<SanityPortableText value={data} />`.

### 4. Singletons vs Colecciones
- **Singletons**: Para páginas únicas (Home, About, Settings). Definir `documentId` fijo en `sanity.config.ts`.
- **Colecciones**: Para contenido repetitivo (Blog, Servicios, FAQ).

---

## 💻 Estándares de Código

### TypeScript
- Definir interfaces en `sanity/lib/types.ts` para datos del CMS.
- Evitar el uso de `any`. Si la estructura es incierta, usar `unknown` o tipado parcial.

### Estilado
- Usar variables de color definidas en `globals.css` (e.g., `bg-green`, `text-muted-foreground`).
- Mantener el diseño *Glassmorphism* y *Modern Premium* consistente.

### SEO
- Cada página dinámica DEBE implementar `generateMetadata`.
- Priorizar los campos SEO definidos en Sanity sobre los fallbacks de `constants.ts`.

---

## 🚀 Workflow de Cambios

1. **Dependencias**: Antes de hacer `npm install`, verificar si `lucide-react` o `radix-ui` ya ofrecen una solución similar.
2. **Nuevas Secciones**: 
    - Crear el schema en `sanity/schemas/`.
    - Registrarlo en `sanity/schemas/index.ts`.
    - Actualizar `queries.ts` y `types.ts`.
    - Implementar el componente visual con fallbacks robustos.
3. **Commit**: Mantener mensajes descriptivos y actualizar el `CHANGELOG.md` si hay cambios mayores.
