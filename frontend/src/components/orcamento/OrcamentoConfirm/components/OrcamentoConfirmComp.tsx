'use client';
import type { OrcamentoConfirmProps } from '../types/OrcamentoConfirmTypes';
import { StyledOverlay, StyledModal, StyledIcon, StyledTitle, StyledText, StyledName, StyledActions, StyledButton } from '../styles/OrcamentoConfirmStyles';
export default function OrcamentoConfirmComp({ exclusaoPendente, formatarValor, onCancelarExclusao, onConfirmarEExcluir }: OrcamentoConfirmProps) {
  return (
    <StyledOverlay $visible={!!exclusaoPendente} onClick={onCancelarExclusao}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <StyledIcon>🗑️</StyledIcon><StyledTitle>Excluir Categoria?</StyledTitle>
        <StyledText>Tem certeza que deseja excluir o limite de <StyledName>{exclusaoPendente?.categoria}</StyledName> no valor de R$ {exclusaoPendente ? formatarValor(exclusaoPendente.limite) : ''}?</StyledText>
        <StyledText>Esta ação não pode ser desfeita.</StyledText>
        <StyledActions><StyledButton $variant="secondary" onClick={onCancelarExclusao}>Cancelar</StyledButton><StyledButton $variant="danger" onClick={onConfirmarEExcluir}>Sim, Excluir</StyledButton></StyledActions>
      </StyledModal>
    </StyledOverlay>
  );
}
