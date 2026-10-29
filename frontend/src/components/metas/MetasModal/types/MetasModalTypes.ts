import type { MetasFormData, MetasData } from '../../main/types/MetasTypes';
export interface MetasModalProps {
  modalAberto: boolean; editandoId: string | null; formData: MetasFormData; data: MetasData;
  onFecharModal: () => void; onAtualizarForm: (campo: keyof MetasFormData, valor: string) => void;
  onSalvarMeta: () => void;
}
