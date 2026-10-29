'use client';
import type { ContasConfirmProps } from '../types/ContasConfirmTypes';
import { StyledConfirmOverlay, StyledConfirmModal, StyledConfirmIcon, StyledConfirmTitle, StyledConfirmText, StyledConfirmItemName, StyledConfirmActions, StyledButton } from '../styles/ContasConfirmStyles';
export default function ContasConfirmComp({ exclusaoPendente, formatarValor, onCancelarExclusao, onConfirmarEExcluir }: ContasConfirmProps) {
  return <StyledConfirmOverlay $visible={!!exclusaoPendente} onClick={onCancelarExclusao}><StyledConfirmModal onClick={e => e.stopPropagation()}>
    <StyledConfirmIcon>🗑️</StyledConfirmIcon><StyledConfirmTitle>Excluir Conta?</StyledConfirmTitle>
    <StyledConfirmText>Tem certeza que deseja excluir <StyledConfirmItemName>{exclusaoPendente?.nome}</StyledConfirmItemName>?</StyledConfirmText>
    <StyledConfirmActions><StyledButton $variant="secondary" onClick={onCancelarExclusao} data-testid="contas-confirmar-cancelar">Cancelar</StyledButton><StyledButton $variant="danger" onClick={onConfirmarEExcluir} data-testid="contas-confirmar-excluir">Sim, Excluir</StyledButton></StyledConfirmActions>
  </StyledConfirmModal></StyledConfirmOverlay>;
}
