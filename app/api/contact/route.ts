import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, email, mensaje, numeroPartida } = body;

    // Validación básica
    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'contacto@miagrimensor.com';
    const toEmail = process.env.RESEND_TO_EMAIL || 'contacto@miagrimensor.com';

    // Construir el contenido del email
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a; border-bottom: 2px solid #16a34a; padding-bottom: 10px;">
          Nuevo mensaje de contacto - Mi Agrimensor
        </h2>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${numeroPartida ? `<p><strong>Número de Partida:</strong> ${numeroPartida}</p>` : ''}
        </div>
        
        <div style="margin-top: 20px;">
          <h3 style="color: #374151;">Mensaje:</h3>
          <p style="background-color: #f9fafb; padding: 15px; border-radius: 8px; white-space: pre-wrap;">
            ${mensaje}
          </p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
          <p>Este mensaje fue enviado desde el formulario de contacto de miagrimensor.com</p>
          <p>Fecha: ${new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}</p>
        </div>
      </div>
    `;

    // Enviar email usando Resend
    const { data, error } = await resend.emails.send({
      from: `Mi Agrimensor <${fromEmail}>`,
      to: [toEmail],
      reply_to: email,
      subject: `Nuevo contacto: ${nombre} - ${numeroPartida ? `Partida: ${numeroPartida}` : 'Consulta general'}`,
      html: emailContent,
    });

    if (error) {
      console.error('Error enviando email con Resend:', error);
      return NextResponse.json(
        { error: 'Error al enviar el email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email enviado exitosamente',
        id: data?.id 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en API route /api/contact:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

