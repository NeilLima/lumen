'use client';

import type { ConfiguracoesHeaderProps } from '../types/ConfiguracoesHeaderTypes';
import {
  StyledConfiguracoesHeader,
  StyledConfiguracoesTitle,
  StyledConfiguracoesSubtitle,
  StyledButton,
  StyledInfoButton,
} from '../styles/ConfiguracoesHeaderStyles';

export default function ConfiguracoesHeaderComp({ onAbrirInfo, onAbrirModalNovo }: ConfiguracoesHeaderProps) {
  return (
    <StyledConfiguracoesHeader>
      <div>
        <StyledConfiguracoesTitle>
          Configurações
          <StyledInfoButton title="Informações sobre a página" onClick={onAbrirInfo}>
            ℹ️
          </StyledInfoButton>
        </StyledConfiguracoesTitle>
        <StyledConfiguracoesSubtitle>Personalize sua experiência</StyledConfiguracoesSubtitle>
      </div>
      <StyledButton $variant="primary" onClick={onAbrirModalNovo}>
        + Nova Configuracao
      </StyledButton>
    </StyledConfiguracoesHeader>
  );
}
