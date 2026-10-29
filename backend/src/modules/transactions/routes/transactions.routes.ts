/* eslint-disable prettier/prettier */
export const transactionsRoutes = {
  base: '/transactions',
  list: '/transactions',
  recent: '/transactions/recent',
  create: '/transactions',
  update: (id: string) => `/transactions/${id}`,
  remove: (id: string) => `/transactions/${id}`,
};
