'use client';

import type { InvestimentosHeaderProps } from '../types/InvestimentosHeaderTypes';
import {
  StyledInvestimentosHeader,
  StyledInvestimentosTitle,
  StyledInvestimentosSubtitle,
  StyledButton,
  StyledInfoButton,
} from '../styles/InvestimentosHeaderStyles';

export default function InvestimentosHeaderComp({ onAbrirInfo, onAbrirModalNovo }: InvestimentosHeaderProps) {
  return (
    <StyledInvestimentosHeader>
      <div>
        <StyledInvestimentosTitle>
          Investimentos
          <StyledInfoButton title="Informações sobre a página" onClick={onAbrirInfo}>
            ℹ️
          </StyledInfoButton>
        </StyledInvestimentosTitle>
        <StyledInvestimentosSubtitle>Acompanhe seus investimentos e rentabilidade</StyledInvestimentosSubtitle>
      </div>
      <StyledButton $variant="primary" onClick={onAbrirModalNovo}>
        + Nova Investimento
      </StyledButton>
    </StyledInvestimentosHeader>
  );
}
