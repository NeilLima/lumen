'use client';

import type { CategoriasResumoProps } from '../types/CategoriasResumoTypes';
import {
  StyledResumoGrid,
  StyledResumoCard,
  StyledResumoIcon,
  StyledResumoLabel,
  StyledResumoValue,
} from '../styles/CategoriasResumoStyles';

export default function CategoriasResumoComp({ resumo, formatarValor }: CategoriasResumoProps) {
  return (
    <StyledResumoGrid>
      <StyledResumoCard $accentColor="#8b5cf6">
        <StyledResumoIcon $color="#8b5cf6" $bg="rgba(139, 92, 246, 0.1)">📊</StyledResumoIcon>
        <StyledResumoLabel>Total de Categorias</StyledResumoLabel>
        <StyledResumoValue>{resumo.totalCategorias}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#ef4444">
        <StyledResumoIcon $color="#ef4444" $bg="rgba(239, 68, 68, 0.1)">💸</StyledResumoIcon>
        <StyledResumoLabel>Despesas</StyledResumoLabel>
        <StyledResumoValue>{resumo.totalDespesas}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#10b981">
        <StyledResumoIcon $color="#10b981" $bg="rgba(16, 185, 129, 0.1)">💰</StyledResumoIcon>
        <StyledResumoLabel>Receitas</StyledResumoLabel>
        <StyledResumoValue>{resumo.totalReceitas}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#3b82f6">
        <StyledResumoIcon $color="#3b82f6" $bg="rgba(59, 130, 246, 0.1)">🔄</StyledResumoIcon>
        <StyledResumoLabel>Ambos</StyledResumoLabel>
        <StyledResumoValue>{resumo.totalAmbos}</StyledResumoValue>
      </StyledResumoCard>

    </StyledResumoGrid>
  );
}
