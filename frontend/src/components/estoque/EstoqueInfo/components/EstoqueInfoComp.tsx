import React from 'react';
import type { EstoqueInfoProps } from '../types/EstoqueInfoTypes';
import {
  EstoqueInfoOverlay,
  EstoqueInfoCard,
  EstoqueInfoTitle,
  EstoqueInfoText,
  EstoqueInfoButton,
} from '../styles/EstoqueInfoStyles';

export function EstoqueInfoComp({
  modalInfoAberto,
  onFecharInfo,
}: EstoqueInfoProps) {
  if (!modalInfoAberto) return null;

  return (
    <EstoqueInfoOverlay data-testid="estoque-info-overlay" onClick={onFecharInfo}>
      <EstoqueInfoCard onClick={e => e.stopPropagation()}>
        <EstoqueInfoTitle>Sobre o Estoque</EstoqueInfoTitle>
        <EstoqueInfoText>
          Esta tela exibe o controle de estoque de produtos cadastrados no
          sistema. Você pode visualizar, adicionar, editar e excluir itens.
        </EstoqueInfoText>
        <EstoqueInfoText>
          Os status indicam o nível de estoque em relação à quantidade mínima:
          <br />
          <strong>Verde:</strong> estoque adequado (≥ 70%) <br />
          <strong>Amarelo:</strong> estoque baixo (30% a 70%) <br />
          <strong>Vermelho:</strong> estoque crítico (&lt; 30%).
        </EstoqueInfoText>
        <EstoqueInfoButton data-testid="info-fechar" onClick={onFecharInfo}>
          Fechar
        </EstoqueInfoButton>
      </EstoqueInfoCard>
    </EstoqueInfoOverlay>
  );
}