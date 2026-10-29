'use client';

import type { FeedbackModalProps } from '../types/FeedbackModalTypes';
import {
  StyledFeedbackOverlay,
  StyledFeedbackModal,
  StyledFeedbackIcon,
  StyledFeedbackTitle,
  StyledFeedbackMessage,
  StyledFeedbackClose,
} from '../styles/FeedbackModalStyles';

export default function FeedbackModalComp({
  feedback,
  onFechar,
}: FeedbackModalProps) {
  if (!feedback) return null;

  return (
    <StyledFeedbackOverlay
      $visible={!!feedback}
      onClick={onFechar}
      data-testid="feedback-overlay"
    >
      <StyledFeedbackModal
        $tipo={feedback.tipo}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="feedback-titulo"
      >
        <StyledFeedbackIcon>
          {feedback.tipo === 'sucesso' ? '✅' : '⚠️'}
        </StyledFeedbackIcon>
        <StyledFeedbackTitle id="feedback-titulo">
          {feedback.titulo}
        </StyledFeedbackTitle>
        <StyledFeedbackMessage>{feedback.mensagem}</StyledFeedbackMessage>
        <StyledFeedbackClose
          $tipo={feedback.tipo}
          onClick={onFechar}
          data-testid="feedback-fechar"
        >
          Entendi
        </StyledFeedbackClose>
      </StyledFeedbackModal>
    </StyledFeedbackOverlay>
  );
}