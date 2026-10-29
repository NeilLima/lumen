export interface EstoqueItem {
  id: string;
  nome: string;
  categoria: string;
  quantidade: number;
  unidade: string;
  preco: number;
  localCompra: string;
  quantidadeMinima: number;
  dataAtualizacao: string;
}

export interface EstoqueFiltros {
  pesquisa: string;
  categoria: string;
  localCompra: string;
  status: string;
}

export interface EstoqueFormData {
  produtoCatalogoId: string;
  nome: string;
  categoria: string;
  localCompra: string;
  quantidade: string;
  unidade: string;
  preco: string;
  quantidadeMinima: string;
}

export interface EstoqueData {
  itens: EstoqueItem[];
  categorias: string[];
  locais: string[];
}

export interface EstoqueState {
  data: EstoqueData | null;
  isLoading: boolean;
  filtros: EstoqueFiltros;
  modalAberto: boolean;
  editandoId: string | null;
  formData: EstoqueFormData;
  exclusaoPendente: EstoqueItem | null;
  detalheItem: EstoqueItem | null;
  modalInfoAberto: boolean;
}

export interface EstoqueActions {
  abrirModalNovo: () => void;
  abrirModalEditar: (item: EstoqueItem) => void;
  fecharModal: () => void;
  atualizarFiltro: (campo: keyof EstoqueFiltros, valor: string) => void;
  limparFiltros: () => void;
  salvarItem: () => void;
  excluirItem: (id: string) => void;
  atualizarForm: (campo: keyof EstoqueFormData, valor: string) => void;
  confirmarExclusao: (item: EstoqueItem) => void;
  cancelarExclusao: () => void;
  confirmarEExcluir: () => void;
  abrirDetalhe: (item: EstoqueItem) => void;
  fecharDetalhe: () => void;
  abrirInfo: () => void;
  fecharInfo: () => void;
}