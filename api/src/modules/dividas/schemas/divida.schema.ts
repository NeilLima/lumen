/* eslint-disable prettier/prettier */
export const dividaSchema = {
  id: 'uuid',
  userId: 'uuid',
  categoryId: 'uuid | null',
  month: 'string (YYYY-MM)',
  limitAmount: 'number',
  spentAmount: 'number',
  createdAt: 'Date',
  updatedAt: 'Date',
};

export const dividaEndpoints = {
  list: 'GET /divida',
  create: 'POST /divida',
  update: 'PATCH /divida/:id',
  remove: 'DELETE /divida/:id',
};
