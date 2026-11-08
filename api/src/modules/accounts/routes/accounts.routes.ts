/* eslint-disable prettier/prettier */
/**
 * Rotas do módulo de contas.
 */
export const accountsRoutes = {
  base: '/accounts',
  list: '/accounts',
  create: '/accounts',
  update: (id: string) => `/accounts/${id}`,
  remove: (id: string) => `/accounts/${id}`,
};
