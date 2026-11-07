import type { Compra } from '../../main/types/ComprasTypes';

export interface ComprasModalProps {
  modalAberto: boolean;
  editandoId: string | null;
  formData: any;
  data: any;
  itemNome: string;
  itemQtd: number;
  itemPreco: number;
  showProductSelector: boolean;
  showLocalSelector: boolean;
  onFecharModal: () => void;
  onAtualizarForm: (campo: any, valor: any) => void;
  onSalvarCompra: () => void;
  onAddItem: () => void;
  onRemoveItem: (idx: number) => void;
  onSetItemNome: (v: string) => void;
  onSetItemQtd: (v: number) => void;
  onSetItemPreco: (v: number) => void;
  onSetShowProductSelector: (v: boolean) => void;
  onSetShowLocalSelector: (v: boolean) => void;
  onSelectProduct: (p: any) => void;
  onSelectLocal: (local: string) => void;
  produtos: any[];
  locais: any[];
  total: number;
}
