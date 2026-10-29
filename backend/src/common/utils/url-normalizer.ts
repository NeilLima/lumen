/**
 * Utilitário para normalizar URLs de mídia armazenadas no Backblaze B2.
 * Converte URLs relativas (ex: /storage/file/xxx) para URLs absolutas
 * com o domínio do backend, para que o frontend consiga carregar as imagens.
 */

/**
 * Obtém a URL base do backend para montar URLs completas
 */
export function getBaseUrl(): string {
  return process.env.BACKEND_URL || '';
}

/**
 * Extrai o nome do arquivo de uma URL do Backblaze.
 * Ex: 'https://f005.backblazeb2.com/file/nexusuploads/avatar_xxx.webp' -> 'avatar_xxx.webp'
 */
export function extractFileNameFromUrl(url: string): string | null {
  const match = url.match(/\/file\/[^/]+\/(.+)$/);
  if (match && match[1]) {
    return decodeURIComponent(match[1]);
  }
  return null;
}

/**
 * Extrai o nome do arquivo de qualquer formato de URL usado no sistema.
 * Aceita:
 *  - /storage/file/xxx.webp -> xxx.webp
 *  - http://.../storage/file/xxx.webp -> xxx.webp
 *  - https://f005.backblazeb2.com/file/nexusuploads/xxx.webp -> xxx.webp
 *  - /uploads/xxx.webp -> xxx.webp
 */
export function extractFileName(url: string | null | undefined): string | null {
  if (!url) return null;

  // URL do proxy: /storage/file/xxx.webp ou http://dominio/storage/file/xxx.webp
  const proxyMatch = url.match(/(?:\/storage\/file\/)(.+)$/);
  if (proxyMatch && proxyMatch[1]) {
    return decodeURIComponent(proxyMatch[1]);
  }

  // URL do Backblaze direta: https://*.backblazeb2.com/file/bucket/xxx.webp
  const b2Match = url.match(/\/file\/[^/]+\/(.+)$/);
  if (b2Match && b2Match[1]) {
    return decodeURIComponent(b2Match[1]);
  }

  // URL local: /uploads/xxx.webp
  const uploadsMatch = url.match(/\/uploads\/(.+)$/);
  if (uploadsMatch && uploadsMatch[1]) {
    return decodeURIComponent(uploadsMatch[1]);
  }

  return null;
}

/**
 * Converte URL de mídia para usar o proxy, se necessário
 * Retorna SEMPRE URL completa com domínio para o frontend conseguir carregar
 */
export function normalizeMediaUrl(url: string | null): string | null {
  if (!url) return null;

  // Se já contém /storage/file na URL completa, verificar se já tem domínio
  if (url.includes('/storage/file')) {
    // Se começa com /storage/file (relativa), adicionar domínio do backend
    if (url.startsWith('/storage/file')) {
      return `${getBaseUrl()}${url}`;
    }
    // Se já tem http/https, é URL completa - retorna como está
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    // Caso contrário (ex: storage/file/xxx), adicionar domínio
    return `${getBaseUrl()}/${url}`;
  }

  // Se for URL do Backblaze (bucket privado), extrair filename e usar proxy
  if (url.startsWith('http') && url.includes('backblazeb2.com')) {
    const fileName = extractFileNameFromUrl(url);
    if (fileName) {
      return `${getBaseUrl()}/storage/file/${fileName}`;
    }
  }

  return url;
}
