/* eslint-disable prettier/prettier */
export const notificacaoRoutes = {
  base: '/notificacao',
  list: '/notificacao',
  create: '/notificacao',
  update: (id: string) => `/notificacao/${id}`,
  remove: (id: string) => `/notificacao/${id}`,
};
