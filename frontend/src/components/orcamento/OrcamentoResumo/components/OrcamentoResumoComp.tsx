'use client';
import type { OrcamentoResumoProps } from '../types/OrcamentoResumoTypes';
import { StyledGrid, StyledCard, StyledIcon, StyledLabel, StyledValue, StyledBar } from '../styles/OrcamentoResumoStyles';
export default function OrcamentoResumoComp({ resumo, formatarValor }: OrcamentoResumoProps) {
  const barColor = resumo.percentualUsado > 90 ? '#ef4444' : resumo.percentualUsado > 70 ? '#f59e0b' : '#10b981';
  const barBg = barColor + '1A';
  return (
    <StyledGrid>
      <StyledCard $accentColor="#8b5cf6">
        <StyledIcon $color="#8b5cf6" $bg="rgba(139,92,246,0.1)">📊</StyledIcon>
        <StyledLabel>Limite Total</StyledLabel>
        <StyledValue>R$ {formatarValor(resumo.totalLimite)}</StyledValue>
      </StyledCard>
      <StyledCard $accentColor="#ef4444">
        <StyledIcon $color="#ef4444" $bg="rgba(239,68,68,0.1)">💸</StyledIcon>
        <StyledLabel>Total Gasto</StyledLabel>
        <StyledValue>R$ {formatarValor(resumo.totalGasto)}</StyledValue>
      </StyledCard>
      <StyledCard $accentColor="#10b981">
        <StyledIcon $color="#10b981" $bg="rgba(16,185,129,0.1)">💰</StyledIcon>
        <StyledLabel>Disponível</StyledLabel>
        <StyledValue>R$ {formatarValor(resumo.totalDisponivel)}</StyledValue>
      </StyledCard>
      <StyledCard $accentColor={barColor}>
        <StyledIcon $color={barColor} $bg={barBg}>📊</StyledIcon>
        <StyledLabel>Percentual Usado</StyledLabel>
        <StyledValue>{resumo.percentualUsado.toFixed(0)}%</StyledValue>
        <StyledBar $percentual={resumo.percentualUsado} $color={barColor} />
      </StyledCard>
    </StyledGrid>
  );
}