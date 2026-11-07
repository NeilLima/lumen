'use client';

import type { ComprasListProps } from '../types/ComprasListTypes';
import {
  StyledCard,
  StyledCardHeader,
  StyledCardTitle,
  StyledFilterBar,
  StyledSearchInput,
  StyledSelect,
  StyledDespesasList,
  StyledDespesaItem,
  StyledDespesaIcon,
  StyledDespesaInfo,
  StyledDespesaName,
  StyledDespesaMeta,
  StyledDespesaCategory,
  StyledDespesaAccount,
  StyledDespesaDate,
  StyledDespesaValue,
  StyledDespesaActions,
  StyledButton,
  StyledIconButton,
  StyledStatusBadge,
  StyledEmptyState,
  StyledEmptyIcon,
  StyledEmptyTitle,
  StyledEmptyText,
} from '../styles/ComprasListStyles';

export default function ComprasListComp({
  comprasFiltradas,
  filtros,
  data,
  formatarValor,
  formatarData,
  getStatusCor,
  getStatusLabel,
  onAtualizarFiltro,
  onLimparFiltros,
  onAbrirDetalhe,
  onAbrirModalEditar,
  onConfirmarExclusao,
}: ComprasListProps) {
  const temFiltros = filtros.pesquisa || filtros.statusPagamento;

  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Lista de Compras ({comprasFiltradas.length})</StyledCardTitle>
        {temFiltros && (
          <StyledButton $variant="ghost" onClick={onLimparFiltros}>
            Limpar filtros
          </StyledButton>
        )}
      </StyledCardHeader>

      <StyledFilterBar>
        <StyledSearchInput
          type="text"
          placeholder={'\u{1F50D} Pesquisar compras...'}
          value={filtros.pesquisa}
          onChange={e => onAtualizarFiltro('pesquisa', e.target.value)}
        />
        <StyledSelect
          value={filtros.statusPagamento}
          onChange={e => onAtualizarFiltro('statusPagamento', e.target.value)}
        >
          <option value="">Todos status</option>
          <option value="pago">Pago</option>
          <option value="pendente">Pendente</option>
        </StyledSelect>
      </StyledFilterBar>

      {comprasFiltradas.length === 0 ? (
        <StyledEmptyState>
          <StyledEmptyIcon>{'\u{1F4ED}'}</StyledEmptyIcon>
          <StyledEmptyTitle>Nenhuma compra encontrada</StyledEmptyTitle>
          <StyledEmptyText>
            {temFiltros
              ? 'Tente ajustar os filtros para encontrar compras.'
              : 'Comece cadastrando sua primeira compra.'}
          </StyledEmptyText>
        </StyledEmptyState>
      ) : (
        <StyledDespesasList>
          {comprasFiltradas.map((compra: any) => (
            <StyledDespesaItem key={compra.id}>
              <StyledDespesaIcon $color="#8b5cf6">
                {'\u{1F6D2}'}
              </StyledDespesaIcon>
              <StyledDespesaInfo>
                <StyledDespesaName>{compra.local || 'Sem local'}</StyledDespesaName>
                <StyledDespesaMeta>
                  <StyledDespesaCategory>{(compra.itens || []).map((i: any) => i.nome).join(', ') || 'Sem itens'}</StyledDespesaCategory>
                  <StyledDespesaAccount>{'\u2022'} {formatarData(compra.dataCompra)}</StyledDespesaAccount>
                </StyledDespesaMeta>
              </StyledDespesaInfo>
              <StyledStatusBadge $color={getStatusCor(compra.statusPagamento)}>
                {getStatusLabel(compra.statusPagamento)}
              </StyledStatusBadge>
              <StyledDespesaValue>R$ {formatarValor(compra.totalAmount)}</StyledDespesaValue>
              <StyledDespesaActions>
                <StyledIconButton title="Ver detalhes" onClick={() => onAbrirDetalhe(compra)}>
                  {'\u{1F441}\u{FE0F}'}
                </StyledIconButton>
                <StyledIconButton title="Editar" onClick={() => onAbrirModalEditar(compra)}>
                  {'\u270F\u{FE0F}'}
                </StyledIconButton>
                <StyledIconButton title="Excluir" $color="#ef4444" onClick={() => onConfirmarExclusao(compra)}>
                  {'\u{1F5D1}\u{FE0F}'}
                </StyledIconButton>
              </StyledDespesaActions>
            </StyledDespesaItem>
          ))}
        </StyledDespesasList>
      )}
    </StyledCard>
  );
}
