'use client';
import type { OrcamentoHeaderProps } from '../types/OrcamentoHeaderTypes';
import { StyledHeader, StyledTitle, StyledSubtitle, StyledButton, StyledInfoButton } from '../styles/OrcamentoHeaderStyles';
export default function OrcamentoHeaderComp({ onAbrirInfo, onAbrirModalNovo }: OrcamentoHeaderProps) {
  return (
    <StyledHeader>
      <div><StyledTitle>Orçamento<StyledInfoButton title="Informações" onClick={onAbrirInfo}>ℹ️</StyledInfoButton></StyledTitle><StyledSubtitle>Gerencie seus limites de gastos por categoria</StyledSubtitle></div>
      <StyledButton $variant="primary" onClick={onAbrirModalNovo}>+ Novo Limite</StyledButton>
    </StyledHeader>
  );
}
