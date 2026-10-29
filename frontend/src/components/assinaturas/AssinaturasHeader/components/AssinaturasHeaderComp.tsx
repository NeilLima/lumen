'use client';

import type { AssinaturasHeaderProps } from '../types/AssinaturasHeaderTypes';
import {
  StyledAssinaturasHeader,
  StyledAssinaturasTitle,
  StyledAssinaturasSubtitle,
  StyledButton,
  StyledInfoButton,
} from '../styles/AssinaturasHeaderStyles';

export default function AssinaturasHeaderComp({ onAbrirInfo, onAbrirModalNovo }: AssinaturasHeaderProps) {
  return (
    <StyledAssinaturasHeader>
      <div>
        <StyledAssinaturasTitle>
          Assinaturas
          <StyledInfoButton title="Informações sobre a página" onClick={onAbrirInfo}>
            ℹ️
          </StyledInfoButton>
        </StyledAssinaturasTitle>
        <StyledAssinaturasSubtitle>Gerencie suas assinaturas e cobranças recorrentes</StyledAssinaturasSubtitle>
      </div>
      <StyledButton $variant="primary" onClick={onAbrirModalNovo}>
        + Nova Assinatura
      </StyledButton>
    </StyledAssinaturasHeader>
  );
}
