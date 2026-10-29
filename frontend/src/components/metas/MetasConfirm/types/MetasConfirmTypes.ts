import type { Meta } from '../../main/types/MetasTypes';
export interface MetasConfirmProps { exclusaoPendente: Meta | null; formatarValor: (valor: number) => string; onCancelarExclusao: () => void; onConfirmarEExcluir: () => void; }
