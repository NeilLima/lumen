export const receitasMainRoutes = {
  view: '/receitas',
  novo: '/receitas/novo',
  editar: (id: string) => `/receitas/${id}/editar`,
  detalhe: (id: string) => `/receitas/${id}`,
};