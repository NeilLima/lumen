'use client';
import type { MetasConfirmProps } from '../types/MetasConfirmTypes';
import { StyledConfirmOverlay, StyledConfirmModal, StyledConfirmIcon, StyledConfirmTitle, StyledConfirmText, StyledConfirmItemName, StyledConfirmActions, StyledButton } from '../styles/MetasConfirmStyles';

export default function MetasConfirmComp({ exclusaoPendente, formatarValor, onCancelarExclusao, onConfirmarEExcluir }: MetasConfirmProps) {
  return (
    <StyledConfirmOverlay $visible={!!exclusaoPendente} onClick={onCancelarExclusao}>
      <StyledConfirmModal onClick={e => e.stopPropagation()}>
        <StyledConfirmIcon>🗑️</StyledConfirmIcon>
        <StyledConfirmTitle>Excluir Meta?</StyledConfirmTitle>
        <StyledConfirmText>
          Tem certeza que deseja excluir a meta <StyledConfirmItemName>{exclusaoPendente?.nome}</StyledConfirmItemName>
          {' '}no valor de R$ {exclusaoPendente ? formatarValor(exclusaoPendente.valorAlvo) : ''}?
        </StyledConfirmText>
        <StyledConfirmText>Esta ação não pode ser desfeita.</StyledConfirmText>
        <StyledConfirmActions>
          <StyledButton $variant="secondary" onClick={onCancelarExclusao}>Cancelar</StyledButton>
          <StyledButton $variant="danger" onClick={onConfirmarEExcluir}>Sim, Excluir</StyledButton>
        </StyledConfirmActions>
      </StyledConfirmModal>
    </StyledConfirmOverlay>
  );
}
