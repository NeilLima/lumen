/* eslint-disable prettier/prettier */
/**
 * Schemas de resposta do módulo de estoque.
 * Define o formato padronizado de retorno da API.
 */

export const estoqueItemSchema = {
  id: 'uuid',
  userId: 'uuid',
  nome: 'string',
  categoria: 'string',
  quantidade: 'number',
  unidade: 'string',
  preco: 'number',
  localCompra: 'string',
  quantidadeMinima: 'number',
  dataAtualizacao: 'Date',
  createdAt: 'Date',
  updatedAt: 'Date',
};

export const estoqueEndpoints = {
  list: 'GET /estoque',
  create: 'POST /estoque',
  update: 'PATCH /estoque/:id',
  remove: 'DELETE /estoque/:id',
};