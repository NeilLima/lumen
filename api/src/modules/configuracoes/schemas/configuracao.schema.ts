/* eslint-disable prettier/prettier */
export const configuracaoSchema = {
  id: 'uuid',
  userId: 'uuid',
  categoryId: 'uuid | null',
  month: 'string (YYYY-MM)',
  limitAmount: 'number',
  spentAmount: 'number',
  createdAt: 'Date',
  updatedAt: 'Date',
};

export const configuracaoEndpoints = {
  list: 'GET /configuracao',
  create: 'POST /configuracao',
  update: 'PATCH /configuracao/:id',
  remove: 'DELETE /configuracao/:id',
};
