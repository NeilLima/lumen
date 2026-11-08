/* eslint-disable prettier/prettier */
export const transactionSchema = {
  id: 'uuid',
  userId: 'uuid',
  description: 'string',
  amount: 'number (decimal 14,2)',
  type: 'INCOME | EXPENSE | TRANSFER',
  date: 'Date (ISO 8601)',
  accountId: 'uuid | null',
  creditCardId: 'uuid | null',
  categoryId: 'uuid | null',
  paymentMethod: 'string | null',
  recurrence: 'NONE | WEEKLY | MONTHLY | YEARLY | null',
  notes: 'string | null',
};

export const transactionEndpoints = {
  list: 'GET /transactions?type=INCOME|EXPENSE',
  recent: 'GET /transactions/recent',
  create: 'POST /transactions',
  update: 'PATCH /transactions/:id',
  remove: 'DELETE /transactions/:id',
};
