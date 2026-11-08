/* eslint-disable prettier/prettier */
export const emprestimoSchema = {
  id: 'uuid',
  userId: 'uuid',
  categoryId: 'uuid | null',
  month: 'string (YYYY-MM)',
  limitAmount: 'number',
  spentAmount: 'number',
  createdAt: 'Date',
  updatedAt: 'Date',
};

export const emprestimoEndpoints = {
  list: 'GET /emprestimo',
  create: 'POST /emprestimo',
  update: 'PATCH /emprestimo/:id',
  remove: 'DELETE /emprestimo/:id',
};
