'use client';

import type { CaridadeListProps } from '../types/CaridadeListTypes';
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
} from '../styles/CaridadeListStyles';

export default function CaridadeListComp({
  caridadesFiltradas,
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
}: CaridadeListProps) {
  const temFiltros = filtros.pesquisa || filtros.tipo || filtros.status;

  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Lista de Caridade Financeira ({caridadesFiltradas.length})</StyledCardTitle>
        {temFiltros && (
          <StyledButton $variant="ghost" onClick={onLimparFiltros}>
            Limpar filtros
          </StyledButton>
        )}
      </StyledCardHeader>

      <StyledFilterBar>
        <StyledSearchInput
          type="text"
          placeholder="🔍 Pesquisar doações..."
          value={filtros.pesquisa}
          onChange={e => onAtualizarFiltro('pesquisa', e.target.value)}
        />
        <StyledSelect
          value={filtros.tipo}
          onChange={e => onAtualizarFiltro('tipo', e.target.value)}
        >
          <option value="">Todos tipos</option>
          <option value="unica">Única</option>
          <option value="recorrente">Recorrente</option>
        </StyledSelect>
        <StyledSelect
          value={filtros.status}
          onChange={e => onAtualizarFiltro('status', e.target.value)}
        >
          <option value="">Todos status</option>
          <option value="realizada">Realizada</option>
          <option value="pendente">Pendente</option>
        </StyledSelect>
      </StyledFilterBar>

      {caridadesFiltradas.length === 0 ? (
        <StyledEmptyState>
          <StyledEmptyIcon>📭</StyledEmptyIcon>
          <StyledEmptyTitle>Nenhuma caridade encontrada</StyledEmptyTitle>
          <StyledEmptyText>
            {temFiltros
              ? 'Tente ajustar os filtros para encontrar doações.'
              : 'Comece cadastrando sua primeira caridade.'}
          </StyledEmptyText>
        </StyledEmptyState>
      ) : (
        <StyledGrid>
          {caridadesFiltradas.map(d => {
            
            return (
              <StyledItem key={d.id}>
                <StyledItemHeader>
                  <StyledIcon $color={d.categoriaCor}>
                    {d.categoriaIcone}
                  </StyledIcon>
                  <StyledInfo>
                    <StyledName>{d.nome}</StyledName>
                    <StyledSub>{getStatusLabel(d.status)}</StyledSub>
                  </StyledInfo>
                  <StyledStatusBadge $color={getStatusCor(d.status)}>
                    {getStatusLabel(d.status)}
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
