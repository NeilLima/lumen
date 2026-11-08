/* eslint-disable prettier/prettier */
export const comprasRoutes = {
  base: '/compras',
  list: '/compras',
  create: '/compras',
  update: (id: string) => `/compras/${id}`,
  remove: (id: string) => `/compras/${id}`,
  get: (id: string) => `/compras/${id}`,
};
