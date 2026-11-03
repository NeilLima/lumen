/* eslint-disable prettier/prettier */
export const emprestimoRoutes = {
  base: '/emprestimo',
  list: '/emprestimo',
  create: '/emprestimo',
  update: (id: string) => `/emprestimo/${id}`,
  remove: (id: string) => `/emprestimo/${id}`,
};
