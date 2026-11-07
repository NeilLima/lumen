'use client';

import type { ComprasInfoProps } from '../types/ComprasInfoTypes';
import {
  StyledInfoOverlay,
  StyledInfoModal,
  StyledModalHeader,
  StyledModalTitle,
  StyledModalClose,
  StyledInfoTitle,
  StyledInfoText,
  StyledModalActions,
  StyledButton,
} from '../styles/ComprasInfoStyles';

export default function ComprasInfoComp({ modalInfoAberto, onFecharInfo }: ComprasInfoProps) {
  return (
    <StyledInfoOverlay $visible={modalInfoAberto} onClick={onFecharInfo}>
      <StyledInfoModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Sobre a Página de Compras</StyledModalTitle>
          <StyledModalClose onClick={onFecharInfo}>?</StyledModalClose>
        </StyledModalHeader>
        <StyledInfoTitle>Controle todas as suas compras</StyledInfoTitle>
        <StyledInfoText>
          A página de Compras permite que você cadastre, edite e acompanhe todas as suas compras
          em um único lugar. Mantenha seu controle financeiro sempre atualizado.
        </StyledInfoText>
        <StyledModalActions>
          <StyledButton $variant="primary" onClick={onFecharInfo}>Entendi</StyledButton>
        </StyledModalActions>
      </StyledInfoModal>
    </StyledInfoOverlay>
  );
}
