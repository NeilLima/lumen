/* eslint-disable prettier/prettier */
/**
 * Configuração de uploads simplificada para o Lumen.
 * Validação de base64 e processamento pass-through (sem sharp/ffmpeg).
 */

const ALLOWED_MIME_TYPES: Record<string, 'image' | 'video' | 'audio'> = {
  'image/jpeg': 'image',
  'image/png': 'image',
  'image/webp': 'image',
  'image/gif': 'image',
  'video/mp4': 'video',
  'video/webm': 'video',
  'audio/mpeg': 'audio',
  'audio/wav': 'audio',
};

export function validateMedia(base64Data: string): {
  isValid: boolean;
  type: 'image' | 'video' | 'audio' | null;
  mimeType: string | null;
} {
  const match = /^data:([a-zA-Z0-9/-]+);base64,/.exec(base64Data);
  if (!match) {
    return { isValid: false, type: null, mimeType: null };
  }
  const mimeType = match[1];
  const type = ALLOWED_MIME_TYPES[mimeType] ?? null;
  return { isValid: type !== null, type, mimeType };
}

export async function processMedia(base64Data: string): Promise<string> {
  // Processamento pass-through: mantém o base64 original
  return base64Data;
}
