export interface Notificacao {
  id: string; titulo: string; tipo: string; valor: number; data: string; mensagem?: string; status: string; categoria: string; categoriaCor: string; categoriaIcone: string;
}
export interface NotificacoesFiltros { pesquisa: string; tipo: string; status: string;  }
export interface NotificacoesResumo { totalNotificacoes: number; totalNaoLidas: number; totalLidas: number; totalArquivadas: number;  }
export interface NotificacoesData { notificacoes: Notificacao[]; resumo: NotificacoesResumo; }
export interface NotificacoesFormData { titulo: string; tipo: string; mensagem: string; data: string; status: string;  }
export interface NotificacoesState { data: NotificacoesData | null; isLoading: boolean; filtros: NotificacoesFiltros; modalAberto: boolean; editandoId: string | null; formData: NotificacoesFormData; exclusaoPendente: Notificacao | null; detalheNotificacao: Notificacao | null; modalInfoAberto: boolean; }
export interface NotificacoesActions { abrirModalNovo: () => void; abrirModalEditar: (d: Notificacao) => void; fecharModal: () => void; atualizarFiltro: (c: keyof NotificacoesFiltros, v: string) => void; limparFiltros: () => void; salvarNotificacao: () => void; atualizarForm: (c: keyof NotificacoesFormData, v: string) => void; confirmarExclusao: (d: Notificacao) => void; cancelarExclusao: () => void; confirmarEExcluir: () => void; abrirDetalhe: (d: Notificacao) => void; fecharDetalhe: () => void; abrirInfo: () => void; fecharInfo: () => void; }
