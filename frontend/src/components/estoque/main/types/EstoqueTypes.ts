import type { FeedbackData } from '@/shared/feedback';

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
  compraItemId?: string | null;
}

export interface EstoqueCompraItemApi {
  id: string;
  nome: string;
  quantidade: number;
  unidade: string;
  precoUnitario: number;
  productId?: string | null;
  product?: { id: string; name: string; category: string } | null;
}

export interface EstoqueCompraApi {
  id: string;
  local: string | null;
  dataCompra: string;
  itens: EstoqueCompraItemApi[];
}

export interface EstoqueProductApi {
  id: string;
  name: string;
  category: string;
}

export interface EstoqueCompraItemOption {
  id: string;
  compraId: string;
  nome: string;
  categoria: string;
  quantidade: number;
  unidade: string;
  preco: number;
  localCompra: string;
  dataCompra: string;
}

export interface EstoqueFiltros {
  pesquisa: string;
  categoria: string;
  localCompra: string;
  status: string;
}

export interface EstoqueFormData {
  nome: string;
  categoria: string;
  localCompra: string;
  quantidade: string;
  unidade: string;
  preco: string;
  quantidadeMinima: string;
  compraItemId: string;
}

export interface EstoqueSubmitData {
  nome: string;
  categoria: string;
  localCompra: string;
  quantidade: number;
  unidade: string;
  preco: number;
  quantidadeMinima: number;
  compraItemId?: string;
}

export interface EstoqueData {
  itens: EstoqueItem[];
  categorias: string[];
  locais: string[];
}

export type EstoqueFeedback = FeedbackData;

export interface EstoqueState {
  data: EstoqueData | null;
  itensCompra: EstoqueCompraItemOption[];
  isLoading: boolean;
  filtros: EstoqueFiltros;
  modalAberto: boolean;
  editandoId: string | null;
  formData: EstoqueFormData;
  exclusaoPendente: EstoqueItem | null;
  detalheItem: EstoqueItem | null;
  modalInfoAberto: boolean;
  feedback: EstoqueFeedback | null;
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
  fecharFeedback: () => void;
  selecionarCompraItem: (compraItemId: string) => void;
}