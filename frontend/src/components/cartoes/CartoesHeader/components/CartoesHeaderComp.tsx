'use client';

import type { CartoesHeaderProps } from '../types/CartoesHeaderTypes';
import {
  StyledCartoesHeader,
  StyledCartoesTitle,
  StyledCartoesSubtitle,
  StyledButton,
  StyledInfoButton,
} from '../styles/CartoesHeaderStyles';

export default function CartoesHeaderComp({ onAbrirInfo, onAbrirModalNovo }: CartoesHeaderProps) {
  return (
    <StyledCartoesHeader>
      <div>
        <StyledCartoesTitle>
          Cartões de Crédito
          <StyledInfoButton title="Informações sobre a página" onClick={onAbrirInfo}>
            ℹ️
          </StyledInfoButton>
        </StyledCartoesTitle>
        <StyledCartoesSubtitle>Gerencie todos os seus cartões de crédito</StyledCartoesSubtitle>
      </div>
      <StyledButton $variant="primary" onClick={onAbrirModalNovo}>
        + Novo Cartão
      </StyledButton>
    </StyledCartoesHeader>
  );
}