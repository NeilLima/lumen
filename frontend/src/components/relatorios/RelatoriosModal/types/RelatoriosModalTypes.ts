import type { RelatoriosFormData } from '../../main/types/RelatoriosTypes';

export interface RelatoriosModalProps {
  modalAberto: boolean;
  editandoId: string | null;
  formData: RelatoriosFormData;
  onFecharModal: () => void;
  onAtualizarForm: (c: keyof RelatoriosFormData, v: string) => void;
  onSalvarRelatorio: () => void;
}
