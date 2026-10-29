import type { Receita, ReceitasFiltros, ReceitasData } from '../../main/types/ReceitasTypes';

export interface ReceitasListProps {
  receitasFiltradas: Receita[];
  filtros: ReceitasFiltros;
  data: ReceitasData;
  formatarValor: (valor: number) => string;
  formatarData: (data: string) => string;
  getStatusCor: (status: Receita['status']) => string;
  getStatusLabel: (status: Receita['status']) => string;
  getRecorrenciaLabel: (recorrencia: Receita['recorrencia']) => string;
  onAtualizarFiltro: (campo: keyof ReceitasFiltros, valor: string) => void;
  onLimparFiltros: () => void;
  onAbrirDetalhe: (receita: Receita) => void;
  onAbrirModalEditar: (receita: Receita) => void;
  onConfirmarExclusao: (receita: Receita) => void;
}