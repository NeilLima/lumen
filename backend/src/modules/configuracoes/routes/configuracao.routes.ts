/* eslint-disable prettier/prettier */
export const configuracaoRoutes = {
  base: '/configuracao',
  list: '/configuracao',
  create: '/configuracao',
  update: (id: string) => `/configuracao/${id}`,
  remove: (id: string) => `/configuracao/${id}`,
};
