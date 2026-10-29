'use client';

import type { DespesasListProps } from '../types/DespesasListTypes';
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
  StyledPrioridadeBadge,
  StyledParcelasBadge,
  StyledEmptyState,
  StyledEmptyIcon,
  StyledEmptyTitle,
  StyledEmptyText,
} from '../styles/DespesasListStyles';

export default function DespesasListComp({
  despesasFiltradas,
  filtros,
  data,
  formatarValor,
  formatarData,
  getStatusCor,
  getStatusLabel,
  getPrioridadeCor,
  getPrioridadeLabel,
  onAtualizarFiltro,
  onLimparFiltros,
  onAbrirDetalhe,
  onAbrirModalEditar,
  onConfirmarExclusao,
}: DespesasListProps) {
  const temFiltros = filtros.pesquisa || filtros.categoria || filtros.conta || filtros.status || filtros.prioridade;

  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Lista de Despesas ({despesasFiltradas.length})</StyledCardTitle>
        {temFiltros && (
          <StyledButton $variant="ghost" onClick={onLimparFiltros}>
            Limpar filtros
          </StyledButton>
        )}
      </StyledCardHeader>

      <StyledFilterBar>
        <StyledSearchInput
          type="text"
          placeholder="🔍 Pesquisar despesas..."
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
          value={filtros.conta}
          onChange={e => onAtualizarFiltro('conta', e.target.value)}
        >
          <option value="">Todas contas</option>
          {data.contas.map(conta => (
            <option key={conta} value={conta}>{conta}</option>
          ))}
        </StyledSelect>
        <StyledSelect
          value={filtros.status}
          onChange={e => onAtualizarFiltro('status', e.target.value)}
        >
          <option value="">Todos status</option>
          <option value="pago">Pago</option>
          <option value="pendente">Pendente</option>
          <option value="atrasado">Atrasado</option>
        </StyledSelect>
        <StyledSelect
          value={filtros.prioridade}
          onChange={e => onAtualizarFiltro('prioridade', e.target.value)}
        >
          <option value="">Todas prioridades</option>
          <option value="alta">Alta</option>
          <option value="media">Média</option>
          <option value="baixa">Baixa</option>
        </StyledSelect>
      </StyledFilterBar>

      {despesasFiltradas.length === 0 ? (
        <StyledEmptyState>
          <StyledEmptyIcon>📭</StyledEmptyIcon>
          <StyledEmptyTitle>Nenhuma despesa encontrada</StyledEmptyTitle>
          <StyledEmptyText>
            {temFiltros
              ? 'Tente ajustar os filtros para encontrar despesas.'
              : 'Comece cadastrando sua primeira despesa.'}
          </StyledEmptyText>
        </StyledEmptyState>
      ) : (
        <StyledDespesasList>
          {despesasFiltradas.map(despesa => (
            <StyledDespesaItem key={despesa.id}>
              <StyledDespesaIcon $color={despesa.categoriaCor}>
                {despesa.categoriaIcone}
              </StyledDespesaIcon>
              <StyledDespesaInfo>
                <StyledDespesaName>{despesa.nome}</StyledDespesaName>
                <StyledDespesaMeta>
                  <StyledDespesaCategory>{despesa.categoria}</StyledDespesaCategory>
                  <StyledDespesaAccount>• {despesa.conta}</StyledDespesaAccount>
                  <StyledDespesaDate>• {formatarData(despesa.data)}</StyledDespesaDate>
                  {despesa.parcelas > 1 && (
                    <StyledParcelasBadge>{despesa.parcelas}x</StyledParcelasBadge>
                  )}
                  <StyledPrioridadeBadge $color={getPrioridadeCor(despesa.prioridade)}>
                    {getPrioridadeLabel(despesa.prioridade)}
                  </StyledPrioridadeBadge>
                </StyledDespesaMeta>
              </StyledDespesaInfo>
              <StyledStatusBadge $color={getStatusCor(despesa.status)}>
                {getStatusLabel(despesa.status)}
              </StyledStatusBadge>
              <StyledDespesaValue>R$ {formatarValor(despesa.valor)}</StyledDespesaValue>
              <StyledDespesaActions>
                <StyledIconButton title="Ver detalhes" onClick={() => onAbrirDetalhe(despesa)}>
                  👁️
                </StyledIconButton>
                <StyledIconButton title="Editar" onClick={() => onAbrirModalEditar(despesa)}>
                  ✏️
                </StyledIconButton>
                <StyledIconButton title="Excluir" $color="#ef4444" onClick={() => onConfirmarExclusao(despesa)}>
                  🗑️
                </StyledIconButton>
              </StyledDespesaActions>
            </StyledDespesaItem>
          ))}
        </StyledDespesasList>
      )}
    </StyledCard>
  );
}