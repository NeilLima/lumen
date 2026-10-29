import type { InvestimentosFormData } from '../../main/types/InvestimentosTypes';

export interface InvestimentosModalProps {
  modalAberto: boolean;
  editandoId: string | null;
  formData: InvestimentosFormData;
  onFecharModal: () => void;
  onAtualizarForm: (c: keyof InvestimentosFormData, v: string) => void;
  onSalvarInvestimento: () => void;
}
