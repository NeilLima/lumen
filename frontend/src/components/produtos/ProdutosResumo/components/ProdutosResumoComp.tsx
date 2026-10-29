'use client';

import type { ProdutosResumo } from '../../main/utils/ProdutosMainUtils';
import {
  StyledProdutosResumoGrid,
  StyledProdutosResumoCard,
  StyledProdutosResumoIcon,
  StyledProdutosResumoLabel,
  StyledProdutosResumoValue,
} from '../styles/ProdutosResumoStyles';

interface ProdutosResumoProps {
  resumo: ProdutosResumo;
  formatarValor: (valor: number) => string;
}

export default function ProdutosResumoComp({ resumo, formatarValor }: ProdutosResumoProps) {
  return (
    <StyledProdutosResumoGrid>
      <StyledProdutosResumoCard $accentColor="#10b981">
        <StyledProdutosResumoIcon $color="#10b981" $bg="rgba(16, 185, 129, 0.1)">📦</StyledProdutosResumoIcon>
        <StyledProdutosResumoLabel>Total de Produtos</StyledProdutosResumoLabel>
        <StyledProdutosResumoValue>{resumo.totalProdutos}</StyledProdutosResumoValue>
      </StyledProdutosResumoCard>

      <StyledProdutosResumoCard $accentColor="#8b5cf6">
        <StyledProdutosResumoIcon $color="#8b5cf6" $bg="rgba(139, 92, 246, 0.1)">💰</StyledProdutosResumoIcon>
        <StyledProdutosResumoLabel>Valor Total</StyledProdutosResumoLabel>
        <StyledProdutosResumoValue>R$ {formatarValor(resumo.valorTotal)}</StyledProdutosResumoValue>
      </StyledProdutosResumoCard>

      <StyledProdutosResumoCard $accentColor="#f59e0b">
        <StyledProdutosResumoIcon $color="#f59e0b" $bg="rgba(245, 158, 11, 0.1)">📅</StyledProdutosResumoIcon>
        <StyledProdutosResumoLabel>Gasto neste Mês</StyledProdutosResumoLabel>
        <StyledProdutosResumoValue>R$ {formatarValor(resumo.gastoMensal)}</StyledProdutosResumoValue>
      </StyledProdutosResumoCard>

      <StyledProdutosResumoCard $accentColor="#ef4444">
        <StyledProdutosResumoIcon $color="#ef4444" $bg="rgba(239, 68, 68, 0.1)">🔁</StyledProdutosResumoIcon>
        <StyledProdutosResumoLabel>Produtos Parcelados</StyledProdutosResumoLabel>
        <StyledProdutosResumoValue>{resumo.parcelados}</StyledProdutosResumoValue>
      </StyledProdutosResumoCard>
    </StyledProdutosResumoGrid>
  );
}