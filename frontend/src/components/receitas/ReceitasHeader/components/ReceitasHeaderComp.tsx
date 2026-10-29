'use client';

import type { ReceitasHeaderProps } from '../types/ReceitasHeaderTypes';
import {
  StyledReceitasHeader,
  StyledReceitasTitle,
  StyledReceitasSubtitle,
  StyledButton,
  StyledInfoButton,
} from '../styles/ReceitasHeaderStyles';

export default function ReceitasHeaderComp({ onAbrirInfo, onAbrirModalNovo }: ReceitasHeaderProps) {
  return (
    <StyledReceitasHeader>
      <div>
        <StyledReceitasTitle>
          Receitas
          <StyledInfoButton
            title="Informações sobre a página"
            onClick={onAbrirInfo}
            data-testid="receitas-info"
          >
            ℹ️
          </StyledInfoButton>
        </StyledReceitasTitle>
        <StyledReceitasSubtitle>Gerencie todas as suas fontes de renda</StyledReceitasSubtitle>
      </div>
      <StyledButton
        $variant="primary"
        onClick={onAbrirModalNovo}
        data-testid="receitas-nova-receita"
      >
        + Nova Receita
      </StyledButton>
    </StyledReceitasHeader>
  );
}