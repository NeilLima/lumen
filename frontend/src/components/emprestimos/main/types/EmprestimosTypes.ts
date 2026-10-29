export interface Emprestimo {
  id: string; nome: string; tipo: string; valor: number; juros: number; parcelas: number; parcelasPagas: number; dataVencimento: string; situacao: string; observacoes?: string; categoria: string; categoriaCor: string; categoriaIcone: string;
}
export interface EmprestimosFiltros { pesquisa: string; situacao: string; tipo: string;  }
export interface EmprestimosResumo { totalEmprestimos: number; totalValor: number; totalAtrasado: number; totalQuitado: number;  }
export interface EmprestimosData { emprestimos: Emprestimo[]; resumo: EmprestimosResumo; }
export interface EmprestimosFormData { nome: string; tipo: string; valor: string; juros: string; parcelas: string; parcelasPagas: string; dataVencimento: string; situacao: string; observacoes: string;  }
export interface EmprestimosState { data: EmprestimosData | null; isLoading: boolean; filtros: EmprestimosFiltros; modalAberto: boolean; editandoId: string | null; formData: EmprestimosFormData; exclusaoPendente: Emprestimo | null; detalheEmprestimo: Emprestimo | null; modalInfoAberto: boolean; }
export interface EmprestimosActions { abrirModalNovo: () => void; abrirModalEditar: (d: Emprestimo) => void; fecharModal: () => void; atualizarFiltro: (c: keyof EmprestimosFiltros, v: string) => void; limparFiltros: () => void; salvarEmprestimo: () => void; atualizarForm: (c: keyof EmprestimosFormData, v: string) => void; confirmarExclusao: (d: Emprestimo) => void; cancelarExclusao: () => void; confirmarEExcluir: () => void; abrirDetalhe: (d: Emprestimo) => void; fecharDetalhe: () => void; abrirInfo: () => void; fecharInfo: () => void; }
