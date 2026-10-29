import type { Categoria } from '../../main/types/CategoriasTypes';

export interface CategoriasDetalheProps {
  detalheCategoria: Categoria | null;
  formatarValor: (v: number) => string;
  formatarData: (d: string) => string;
  getStatusLabel: (s: string) => string;
  getStatusCor: (s: string) => string;
  onFecharDetalhe: () => void;
  onEditar: (d: Categoria) => void;
}
