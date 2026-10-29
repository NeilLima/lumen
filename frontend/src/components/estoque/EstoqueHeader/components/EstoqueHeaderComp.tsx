'use client';

import {
  StyledEstoqueHeader,
  StyledEstoqueTitle,
  StyledEstoqueSubtitle,
  StyledEstoqueButton,
  StyledInfoButton,
} from '../styles/EstoqueHeaderStyles';
import type { EstoqueHeaderProps } from '../types/EstoqueHeaderTypes';

export default function EstoqueHeaderComp({
  onAbrirInfo,
  onAbrirModalNovo,
}: EstoqueHeaderProps) {
  return (
    <StyledEstoqueHeader>
      <div>
        <StyledEstoqueTitle>
          Estoque
          <StyledInfoButton title="Informações sobre o estoque" onClick={onAbrirInfo}>
            ℹ️
          </StyledInfoButton>
        </StyledEstoqueTitle>
        <StyledEstoqueSubtitle>Gerencie os itens da sua dispensa</StyledEstoqueSubtitle>
      </div>
      <StyledEstoqueButton $variant="primary" onClick={onAbrirModalNovo}>
        + Novo Item
      </StyledEstoqueButton>
    </StyledEstoqueHeader>
  );
}