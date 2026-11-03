export interface ApiCategory { id: string; name: string; color?: string; icon?: string; type?: string; }
export interface ApiDebt { id: string; name: string; type?: string; totalAmount: number | string; remainingAmount?: number | string; interestRate?: number | string | null; dueDate?: string | null; parcels?: number; parcelasPagas?: number; status?: string; category?: ApiCategory | null; notes?: string | null; }

export interface Divida {
  id: string; nome: string; tipo: 'pessoa' | 'empresa' | 'banco'; valor: number; parcelas: number; parcelasPagas: number;
  juros: number; dataVencimento: string; situacao: 'em_dia' | 'atrasada' | 'quitada'; categoria: string; categoriaCor: string; categoriaIcone: string; observacoes?: string;
}
export interface DividasFiltros { pesquisa: string; situacao: string; tipo: string; }
export interface DividasResumo { totalDividas: number; totalValor: number; totalAtrasado: number; totalQuitado: number; totalEmDia: number; }
export interface DividasData { dividas: Divida[]; resumo: DividasResumo; }
export interface DividasFormData { nome: string; tipo: string; valor: string; parcelas: string; parcelasPagas: string; juros: string; dataVencimento: string; situacao: string; categoria: string; observacoes: string; }
export interface DividasState { data: DividasData | null; isLoading: boolean; filtros: DividasFiltros; modalAberto: boolean; editandoId: string | null; formData: DividasFormData; exclusaoPendente: Divida | null; detalheDivida: Divida | null; modalInfoAberto: boolean; }
export interface DividasActions { abrirModalNovo: () => void; abrirModalEditar: (d: Divida) => void; fecharModal: () => void; atualizarFiltro: (c: keyof DividasFiltros, v: string) => void; limparFiltros: () => void; salvarDivida: () => void; atualizarForm: (c: keyof DividasFormData, v: string) => void; confirmarExclusao: (d: Divida) => void; cancelarExclusao: () => void; confirmarEExcluir: () => void; abrirDetalhe: (d: Divida) => void; fecharDetalhe: () => void; abrirInfo: () => void; fecharInfo: () => void; }
