"use client";
import type { CartoesInfoProps } from "../types/CartoesInfoTypes";
import { StyledInfoOverlay, StyledInfoModal, StyledModalHeader, StyledModalTitle, StyledModalClose, StyledInfoIcon, StyledInfoTitle, StyledInfoText, StyledInfoList, StyledInfoListItem, StyledModalActions, StyledButton } from "../styles/CartoesInfoStyles";

export default function CartoesInfoComp({ modalInfoAberto, onFecharInfo }: CartoesInfoProps) {
  return (
    <StyledInfoOverlay $visible={modalInfoAberto} onClick={onFecharInfo}>
      <StyledInfoModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Sobre</StyledModalTitle>
          <StyledModalClose onClick={onFecharInfo}>✕</StyledModalClose>
        </StyledModalHeader>
        <StyledInfoIcon>💳</StyledInfoIcon>
        <StyledInfoTitle>Gerencie seus cartões</StyledInfoTitle>
        <StyledInfoText>Acompanhe limites e faturas.</StyledInfoText>
        <StyledInfoList>
          <StyledInfoListItem>💳 Cadastre todos os cartões</StyledInfoListItem>
          <StyledInfoListItem>📊 Acompanhe limites</StyledInfoListItem>
          <StyledInfoListItem>📅 Melhor dia de compra</StyledInfoListItem>
        </StyledInfoList>
        <StyledModalActions>
          <StyledButton onClick={onFecharInfo}>Entendi</StyledButton>
        </StyledModalActions>
      </StyledInfoModal>
    </StyledInfoOverlay>
  );
}
