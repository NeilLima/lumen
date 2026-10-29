export interface Caridade {
  id: string; nome: string; tipo: string; valor: number; instituicao: string; data: string; status: string; observacoes?: string; categoria: string; categoriaCor: string; categoriaIcone: string;
}
export interface CaridadeFiltros { pesquisa: string; tipo: string; status: string;  }
export interface CaridadeResumo { totalDoacoes: number; totalValor: number; totalRealizadas: number; totalPendentes: number;  }
export interface CaridadeData { caridades: Caridade[]; resumo: CaridadeResumo; }
export interface CaridadeFormData { nome: string; tipo: string; valor: string; instituicao: string; data: string; status: string; observacoes: string;  }
export interface CaridadeState { data: CaridadeData | null; isLoading: boolean; filtros: CaridadeFiltros; modalAberto: boolean; editandoId: string | null; formData: CaridadeFormData; exclusaoPendente: Caridade | null; detalheCaridade: Caridade | null; modalInfoAberto: boolean; }
export interface CaridadeActions { abrirModalNovo: () => void; abrirModalEditar: (d: Caridade) => void; fecharModal: () => void; atualizarFiltro: (c: keyof CaridadeFiltros, v: string) => void; limparFiltros: () => void; salvarCaridade: () => void; atualizarForm: (c: keyof CaridadeFormData, v: string) => void; confirmarExclusao: (d: Caridade) => void; cancelarExclusao: () => void; confirmarEExcluir: () => void; abrirDetalhe: (d: Caridade) => void; fecharDetalhe: () => void; abrirInfo: () => void; fecharInfo: () => void; }
