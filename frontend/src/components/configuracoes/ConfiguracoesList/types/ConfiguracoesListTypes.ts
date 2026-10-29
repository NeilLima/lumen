import type { Configuracao, ConfiguracoesFiltros } from '../../main/types/ConfiguracoesTypes';

export interface ConfiguracoesListProps {
  configuracoesFiltradas: Configuracao[];
  filtros: ConfiguracoesFiltros;
  formatarValor: (v: number) => string;
  formatarData: (d: string) => string;
  getStatusLabel: (s: string) => string;
  getStatusCor: (s: string) => string;
  onAtualizarFiltro: (c: keyof ConfiguracoesFiltros, v: string) => void;
  onLimparFiltros: () => void;
  onAbrirDetalhe: (d: Configuracao) => void;
  onAbrirModalEditar: (d: Configuracao) => void;
  onConfirmarExclusao: (d: Configuracao) => void;
}
