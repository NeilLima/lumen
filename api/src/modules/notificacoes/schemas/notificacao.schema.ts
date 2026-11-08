/* eslint-disable prettier/prettier */
export const notificacaoSchema = {
  id: 'uuid',
  userId: 'uuid',
  categoryId: 'uuid | null',
  month: 'string (YYYY-MM)',
  limitAmount: 'number',
  spentAmount: 'number',
  createdAt: 'Date',
  updatedAt: 'Date',
};

export const notificacaoEndpoints = {
  list: 'GET /notificacao',
  create: 'POST /notificacao',
  update: 'PATCH /notificacao/:id',
  remove: 'DELETE /notificacao/:id',
};
