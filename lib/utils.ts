import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convierte un array de bloques de PortableText a texto plano
 */
export function portableTextToPlainText(blocks: any[] = []): string {
  if (!Array.isArray(blocks)) return typeof blocks === 'string' ? blocks : '';
  
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      return block.children.map((child: any) => child.text).join('')
    })
    .join('\n\n')
}
