export interface OrcamentoCategoria {
  id: string;
  categoria: string;
  categoriaCor: string;
  categoriaIcone: string;
  limite: number;
  gasto: number;
  mes: number;
  ano: number;
  status: 'dentro' | 'atencao' | 'estourado';
}

export interface OrcamentoFiltros {
  pesquisa: string;
  status: string;
  mes: string;
}

export interface OrcamentoResumo {
  totalLimite: number;
  totalGasto: number;
  totalDisponivel: number;
  percentualUsado: number;
  categoriasEstouradas: number;
  categoriasAtencao: number;
}

export interface OrcamentoData {
  categorias: OrcamentoCategoria[];
  resumo: OrcamentoResumo;
  meses: string[];
  anos: number[];
}

export interface OrcamentoFormData {
  categoria: string;
  limite: string;
  gasto: string;
  mes: string;
  ano: string;
}

export interface OrcamentoState {
  data: OrcamentoData | null;
  isLoading: boolean;
  filtros: OrcamentoFiltros;
  modalAberto: boolean;
  editandoId: string | null;
  formData: OrcamentoFormData;
  exclusaoPendente: OrcamentoCategoria | null;
  detalheCategoria: OrcamentoCategoria | null;
  modalInfoAberto: boolean;
}

export interface OrcamentoActions {
  abrirModalNovo: () => void;
  abrirModalEditar: (cat: OrcamentoCategoria) => void;
  fecharModal: () => void;
  atualizarFiltro: (campo: keyof OrcamentoFiltros, valor: string) => void;
  limparFiltros: () => void;
  salvarCategoria: () => void;
  atualizarForm: (campo: keyof OrcamentoFormData, valor: string) => void;
  confirmarExclusao: (cat: OrcamentoCategoria) => void;
  cancelarExclusao: () => void;
  confirmarEExcluir: () => void;
  abrirDetalhe: (cat: OrcamentoCategoria) => void;
  fecharDetalhe: () => void;
  abrirInfo: () => void;
  fecharInfo: () => void;
}
