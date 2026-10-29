'use client';

import type { ReceitasResumoProps } from '../types/ReceitasResumoTypes';
import {
  StyledResumoGrid,
  StyledResumoCard,
  StyledResumoIcon,
  StyledResumoLabel,
  StyledResumoValue,
} from '../styles/ReceitasResumoStyles';

export default function ReceitasResumoComp({ resumo, formatarValor }: ReceitasResumoProps) {
  return (
    <StyledResumoGrid>
      <StyledResumoCard $accentColor="#10b981">
        <StyledResumoIcon $color="#10b981" $bg="rgba(16, 185, 129, 0.1)">💰</StyledResumoIcon>
        <StyledResumoLabel>Total Recebido</StyledResumoLabel>
        <StyledResumoValue>R$ {formatarValor(resumo.totalRecebido)}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#f59e0b">
        <StyledResumoIcon $color="#f59e0b" $bg="rgba(245, 158, 11, 0.1)">⏳</StyledResumoIcon>
        <StyledResumoLabel>Total Pendente</StyledResumoLabel>
        <StyledResumoValue>R$ {formatarValor(resumo.totalPendente)}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#ef4444">
        <StyledResumoIcon $color="#ef4444" $bg="rgba(239, 68, 68, 0.1)">⚠️</StyledResumoIcon>
        <StyledResumoLabel>Total Atrasado</StyledResumoLabel>
        <StyledResumoValue>R$ {formatarValor(resumo.totalAtrasado)}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#8b5cf6">
        <StyledResumoIcon $color="#8b5cf6" $bg="rgba(139, 92, 246, 0.1)">📊</StyledResumoIcon>
        <StyledResumoLabel>Média de Receitas</StyledResumoLabel>
        <StyledResumoValue>R$ {formatarValor(resumo.media)}</StyledResumoValue>
      </StyledResumoCard>
    </StyledResumoGrid>
  );
}