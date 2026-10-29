export interface Ajuda {
  id: string; titulo: string; categoria: string; valor: number; data: string; conteudo?: string; status: string; categoriaCor: string; categoriaIcone: string;
}
export interface AjudaFiltros { pesquisa: string; categoria: string; status: string;  }
export interface AjudaResumo { totalArtigos: number; totalPublicados: number; totalRascunhos: number; totalCategoriasAjuda: number;  }
export interface AjudaData { ajudas: Ajuda[]; resumo: AjudaResumo; }
export interface AjudaFormData { titulo: string; categoria: string; conteudo: string; status: string;  }
export interface AjudaState { data: AjudaData | null; isLoading: boolean; filtros: AjudaFiltros; modalAberto: boolean; editandoId: string | null; formData: AjudaFormData; exclusaoPendente: Ajuda | null; detalheAjuda: Ajuda | null; modalInfoAberto: boolean; }
export interface AjudaActions { abrirModalNovo: () => void; abrirModalEditar: (d: Ajuda) => void; fecharModal: () => void; atualizarFiltro: (c: keyof AjudaFiltros, v: string) => void; limparFiltros: () => void; salvarAjuda: () => void; atualizarForm: (c: keyof AjudaFormData, v: string) => void; confirmarExclusao: (d: Ajuda) => void; cancelarExclusao: () => void; confirmarEExcluir: () => void; abrirDetalhe: (d: Ajuda) => void; fecharDetalhe: () => void; abrirInfo: () => void; fecharInfo: () => void; }
