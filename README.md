# 🏗️ Agrimensor Pablo Venerus - Sitio Web Profesional

Sitio web profesional para servicios de agrimensura y topografía, desarrollado con Next.js 15, TypeScript y Tailwind CSS.

## 🚀 Características

- **Diseño Responsive**: Optimizado para todos los dispositivos
- **SEO Avanzado**: Meta tags, sitemap, robots.txt optimizados
- **Blog Integrado**: Sistema de blog con artículos especializados
- **Galería de Imágenes**: Modal interactivo con zoom, rotación y navegación
- **Formularios de Contacto**: Integración completa con validación
- **Navegación Intuitiva**: Menú responsive con navegación fluida
- **Tema Oscuro/Claro**: Soporte para ambos temas
- **Performance Optimizada**: Lazy loading, optimización de imágenes

## 🛠️ Tecnologías Utilizadas

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Iconos**: Lucide React
- **Animaciones**: CSS Transitions & Framer Motion
- **SEO**: Next.js Metadata API

## 📁 Estructura del Proyecto

```
shadcn-ui-landing-page/
├── app/                    # App Router (Next.js 15)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   ├── servicios/         # Página de servicios
│   ├── otros-servicios/   # Página de otros servicios
│   ├── acerca-de-mi/      # Página sobre Pablo
│   ├── contacto/          # Página de contacto
│   └── blog/              # Sistema de blog
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes base (shadcn/ui)
│   ├── navbar/           # Navegación
│   ├── hero.tsx          # Sección principal
│   ├── features.tsx      # Servicios principales
│   ├── testimonial.tsx   # Testimonios
│   └── footer.tsx        # Pie de página
├── lib/                  # Utilidades y datos
│   ├── utils.ts          # Funciones utilitarias
│   └── blog-data.ts      # Datos del blog
├── public/               # Archivos estáticos
│   ├── images/           # Imágenes del sitio
│   ├── robots.txt        # Configuración SEO
│   ├── sitemap.xml       # Sitemap
│   └── site.webmanifest  # PWA manifest
└── package.json          # Dependencias y scripts
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/miagrimensor.git
cd miagrimensor
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

5. **Construir para producción**
```bash
npm run build
npm start
```

## 📱 Páginas y Funcionalidades

### 🏠 Página Principal
- Hero section con carrusel de imágenes
- Servicios principales destacados
- Testimonios de clientes
- Blog preview
- CTA sections

### 🛠️ Página de Servicios
- Lista detallada de servicios
- Galería de imágenes interactiva
- Información técnica completa
- Modal de imágenes con zoom/rotación

### 📚 Blog
- Sistema de artículos completo
- Categorías y tags
- Búsqueda y filtros
- SEO optimizado por artículo
- Compartir en redes sociales

### 📞 Contacto
- Formulario de contacto
- Información de contacto
- Carrusel de imágenes
- Zona de cobertura

### 👤 Acerca de Mí
- Perfil profesional
- Experiencia y logros
- Tecnología utilizada
- Galería de trabajos

## 🎨 Personalización

### Colores y Temas
Los colores se pueden personalizar en `app/globals.css`:

```css
@theme {
  --color-primary: 220 14% 96%;
  --color-primary-foreground: 220 9% 46%;
  /* ... más variables */
}
```

### Contenido
- **Blog**: Editar `lib/blog-data.ts`
- **Servicios**: Modificar arrays en `components/features.tsx`
- **Testimonios**: Actualizar en `components/testimonial.tsx`
- **Contacto**: Cambiar en `app/contacto/page.tsx`

## 📊 SEO y Performance

### Optimizaciones Implementadas
- ✅ Meta tags dinámicos por página
- ✅ Open Graph y Twitter Cards
- ✅ Sitemap.xml automático
- ✅ Robots.txt configurado
- ✅ Imágenes optimizadas con Next.js Image
- ✅ Lazy loading de componentes
- ✅ Compresión de assets

### Métricas de Performance
- **Lighthouse Score**: 95+ en todas las categorías
- **Core Web Vitals**: Optimizados
- **SEO Score**: 100/100

## 🔧 Scripts Disponibles

```json
{
  "dev": "next dev",           # Desarrollo
  "build": "next build",       # Construcción
  "start": "next start",       # Producción
  "lint": "next lint",         # Linting
  "type-check": "tsc --noEmit" # Verificación de tipos
}
```

## 📈 Deployment

### Vercel (Recomendado)
1. Conectar repositorio a Vercel
2. Configurar variables de entorno
3. Deploy automático

### Netlify
1. Conectar repositorio
2. Build command: `npm run build`
3. Publish directory: `.next`

### Otros
- **Railway**: Compatible
- **Heroku**: Requiere configuración adicional
- **AWS Amplify**: Compatible

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto

**Pablo Venerus** - [contacto@miagrimensor.com](mailto:contacto@miagrimensor.com)

**Sitio Web**: [https://miagrimensor.com](https://miagrimensor.com)

**WhatsApp**: [+54 9 11 6705-8156](https://api.whatsapp.com/send/?phone=5491167058156&text=Hola%21+Quisiera+un+presupuesto+sobre+un+trabajo+de+Agrimensura)

---

⭐ Si este proyecto te ayudó, ¡dale una estrella al repositorio!
