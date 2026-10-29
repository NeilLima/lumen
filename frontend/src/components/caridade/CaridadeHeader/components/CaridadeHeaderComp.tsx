'use client';

import type { CaridadeHeaderProps } from '../types/CaridadeHeaderTypes';
import {
  StyledCaridadeHeader,
  StyledCaridadeTitle,
  StyledCaridadeSubtitle,
  StyledButton,
  StyledInfoButton,
} from '../styles/CaridadeHeaderStyles';

export default function CaridadeHeaderComp({ onAbrirInfo, onAbrirModalNovo }: CaridadeHeaderProps) {
  return (
    <StyledCaridadeHeader>
      <div>
        <StyledCaridadeTitle>
          Caridade Financeira
          <StyledInfoButton title="Informações sobre a página" onClick={onAbrirInfo}>
            ℹ️
          </StyledInfoButton>
        </StyledCaridadeTitle>
        <StyledCaridadeSubtitle>Gerencie suas doações e contribuições</StyledCaridadeSubtitle>
      </div>
      <StyledButton $variant="primary" onClick={onAbrirModalNovo}>
        + Nova Caridade
      </StyledButton>
    </StyledCaridadeHeader>
  );
}
