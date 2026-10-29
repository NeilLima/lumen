'use client';

import type { RelatoriosHeaderProps } from '../types/RelatoriosHeaderTypes';
import {
  StyledRelatoriosHeader,
  StyledRelatoriosTitle,
  StyledRelatoriosSubtitle,
  StyledButton,
  StyledInfoButton,
} from '../styles/RelatoriosHeaderStyles';

export default function RelatoriosHeaderComp({ onAbrirInfo, onAbrirModalNovo }: RelatoriosHeaderProps) {
  return (
    <StyledRelatoriosHeader>
      <div>
        <StyledRelatoriosTitle>
          Relatórios
          <StyledInfoButton title="Informações sobre a página" onClick={onAbrirInfo}>
            ℹ️
          </StyledInfoButton>
        </StyledRelatoriosTitle>
        <StyledRelatoriosSubtitle>Análise completa da sua vida financeira</StyledRelatoriosSubtitle>
      </div>
      <StyledButton $variant="primary" onClick={onAbrirModalNovo}>
        + Nova Relatorio
      </StyledButton>
    </StyledRelatoriosHeader>
  );
}
