export interface CompraItem {
  id: string;
  productId?: string | null;
  nome: string;
  quantidade: number;
  unidade: string;
  precoUnitario: number;
  subtotal: number;
}

export interface Compra {
  id: string;
  userId: string;
  local: string | null;
  dataCompra: string;
  statusPagamento: string;
  parcels: number;
  parcelasPagas: number;
  totalAmount: number;
  notes: string | null;
  itens: CompraItem[];
}

export interface CreateCompraPayload {
  local?: string;
  dataCompra?: string;
  statusPagamento?: string;
  parcels?: number;
  parcelasPagas?: number;
  notes?: string;
  itens: { productId?: string; nome: string; quantidade: number; unidade?: string; precoUnitario: number }[];
}

export interface CompraFilters {
  pesquisa: string;
  statusPagamento: string;
}

export interface CompraResumo {
  total: number;
  pago: number;
  pendente: number;
  parcelado: number;
  totalItens: number;
}

export interface ComprasData {
  compras: Compra[];
  resumo: CompraResumo;
}

export interface ComprasFormData {
  local: string;
  statusPagamento: string;
  itens: CreateCompraPayload['itens'];
}
