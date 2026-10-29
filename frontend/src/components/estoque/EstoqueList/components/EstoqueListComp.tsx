'use client';

import type { EstoqueItem, EstoqueFiltros } from '../../main/types/EstoqueTypes';
import type { EstoqueListProps } from '../types/EstoqueListTypes';
import {
  StyledCard,
  StyledCardHeader,
  StyledCardTitle,
  StyledFilterBar,
  StyledSearchInput,
  StyledSelect,
  StyledEstoqueList,
  StyledEstoqueItem,
  StyledEstoqueIcon,
  StyledEstoqueInfo,
  StyledEstoqueNome,
  StyledEstoqueMeta,
  StyledEstoqueCategoria,
  StyledEstoqueLocal,
  StyledEstoqueQtd,
  StyledEstoqueValue,
  StyledEstoqueActions,
  StyledButton,
  StyledIconButton,
  StyledStatusBadge,
  StyledEmptyState,
  StyledEmptyIcon,
  StyledEmptyTitle,
  StyledEmptyText,
} from '../styles/EstoqueListStyles';

const ICON_POR_CATEGORIA: Record<string, string> = {
  Alimentos: '🍎',
  Limpeza: '🧼',
  Higiene: '🧴',
  Bebidas: '🥤',
  Outros: '📦',
};

export default function EstoqueListComp({
  itensFiltrados,
  filtros,
  data,
  formatarValor,
  getStatusCor,
  getStatusLabel,
  onAtualizarFiltro,
  onLimparFiltros,
  onAbrirModalEditar,
  onConfirmarExclusao,
}: EstoqueListProps) {
  const temFiltros = filtros.pesquisa || filtros.categoria || filtros.localCompra || filtros.status;

  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Lista de Estoque ({itensFiltrados.length})</StyledCardTitle>
        {temFiltros && (
          <StyledButton $variant="ghost" onClick={onLimparFiltros}>
            Limpar filtros
          </StyledButton>
        )}
      </StyledCardHeader>

      <StyledFilterBar>
        <StyledSearchInput
          type="text"
          placeholder="🔍 Pesquisar itens..."
          value={filtros.pesquisa}
          onChange={e => onAtualizarFiltro('pesquisa', e.target.value)}
        />
        <StyledSelect
          value={filtros.categoria}
          onChange={e => onAtualizarFiltro('categoria', e.target.value)}
        >
          <option value="">Todas categorias</option>
          {data.categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </StyledSelect>
        <StyledSelect
          value={filtros.localCompra}
          onChange={e => onAtualizarFiltro('localCompra', e.target.value)}
        >
          <option value="">Todos locais</option>
          {data.locais.map(local => (
            <option key={local} value={local}>{local}</option>
          ))}
        </StyledSelect>
        <StyledSelect
          value={filtros.status}
          onChange={e => onAtualizarFiltro('status', e.target.value)}
        >
          <option value="">Todos status</option>
          <option value="ok">Estoque OK</option>
          <option value="baixo">Baixo</option>
          <option value="critico">Crítico</option>
        </StyledSelect>
      </StyledFilterBar>

      {itensFiltrados.length === 0 ? (
        <StyledEmptyState>
          <StyledEmptyIcon>📦</StyledEmptyIcon>
          <StyledEmptyTitle>Nenhum item encontrado</StyledEmptyTitle>
          <StyledEmptyText>
            {temFiltros
              ? 'Tente ajustar os filtros para encontrar itens.'
              : 'Comece cadastrando seu primeiro item de estoque.'}
          </StyledEmptyText>
        </StyledEmptyState>
      ) : (
        <StyledEstoqueList>
          {itensFiltrados.map(item => {
            const statusCor = getStatusCor(item.quantidade, item.quantidadeMinima);
            const statusLabel = getStatusLabel(item.quantidade, item.quantidadeMinima);
            const icone = ICON_POR_CATEGORIA[item.categoria] || '📦';
            const total = item.quantidade * item.preco;

            return (
              <StyledEstoqueItem key={item.id}>
                <StyledEstoqueIcon $color={statusCor}>{icone}</StyledEstoqueIcon>
                <StyledEstoqueInfo>
                  <StyledEstoqueNome>{item.nome}</StyledEstoqueNome>
                  <StyledEstoqueMeta>
                    <StyledEstoqueCategoria>{item.categoria}</StyledEstoqueCategoria>
                    <StyledEstoqueLocal>• {item.localCompra}</StyledEstoqueLocal>
                    <StyledEstoqueQtd>• {item.quantidade} {item.unidade} / mín: {item.quantidadeMinima} {item.unidade}</StyledEstoqueQtd>
                  </StyledEstoqueMeta>
                </StyledEstoqueInfo>
                <StyledStatusBadge $color={statusCor}>{statusLabel}</StyledStatusBadge>
                <StyledEstoqueValue>R$ {formatarValor(total)}</StyledEstoqueValue>
                <StyledEstoqueActions>
                  <StyledIconButton title="Editar" onClick={() => onAbrirModalEditar(item)}>
                    ✏️
                  </StyledIconButton>
                  <StyledIconButton title="Excluir" $color="#ef4444" onClick={() => onConfirmarExclusao(item)}>
                    🗑️
                  </StyledIconButton>
                </StyledEstoqueActions>
              </StyledEstoqueItem>
            );
          })}
        </StyledEstoqueList>
      )}
    </StyledCard>
  );
}