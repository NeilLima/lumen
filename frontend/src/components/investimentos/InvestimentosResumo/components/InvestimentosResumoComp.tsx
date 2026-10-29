'use client';

import type { InvestimentosResumoProps } from '../types/InvestimentosResumoTypes';
import {
  StyledResumoGrid,
  StyledResumoCard,
  StyledResumoIcon,
  StyledResumoLabel,
  StyledResumoValue,
} from '../styles/InvestimentosResumoStyles';

export default function InvestimentosResumoComp({ resumo, formatarValor }: InvestimentosResumoProps) {
  return (
    <StyledResumoGrid>
      <StyledResumoCard $accentColor="#8b5cf6">
        <StyledResumoIcon $color="#8b5cf6" $bg="rgba(139, 92, 246, 0.1)">📊</StyledResumoIcon>
        <StyledResumoLabel>Total de Investimentos</StyledResumoLabel>
        <StyledResumoValue>{resumo.totalInvestimentos}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#3b82f6">
        <StyledResumoIcon $color="#3b82f6" $bg="rgba(59, 130, 246, 0.1)">💵</StyledResumoIcon>
        <StyledResumoLabel>Valor Aplicado</StyledResumoLabel>
        <StyledResumoValue>R$ {formatarValor(resumo.totalAplicado)}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#10b981">
        <StyledResumoIcon $color="#10b981" $bg="rgba(16, 185, 129, 0.1)">💰</StyledResumoIcon>
        <StyledResumoLabel>Valor Atual</StyledResumoLabel>
        <StyledResumoValue>R$ {formatarValor(resumo.totalAtual)}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#f59e0b">
        <StyledResumoIcon $color="#f59e0b" $bg="rgba(245, 158, 11, 0.1)">📈</StyledResumoIcon>
        <StyledResumoLabel>Lucro/Prejuízo</StyledResumoLabel>
        <StyledResumoValue>R$ {formatarValor(resumo.lucroPrejuizo)}</StyledResumoValue>
      </StyledResumoCard>

    </StyledResumoGrid>
  );
}
