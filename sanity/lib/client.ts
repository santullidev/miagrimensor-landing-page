import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'q9dxbo03'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
})

/**
 * Fetch de datos con revalidación ISR (1 hora de fallback).
 * En producción, el webhook de Sanity llama a /api/revalidate para purgar.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 3600,
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
  revalidate?: number
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate,
      tags,
    },
  })
}
