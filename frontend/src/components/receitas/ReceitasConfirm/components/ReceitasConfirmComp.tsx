'use client';

import type { ReceitasConfirmProps } from '../types/ReceitasConfirmTypes';
import {
  StyledConfirmOverlay,
  StyledConfirmModal,
  StyledConfirmIcon,
  StyledConfirmTitle,
  StyledConfirmText,
  StyledConfirmItemName,
  StyledConfirmActions,
  StyledButton,
} from '../styles/ReceitasConfirmStyles';

export default function ReceitasConfirmComp({
  exclusaoPendente,
  formatarValor,
  onCancelarExclusao,
  onConfirmarEExcluir,
}: ReceitasConfirmProps) {
  return (
    <StyledConfirmOverlay $visible={!!exclusaoPendente} onClick={onCancelarExclusao}>
      <StyledConfirmModal onClick={e => e.stopPropagation()}>
        <StyledConfirmIcon>🗑️</StyledConfirmIcon>
        <StyledConfirmTitle>Excluir Receita?</StyledConfirmTitle>
        <StyledConfirmText>
          Tem certeza que deseja excluir a receita{' '}
          <StyledConfirmItemName>{exclusaoPendente?.nome}</StyledConfirmItemName>
          {' '}no valor de R$ {exclusaoPendente ? formatarValor(exclusaoPendente.valor) : ''}?
        </StyledConfirmText>
        <StyledConfirmText>Esta ação não pode ser desfeita.</StyledConfirmText>
        <StyledConfirmActions>
          <StyledButton
            $variant="secondary"
            onClick={onCancelarExclusao}
            data-testid="receitas-confirmar-cancelar"
          >
            Cancelar
          </StyledButton>
          <StyledButton
            $variant="danger"
            onClick={onConfirmarEExcluir}
            data-testid="receitas-confirmar-excluir"
          >
            Sim, Excluir
          </StyledButton>
        </StyledConfirmActions>
      </StyledConfirmModal>
    </StyledConfirmOverlay>
  );
}