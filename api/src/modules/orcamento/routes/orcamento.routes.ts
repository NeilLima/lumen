/* eslint-disable prettier/prettier */
export const orcamentoRoutes = {
  base: '/orcamento',
  list: '/orcamento',
  create: '/orcamento',
  update: (id: string) => `/orcamento/${id}`,
  remove: (id: string) => `/orcamento/${id}`,
};
