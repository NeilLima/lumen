'use client';

import type { CaridadeConfirmProps } from '../types/CaridadeConfirmTypes';
import {
  StyledConfirmOverlay,
  StyledConfirmModal,
  StyledConfirmIcon,
  StyledConfirmTitle,
  StyledConfirmText,
  StyledConfirmItemName,
  StyledConfirmActions,
  StyledButton,
} from '../styles/CaridadeConfirmStyles';

export default function CaridadeConfirmComp({
  exclusaoPendente,
  formatarValor,
  onCancelarExclusao,
  onConfirmarEExcluir,
}: CaridadeConfirmProps) {
  return (
    <StyledConfirmOverlay $visible={!!exclusaoPendente} onClick={onCancelarExclusao}>
      <StyledConfirmModal onClick={e => e.stopPropagation()}>
        <StyledConfirmIcon>🗑️</StyledConfirmIcon>
        <StyledConfirmTitle>Excluir Caridade?</StyledConfirmTitle>
        <StyledConfirmText>
          Tem certeza que deseja excluir {exclusaoPendente?.nome}?
        </StyledConfirmText>
        <StyledConfirmText>Esta ação não pode ser desfeita.</StyledConfirmText>
        <StyledConfirmActions>
          <StyledButton $variant="secondary" onClick={onCancelarExclusao}>
            Cancelar
          </StyledButton>
          <StyledButton $variant="danger" onClick={onConfirmarEExcluir}>
            Sim, Excluir
          </StyledButton>
        </StyledConfirmActions>
      </StyledConfirmModal>
    </StyledConfirmOverlay>
  );
}
