export interface Investimento {
  id: string; nome: string; tipo: string; valorAplicado: number; valorAtual: number; dataAplicacao: string; status: string; observacoes?: string; categoria: string; categoriaCor: string; categoriaIcone: string;
}
export interface InvestimentosFiltros { pesquisa: string; tipo: string; status: string;  }
export interface InvestimentosResumo { totalInvestimentos: number; totalAplicado: number; totalAtual: number; lucroPrejuizo: number;  }
export interface InvestimentosData { investimentos: Investimento[]; resumo: InvestimentosResumo; }
export interface InvestimentosFormData { nome: string; tipo: string; valorAplicado: string; valorAtual: string; dataAplicacao: string; status: string; observacoes: string;  }
export interface InvestimentosState { data: InvestimentosData | null; isLoading: boolean; filtros: InvestimentosFiltros; modalAberto: boolean; editandoId: string | null; formData: InvestimentosFormData; exclusaoPendente: Investimento | null; detalheInvestimento: Investimento | null; modalInfoAberto: boolean; }
export interface InvestimentosActions { abrirModalNovo: () => void; abrirModalEditar: (d: Investimento) => void; fecharModal: () => void; atualizarFiltro: (c: keyof InvestimentosFiltros, v: string) => void; limparFiltros: () => void; salvarInvestimento: () => void; atualizarForm: (c: keyof InvestimentosFormData, v: string) => void; confirmarExclusao: (d: Investimento) => void; cancelarExclusao: () => void; confirmarEExcluir: () => void; abrirDetalhe: (d: Investimento) => void; fecharDetalhe: () => void; abrirInfo: () => void; fecharInfo: () => void; }
