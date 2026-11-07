/* eslint-disable prettier/prettier */
export interface CompraItemResponse {
  id: string;
  compraId: string;
  productId: string | null;
  nome: string;
  quantidade: number;
  unidade: string;
  precoUnitario: number;
  subtotal: number;
  createdAt: Date;
}

export interface CompraResponse {
  id: string;
  userId: string;
  local: string | null;
  dataCompra: Date;
  statusPagamento: string;
  parcels: number;
  parcelasPagas: number;
  totalAmount: number;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  itens: CompraItemResponse[];
}

export interface DeleteResult {
  deleted: boolean;
}
