import type { FeedbackData } from '@/shared/feedback';

export type ReceitaRecorrencia = 'unica' | 'mensal' | 'semanal' | 'anual';

export interface Receita {
  id: string;
  nome: string;
  categoria: string;
  categoriaCor: string;
  categoriaIcone: string;
  valor: number;
  conta: string;
  contaIcone: string;
  data: string;
  recorrencia: ReceitaRecorrencia;
  observacoes?: string;
  comprovante?: string;
  status: 'recebido' | 'pendente' | 'atrasado';
}

export interface ReceitasFiltros {
  pesquisa: string;
  categoria: string;
  conta: string;
  status: string;
  dataInicio: string;
  dataFim: string;
}

export interface ReceitasResumo {
  totalRecebido: number;
  totalPendente: number;
  totalAtrasado: number;
  quantidade: number;
  media: number;
  maiorReceita: Receita | null;
}

export interface ReceitasData {
  receitas: Receita[];
  resumo: ReceitasResumo;
  categorias: string[];
  contas: string[];
}

export interface ReceitasFormData {
  nome: string;
  categoria: string;
  valor: string;
  conta: string;
  data: string;
  recorrencia: Receita['recorrencia'];
  observacoes: string;
  comprovante?: string;
}

export type ReceitasFeedback = FeedbackData;

export interface ReceitasState {
  data: ReceitasData | null;
  isLoading: boolean;
  filtros: ReceitasFiltros;
  modalAberto: boolean;
  editandoId: string | null;
  formData: ReceitasFormData;
  exclusaoPendente: Receita | null;
  feedback: ReceitasFeedback | null;
}

export interface ReceitasActions {
  abrirModalNovo: () => void;
  abrirModalEditar: (receita: Receita) => void;
  fecharModal: () => void;
  atualizarFiltro: (campo: keyof ReceitasFiltros, valor: string) => void;
  limparFiltros: () => void;
  salvarReceita: () => Promise<void>;
  atualizarForm: (campo: keyof ReceitasFormData, valor: string) => void;
  confirmarExclusao: (receita: Receita) => void;
  cancelarExclusao: () => void;
  confirmarEExcluir: () => Promise<void>;
  abrirDetalhe: (receita: Receita) => void;
  fecharDetalhe: () => void;
  abrirInfo: () => void;
  fecharInfo: () => void;
  fecharFeedback: () => void;
}