export interface Meta {
  id: string;
  nome: string;
  valorAlvo: number;
  valorAtual: number;
  dataLimite: string;
  categoria: string;
  categoriaCor: string;
  categoriaIcone: string;
  prioridade: 'baixa' | 'media' | 'alta';
  status: 'em_andamento' | 'concluida' | 'pausada';
  descricao?: string;
}

export interface MetasFiltros {
  pesquisa: string;
  categoria: string;
  status: string;
  prioridade: string;
}

export interface MetasResumo {
  totalMetas: number;
  totalConcluidas: number;
  totalEmAndamento: number;
  totalValorAlvo: number;
  totalValorAtual: number;
  progressoMedio: number;
}

export interface MetasData {
  metas: Meta[];
  resumo: MetasResumo;
  categorias: string[];
  evolucaoMensal: { mes: string; depositado: number; }[];
}

export interface MetasFormData {
  nome: string;
  valorAlvo: string;
  valorAtual: string;
  dataLimite: string;
  categoria: string;
  prioridade: Meta['prioridade'];
  status: Meta['status'];
  descricao: string;
}

export interface MetasState {
  data: MetasData | null;
  isLoading: boolean;
  filtros: MetasFiltros;
  modalAberto: boolean;
  editandoId: string | null;
  formData: MetasFormData;
  exclusaoPendente: Meta | null;
  detalheMeta: Meta | null;
  modalInfoAberto: boolean;
}

export interface MetasActions {
  abrirModalNovo: () => void;
  abrirModalEditar: (meta: Meta) => void;
  fecharModal: () => void;
  atualizarFiltro: (campo: keyof MetasFiltros, valor: string) => void;
  limparFiltros: () => void;
  salvarMeta: () => void;
  atualizarForm: (campo: keyof MetasFormData, valor: string) => void;
  confirmarExclusao: (meta: Meta) => void;
  cancelarExclusao: () => void;
  confirmarEExcluir: () => void;
  abrirDetalhe: (meta: Meta) => void;
  fecharDetalhe: () => void;
  abrirInfo: () => void;
  fecharInfo: () => void;
}
