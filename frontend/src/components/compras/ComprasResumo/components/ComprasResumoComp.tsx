'use client';

import type { ComprasResumoProps } from '../types/ComprasResumoTypes';
import {
  StyledResumoGrid,
  StyledResumoCard,
  StyledResumoIcon,
  StyledResumoLabel,
  StyledResumoValue,
} from '../styles/ComprasResumoStyles';

export default function ComprasResumoComp({ resumo, formatarValor }: ComprasResumoProps) {
  return (
    <StyledResumoGrid>
      <StyledResumoCard $accentColor="#8b5cf6">
        <StyledResumoIcon $color="#8b5cf6" $bg="rgba(139, 92, 246, 0.1)">{'\u{1F6D2}'}</StyledResumoIcon>
        <StyledResumoLabel>Total Compras</StyledResumoLabel>
        <StyledResumoValue>R$ {formatarValor(resumo.total)}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#10b981">
        <StyledResumoIcon $color="#10b981" $bg="rgba(16, 185, 129, 0.1)">{'\u2705'}</StyledResumoIcon>
        <StyledResumoLabel>Pago</StyledResumoLabel>
        <StyledResumoValue>R$ {formatarValor(resumo.pago)}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#f59e0b">
        <StyledResumoIcon $color="#f59e0b" $bg="rgba(245, 158, 11, 0.1)">{'\u23F3'}</StyledResumoIcon>
        <StyledResumoLabel>Pendente</StyledResumoLabel>
        <StyledResumoValue>R$ {formatarValor(resumo.pendente)}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#3b82f6">
        <StyledResumoIcon $color="#3b82f6" $bg="rgba(59, 130, 246, 0.1)">{'\u{1F4B3}'}</StyledResumoIcon>
        <StyledResumoLabel>Parcelado</StyledResumoLabel>
        <StyledResumoValue>R$ {formatarValor(resumo.parcelado)}</StyledResumoValue>
      </StyledResumoCard>
    </StyledResumoGrid>
  );
}
