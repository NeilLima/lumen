import type { Cartao, CartoesData, CartoesFormData } from '../../main/types/CartoesTypes';

export interface CartoesModalProps {
  modalAberto: boolean;
  editandoId: string | null;
  formData: CartoesFormData;
  data: CartoesData | null;
  onFecharModal: () => void;
  onAtualizarForm: (campo: keyof CartoesFormData, valor: string) => void;
  onSalvarCartao: () => void;
}