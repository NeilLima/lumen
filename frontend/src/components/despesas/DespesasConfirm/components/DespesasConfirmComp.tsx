'use client';

import type { DespesasConfirmProps } from '../types/DespesasConfirmTypes';
import {
  StyledConfirmOverlay,
  StyledConfirmModal,
  StyledConfirmIcon,
  StyledConfirmTitle,
  StyledConfirmText,
  StyledConfirmItemName,
  StyledConfirmActions,
  StyledButton,
} from '../styles/DespesasConfirmStyles';

export default function DespesasConfirmComp({
  exclusaoPendente,
  formatarValor,
  onCancelarExclusao,
  onConfirmarEExcluir,
}: DespesasConfirmProps) {
  return (
    <StyledConfirmOverlay $visible={!!exclusaoPendente} onClick={onCancelarExclusao}>
      <StyledConfirmModal onClick={e => e.stopPropagation()}>
        <StyledConfirmIcon>🗑️</StyledConfirmIcon>
        <StyledConfirmTitle>Excluir Despesa?</StyledConfirmTitle>
        <StyledConfirmText>
          Tem certeza que deseja excluir a despesa{' '}
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