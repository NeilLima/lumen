/* eslint-disable prettier/prettier */
export const orcamentoSchema = {
  id: 'uuid',
  userId: 'uuid',
  categoryId: 'uuid | null',
  month: 'string (YYYY-MM)',
  limitAmount: 'number',
  spentAmount: 'number',
  createdAt: 'Date',
  updatedAt: 'Date',
};

export const orcamentoEndpoints = {
  list: 'GET /orcamento',
  create: 'POST /orcamento',
  update: 'PATCH /orcamento/:id',
  remove: 'DELETE /orcamento/:id',
};
