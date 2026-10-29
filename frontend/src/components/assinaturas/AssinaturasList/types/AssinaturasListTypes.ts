import type { Assinatura, AssinaturasFiltros } from '../../main/types/AssinaturasTypes';

export interface AssinaturasListProps {
  assinaturasFiltradas: Assinatura[];
  filtros: AssinaturasFiltros;
  formatarValor: (v: number) => string;
  formatarData: (d: string) => string;
  getStatusLabel: (s: string) => string;
  getStatusCor: (s: string) => string;
  onAtualizarFiltro: (c: keyof AssinaturasFiltros, v: string) => void;
  onLimparFiltros: () => void;
  onAbrirDetalhe: (d: Assinatura) => void;
  onAbrirModalEditar: (d: Assinatura) => void;
  onConfirmarExclusao: (d: Assinatura) => void;
}
