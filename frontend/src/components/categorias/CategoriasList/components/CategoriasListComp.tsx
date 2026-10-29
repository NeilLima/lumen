'use client';

import type { CategoriasListProps } from '../types/CategoriasListTypes';
import {
  StyledCard,
  StyledCardHeader,
  StyledCardTitle,
  StyledFilterBar,
  StyledSearchInput,
  StyledSelect,
  StyledGrid,
  StyledItem,
  StyledItemHeader,
  StyledIcon,
  StyledInfo,
  StyledName,
  StyledSub,
  StyledStatusBadge,
  StyledValues,
  StyledAmount,
  StyledLabel,
  StyledActions,
  StyledButton,
  StyledIconButton,
  StyledEmptyState,
  StyledEmptyIcon,
  StyledEmptyTitle,
  StyledEmptyText,
} from '../styles/CategoriasListStyles';

export default function CategoriasListComp({
  categoriasFiltradas,
  filtros,
  formatarValor,
  formatarData,
  getStatusLabel,
  getStatusCor,

  onAtualizarFiltro,
  onLimparFiltros,
  onAbrirDetalhe,
  onAbrirModalEditar,
  onConfirmarExclusao,
}: CategoriasListProps) {
  const temFiltros = filtros.pesquisa || filtros.tipo;

  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Lista de Categorias ({categoriasFiltradas.length})</StyledCardTitle>
        {temFiltros && (
          <StyledButton $variant="ghost" onClick={onLimparFiltros}>
            Limpar filtros
          </StyledButton>
        )}
      </StyledCardHeader>

      <StyledFilterBar>
        <StyledSearchInput
          type="text"
          placeholder="🔍 Pesquisar categorias..."
          value={filtros.pesquisa}
          onChange={e => onAtualizarFiltro('pesquisa', e.target.value)}
        />
        <StyledSelect
          value={filtros.tipo}
          onChange={e => onAtualizarFiltro('tipo', e.target.value)}
        >
          <option value="">Todos tipos</option>
          <option value="despesa">Despesa</option>
          <option value="receita">Receita</option>
          <option value="ambos">Ambos</option>
        </StyledSelect>
      </StyledFilterBar>

      {categoriasFiltradas.length === 0 ? (
        <StyledEmptyState>
          <StyledEmptyIcon>📭</StyledEmptyIcon>
          <StyledEmptyTitle>Nenhuma categoria encontrada</StyledEmptyTitle>
          <StyledEmptyText>
            {temFiltros
              ? 'Tente ajustar os filtros para encontrar categorias.'
              : 'Comece cadastrando sua primeira categoria.'}
          </StyledEmptyText>
        </StyledEmptyState>
      ) : (
        <StyledGrid>
          {categoriasFiltradas.map(d => {
            
            return (
              <StyledItem key={d.id}>
                <StyledItemHeader>
                  <StyledIcon $color={d.categoriaCor}>
                    {d.categoriaIcone}
                  </StyledIcon>
                  <StyledInfo>
                    <StyledName>{d.nome}</StyledName>
                    <StyledSub>{getStatusLabel(d.tipo)}</StyledSub>
                  </StyledInfo>
                  <StyledStatusBadge $color={getStatusCor(d.tipo)}>
                    {getStatusLabel(d.tipo)}
                  </StyledStatusBadge>
                </StyledItemHeader>

                <StyledValues>
                  <div>
                    <StyledLabel>Valor</StyledLabel>
                    <StyledAmount>R$ {formatarValor(d.valor)}</StyledAmount>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <StyledLabel>Data</StyledLabel>
                    <StyledAmount>{formatarData(d.data)}</StyledAmount>
                  </div>
                </StyledValues>

                <StyledActions>
                  <StyledIconButton title="Ver detalhes" onClick={() => onAbrirDetalhe(d)}>
                    👁️
                  </StyledIconButton>
                  <StyledIconButton title="Editar" onClick={() => onAbrirModalEditar(d)}>
                    ✏️
                  </StyledIconButton>
                  <StyledIconButton title="Excluir" $color="#ef4444" onClick={() => onConfirmarExclusao(d)}>
                    🗑️
                  </StyledIconButton>
                </StyledActions>
              </StyledItem>
            );
          })}
        </StyledGrid>
      )}
    </StyledCard>
  );
}
