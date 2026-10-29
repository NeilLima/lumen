'use client';

import type { ConfiguracoesConfirmProps } from '../types/ConfiguracoesConfirmTypes';
import {
  StyledConfirmOverlay,
  StyledConfirmModal,
  StyledConfirmIcon,
  StyledConfirmTitle,
  StyledConfirmText,
  StyledConfirmItemName,
  StyledConfirmActions,
  StyledButton,
} from '../styles/ConfiguracoesConfirmStyles';

export default function ConfiguracoesConfirmComp({
  exclusaoPendente,
  formatarValor,
  onCancelarExclusao,
  onConfirmarEExcluir,
}: ConfiguracoesConfirmProps) {
  return (
    <StyledConfirmOverlay $visible={!!exclusaoPendente} onClick={onCancelarExclusao}>
      <StyledConfirmModal onClick={e => e.stopPropagation()}>
        <StyledConfirmIcon>🗑️</StyledConfirmIcon>
        <StyledConfirmTitle>Excluir Configuracao?</StyledConfirmTitle>
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
