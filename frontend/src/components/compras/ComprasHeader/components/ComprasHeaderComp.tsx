'use client';

import type { ComprasHeaderProps } from '../types/ComprasHeaderTypes';
import {
  StyledComprasHeader,
  StyledComprasTitle,
  StyledComprasSubtitle,
  StyledButton,
  StyledInfoButton,
} from '../styles/ComprasHeaderStyles';

export default function ComprasHeaderComp({ onAbrirInfo, onAbrirModalNovo }: ComprasHeaderProps) {
  return (
    <StyledComprasHeader>
      <div>
        <StyledComprasTitle>
          Compras
          <StyledInfoButton title="Informacoes sobre a pagina" onClick={onAbrirInfo}>
            {'\u2139\u{FE0F}'}
          </StyledInfoButton>
        </StyledComprasTitle>
        <StyledComprasSubtitle>Gerencie todas as suas compras</StyledComprasSubtitle>
      </div>
      <StyledButton $variant="primary" onClick={onAbrirModalNovo}>
        + Nova Compra
      </StyledButton>
    </StyledComprasHeader>
  );
}
