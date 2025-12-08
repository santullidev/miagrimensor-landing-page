# Guía de Deployment en AWS Amplify

## 📋 Pre-requisitos

1. Cuenta de AWS con acceso a AWS Amplify
2. Repositorio configurado en GitHub: `https://github.com/santullidev/miagrimensor-landing-page`
3. Node.js 18+ (configurado en `package.json`)

## 🚀 Configuración de AWS Amplify

### Paso 1: Conectar Repositorio

1. Inicia sesión en la [Consola de AWS Amplify](https://console.aws.amazon.com/amplify/)
2. Haz clic en **"New app"** → **"Host web app"**
3. Selecciona **GitHub** como proveedor
4. Autoriza AWS Amplify para acceder a tu cuenta de GitHub
5. Selecciona el repositorio: `santullidev/miagrimensor-landing-page`
6. Selecciona la rama: `version-1` o `main` (según tu rama de producción)

### Paso 2: Configurar Build Settings

AWS Amplify detectará automáticamente el archivo `amplify.yml` en la raíz del proyecto.

**Configuración automática:**
- **Build command**: `npm run build`
- **Output directory**: `.next`
- **Node version**: 18.x (automático desde `package.json`)

### Paso 3: Variables de Entorno

Configura las siguientes variables de entorno en AWS Amplify Console:

**Opcionales pero recomendadas:**
```
NEXT_PUBLIC_SITE_URL=https://miagrimensor.com
NEXT_PUBLIC_GOOGLE_VERIFICATION=tu-codigo-de-verificacion
NEXT_PUBLIC_YANDEX_VERIFICATION=tu-codigo-de-verificacion
NEXT_PUBLIC_YAHOO_VERIFICATION=tu-codigo-de-verificacion
```

**Para el formulario de contacto (si lo implementas):**
```
SMTP_HOST=tu-servidor-smtp
SMTP_PORT=587
SMTP_USER=tu-usuario
SMTP_PASS=tu-contraseña
SMTP_FROM=noreply@miagrimensor.com
```

### Paso 4: Configuración de Dominio

1. En AWS Amplify Console, ve a **"Domain management"**
2. Agrega tu dominio personalizado: `miagrimensor.com`
3. Sigue las instrucciones para configurar los registros DNS
4. AWS Amplify proveerá un certificado SSL automáticamente

### Paso 5: Configuración de Rewrites y Redirects

AWS Amplify automáticamente detecta Next.js y configura:
- Rewrites para rutas dinámicas
- Soporte para API routes
- Redirecciones correctas

**Si necesitas configuración adicional**, crea `amplify.yml` con rewrites personalizados.

## 📁 Estructura del Proyecto para Amplify

El proyecto está configurado para AWS Amplify con:

- ✅ `amplify.yml` - Archivo de configuración de build
- ✅ `next.config.js` - Optimizado para producción
- ✅ `package.json` - Scripts de build configurados
- ✅ `.gitignore` - Archivos ignorados correctamente

## 🔧 Archivo amplify.yml

El archivo `amplify.yml` en la raíz contiene:

```yaml
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
      - .next/cache/**/*
```

## ✅ Verificaciones Pre-Deploy

Antes de hacer deploy, verifica:

- [x] Todos los archivos están commiteados y pusheados
- [x] El build local funciona: `npm run build`
- [x] No hay errores de linting: `npm run lint`
- [x] Las variables de entorno están configuradas
- [x] El dominio está configurado
- [x] Los favicons están en `/public/`
- [x] El manifest está configurado
- [x] Los robots.txt y sitemap están generados

## 🚦 Proceso de Deployment

### Deploy Automático

Una vez configurado, cada push a la rama principal activará un deploy automático:

1. **Trigger**: Push a la rama configurada
2. **Build**: AWS Amplify ejecuta `npm ci` y `npm run build`
3. **Deploy**: Los archivos se despliegan a CloudFront CDN
4. **Invalidation**: La caché de CDN se invalida automáticamente

### Deploy Manual

1. Ve a AWS Amplify Console
2. Selecciona tu app
3. Haz clic en **"Redeploy this version"** o **"Deploy without Git provider"**

## 🔍 Monitoreo y Logs

- **Build logs**: Disponibles en la consola de Amplify
- **Access logs**: Configurables en CloudWatch
- **Error tracking**: Considera integrar Sentry u otro servicio

## 🌐 Configuración de CDN y Caching

AWS Amplify usa CloudFront automáticamente:

- **Static assets**: Caché por 1 año
- **HTML pages**: Caché con invalidación automática
- **API routes**: Sin caché (passthrough)

## 📊 Optimizaciones de Performance

El proyecto ya incluye:

- ✅ Optimización de imágenes con Next.js Image
- ✅ Code splitting automático
- ✅ Lazy loading de componentes
- ✅ Compresión gzip/brotli
- ✅ Minificación de CSS/JS
- ✅ Tree shaking

## 🔒 Seguridad

Configuraciones de seguridad ya implementadas:

- ✅ Headers de seguridad en `next.config.js`
- ✅ Content Security Policy para SVGs
- ✅ Variables de entorno para secretos
- ✅ HTTPS forzado (automatico en Amplify)

## 🐛 Troubleshooting

### Error: Build Failed

1. Verifica los logs en AWS Amplify Console
2. Prueba el build local: `npm run build`
3. Verifica que todas las dependencias estén en `package.json`

### Error: 404 en rutas dinámicas

1. Verifica que `amplify.yml` esté configurado correctamente
2. Asegúrate de que Next.js esté usando el modo correcto (no static export)

### Error: Variables de entorno no encontradas

1. Verifica que las variables estén configuradas en Amplify Console
2. Usa el prefijo `NEXT_PUBLIC_` para variables del cliente

## 📝 Notas Adicionales

- **Branch deployments**: Amplify puede crear ambientes para cada rama
- **Preview deployments**: Cada PR puede tener su propio deployment
- **Rollback**: Puedes volver a cualquier versión anterior desde la consola
- **Custom headers**: Configurables en Amplify Console

## 🔗 Enlaces Útiles

- [Documentación de AWS Amplify](https://docs.aws.amazon.com/amplify/)
- [Next.js en AWS Amplify](https://docs.aws.amazon.com/amplify/latest/userguide/deploy-nextjs-app.html)
- [Guía de dominio personalizado](https://docs.aws.amazon.com/amplify/latest/userguide/custom-domains.html)

## ✅ Checklist Final

- [ ] Repositorio conectado en AWS Amplify
- [ ] Build settings configuradas
- [ ] Variables de entorno configuradas
- [ ] Dominio personalizado configurado
- [ ] SSL/HTTPS activo
- [ ] Primer deploy exitoso
- [ ] SEO verificado (sitemap, robots.txt accesibles)
- [ ] Favicons visibles
- [ ] Performance optimizado

---

**¡Listo para producción!** 🚀


