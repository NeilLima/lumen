/* eslint-disable prettier/prettier */
export const metaSchema = {
  id: 'uuid',
  userId: 'uuid',
  nome: 'string',
  valorAlvo: 'number',
  valorAtual: 'number',
  dataLimite: 'string (ISO date)',
  categoria: 'string',
  categoriaCor: 'string | null',
  categoriaIcone: 'string | null',
  prioridade: 'baixa | media | alta',
  status: 'em_andamento | concluida | pausada',
  descricao: 'string | null',
  createdAt: 'Date',
  updatedAt: 'Date',
};

export const metaEndpoints = {
  list: 'GET /metas',
  create: 'POST /metas',
  update: 'PATCH /metas/:id',
  remove: 'DELETE /metas/:id',
};