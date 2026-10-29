'use client';

import {
  StyledProdutosHeader,
  StyledProdutosTitle,
  StyledProdutosSubtitle,
  StyledProdutosButton,
  StyledInfoButton,
} from '../styles/ProdutosHeaderStyles';

export default function ProdutosHeaderComp({
  onAbrirModalNovo,
}: {
  onAbrirModalNovo: () => void;
}) {
  return (
    <StyledProdutosHeader>
      <div>
        <StyledProdutosTitle>
          Produtos
          <StyledInfoButton title="Informações sobre a página">ℹ️</StyledInfoButton>
        </StyledProdutosTitle>
        <StyledProdutosSubtitle>
          Cadastre produtos, preços e locais de compra
        </StyledProdutosSubtitle>
      </div>
      <StyledProdutosButton $variant="primary" onClick={onAbrirModalNovo}>
        + Novo Produto
      </StyledProdutosButton>
    </StyledProdutosHeader>
  );
}