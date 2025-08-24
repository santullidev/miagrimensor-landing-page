# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir al sitio web de Mi Agrimensor! Este documento proporciona las pautas para contribuir al proyecto.

## 📋 Tabla de Contenidos

- [Cómo Contribuir](#cómo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Convenciones de Código](#convenciones-de-código)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Reportar Bugs](#reportar-bugs)
- [Solicitar Funcionalidades](#solicitar-funcionalidades)

## 🚀 Cómo Contribuir

### Tipos de Contribuciones

Aceptamos los siguientes tipos de contribuciones:

- 🐛 **Reportes de Bugs**: Identificar y reportar problemas
- ✨ **Nuevas Funcionalidades**: Proponer e implementar mejoras
- 📝 **Documentación**: Mejorar README, comentarios, etc.
- 🎨 **Diseño**: Mejoras en UI/UX
- ⚡ **Performance**: Optimizaciones de rendimiento
- 🔧 **Refactoring**: Mejoras en la estructura del código

## 🛠️ Configuración del Entorno

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Git

### Pasos de Configuración

1. **Fork el repositorio**
   ```bash
   # Ve a GitHub y haz fork del repositorio
   # Luego clona tu fork
   git clone https://github.com/tu-usuario/miagrimensor.git
   cd miagrimensor
   ```

2. **Instala dependencias**
   ```bash
   npm install
   ```

3. **Configura variables de entorno**
   ```bash
   cp env.example .env.local
   # Edita .env.local con tus configuraciones
   ```

4. **Ejecuta en desarrollo**
   ```bash
   npm run dev
   ```

5. **Verifica que todo funcione**
   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```

## 📝 Convenciones de Código

### Estilo de Código

- **TypeScript**: Usar tipos estrictos
- **React**: Componentes funcionales con hooks
- **CSS**: Tailwind CSS para estilos
- **Naming**: camelCase para variables, PascalCase para componentes

### Estructura de Archivos

```
components/
├── ui/           # Componentes base (shadcn/ui)
├── navbar/       # Componentes de navegación
├── hero.tsx      # Sección principal
└── features.tsx  # Servicios principales

app/
├── layout.tsx    # Layout principal
├── page.tsx      # Página de inicio
└── [section]/    # Páginas dinámicas
```

### Commits

Usar [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add new contact form
fix: resolve responsive issues in hero section
docs: update README with new features
style: improve button hover effects
refactor: optimize image loading
test: add unit tests for utils
```

### Branches

- `main`: Código de producción
- `develop`: Código en desarrollo
- `feature/nombre-funcionalidad`: Nuevas funcionalidades
- `fix/nombre-bug`: Correcciones de bugs
- `hotfix/nombre-urgente`: Correcciones urgentes

## 🔄 Proceso de Pull Request

### Antes de Crear un PR

1. **Asegúrate de que tu código funcione**
   ```bash
   npm run lint
   npm run type-check
   npm run build
   npm test
   ```

2. **Actualiza tu rama**
   ```bash
   git checkout main
   git pull origin main
   git checkout tu-rama
   git rebase main
   ```

3. **Formatea tu código**
   ```bash
   npm run format
   ```

### Creando el Pull Request

1. **Título descriptivo**
   ```
   feat: add contact form with validation
   ```

2. **Descripción detallada**
   ```markdown
   ## Descripción
   Agrega un formulario de contacto con validación completa
   
   ## Cambios Realizados
   - Nuevo componente ContactForm
   - Validación con react-hook-form
   - Integración con API de email
   - Tests unitarios
   
   ## Screenshots
   [Agregar capturas de pantalla si aplica]
   
   ## Checklist
   - [x] Código formateado
   - [x] Tests pasando
   - [x] Documentación actualizada
   - [x] Responsive design verificado
   ```

3. **Asigna revisores**
   - Selecciona al menos un revisor
   - Agrega labels apropiadas

### Durante la Revisión

- Responde a todos los comentarios
- Haz los cambios solicitados
- Mantén el PR actualizado con `main`

## 🐛 Reportar Bugs

### Antes de Reportar

1. Verifica que el bug no haya sido reportado ya
2. Asegúrate de que estés usando la última versión
3. Intenta reproducir el bug en un entorno limpio

### Template de Bug Report

```markdown
## Descripción del Bug
[Descripción clara y concisa del problema]

## Pasos para Reproducir
1. Ve a '...'
2. Haz clic en '...'
3. Desplázate hacia abajo hasta '...'
4. Ve el error

## Comportamiento Esperado
[Lo que debería suceder]

## Comportamiento Actual
[Lo que realmente sucede]

## Screenshots
[Si aplica, agrega capturas de pantalla]

## Información del Sistema
- OS: [ej. Windows 10, macOS 12.0]
- Navegador: [ej. Chrome 96, Safari 15]
- Versión: [ej. 1.0.0]

## Información Adicional
[Cualquier otra información relevante]
```

## 💡 Solicitar Funcionalidades

### Template de Feature Request

```markdown
## Descripción de la Funcionalidad
[Descripción clara de lo que quieres]

## Problema que Resuelve
[Explica por qué necesitas esta funcionalidad]

## Solución Propuesta
[Describe cómo debería funcionar]

## Alternativas Consideradas
[Otras opciones que consideraste]

## Información Adicional
[Screenshots, mockups, etc.]
```

## 📞 Contacto

Si tienes preguntas sobre cómo contribuir:

- **Email**: contacto@miagrimensor.com
- **WhatsApp**: +54 9 11 6705-8156
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/miagrimensor/issues)

## 🙏 Agradecimientos

¡Gracias a todos los contribuidores que hacen este proyecto posible!

---

**Nota**: Al contribuir, aceptas que tus contribuciones serán licenciadas bajo la [Licencia MIT](LICENSE).
