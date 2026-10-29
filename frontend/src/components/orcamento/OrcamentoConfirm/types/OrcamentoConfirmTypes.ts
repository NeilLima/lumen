import type { OrcamentoCategoria } from '../../main/types/OrcamentoTypes';
export interface OrcamentoConfirmProps { exclusaoPendente: OrcamentoCategoria | null; formatarValor: (v: number) => string; onCancelarExclusao: () => void; onConfirmarEExcluir: () => void; }
