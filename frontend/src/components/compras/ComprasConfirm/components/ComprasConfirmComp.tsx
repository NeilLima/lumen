'use client';

import type { ComprasConfirmProps } from '../types/ComprasConfirmTypes';
import {
  StyledConfirmOverlay,
  StyledConfirmModal,
  StyledConfirmTitle,
  StyledConfirmText,
  StyledConfirmActions,
  StyledButton,
} from '../styles/ComprasConfirmStyles';

export default function ComprasConfirmComp({ exclusaoPendente, formatarValor, onCancelarExclusao, onConfirmarEExcluir }: ComprasConfirmProps) {
  return (
    <StyledConfirmOverlay $visible={!!exclusaoPendente} onClick={onCancelarExclusao}>
      <StyledConfirmModal onClick={e => e.stopPropagation()}>
        <StyledConfirmTitle>Excluir compra?</StyledConfirmTitle>
        <StyledConfirmText>
          {exclusaoPendente ? 'Deseja excluir "' + (exclusaoPendente.local || 'compra') + '"?' : ''}
        </StyledConfirmText>
        <StyledConfirmActions>
          <StyledButton $variant="secondary" onClick={onCancelarExclusao}>Cancelar</StyledButton>
          <StyledButton $variant="danger" onClick={onConfirmarEExcluir}>Excluir</StyledButton>
        </StyledConfirmActions>
      </StyledConfirmModal>
    </StyledConfirmOverlay>
  );
}
