/* eslint-disable prettier/prettier */
/**
 * Schemas de resposta do módulo de contas.
 * Define o formato padronizado de retorno da API.
 */

export const accountSchema = {
  id: 'uuid',
  userId: 'uuid',
  name: 'string',
  type: 'CHECKING | SAVINGS | WALLET | INVESTMENT',
  balance: 'number',
  color: 'string | null',
  createdAt: 'Date',
  updatedAt: 'Date',
};

export const accountEndpoints = {
  list: 'GET /accounts',
  create: 'POST /accounts',
  update: 'PATCH /accounts/:id',
  remove: 'DELETE /accounts/:id',
};
