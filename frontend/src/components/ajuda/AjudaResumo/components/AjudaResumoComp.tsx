'use client';

import type { AjudaResumoProps } from '../types/AjudaResumoTypes';
import {
  StyledResumoGrid,
  StyledResumoCard,
  StyledResumoIcon,
  StyledResumoLabel,
  StyledResumoValue,
} from '../styles/AjudaResumoStyles';

export default function AjudaResumoComp({ resumo, formatarValor }: AjudaResumoProps) {
  return (
    <StyledResumoGrid>
      <StyledResumoCard $accentColor="#8b5cf6">
        <StyledResumoIcon $color="#8b5cf6" $bg="rgba(139, 92, 246, 0.1)">📊</StyledResumoIcon>
        <StyledResumoLabel>Total de Artigos</StyledResumoLabel>
        <StyledResumoValue>{resumo.totalArtigos}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#10b981">
        <StyledResumoIcon $color="#10b981" $bg="rgba(16, 185, 129, 0.1)">✅</StyledResumoIcon>
        <StyledResumoLabel>Publicados</StyledResumoLabel>
        <StyledResumoValue>{resumo.totalPublicados}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#f59e0b">
        <StyledResumoIcon $color="#f59e0b" $bg="rgba(245, 158, 11, 0.1)">📝</StyledResumoIcon>
        <StyledResumoLabel>Rascunhos</StyledResumoLabel>
        <StyledResumoValue>{resumo.totalRascunhos}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#3b82f6">
        <StyledResumoIcon $color="#3b82f6" $bg="rgba(59, 130, 246, 0.1)">📁</StyledResumoIcon>
        <StyledResumoLabel>Categorias</StyledResumoLabel>
        <StyledResumoValue>{resumo.totalCategoriasAjuda}</StyledResumoValue>
      </StyledResumoCard>

    </StyledResumoGrid>
  );
}
