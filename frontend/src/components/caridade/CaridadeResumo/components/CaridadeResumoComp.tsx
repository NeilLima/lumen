'use client';

import type { CaridadeResumoProps } from '../types/CaridadeResumoTypes';
import {
  StyledResumoGrid,
  StyledResumoCard,
  StyledResumoIcon,
  StyledResumoLabel,
  StyledResumoValue,
} from '../styles/CaridadeResumoStyles';

export default function CaridadeResumoComp({ resumo, formatarValor }: CaridadeResumoProps) {
  return (
    <StyledResumoGrid>
      <StyledResumoCard $accentColor="#8b5cf6">
        <StyledResumoIcon $color="#8b5cf6" $bg="rgba(139, 92, 246, 0.1)">📊</StyledResumoIcon>
        <StyledResumoLabel>Total de Doações</StyledResumoLabel>
        <StyledResumoValue>{resumo.totalDoacoes}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#ef4444">
        <StyledResumoIcon $color="#ef4444" $bg="rgba(239, 68, 68, 0.1)">💰</StyledResumoIcon>
        <StyledResumoLabel>Valor Total</StyledResumoLabel>
        <StyledResumoValue>R$ {formatarValor(resumo.totalValor)}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#10b981">
        <StyledResumoIcon $color="#10b981" $bg="rgba(16, 185, 129, 0.1)">✅</StyledResumoIcon>
        <StyledResumoLabel>Realizadas</StyledResumoLabel>
        <StyledResumoValue>{resumo.totalRealizadas}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#f59e0b">
        <StyledResumoIcon $color="#f59e0b" $bg="rgba(245, 158, 11, 0.1)">⏳</StyledResumoIcon>
        <StyledResumoLabel>Pendentes</StyledResumoLabel>
        <StyledResumoValue>{resumo.totalPendentes}</StyledResumoValue>
      </StyledResumoCard>

    </StyledResumoGrid>
  );
}
