export interface Configuracao {
  id: string; nome: string; categoria: string; valor: string; data: string; descricao?: string; categoriaCor: string; categoriaIcone: string;
}
export interface ConfiguracoesFiltros { pesquisa: string; categoria: string;  }
export interface ConfiguracoesResumo { totalConfiguracoes: number; totalAparencia: number; totalSeguranca: number; totalNotificacoesConfig: number;  }
export interface ConfiguracoesData { configuracoes: Configuracao[]; resumo: ConfiguracoesResumo; }
export interface ConfiguracoesFormData { nome: string; categoria: string; valor: string; descricao: string;  }
export interface ConfiguracoesState { data: ConfiguracoesData | null; isLoading: boolean; filtros: ConfiguracoesFiltros; modalAberto: boolean; editandoId: string | null; formData: ConfiguracoesFormData; exclusaoPendente: Configuracao | null; detalheConfiguracao: Configuracao | null; modalInfoAberto: boolean; }
export interface ConfiguracoesActions { abrirModalNovo: () => void; abrirModalEditar: (d: Configuracao) => void; fecharModal: () => void; atualizarFiltro: (c: keyof ConfiguracoesFiltros, v: string) => void; limparFiltros: () => void; salvarConfiguracao: () => void; atualizarForm: (c: keyof ConfiguracoesFormData, v: string) => void; confirmarExclusao: (d: Configuracao) => void; cancelarExclusao: () => void; confirmarEExcluir: () => void; abrirDetalhe: (d: Configuracao) => void; fecharDetalhe: () => void; abrirInfo: () => void; fecharInfo: () => void; }
