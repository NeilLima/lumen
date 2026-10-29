'use client';

import type { EstoqueItem } from '../../main/types/EstoqueTypes';
import type { EstoqueResumoProps } from '../types/EstoqueResumoTypes';
import { calcularResumo } from '../utils/EstoqueResumoUtils';
import {
  StyledResumoGrid,
  StyledResumoCard,
  StyledResumoIcon,
  StyledResumoLabel,
  StyledResumoValue,
} from '../styles/EstoqueResumoStyles';

export default function EstoqueResumoComp({ itens, formatarValor, getStatusCor }: EstoqueResumoProps) {
  const lista = itens || [];
  const { totalItens, valorTotal, itensCriticos, itensBaixos } = calcularResumo(lista, getStatusCor);

  return (
    <StyledResumoGrid>
      <StyledResumoCard $accentColor="#10b981">
        <StyledResumoIcon $color="#10b981" $bg="rgba(16, 185, 129, 0.1)">✅</StyledResumoIcon>
        <StyledResumoLabel>Total de Itens</StyledResumoLabel>
        <StyledResumoValue>{totalItens}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#8b5cf6">
        <StyledResumoIcon $color="#8b5cf6" $bg="rgba(139, 92, 246, 0.1)">💰</StyledResumoIcon>
        <StyledResumoLabel>Valor em Estoque</StyledResumoLabel>
        <StyledResumoValue>R$ {formatarValor(valorTotal)}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#ef4444">
        <StyledResumoIcon $color="#ef4444" $bg="rgba(239, 68, 68, 0.1)">🚨</StyledResumoIcon>
        <StyledResumoLabel>Críticos</StyledResumoLabel>
        <StyledResumoValue>{itensCriticos}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#f59e0b">
        <StyledResumoIcon $color="#f59e0b" $bg="rgba(245, 158, 11, 0.1)">⚠️</StyledResumoIcon>
        <StyledResumoLabel>Baixos</StyledResumoLabel>
        <StyledResumoValue>{itensBaixos}</StyledResumoValue>
      </StyledResumoCard>
    </StyledResumoGrid>
  );
}