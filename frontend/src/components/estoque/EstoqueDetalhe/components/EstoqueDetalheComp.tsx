import React from 'react';
import type { EstoqueDetalheProps } from '../types/EstoqueDetalheTypes';
import {
  EstoqueDetalheContainer,
  EstoqueDetalheCard,
  EstoqueDetalheTitle,
  EstoqueDetalheRow,
  EstoqueDetalheLabel,
  EstoqueDetalheValue,
  EstoqueDetalheButton,
} from '../styles/EstoqueDetalheStyles';

export function EstoqueDetalheComp({
  detalheItem,
  formatarValor,
  formatarData,
  getStatusCor,
  getStatusLabel,
  onFecharDetalhe,
  onEditar,
}: EstoqueDetalheProps) {
  if (!detalheItem) return null;

  const statusCor = getStatusCor(detalheItem.quantidade, detalheItem.quantidadeMinima);
  const statusLabel = getStatusLabel(detalheItem.quantidade, detalheItem.quantidadeMinima);

  return (
    <EstoqueDetalheContainer>
      <EstoqueDetalheCard>
        <EstoqueDetalheTitle>Detalhe do Produto</EstoqueDetalheTitle>
        <EstoqueDetalheRow>
          <EstoqueDetalheLabel>Nome</EstoqueDetalheLabel>
          <EstoqueDetalheValue>{detalheItem.nome}</EstoqueDetalheValue>
        </EstoqueDetalheRow>
        <EstoqueDetalheRow>
          <EstoqueDetalheLabel>Categoria</EstoqueDetalheLabel>
          <EstoqueDetalheValue>{detalheItem.categoria}</EstoqueDetalheValue>
        </EstoqueDetalheRow>
        <EstoqueDetalheRow>
          <EstoqueDetalheLabel>Quantidade</EstoqueDetalheLabel>
          <EstoqueDetalheValue data-testid="detalhe-quantidade">
            {detalheItem.quantidade} {detalheItem.unidade}
          </EstoqueDetalheValue>
        </EstoqueDetalheRow>
        <EstoqueDetalheRow>
          <EstoqueDetalheLabel>Mínimo</EstoqueDetalheLabel>
          <EstoqueDetalheValue>{detalheItem.quantidadeMinima} {detalheItem.unidade}</EstoqueDetalheValue>
        </EstoqueDetalheRow>
        <EstoqueDetalheRow>
          <EstoqueDetalheLabel>Preço</EstoqueDetalheLabel>
          <EstoqueDetalheValue>{formatarValor(detalheItem.preco)}</EstoqueDetalheValue>
        </EstoqueDetalheRow>
        <EstoqueDetalheRow>
          <EstoqueDetalheLabel>Local da Compra</EstoqueDetalheLabel>
          <EstoqueDetalheValue>{detalheItem.localCompra}</EstoqueDetalheValue>
        </EstoqueDetalheRow>
        <EstoqueDetalheRow>
          <EstoqueDetalheLabel>Status</EstoqueDetalheLabel>
          <EstoqueDetalheValue $cor={statusCor}>{statusLabel}</EstoqueDetalheValue>
        </EstoqueDetalheRow>
        <EstoqueDetalheRow>
          <EstoqueDetalheLabel>Última Atualização</EstoqueDetalheLabel>
          <EstoqueDetalheValue>{formatarData(detalheItem.dataAtualizacao)}</EstoqueDetalheValue>
        </EstoqueDetalheRow>
        <div style={{ marginTop: 24, display: 'flex', gap: 8 }}>
          <EstoqueDetalheButton
            data-testid="detalhe-editar"
            onClick={() => onEditar(detalheItem)}
            $cor="#3b82f6"
          >
            Editar
          </EstoqueDetalheButton>
          <EstoqueDetalheButton
            data-testid="detalhe-fechar"
            onClick={onFecharDetalhe}
            $cor="#6b7280"
          >
            Fechar
          </EstoqueDetalheButton>
        </div>
      </EstoqueDetalheCard>
    </EstoqueDetalheContainer>
  );
}