export interface Categoria {
  id: string; nome: string; icone: string; cor: string; tipo: string; valor: number; data: string; descricao?: string; categoria: string; categoriaCor: string; categoriaIcone: string;
}
export interface CategoriasFiltros { pesquisa: string; tipo: string;  }
export interface CategoriasResumo { totalCategorias: number; totalDespesas: number; totalReceitas: number; totalAmbos: number;  }
export interface CategoriasData { categorias: Categoria[]; resumo: CategoriasResumo; }
export interface CategoriasFormData { nome: string; icone: string; cor: string; tipo: string; descricao: string;  }
export interface CategoriasState { data: CategoriasData | null; isLoading: boolean; filtros: CategoriasFiltros; modalAberto: boolean; editandoId: string | null; formData: CategoriasFormData; exclusaoPendente: Categoria | null; detalheCategoria: Categoria | null; modalInfoAberto: boolean; }
export interface CategoriasActions { abrirModalNovo: () => void; abrirModalEditar: (d: Categoria) => void; fecharModal: () => void; atualizarFiltro: (c: keyof CategoriasFiltros, v: string) => void; limparFiltros: () => void; salvarCategoria: () => void; atualizarForm: (c: keyof CategoriasFormData, v: string) => void; confirmarExclusao: (d: Categoria) => void; cancelarExclusao: () => void; confirmarEExcluir: () => void; abrirDetalhe: (d: Categoria) => void; fecharDetalhe: () => void; abrirInfo: () => void; fecharInfo: () => void; }
