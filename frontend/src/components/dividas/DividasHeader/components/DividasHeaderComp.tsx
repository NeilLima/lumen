'use client';

import type { DividasHeaderProps } from '../types/DividasHeaderTypes';
import {
  StyledDividasHeader,
  StyledDividasTitle,
  StyledDividasSubtitle,
  StyledButton,
  StyledInfoButton,
} from '../styles/DividasHeaderStyles';

export default function DividasHeaderComp({ onAbrirInfo, onAbrirModalNovo }: DividasHeaderProps) {
  return (
    <StyledDividasHeader>
      <div>
        <StyledDividasTitle>
          Dívidas
          <StyledInfoButton title="Informações sobre a página" onClick={onAbrirInfo}>
            ℹ️
          </StyledInfoButton>
        </StyledDividasTitle>
        <StyledDividasSubtitle>Gerencie suas dívidas e pagamentos</StyledDividasSubtitle>
      </div>
      <StyledButton $variant="primary" onClick={onAbrirModalNovo}>
        + Nova Dívida
      </StyledButton>
    </StyledDividasHeader>
  );
}