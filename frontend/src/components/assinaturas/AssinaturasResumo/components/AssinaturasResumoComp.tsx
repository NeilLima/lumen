'use client';

import type { AssinaturasResumoProps } from '../types/AssinaturasResumoTypes';
import {
  StyledResumoGrid,
  StyledResumoCard,
  StyledResumoIcon,
  StyledResumoLabel,
  StyledResumoValue,
} from '../styles/AssinaturasResumoStyles';

export default function AssinaturasResumoComp({ resumo, formatarValor }: AssinaturasResumoProps) {
  return (
    <StyledResumoGrid>
      <StyledResumoCard $accentColor="#8b5cf6">
        <StyledResumoIcon $color="#8b5cf6" $bg="rgba(139, 92, 246, 0.1)">📊</StyledResumoIcon>
        <StyledResumoLabel>Total de Assinaturas</StyledResumoLabel>
        <StyledResumoValue>{resumo.totalAssinaturas}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#ef4444">
        <StyledResumoIcon $color="#ef4444" $bg="rgba(239, 68, 68, 0.1)">💸</StyledResumoIcon>
        <StyledResumoLabel>Gasto Mensal</StyledResumoLabel>
        <StyledResumoValue>R$ {formatarValor(resumo.totalMensal)}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#f59e0b">
        <StyledResumoIcon $color="#f59e0b" $bg="rgba(245, 158, 11, 0.1)">📅</StyledResumoIcon>
        <StyledResumoLabel>Gasto Anual</StyledResumoLabel>
        <StyledResumoValue>R$ {formatarValor(resumo.totalAnual)}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#10b981">
        <StyledResumoIcon $color="#10b981" $bg="rgba(16, 185, 129, 0.1)">✅</StyledResumoIcon>
        <StyledResumoLabel>Ativas</StyledResumoLabel>
        <StyledResumoValue>{resumo.totalAtivas}</StyledResumoValue>
      </StyledResumoCard>

    </StyledResumoGrid>
  );
}
