export interface Despesa {
  id: string;
  nome: string;
  categoria: string;
  categoriaCor: string;
  categoriaIcone: string;
  valor: number;
  conta: string;
  contaIcone: string;
  cartao?: string;
  data: string;
  parcelas: number;
  prioridade: 'baixa' | 'media' | 'alta';
  observacoes?: string;
  status: 'pago' | 'pendente' | 'atrasado';
}

export interface DespesasFiltros {
  pesquisa: string;
  categoria: string;
  conta: string;
  status: string;
  prioridade: string;
  dataInicio: string;
  dataFim: string;
}

export interface DespesasResumo {
  totalPago: number;
  totalPendente: number;
  totalAtrasado: number;
  quantidade: number;
  media: number;
  maiorDespesa: Despesa | null;
}

export interface DespesasData {
  despesas: Despesa[];
  resumo: DespesasResumo;
  categorias: string[];
  contas: string[];
}

export interface DespesasFormData {
  nome: string;
  categoria: string;
  valor: string;
  conta: string;
  cartao: string;
  data: string;
  parcelas: string;
  prioridade: Despesa['prioridade'];
  observacoes: string;
}

export interface DespesasState {
  data: DespesasData | null;
  isLoading: boolean;
  filtros: DespesasFiltros;
  modalAberto: boolean;
  editandoId: string | null;
  formData: DespesasFormData;
  exclusaoPendente: Despesa | null;
  detalheDespesa: Despesa | null;
  modalInfoAberto: boolean;
}

export interface ApiCategory {
  id: string;
  name: string;
  color?: string | null;
  icon?: string | null;
  type?: string;
}

export interface ApiAccount {
  id: string;
  name: string;
  type?: string;
}

export interface ApiCreditCard {
  id: string;
  name: string;
}

export interface ApiExpense {
  id: string;
  description: string;
  amount: number | string;
  date: string;
  status?: string;
  paymentMethod?: string | null;
  notes?: string | null;
  categoryName?: string | null;
  categoryColor?: string | null;
  accountName?: string | null;
  creditCardName?: string | null;
}
export interface DespesasActions {
  abrirModalNovo: () => void;
  abrirModalEditar: (despesa: Despesa) => void;
  fecharModal: () => void;
  atualizarFiltro: (campo: keyof DespesasFiltros, valor: string) => void;
  limparFiltros: () => void;
  salvarDespesa: () => void;
  excluirDespesa: (id: string) => void;
  atualizarForm: (campo: keyof DespesasFormData, valor: string) => void;
  confirmarExclusao: (despesa: Despesa) => void;
  cancelarExclusao: () => void;
  confirmarEExcluir: () => void;
  abrirDetalhe: (despesa: Despesa) => void;
  fecharDetalhe: () => void;
  abrirInfo: () => void;
  fecharInfo: () => void;
}