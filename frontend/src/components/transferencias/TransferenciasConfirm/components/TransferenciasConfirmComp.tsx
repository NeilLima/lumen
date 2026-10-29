'use client';
import type { TransferenciasConfirmProps } from '../types/TransferenciasConfirmTypes';
import { StyledConfirmOverlay, StyledConfirmModal, StyledConfirmIcon, StyledConfirmTitle, StyledConfirmText, StyledConfirmItemName, StyledConfirmActions, StyledButton } from '../styles/TransferenciasConfirmStyles';
export default function TransferenciasConfirmComp({ exclusaoPendente, formatarValor, onCancelarExclusao, onConfirmarEExcluir }: TransferenciasConfirmProps) {
  return <StyledConfirmOverlay $visible={!!exclusaoPendente} onClick={onCancelarExclusao}><StyledConfirmModal onClick={e => e.stopPropagation()}>
    <StyledConfirmIcon>🗑️</StyledConfirmIcon><StyledConfirmTitle>Excluir Transferência?</StyledConfirmTitle>
    <StyledConfirmText>Tem certeza que deseja excluir <StyledConfirmItemName>{exclusaoPendente?.descricao}</StyledConfirmItemName> de R$ {exclusaoPendente ? formatarValor(exclusaoPendente.valor) : ''}?</StyledConfirmText>
    <StyledConfirmActions><StyledButton $variant="secondary" onClick={onCancelarExclusao}>Cancelar</StyledButton><StyledButton $variant="danger" onClick={onConfirmarEExcluir}>Sim, Excluir</StyledButton></StyledConfirmActions>
  </StyledConfirmModal></StyledConfirmOverlay>;
}
