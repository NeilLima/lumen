// ============================================
// FORMATAÇÃO MONETÁRIA (pt-BR — R$ com vírgula e centavos)
// ============================================

/** 1234.5 -> "1.234,50" */
export function formatarValor(valor: number): string {
  if (!Number.isFinite(valor)) return '0,00';
  return valor.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** "123456" -> "1.234,56" (input mascarado em tempo real) */
export function formatarDigitosComoMoeda(digitos: string): string {
  const puros = digitos.replace(/\D/g, '');
  if (!puros) return '';
  const numero = parseInt(puros, 10) / 100;
  return formatarValor(numero);
}

/** "1.234,56" -> 1234.56 */
export function parseMoeda(texto: string): number {
  if (!texto) return 0;
  const limpo = texto.replace(/\./g, '').replace(',', '.');
  const numero = parseFloat(limpo);
  return Number.isFinite(numero) ? numero : 0;
}

export function formatarData(data: string): string {
  const partes = data.split('-');
  if (partes.length !== 3) return data;
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}
