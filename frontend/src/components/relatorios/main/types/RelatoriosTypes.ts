export interface Relatorio {
  id: string; nome: string; tipo: string; periodo: string; dataInicio: string; dataFim: string; status: string; valor: number; data: string; observacoes?: string; categoria: string; categoriaCor: string; categoriaIcone: string;
}
export interface RelatoriosFiltros { pesquisa: string; tipo: string; periodo: string;  }
export interface RelatoriosResumo { totalRelatorios: number; totalReceitas: number; totalDespesas: number; saldo: number;  }
export interface RelatoriosData { relatorios: Relatorio[]; resumo: RelatoriosResumo; }
export interface RelatoriosFormData { nome: string; tipo: string; periodo: string; dataInicio: string; dataFim: string; observacoes: string;  }
export interface RelatoriosState { data: RelatoriosData | null; isLoading: boolean; filtros: RelatoriosFiltros; modalAberto: boolean; editandoId: string | null; formData: RelatoriosFormData; exclusaoPendente: Relatorio | null; detalheRelatorio: Relatorio | null; modalInfoAberto: boolean; }
export interface RelatoriosActions { abrirModalNovo: () => void; abrirModalEditar: (d: Relatorio) => void; fecharModal: () => void; atualizarFiltro: (c: keyof RelatoriosFiltros, v: string) => void; limparFiltros: () => void; salvarRelatorio: () => void; atualizarForm: (c: keyof RelatoriosFormData, v: string) => void; confirmarExclusao: (d: Relatorio) => void; cancelarExclusao: () => void; confirmarEExcluir: () => void; abrirDetalhe: (d: Relatorio) => void; fecharDetalhe: () => void; abrirInfo: () => void; fecharInfo: () => void; }
