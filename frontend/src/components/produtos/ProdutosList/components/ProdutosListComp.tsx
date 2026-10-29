'use client';

import type { Produto, ProdutosFiltros } from '../../main/utils/ProdutosMainUtils';
import {
  StyledProdutosCard,
  StyledProdutosCardHeader,
  StyledProdutosCardTitle,
  StyledProdutosFilterBar,
  StyledProdutosSearchInput,
  StyledProdutosSelect,
  StyledProdutosList,
  StyledProdutoItem,
  StyledProdutoIcon,
  StyledProdutoInfo,
  StyledProdutoNome,
  StyledProdutoMeta,
  StyledProdutoCategoria,
  StyledProdutoLocal,
  StyledProdutoValue,
  StyledProdutoActions,
  StyledProdutosButton,
  StyledProdutoIconButton,
  StyledParcelasBadge,
  StyledProdutosEmptyState,
  StyledProdutosEmptyIcon,
  StyledProdutosEmptyTitle,
  StyledProdutosEmptyText,
} from '../styles/ProdutosListStyles';

const ICON_POR_CATEGORIA: Record<string, string> = {
  Alimentos: '🍎',
  Bebidas: '🥤',
  Limpeza: '🧼',
  Higiene: '🧴',
  Eletrônicos: '💻',
  Vestuário: '👕',
  Outros: '📦',
};

const COR_CATEGORIA: Record<string, string> = {
  Alimentos: '#10b981',
  Bebidas: '#3b82f6',
  Limpeza: '#f59e0b',
  Higiene: '#8b5cf6',
  Eletrônicos: '#06b6d4',
  Vestuário: '#ec4899',
  Outros: '#64748b',
};

interface ProdutosListProps {
  produtosFiltrados: Produto[];
  filtros: ProdutosFiltros;
  data: { categorias: string[]; locais: string[] };
  formatarValor: (valor: number) => string;
  formatarData: (data: string) => string;
  onAtualizarFiltro: (campo: keyof ProdutosFiltros, valor: string) => void;
  onLimparFiltros: () => void;
  onAbrirModalEditar: (produto: Produto) => void;
  onConfirmarExclusao: (produto: Produto) => void;
}

export default function ProdutosListComp({
  produtosFiltrados,
  filtros,
  data,
  formatarValor,
  formatarData,
  onAtualizarFiltro,
  onLimparFiltros,
  onAbrirModalEditar,
  onConfirmarExclusao,
}: ProdutosListProps) {
  const temFiltros = filtros.pesquisa || filtros.categoria || filtros.localCompra;

  return (
    <StyledProdutosCard>
      <StyledProdutosCardHeader>
        <StyledProdutosCardTitle>Lista de Produtos ({produtosFiltrados.length})</StyledProdutosCardTitle>
        {temFiltros && (
          <StyledProdutosButton $variant="ghost" onClick={onLimparFiltros}>
            Limpar filtros
          </StyledProdutosButton>
        )}
      </StyledProdutosCardHeader>

      <StyledProdutosFilterBar>
        <StyledProdutosSearchInput
          type="text"
          placeholder="🔍 Pesquisar produtos..."
          value={filtros.pesquisa}
          onChange={e => onAtualizarFiltro('pesquisa', e.target.value)}
        />
        <StyledProdutosSelect
          value={filtros.localCompra}
          onChange={e => onAtualizarFiltro('localCompra', e.target.value)}
        >
          <option value="">Todos os locais</option>
          {data.locais.map(local => (
            <option key={local} value={local}>{local}</option>
          ))}
        </StyledProdutosSelect>
        <StyledProdutosSelect
          value={filtros.categoria}
          onChange={e => onAtualizarFiltro('categoria', e.target.value)}
        >
          <option value="">Todas categorias</option>
          {data.categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </StyledProdutosSelect>
      </StyledProdutosFilterBar>

      {produtosFiltrados.length === 0 ? (
        <StyledProdutosEmptyState>
          <StyledProdutosEmptyIcon>🧾</StyledProdutosEmptyIcon>
          <StyledProdutosEmptyTitle>Nenhum produto encontrado</StyledProdutosEmptyTitle>
          <StyledProdutosEmptyText>
            {temFiltros
              ? 'Tente ajustar os filtros ou escolher outro local.'
              : 'Comece cadastrando seu primeiro produto.'}
          </StyledProdutosEmptyText>
        </StyledProdutosEmptyState>
      ) : (
        <StyledProdutosList>
          {produtosFiltrados.map(produto => {
            const cor = COR_CATEGORIA[produto.categoria] || '#64748b';
            const icone = ICON_POR_CATEGORIA[produto.categoria] || '📦';
            const parcela = produto.preco / produto.parcelas;

            return (
              <StyledProdutoItem key={produto.id}>
                <StyledProdutoIcon $color={cor}>{icone}</StyledProdutoIcon>
                <StyledProdutoInfo>
                  <StyledProdutoNome>{produto.nome}</StyledProdutoNome>
                  <StyledProdutoMeta>
                    <StyledProdutoCategoria>{produto.categoria}</StyledProdutoCategoria>
                    <StyledProdutoLocal>• {produto.localCompra}</StyledProdutoLocal>
                    <span>• {formatarData(produto.dataCadastro)}</span>
                    {produto.parcelas > 1 && (
                      <StyledParcelasBadge>
                        {produto.parcelas}x de R$ {formatarValor(parcela)}
                      </StyledParcelasBadge>
                    )}
                  </StyledProdutoMeta>
                </StyledProdutoInfo>
                <StyledProdutoValue>R$ {formatarValor(produto.preco)}</StyledProdutoValue>
                <StyledProdutoActions>
                  <StyledProdutoIconButton title="Editar" onClick={() => onAbrirModalEditar(produto)}>
                    ✏️
                  </StyledProdutoIconButton>
                  <StyledProdutoIconButton title="Excluir" $color="#ef4444" onClick={() => onConfirmarExclusao(produto)}>
                    🗑️
                  </StyledProdutoIconButton>
                </StyledProdutoActions>
              </StyledProdutoItem>
            );
          })}
        </StyledProdutosList>
      )}
    </StyledProdutosCard>
  );
}