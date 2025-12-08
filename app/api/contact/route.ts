import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = "nodejs"; // 🔥 IMPORTANTÍSIMO EN AMPLIFY 🔥

// Inicializar Resend solo si la API key está disponible
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    // 📋 Log inicial
    console.log('📨 [POST /api/contact] Iniciando solicitud de email');
    console.log('⏰ Timestamp:', new Date().toISOString());

    // 🔑 Verificar variables de entorno
    console.log('🔑 [Variables de Entorno]');
    console.log('  RESEND_API_KEY existe:', !!process.env.RESEND_API_KEY);
    console.log('  RESEND_API_KEY length:', process.env.RESEND_API_KEY?.length || 0);
    console.log('  RESEND_FROM_EMAIL:', process.env.RESEND_FROM_EMAIL || '❌ NO CONFIGURADA');
    console.log('  RESEND_TO_EMAIL:', process.env.RESEND_TO_EMAIL || '❌ NO CONFIGURADA');
    console.log('  resend object exists:', !!resend);

    if (!resend || !process.env.RESEND_API_KEY) {
      console.error('❌ [ERROR] RESEND_API_KEY no está configurada');
      console.error('   Variables disponibles con RESEND:', 
        Object.keys(process.env).filter(k => k.includes('RESEND')));
      return NextResponse.json(
        { error: 'Servicio de email no configurado' },
        { status: 503 }
      );
    }

    // 📝 Parsear el body
    console.log('📝 [Parsing Body] Leyendo datos del request...');
    const body = await request.json();
    const { nombre, email, mensaje, numeroPartida } = body;
    console.log('  nombre:', nombre || '❌ falta');
    console.log('  email:', email || '❌ falta');
    console.log('  mensaje:', mensaje ? `${mensaje.substring(0, 50)}...` : '❌ falta');
    console.log('  numeroPartida:', numeroPartida || 'N/A');

    // ✅ Validar campos requeridos
    if (!nombre || !email || !mensaje) {
      console.warn('⚠️ [Validación] Faltan campos requeridos');
      console.warn('  nombre:', !!nombre);
      console.warn('  email:', !!email);
      console.warn('  mensaje:', !!mensaje);
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // ✅ Validar formato de email
    console.log('✉️ [Validación Email] Verificando formato...');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn('⚠️ [Validación] Email inválido:', email);
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }
    console.log('  ✅ Email válido:', email);

    // 🎯 Obtener emails de configuración
    const fromEmail = process.env.RESEND_FROM_EMAIL!;
    const toEmail = process.env.RESEND_TO_EMAIL!;
    
    console.log('📧 [Configuración de Emails]');
    console.log('  From:', fromEmail);
    console.log('  To:', toEmail);
    console.log('  Reply-To:', email);

    // 📄 Construir contenido del email
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Nuevo contacto desde Mi Agrimensor</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Número de Partida:</strong> ${numeroPartida || 'N/A'}</p>
        <hr />
        <h3>Mensaje:</h3>
        <p>${mensaje.replace(/\n/g, '<br>')}</p>
      </div>
    `;
    
    console.log('📄 [Email Content] Longitud:', emailContent.length);

    // 🚀 Enviar email con Resend
    console.log('🚀 [Resend] Enviando email...');
    console.log('  Timestamp inicio:', new Date().toISOString());

    const { data, error } = await resend.emails.send({
      from: `Mi Agrimensor <${fromEmail}>`,
      to: [toEmail],
      reply_to: email,
      subject: `Nuevo contacto: ${nombre}`,
      html: emailContent,
    });

    console.log('  Timestamp fin:', new Date().toISOString());

    // ❌ Manejo de errores de Resend
    if (error) {
      console.error('❌ [Resend Error]');
      console.error('  Mensaje:', error.message);
      console.error('  Detalles:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { 
          error: 'Error al enviar email',
          details: error.message 
        }, 
        { status: 500 }
      );
    }

    // ✅ Éxito
    console.log('✅ [SUCCESS] Email enviado correctamente');
    console.log('  ID de email:', data?.id);
    console.log('  Respuesta completa:', JSON.stringify(data, null, 2));

    return NextResponse.json({ 
      success: true, 
      id: data?.id,
      message: 'Email enviado correctamente'
    });

  } catch (error) {
    console.error('❌ [CATCH Exception]');
    console.error('  Tipo:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('  Mensaje:', error instanceof Error ? error.message : String(error));
    console.error('  Stack:', error instanceof Error ? error.stack : 'N/A');
    console.error('  Error completo:', JSON.stringify(error, null, 2));

    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        message: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  console.log('📊 [GET /api/contact] Health check');
  console.log('⏰ Timestamp:', new Date().toISOString());
  
  // 🔍 Verificación detallada
  const apiKeyExists = !!process.env.RESEND_API_KEY;
  const apiKeyLength = process.env.RESEND_API_KEY?.length || 0;
  const fromEmailExists = !!process.env.RESEND_FROM_EMAIL;
  const toEmailExists = !!process.env.RESEND_TO_EMAIL;
  const resendExists = !!resend;

  console.log('🔑 Variables:');
  console.log('  RESEND_API_KEY:', apiKeyExists ? `✅ (${apiKeyLength} chars)` : '❌');
  console.log('  RESEND_FROM_EMAIL:', fromEmailExists ? `✅ (${process.env.RESEND_FROM_EMAIL})` : '❌');
  console.log('  RESEND_TO_EMAIL:', toEmailExists ? `✅ (${process.env.RESEND_TO_EMAIL})` : '❌');
  console.log('  resend instance:', resendExists ? '✅' : '❌');

  // 📋 Mostrar todas las variables con RESEND
  const resendVars = Object.keys(process.env).filter(k => k.includes('RESEND'));
  console.log('📋 Todas las variables RESEND encontradas:', resendVars);

  const isConfigured = apiKeyExists && fromEmailExists && toEmailExists && resendExists;

  console.log('✅ Status:', isConfigured ? 'CONFIGURED' : 'MISSING CONFIGURATION');

  return NextResponse.json({
    status: isConfigured ? 'ok' : 'error',
    timestamp: new Date().toISOString(),
    resendConfigured: isConfigured,
    details: {
      apiKeyExists,
      apiKeyLength,
      fromEmailExists,
      toEmailExists,
      resendInstantiated: resendExists,
    },
    resendVarsFound: resendVars,
  });
}