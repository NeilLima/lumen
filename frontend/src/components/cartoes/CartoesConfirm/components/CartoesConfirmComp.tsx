"use client";
import type { CartoesConfirmProps } from "../types/CartoesConfirmTypes";
import { StyledConfirmOverlay, StyledConfirmModal, StyledConfirmIcon, StyledConfirmTitle, StyledConfirmText, StyledConfirmItemName, StyledConfirmActions, StyledButton } from "../styles/CartoesConfirmStyles";

export default function CartoesConfirmComp({ exclusaoPendente, formatarValor, onCancelarExclusao, onConfirmarEExcluir }: CartoesConfirmProps) {
  return (
    <StyledConfirmOverlay $visible={!!exclusaoPendente} onClick={onCancelarExclusao}>
      <StyledConfirmModal onClick={e => e.stopPropagation()}>
        <StyledConfirmIcon>🗑️</StyledConfirmIcon>
        <StyledConfirmTitle>Excluir Cartão?</StyledConfirmTitle>
        <StyledConfirmText>Tem certeza que deseja excluir o cartão <strong>{exclusaoPendente?.nome}</strong>?</StyledConfirmText>
        <StyledConfirmActions>
          <StyledButton onClick={onCancelarExclusao}>Cancelar</StyledButton>
          <StyledButton onClick={onConfirmarEExcluir}>Sim, Excluir</StyledButton>
        </StyledConfirmActions>
      </StyledConfirmModal>
    </StyledConfirmOverlay>
  );
}
