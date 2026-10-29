import type { OrcamentoFormData, OrcamentoData } from '../../main/types/OrcamentoTypes';
export interface OrcamentoModalProps { modalAberto: boolean; editandoId: string | null; formData: OrcamentoFormData; data: OrcamentoData; onFecharModal: () => void; onAtualizarForm: (campo: keyof OrcamentoFormData, valor: string) => void; onSalvarCategoria: () => void; }
