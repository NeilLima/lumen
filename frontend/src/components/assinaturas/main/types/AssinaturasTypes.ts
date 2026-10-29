export interface Assinatura {
  id: string; nome: string; categoria: string; valor: number; ciclo: string; proximaCobranca: string; status: string; observacoes?: string; categoriaCor: string; categoriaIcone: string;
}
export interface AssinaturasFiltros { pesquisa: string; categoria: string; status: string;  }
export interface AssinaturasResumo { totalAssinaturas: number; totalMensal: number; totalAnual: number; totalAtivas: number;  }
export interface AssinaturasData { assinaturas: Assinatura[]; resumo: AssinaturasResumo; }
export interface AssinaturasFormData { nome: string; categoria: string; valor: string; ciclo: string; proximaCobranca: string; status: string; observacoes: string;  }
export interface AssinaturasState { data: AssinaturasData | null; isLoading: boolean; filtros: AssinaturasFiltros; modalAberto: boolean; editandoId: string | null; formData: AssinaturasFormData; exclusaoPendente: Assinatura | null; detalheAssinatura: Assinatura | null; modalInfoAberto: boolean; }
export interface AssinaturasActions { abrirModalNovo: () => void; abrirModalEditar: (d: Assinatura) => void; fecharModal: () => void; atualizarFiltro: (c: keyof AssinaturasFiltros, v: string) => void; limparFiltros: () => void; salvarAssinatura: () => void; atualizarForm: (c: keyof AssinaturasFormData, v: string) => void; confirmarExclusao: (d: Assinatura) => void; cancelarExclusao: () => void; confirmarEExcluir: () => void; abrirDetalhe: (d: Assinatura) => void; fecharDetalhe: () => void; abrirInfo: () => void; fecharInfo: () => void; }
