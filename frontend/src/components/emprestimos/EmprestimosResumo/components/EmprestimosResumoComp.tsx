'use client';

import type { EmprestimosResumoProps } from '../types/EmprestimosResumoTypes';
import {
  StyledResumoGrid,
  StyledResumoCard,
  StyledResumoIcon,
  StyledResumoLabel,
  StyledResumoValue,
} from '../styles/EmprestimosResumoStyles';

export default function EmprestimosResumoComp({ resumo, formatarValor }: EmprestimosResumoProps) {
  return (
    <StyledResumoGrid>
      <StyledResumoCard $accentColor="#8b5cf6">
        <StyledResumoIcon $color="#8b5cf6" $bg="rgba(139, 92, 246, 0.1)">📊</StyledResumoIcon>
        <StyledResumoLabel>Total de Empréstimos</StyledResumoLabel>
        <StyledResumoValue>{resumo.totalEmprestimos}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#ef4444">
        <StyledResumoIcon $color="#ef4444" $bg="rgba(239, 68, 68, 0.1)">💰</StyledResumoIcon>
        <StyledResumoLabel>Valor Total</StyledResumoLabel>
        <StyledResumoValue>R$ {formatarValor(resumo.totalValor)}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#f59e0b">
        <StyledResumoIcon $color="#f59e0b" $bg="rgba(245, 158, 11, 0.1)">⚠️</StyledResumoIcon>
        <StyledResumoLabel>Atrasado</StyledResumoLabel>
        <StyledResumoValue>R$ {formatarValor(resumo.totalAtrasado)}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#10b981">
        <StyledResumoIcon $color="#10b981" $bg="rgba(16, 185, 129, 0.1)">✅</StyledResumoIcon>
        <StyledResumoLabel>Quitado</StyledResumoLabel>
        <StyledResumoValue>R$ {formatarValor(resumo.totalQuitado)}</StyledResumoValue>
      </StyledResumoCard>

    </StyledResumoGrid>
  );
}
