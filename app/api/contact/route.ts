import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = "nodejs"; // 🔥 IMPORTANTÍSIMO EN AMPLIFY 🔥

// Inicializar Resend solo si la API key está disponible
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    if (!resend || !process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY no está configurada');
      return NextResponse.json(
        { error: 'Servicio de email no configurado' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { nombre, email, mensaje, numeroPartida } = body;

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL!;
    const toEmail = process.env.RESEND_TO_EMAIL!;

    const emailContent = `...`;

    const { data, error } = await resend.emails.send({
      from: `Mi Agrimensor <${fromEmail}>`,
      to: [toEmail],
      reply_to: email,
      subject: `Nuevo contacto: ${nombre}`,
      html: emailContent,
    });

    if (error) {
      console.error('Error enviando email:', error);
      return NextResponse.json({ error: 'Error al enviar email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Error en /api/contact:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    resendConfigured: !!process.env.RESEND_API_KEY,
  });
}
