/* eslint-disable prettier/prettier */
/**
 * Rotas do módulo de estoque.
 */
export const estoqueRoutes = {
  base: '/estoque',
  list: '/estoque',
  create: '/estoque',
  update: (id: string) => `/estoque/${id}`,
  remove: (id: string) => `/estoque/${id}`,
};