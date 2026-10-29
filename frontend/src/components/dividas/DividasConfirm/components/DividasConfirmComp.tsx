'use client';

import type { DividasConfirmProps } from '../types/DividasConfirmTypes';
import {
  StyledConfirmOverlay,
  StyledConfirmModal,
  StyledConfirmIcon,
  StyledConfirmTitle,
  StyledConfirmText,
  StyledConfirmItemName,
  StyledConfirmActions,
  StyledButton,
} from '../styles/DividasConfirmStyles';

export default function DividasConfirmComp({
  exclusaoPendente,
  formatarValor,
  onCancelarExclusao,
  onConfirmarEExcluir,
}: DividasConfirmProps) {
  return (
    <StyledConfirmOverlay $visible={!!exclusaoPendente} onClick={onCancelarExclusao}>
      <StyledConfirmModal onClick={e => e.stopPropagation()}>
        <StyledConfirmIcon>🗑️</StyledConfirmIcon>
        <StyledConfirmTitle>Excluir Dívida?</StyledConfirmTitle>
        <StyledConfirmText>
          Tem certeza que deseja excluir a dívida{' '}
          <StyledConfirmItemName>{exclusaoPendente?.nome}</StyledConfirmItemName>
          {' '}no valor de R$ {exclusaoPendente ? formatarValor(exclusaoPendente.valor) : ''}?
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