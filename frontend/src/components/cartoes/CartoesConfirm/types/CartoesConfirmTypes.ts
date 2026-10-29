import type { Cartao } from "../../main/types/CartoesTypes";

export interface CartoesConfirmProps {
  exclusaoPendente: Cartao | null;
  formatarValor: (valor: number) => string;
  onCancelarExclusao: () => void;
  onConfirmarEExcluir: () => void;
}
