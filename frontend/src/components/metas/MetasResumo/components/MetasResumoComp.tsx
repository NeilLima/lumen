'use client';
import type { MetasResumoProps } from '../types/MetasResumoTypes';
import { StyledResumoGrid, StyledResumoCard, StyledResumoIcon, StyledResumoLabel, StyledResumoValue, StyledProgressoBar } from '../styles/MetasResumoStyles';

export default function MetasResumoComp({ resumo, formatarValor }: MetasResumoProps) {
  return (
    <StyledResumoGrid>
      <StyledResumoCard $accentColor="#8b5cf6">
        <StyledResumoIcon $color="#8b5cf6" $bg="rgba(139,92,246,0.1)">🎯</StyledResumoIcon>
        <StyledResumoLabel>Total de Metas</StyledResumoLabel>
        <StyledResumoValue>{resumo.totalMetas}</StyledResumoValue>
      </StyledResumoCard>
      <StyledResumoCard $accentColor="#10b981">
        <StyledResumoIcon $color="#10b981" $bg="rgba(16,185,129,0.1)">✅</StyledResumoIcon>
        <StyledResumoLabel>Concluídas</StyledResumoLabel>
        <StyledResumoValue>{resumo.totalConcluidas}</StyledResumoValue>
      </StyledResumoCard>
      <StyledResumoCard $accentColor="#3b82f6">
        <StyledResumoIcon $color="#3b82f6" $bg="rgba(59,130,246,0.1)">📊</StyledResumoIcon>
        <StyledResumoLabel>Progresso Médio</StyledResumoLabel>
        <StyledResumoValue>{resumo.progressoMedio.toFixed(0)}%</StyledResumoValue>
        <StyledProgressoBar $progresso={resumo.progressoMedio} $color="#3b82f6" />
      </StyledResumoCard>
      <StyledResumoCard $accentColor="#f59e0b">
        <StyledResumoIcon $color="#f59e0b" $bg="rgba(245,158,11,0.1)">💰</StyledResumoIcon>
        <StyledResumoLabel>Valor Total</StyledResumoLabel>
        <StyledResumoValue>R$ {formatarValor(resumo.totalValorAlvo)}</StyledResumoValue>
      </StyledResumoCard>
    </StyledResumoGrid>
  );
}
