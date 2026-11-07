/* eslint-disable prettier/prettier */
export const compraItemSchema = {
  id: 'uuid',
  compraId: 'uuid',
  productId: 'uuid | null',
  nome: 'string',
  quantidade: 'number',
  unidade: 'string',
  precoUnitario: 'number',
  subtotal: 'number',
  createdAt: 'Date',
};

export const compraSchema = {
  id: 'uuid',
  userId: 'uuid',
  local: 'string | null',
  dataCompra: 'Date',
  statusPagamento: 'string',
  parcels: 'number',
  parcelasPagas: 'number',
  totalAmount: 'number',
  notes: 'string | null',
  createdAt: 'Date',
  updatedAt: 'Date',
  itens: 'CompraItem[]',
};

export const comprasEndpoints = {
  list: 'GET /compras',
  get: 'GET /compras/:id',
  create: 'POST /compras',
  update: 'PATCH /compras/:id',
  remove: 'DELETE /compras/:id',
};
