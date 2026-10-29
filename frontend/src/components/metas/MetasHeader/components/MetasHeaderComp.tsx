'use client';
import type { MetasHeaderProps } from '../types/MetasHeaderTypes';
import { StyledMetasHeader, StyledMetasTitle, StyledMetasSubtitle, StyledButton, StyledInfoButton } from '../styles/MetasHeaderStyles';

export default function MetasHeaderComp({ onAbrirInfo, onAbrirModalNovo }: MetasHeaderProps) {
  return (
    <StyledMetasHeader>
      <div>
        <StyledMetasTitle>
          Metas Financeiras
          <StyledInfoButton title="Informações sobre a página" onClick={onAbrirInfo}>ℹ️</StyledInfoButton>
        </StyledMetasTitle>
        <StyledMetasSubtitle>Defina e acompanhe suas metas financeiras</StyledMetasSubtitle>
      </div>
      <StyledButton $variant="primary" onClick={onAbrirModalNovo}>+ Nova Meta</StyledButton>
    </StyledMetasHeader>
  );
}
