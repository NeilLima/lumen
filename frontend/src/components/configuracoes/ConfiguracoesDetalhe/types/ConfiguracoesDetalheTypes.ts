import type { Configuracao } from '../../main/types/ConfiguracoesTypes';

export interface ConfiguracoesDetalheProps {
  detalheConfiguracao: Configuracao | null;
  formatarValor: (v: number) => string;
  formatarData: (d: string) => string;
  getStatusLabel: (s: string) => string;
  getStatusCor: (s: string) => string;
  onFecharDetalhe: () => void;
  onEditar: (d: Configuracao) => void;
}
