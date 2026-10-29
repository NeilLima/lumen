'use client';

import type { AjudaConfirmProps } from '../types/AjudaConfirmTypes';
import {
  StyledConfirmOverlay,
  StyledConfirmModal,
  StyledConfirmIcon,
  StyledConfirmTitle,
  StyledConfirmText,
  StyledConfirmItemName,
  StyledConfirmActions,
  StyledButton,
} from '../styles/AjudaConfirmStyles';

export default function AjudaConfirmComp({
  exclusaoPendente,
  formatarValor,
  onCancelarExclusao,
  onConfirmarEExcluir,
}: AjudaConfirmProps) {
  return (
    <StyledConfirmOverlay $visible={!!exclusaoPendente} onClick={onCancelarExclusao}>
      <StyledConfirmModal onClick={e => e.stopPropagation()}>
        <StyledConfirmIcon>🗑️</StyledConfirmIcon>
        <StyledConfirmTitle>Excluir Ajuda?</StyledConfirmTitle>
        <StyledConfirmText>
          Tem certeza que deseja excluir {exclusaoPendente?.titulo}?
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
