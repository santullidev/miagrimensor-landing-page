import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (!process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: 'SANITY_REVALIDATE_SECRET no configurado' },
      { status: 500 }
    )
  }

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Secret inválido' }, { status: 401 })
  }

  try {
    // Revalidar todas las páginas del sitio
    revalidatePath('/', 'layout')
    revalidatePath('/')
    revalidatePath('/servicios')
    revalidatePath('/servicios/[slug]', 'page')
    revalidatePath('/blog')
    revalidatePath('/blog/[slug]', 'page')
    revalidatePath('/acerca-de-mi')
    revalidatePath('/contacto')

    console.log('✅ [Revalidate] Todas las páginas revalidadas:', new Date().toISOString())

    return NextResponse.json({
      revalidated: true,
      now: new Date().toISOString(),
      paths: ['/', '/servicios', '/blog', '/acerca-de-mi'],
    })
  } catch (err) {
    console.error('❌ [Revalidate] Error:', err)
    return NextResponse.json({ message: 'Error al revalidar' }, { status: 500 })
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    secretConfigured: !!process.env.SANITY_REVALIDATE_SECRET,
    timestamp: new Date().toISOString(),
  })
}
