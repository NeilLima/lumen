/* eslint-disable prettier/prettier */
export const categoriesRoutes = {
  base: '/categories',
  list: '/categories',
  create: '/categories',
  update: (id: string) => `/categories/${id}`,
  remove: (id: string) => `/categories/${id}`,
};
