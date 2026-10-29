'use client';

import type { DespesasHeaderProps } from '../types/DespesasHeaderTypes';
import {
  StyledDespesasHeader,
  StyledDespesasTitle,
  StyledDespesasSubtitle,
  StyledButton,
  StyledInfoButton,
} from '../styles/DespesasHeaderStyles';

export default function DespesasHeaderComp({ onAbrirInfo, onAbrirModalNovo }: DespesasHeaderProps) {
  return (
    <StyledDespesasHeader>
      <div>
        <StyledDespesasTitle>
          Despesas
          <StyledInfoButton title="Informações sobre a página" onClick={onAbrirInfo}>
            ℹ️
          </StyledInfoButton>
        </StyledDespesasTitle>
        <StyledDespesasSubtitle>Gerencie todos os seus gastos</StyledDespesasSubtitle>
      </div>
      <StyledButton $variant="primary" onClick={onAbrirModalNovo}>
        + Nova Despesa
      </StyledButton>
    </StyledDespesasHeader>
  );
}