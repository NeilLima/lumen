/* eslint-disable prettier/prettier */
export const investimentosRoutes = {
  base: '/investimentos',
  list: '/investimentos',
  create: '/investimentos',
  update: (id: string) => `/investimentos/${id}`,
  remove: (id: string) => `/investimentos/${id}`,
};
