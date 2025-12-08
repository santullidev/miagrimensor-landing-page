# 📧 Configuración de Resend para Formularios de Contacto

Este proyecto usa [Resend](https://resend.com) para enviar emails desde los formularios de contacto.

## 🔑 Paso 1: Obtener API Key de Resend

1. Ve a [resend.com](https://resend.com) y crea una cuenta (es gratis para empezar)
2. Verifica tu dominio o usa el dominio de prueba `onboarding@resend.dev`
3. Ve a **API Keys** en el dashboard
4. Crea una nueva API Key
5. Copia la API Key (comienza con `re_`)

## 📝 Paso 2: Configurar Variables de Entorno

### Desarrollo Local

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# Resend API Configuration
RESEND_API_KEY=re_tu_api_key_aqui
RESEND_FROM_EMAIL=contacto@miagrimensor.com
RESEND_TO_EMAIL=contacto@miagrimensor.com
```

### AWS Amplify

1. Ve a tu proyecto en AWS Amplify Console
2. Ve a **App settings** → **Environment variables**
3. Agrega las siguientes variables:

```
RESEND_API_KEY = re_tu_api_key_aqui
RESEND_FROM_EMAIL = contacto@miagrimensor.com
RESEND_TO_EMAIL = contacto@miagrimensor.com
```

**⚠️ IMPORTANTE:** 
- `RESEND_FROM_EMAIL` debe ser un email verificado en Resend
- Si no has verificado un dominio, puedes usar `onboarding@resend.dev` temporalmente
- `RESEND_TO_EMAIL` es el email donde recibirás los mensajes del formulario

## 📧 Paso 3: Verificar Dominio (Opcional pero Recomendado)

Para usar tu propio dominio (@miagrimensor.com):

1. Ve a **Domains** en Resend
2. Agrega tu dominio `miagrimensor.com`
3. Configura los registros DNS que Resend te proporciona:
   - **SPF record**
   - **DKIM records**
   - **DMARC record** (opcional pero recomendado)
4. Espera a que Resend verifique el dominio (puede tomar hasta 48 horas)

## ✅ Paso 4: Probar el Formulario

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Ve a `http://localhost:3000/contacto`
3. Completa y envía el formulario
4. Revisa tu email en `RESEND_TO_EMAIL`

## 🔒 Seguridad

- **NUNCA** subas el archivo `.env.local` a GitHub
- Mantén tu API Key secreta
- Usa diferentes API Keys para desarrollo y producción
- Puedes crear API Keys con permisos limitados en Resend

## 📊 Límites de Resend

- **Plan Free:** 3,000 emails/mes, 100 emails/día
- **Plan Pro:** Emails ilimitados, $20/mes

Para más información: https://resend.com/pricing

## 🐛 Troubleshooting

### Error: "Invalid API Key"
- Verifica que `RESEND_API_KEY` esté correctamente configurada
- Asegúrate de que la API Key esté activa en Resend

### Error: "Invalid from address"
- Verifica que `RESEND_FROM_EMAIL` esté verificado en Resend
- Si no has verificado un dominio, usa `onboarding@resend.dev`

### No recibo emails
- Revisa la carpeta de spam
- Verifica que `RESEND_TO_EMAIL` sea un email válido
- Revisa los logs en Resend Dashboard → Logs

