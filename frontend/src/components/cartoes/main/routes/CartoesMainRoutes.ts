export const cartoesMainRoutes = {
  view: '/cartoes',
  novo: '/cartoes/novo',
  editar: (id: string) => `/cartoes/${id}/editar`,
  detalhe: (id: string) => `/cartoes/${id}`,
};