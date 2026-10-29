export interface Cartao {
  id: string;
  nome: string;
  bandeira: 'visa' | 'mastercard' | 'elo' | 'amex' | 'hipercard' | 'outros';
  banco: string;
  limiteTotal: number;
  limiteUtilizado: number;
  melhorDiaCompra: number;
  dataVencimento: number;
  cor: string;
  status: 'ativo' | 'bloqueado' | 'cancelado';
}

export interface CartoesFiltros {
  pesquisa: string;
  bandeira: string;
  banco: string;
  status: string;
}

export interface CartoesResumo {
  totalLimite: number;
  totalUtilizado: number;
  totalDisponivel: number;
  quantidade: number;
  taxaUtilizacao: number;
  cartaoMaiorLimite: Cartao | null;
}

export interface CartoesData {
  cartoes: Cartao[];
  resumo: CartoesResumo;
  bandeiras: string[];
  bancos: string[];
}

export interface CartoesFormData {
  nome: string;
  bandeira: Cartao['bandeira'];
  banco: string;
  limiteTotal: string;
  melhorDiaCompra: string;
  dataVencimento: string;
  cor: string;
}

export interface CartoesState {
  data: CartoesData | null;
  isLoading: boolean;
  filtros: CartoesFiltros;
  modalAberto: boolean;
  editandoId: string | null;
  formData: CartoesFormData;
  exclusaoPendente: Cartao | null;
  detalheCartao: Cartao | null;
  modalInfoAberto: boolean;
}

export interface CartoesActions {
  abrirModalNovo: () => void;
  abrirModalEditar: (cartao: Cartao) => void;
  fecharModal: () => void;
  atualizarFiltro: (campo: keyof CartoesFiltros, valor: string) => void;
  limparFiltros: () => void;
  salvarCartao: () => void;
  excluirCartao: (id: string) => void;
  atualizarForm: (campo: keyof CartoesFormData, valor: string) => void;
  confirmarExclusao: (cartao: Cartao) => void;
  cancelarExclusao: () => void;
  confirmarEExcluir: () => void;
  abrirDetalhe: (cartao: Cartao) => void;
  fecharDetalhe: () => void;
  abrirInfo: () => void;
  fecharInfo: () => void;
}