import type { CaridadeFormData } from '../../main/types/CaridadeTypes';

export interface CaridadeModalProps {
  modalAberto: boolean;
  editandoId: string | null;
  formData: CaridadeFormData;
  onFecharModal: () => void;
  onAtualizarForm: (c: keyof CaridadeFormData, v: string) => void;
  onSalvarCaridade: () => void;
}
