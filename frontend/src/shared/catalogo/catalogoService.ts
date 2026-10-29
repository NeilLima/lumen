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

const MOCK_CATALOGO: ProdutoCatalogo[] = [
  { id: 'p1', nome: 'Arroz Tipo 1 (5kg)', categoria: 'Alimentos', localCompra: 'Supermercado Extra', preco: 27.9 },
  { id: 'p2', nome: 'Feijão Carioca (1kg)', categoria: 'Alimentos', localCompra: 'Supermercado Extra', preco: 8.5 },
  { id: 'p3', nome: 'Óleo de Soja (900ml)', categoria: 'Alimentos', localCompra: 'Atacado Z', preco: 7.9 },
  { id: 'p4', nome: 'Café Torrado e Moído (500g)', categoria: 'Alimentos', localCompra: 'Padaria Central', preco: 18.9 },
  { id: 'p5', nome: 'Detergente Neutro', categoria: 'Limpeza', localCompra: 'Mercado Y', preco: 2.49 },
  { id: 'p6', nome: 'Sabão em Pó (1,6kg)', categoria: 'Limpeza', localCompra: 'Atacado Z', preco: 15.9 },
  { id: 'p7', nome: 'Papel Higiênico (12 rolos)', categoria: 'Higiene', localCompra: 'Atacado Z', preco: 21.9 },
];

export function carregarCatalogo(): ProdutoCatalogo[] {
  if (typeof window === 'undefined') return [];
  try {
    const bruto = window.localStorage.getItem(CHAVE);
    if (!bruto) {
      window.localStorage.setItem(CHAVE, JSON.stringify(MOCK_CATALOGO));
      return MOCK_CATALOGO;
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
