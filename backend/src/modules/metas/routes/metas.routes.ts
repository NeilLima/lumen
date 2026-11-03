/* eslint-disable prettier/prettier */
export const metasRoutes = {
  base: '/metas',
  list: '/metas',
  create: '/metas',
  update: (id: string) => `/metas/${id}`,
  remove: (id: string) => `/metas/${id}`,
};