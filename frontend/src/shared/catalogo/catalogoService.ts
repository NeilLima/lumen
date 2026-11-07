// ============================================
// CATÁLOGO DE PRODUTOS COMPARTILHADO
// Página /produtos grava aqui; modal do /estoque lê daqui.
// ============================================

export interface ProdutoCatalogo {
  id: string;
  nome: string;
  categoria: string;
  localCompra: string;
  preco: number;
}

const CHAVE = 'lumen_produtos_catalogo';

export function carregarCatalogo(): ProdutoCatalogo[] {
  if (typeof window === 'undefined') return [];
  try {
    const bruto = window.localStorage.getItem(CHAVE);
    if (!bruto) {
      return [];
    }
    const dados = JSON.parse(bruto);
    return Array.isArray(dados) ? dados : [];
  } catch {
    return [];
  }
}

export function salvarCatalogo(produtos: ProdutoCatalogo[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CHAVE, JSON.stringify(produtos));
  } catch {
    // ignora quota/private mode
  }
}
