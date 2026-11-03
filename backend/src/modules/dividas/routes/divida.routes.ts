/* eslint-disable prettier/prettier */
export const dividaRoutes = {
  base: '/divida',
  list: '/divida',
  create: '/divida',
  update: (id: string) => `/divida/${id}`,
  remove: (id: string) => `/divida/${id}`,
};
