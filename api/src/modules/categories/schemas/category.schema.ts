/* eslint-disable prettier/prettier */
export const categorySchema = {
  id: 'uuid',
  userId: 'uuid',
  name: 'string',
  color: 'string (hex)',
  icon: 'string | null',
  type: 'INCOME | EXPENSE | BOTH',
  createdAt: 'Date',
  updatedAt: 'Date',
};

export const categoryEndpoints = {
  list: 'GET /categories',
  create: 'POST /categories',
  update: 'PATCH /categories/:id',
  remove: 'DELETE /categories/:id',
};
