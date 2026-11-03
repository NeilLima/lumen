/* eslint-disable prettier/prettier */
export const investimentoSchema = {
  id: 'uuid',
  userId: 'uuid',
  categoryId: 'uuid | null',
  month: 'string (YYYY-MM)',
  limitAmount: 'number',
  spentAmount: 'number',
  createdAt: 'Date',
  updatedAt: 'Date',
};

export const investimentoEndpoints = {
  list: 'GET /investimento',
  create: 'POST /investimento',
  update: 'PATCH /investimento/:id',
  remove: 'DELETE /investimento/:id',
};
