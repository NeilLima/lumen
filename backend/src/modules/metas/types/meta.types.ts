/* eslint-disable prettier/prettier */
export type MetaPrioridade = 'baixa' | 'media' | 'alta';
export type MetaStatus = 'em_andamento' | 'concluida' | 'pausada';

export interface MetaResponse {
  id: string;
  userId: string;
  nome: string;
  valorAlvo: number;
  valorAtual: number;
  dataLimite: string;
  categoria: string;
  categoriaCor: string | null;
  categoriaIcone: string | null;
  prioridade: MetaPrioridade;
  status: MetaStatus;
  descricao: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeleteResult {
  deleted: boolean;
}