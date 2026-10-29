export type FeedbackTipo = 'sucesso' | 'erro';

export interface FeedbackData {
  tipo: FeedbackTipo;
  titulo: string;
  mensagem: string;
}

export interface FeedbackModalProps {
  feedback: FeedbackData | null;
  onFechar: () => void;
}