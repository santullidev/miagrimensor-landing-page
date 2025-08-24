# 🚀 Guía de Deployment

Esta guía te ayudará a desplegar el sitio web de Mi Agrimensor en diferentes plataformas.

## 📋 Tabla de Contenidos

- [Vercel (Recomendado)](#vercel-recomendado)
- [Netlify](#netlify)
- [Railway](#railway)
- [Heroku](#heroku)
- [AWS Amplify](#aws-amplify)
- [Configuración de Dominio](#configuración-de-dominio)
- [Variables de Entorno](#variables-de-entorno)
- [Optimización de Performance](#optimización-de-performance)

## ⚡ Vercel (Recomendado)

Vercel es la plataforma más optimizada para Next.js y ofrece el mejor rendimiento.

### Pasos de Deployment

1. **Conectar Repositorio**
   ```bash
   # Instalar Vercel CLI
   npm i -g vercel
   
   # Login a Vercel
   vercel login
   
   # Deploy desde el directorio del proyecto
   vercel
   ```

2. **Configuración Automática**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Variables de Entorno**
   ```bash
   # En el dashboard de Vercel, agrega:
   NEXT_PUBLIC_SITE_URL=https://miagrimensor.com
   NEXT_PUBLIC_CONTACT_PHONE=+54 9 11 6705-8156
   NEXT_PUBLIC_CONTACT_EMAIL=contacto@miagrimensor.com
   ```

4. **Configuración Avanzada**
   ```json
   // vercel.json
   {
     "buildCommand": "npm run build",
     "outputDirectory": ".next",
     "framework": "nextjs",
     "installCommand": "npm install",
     "devCommand": "npm run dev",
     "regions": ["gru1"],
     "functions": {
       "app/api/**/*.ts": {
         "maxDuration": 30
       }
     }
   }
   ```

### Ventajas de Vercel

- ✅ Deploy automático con Git
- ✅ Edge Functions
- ✅ CDN global
- ✅ Analytics integrados
- ✅ Preview deployments
- ✅ Optimización automática de imágenes

## 🌐 Netlify

### Pasos de Deployment

1. **Conectar Repositorio**
   - Ve a [Netlify](https://netlify.com)
   - Conecta tu repositorio de GitHub
   - Selecciona el repositorio

2. **Configuración de Build**
   ```
   Build command: npm run build
   Publish directory: .next
   Node version: 18
   ```

3. **Variables de Entorno**
   ```bash
   # En Netlify Dashboard > Site settings > Environment variables
   NODE_VERSION=18
   NPM_FLAGS=--legacy-peer-deps
   ```

4. **Configuración Avanzada**
   ```toml
   # netlify.toml
   [build]
     command = "npm run build"
     publish = ".next"
   
   [build.environment]
     NODE_VERSION = "18"
     NPM_FLAGS = "--legacy-peer-deps"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

## 🚂 Railway

### Pasos de Deployment

1. **Conectar Repositorio**
   ```bash
   # Instalar Railway CLI
   npm install -g @railway/cli
   
   # Login
   railway login
   
   # Inicializar proyecto
   railway init
   ```

2. **Configuración**
   ```json
   // railway.json
   {
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "npm start",
       "healthcheckPath": "/",
       "healthcheckTimeout": 100,
       "restartPolicyType": "ON_FAILURE"
     }
   }
   ```

3. **Variables de Entorno**
   ```bash
   # En Railway Dashboard
   NODE_ENV=production
   PORT=3000
   ```

## 🏗️ Heroku

### Pasos de Deployment

1. **Preparar Aplicación**
   ```bash
   # Instalar Heroku CLI
   # Crear aplicación
   heroku create miagrimensor-app
   
   # Agregar buildpack de Node.js
   heroku buildpacks:set heroku/nodejs
   ```

2. **Configuración**
   ```json
   // package.json (ya incluido)
   {
     "scripts": {
       "start": "next start",
       "build": "next build"
     },
     "engines": {
       "node": "18.x",
       "npm": "8.x"
     }
   }
   ```

3. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

## ☁️ AWS Amplify

### Pasos de Deployment

1. **Conectar Repositorio**
   - Ve a AWS Amplify Console
   - Conecta tu repositorio de GitHub
   - Selecciona la rama `main`

2. **Configuración de Build**
   ```yaml
   # amplify.yml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Variables de Entorno**
   ```bash
   # En Amplify Console > Environment variables
   NODE_ENV=production
   ```

## 🌍 Configuración de Dominio

### Dominio Personalizado

1. **Configurar DNS**
   ```
   Tipo: CNAME
   Nombre: www
   Valor: tu-app.vercel.app
   
   Tipo: A
   Nombre: @
   Valor: 76.76.19.19
   ```

2. **SSL/HTTPS**
   - Automático en Vercel/Netlify
   - Configurar en otros proveedores

3. **Redirecciones**
   ```bash
   # Redirigir www a no-www o viceversa
   # Configurar en el dashboard de tu proveedor
   ```

### Subdominios

```bash
# Para staging
staging.miagrimensor.com -> staging-branch

# Para desarrollo
dev.miagrimensor.com -> develop-branch
```

## 🔧 Variables de Entorno

### Producción

```bash
# .env.production
NEXT_PUBLIC_SITE_URL=https://miagrimensor.com
NEXT_PUBLIC_CONTACT_PHONE=+54 9 11 6705-8156
NEXT_PUBLIC_CONTACT_EMAIL=contacto@miagrimensor.com
NEXT_PUBLIC_CONTACT_ADDRESS=Avellaneda, Buenos Aires
NEXT_PUBLIC_WHATSAPP_NUMBER=5491167058156
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/company/miagrimensor

# Email (opcional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-password-app
SMTP_FROM=contacto@miagrimensor.com
```

### Staging

```bash
# .env.staging
NEXT_PUBLIC_SITE_URL=https://staging.miagrimensor.com
# ... otras variables
```

## ⚡ Optimización de Performance

### Build Optimization

1. **Análisis de Bundle**
   ```bash
   npm run analyze
   ```

2. **Optimización de Imágenes**
   ```typescript
   // next.config.ts
   const nextConfig = {
     images: {
       domains: ['miagrimensor.com'],
       formats: ['image/webp', 'image/avif'],
       deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
       imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
     },
     compress: true,
     poweredByHeader: false,
   }
   ```

3. **Caching**
   ```typescript
   // middleware.ts
   import { NextResponse } from 'next/server'
   import type { NextRequest } from 'next/server'
   
   export function middleware(request: NextRequest) {
     const response = NextResponse.next()
     
     // Cache estático por 1 año
     response.headers.set(
       'Cache-Control',
       'public, max-age=31536000, immutable'
     )
     
     return response
   }
   ```

### Monitoring

1. **Vercel Analytics**
   ```bash
   npm install @vercel/analytics
   ```

2. **Google Analytics**
   ```bash
   # En .env.local
   NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   ```

3. **Performance Monitoring**
   ```bash
   # Lighthouse CI
   npm install -g @lhci/cli
   lhci autorun
   ```

## 🔍 Post-Deployment Checklist

- [ ] Verificar que todas las páginas cargan correctamente
- [ ] Probar formularios de contacto
- [ ] Verificar responsive design en diferentes dispositivos
- [ ] Comprobar que las imágenes se cargan optimizadas
- [ ] Verificar que el SEO funciona correctamente
- [ ] Probar la navegación y enlaces internos
- [ ] Verificar que el blog funciona
- [ ] Comprobar que los modales de imágenes funcionan
- [ ] Verificar que el tema oscuro/claro funciona
- [ ] Probar la funcionalidad de WhatsApp
- [ ] Verificar que el sitemap y robots.txt están accesibles
- [ ] Comprobar que las meta tags están correctas
- [ ] Verificar que no hay errores en la consola
- [ ] Probar la velocidad de carga (Lighthouse)

## 🆘 Troubleshooting

### Errores Comunes

1. **Build Fails**
   ```bash
   # Limpiar cache
   npm run clean
   rm -rf node_modules
   npm install
   ```

2. **Images Not Loading**
   ```bash
   # Verificar dominios en next.config.ts
   # Verificar que las imágenes existen en public/
   ```

3. **Environment Variables Not Working**
   ```bash
   # Verificar que las variables están en el dashboard
   # Reiniciar el deployment
   ```

4. **Performance Issues**
   ```bash
   # Optimizar imágenes
   # Verificar bundle size
   npm run analyze
   ```

## 📞 Soporte

Si tienes problemas con el deployment:

- **Email**: contacto@miagrimensor.com
- **WhatsApp**: +54 9 11 6705-8156
- **Documentación**: [Next.js Deployment](https://nextjs.org/docs/deployment)

---

¡Feliz deployment! 🚀
