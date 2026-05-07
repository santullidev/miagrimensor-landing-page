/**
 * Utilidades para migrar contenido hardcodeado a Sanity PortableText
 */

export interface SanityBlock {
  _type: 'block';
  _key: string;
  style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote';
  children: {
    _type: 'span';
    _key: string;
    text: string;
    marks?: string[];
  }[];
  listItem?: 'bullet' | 'number';
  level?: number;
}

export function generateKey() {
  return Math.random().toString(36).substring(2, 11);
}

/**
 * Convierte un string de Markdown simple a un array de bloques de Sanity
 */
export function markdownToPortableText(markdown: string): any[] {
  if (!markdown) return [];

  const lines = markdown.split('\n');
  const blocks: any[] = [];
  
  let currentList: { type: 'bullet' | 'number'; level: number } | null = null;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line) {
      currentList = null;
      continue;
    }

    // Encabezados
    const headerMatch = line.match(/^(#{1,4})\s+(.*)/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: `h${level}`,
        children: [{ _type: 'span', _key: generateKey(), text: headerMatch[2] }]
      });
      currentList = null;
      continue;
    }

    // Listas con viñetas
    const bulletMatch = line.match(/^[-*]\s+(.*)/);
    if (bulletMatch) {
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [{ _type: 'span', _key: generateKey(), text: bulletMatch[1] }]
      });
      continue;
    }

    // Imágenes (placeholder o referencia si es posible)
    // ![alt](url)
    const imageMatch = line.match(/^!\[(.*?)\]\((.*?)\)/);
    if (imageMatch) {
      // Nota: La importación de imágenes requiere el asset ID. 
      // Por ahora dejamos una nota o un bloque de imagen que el usuario deberá arreglar
      // o que el script de importación intentará resolver si se usa con URLs externas.
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        children: [{ 
          _type: 'span', 
          _key: generateKey(), 
          text: `[IMAGEN: ${imageMatch[1]} - Ruta: ${imageMatch[2]}]`,
          marks: ['strong']
        }]
      });
      continue;
    }

    // Párrafo normal
    blocks.push({
      _type: 'block',
      _key: generateKey(),
      style: 'normal',
      children: [{ _type: 'span', _key: generateKey(), text: line }]
    });
  }

  return blocks;
}
