'use client'

import dynamic from 'next/dynamic'
import config from '@/sanity.config'

// El Studio se carga solo en el cliente (no SSR) porque usa createContext
const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  { ssr: false }
)

export default function StudioPage() {
  return <NextStudio config={config} />
}
