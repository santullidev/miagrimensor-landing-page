# 🚀 Guía de Configuración para GitHub

Esta guía te ayudará a configurar y subir tu proyecto a GitHub de manera profesional.

## 📋 Pasos para Subir a GitHub

### 1. Crear el Repositorio

1. Ve a [GitHub](https://github.com) y crea una nueva cuenta o inicia sesión
2. Haz clic en el botón verde "New" o "New repository"
3. Configura el repositorio:
   - **Repository name**: `miagrimensor-website`
   - **Description**: Sitio web profesional para servicios de agrimensura y topografía - Pablo Venerus
   - **Visibility**: Public (recomendado) o Private
   - **Initialize with**: NO marcar ninguna opción
4. Haz clic en "Create repository"

### 2. Configurar Git Localmente

```bash
# Inicializar Git en tu proyecto (si no está inicializado)
git init

# Agregar el remote de GitHub
git remote add origin https://github.com/TU-USUARIO/miagrimensor-website.git

# Verificar que se agregó correctamente
git remote -v
```

### 3. Hacer el Primer Commit

```bash
# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "feat: initial commit - sitio web profesional de agrimensura

- Landing page completa con diseño moderno
- Sistema de navegación responsive
- Blog integrado con artículos especializados
- Páginas de servicios y contacto
- SEO optimizado con meta tags
- Performance optimizada para producción"

# Subir a GitHub
git push -u origin main
```

### 4. Configurar Branch Protection (Opcional)

1. Ve a tu repositorio en GitHub
2. Ve a Settings > Branches
3. Haz clic en "Add rule"
4. Configura:
   - **Branch name pattern**: `main`
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging

### 5. Configurar GitHub Pages (Opcional)

Si quieres usar GitHub Pages en lugar de Vercel:

1. Ve a Settings > Pages
2. En "Source", selecciona "GitHub Actions"
3. El workflow ya está configurado en `.github/workflows/deploy.yml`

## 🔧 Configuración de Secrets (Para Deployment)

### Para Vercel (Recomendado)

1. Ve a tu repositorio en GitHub
2. Ve a Settings > Secrets and variables > Actions
3. Agrega los siguientes secrets:

```bash
NEXT_PUBLIC_SITE_URL=https://miagrimensor.com
NEXT_PUBLIC_CONTACT_PHONE=+54 9 11 6705-8156
NEXT_PUBLIC_CONTACT_EMAIL=contacto@miagrimensor.com
NEXT_PUBLIC_CONTACT_ADDRESS=Avellaneda, Buenos Aires
NEXT_PUBLIC_WHATSAPP_NUMBER=5491167058156
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/company/miagrimensor
```

### Para Vercel Deployment Automático

Si quieres usar Vercel con GitHub Actions:

1. Ve a [Vercel](https://vercel.com) y conecta tu repositorio
2. Obtén las credenciales de Vercel:
   - VERCEL_TOKEN
   - VERCEL_ORG_ID
   - VERCEL_PROJECT_ID
3. Agrégalas como secrets en GitHub
4. Descomenta las líneas en `.github/workflows/deploy.yml`

## 📝 Estructura del Repositorio

```
miagrimensor-website/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions
├── app/                        # Páginas de Next.js
├── components/                 # Componentes React
├── lib/                       # Utilidades y datos
├── public/                    # Archivos estáticos
├── .gitignore                 # Archivos a ignorar
├── .prettierrc               # Configuración Prettier
├── .prettierignore           # Archivos a ignorar por Prettier
├── CHANGELOG.md              # Registro de cambios
├── CONTRIBUTING.md           # Guía de contribución
├── DEPLOYMENT.md             # Guía de deployment
├── GITHUB_SETUP.md           # Esta guía
├── LICENSE                   # Licencia MIT
├── README.md                 # Documentación principal
├── env.example               # Variables de entorno de ejemplo
├── next.config.ts            # Configuración de Next.js
├── package.json              # Dependencias y scripts
├── postcss.config.mjs        # Configuración de PostCSS
├── tsconfig.json             # Configuración de TypeScript
└── vercel.json               # Configuración de Vercel
```

## 🎯 Workflow de Desarrollo

### Para Nuevas Funcionalidades

```bash
# Crear una nueva rama
git checkout -b feature/nueva-funcionalidad

# Hacer cambios y commits
git add .
git commit -m "feat: agregar nueva funcionalidad"

# Subir la rama
git push origin feature/nueva-funcionalidad

# Crear Pull Request en GitHub
```

### Para Correcciones

```bash
# Crear rama de fix
git checkout -b fix/nombre-del-bug

# Hacer correcciones
git add .
git commit -m "fix: corregir problema específico"

# Subir y crear PR
git push origin fix/nombre-del-bug
```

## 📊 Monitoreo y Analytics

### GitHub Insights

1. Ve a tu repositorio en GitHub
2. Haz clic en "Insights"
3. Revisa:
   - **Traffic**: Visitas y clonaciones
   - **Contributors**: Quién contribuye
   - **Commits**: Actividad del código

### Vercel Analytics (Opcional)

1. Ve a tu proyecto en Vercel
2. Ve a Analytics
3. Configura:
   - Web Vitals
   - Performance
   - User behavior

## 🔒 Seguridad

### Archivos Sensibles

Asegúrate de que estos archivos NO se suban a GitHub:

- `.env.local`
- `.env.production`
- `node_modules/`
- `.next/`
- Archivos con información personal

### Dependencias de Seguridad

```bash
# Verificar vulnerabilidades
npm audit

# Actualizar dependencias
npm update

# Instalar parches de seguridad
npm audit fix
```

## 📞 Soporte

Si tienes problemas con la configuración:

- **Email**: contacto@miagrimensor.com
- **WhatsApp**: +54 9 11 6705-8156
- **GitHub Issues**: Crea un issue en el repositorio

## 🎉 ¡Listo!

Una vez que hayas seguido estos pasos, tu proyecto estará:

- ✅ Subido a GitHub
- ✅ Configurado con CI/CD
- ✅ Listo para deployment automático
- ✅ Optimizado para colaboración
- ✅ Seguro y profesional

---

**¡Feliz coding! 🚀**
