'use client';

import type { RelatoriosListProps } from '../types/RelatoriosListTypes';
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
} from '../styles/RelatoriosListStyles';

export default function RelatoriosListComp({
  relatoriosFiltradas,
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
}: RelatoriosListProps) {
  const temFiltros = filtros.pesquisa || filtros.tipo || filtros.periodo;

  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Lista de Relatórios ({relatoriosFiltradas.length})</StyledCardTitle>
        {temFiltros && (
          <StyledButton $variant="ghost" onClick={onLimparFiltros}>
            Limpar filtros
          </StyledButton>
        )}
      </StyledCardHeader>

      <StyledFilterBar>
        <StyledSearchInput
          type="text"
          placeholder="🔍 Pesquisar relatórios..."
          value={filtros.pesquisa}
          onChange={e => onAtualizarFiltro('pesquisa', e.target.value)}
        />
        <StyledSelect
          value={filtros.tipo}
          onChange={e => onAtualizarFiltro('tipo', e.target.value)}
        >
          <option value="">Todos tipos</option>
          <option value="receitas">Receitas</option>
          <option value="despesas">Despesas</option>
          <option value="fluxo">Fluxo de Caixa</option>
          <option value="patrimonio">Patrimônio</option>
          <option value="cartoes">Cartões</option>
          <option value="investimentos">Investimentos</option>
          <option value="categorias">Categorias</option>
        </StyledSelect>
        <StyledSelect
          value={filtros.periodo}
          onChange={e => onAtualizarFiltro('periodo', e.target.value)}
        >
          <option value="">Todos períodos</option>
          <option value="mensal">Mensal</option>
          <option value="anual">Anual</option>
        </StyledSelect>
      </StyledFilterBar>

      {relatoriosFiltradas.length === 0 ? (
        <StyledEmptyState>
          <StyledEmptyIcon>📭</StyledEmptyIcon>
          <StyledEmptyTitle>Nenhuma relatorio encontrada</StyledEmptyTitle>
          <StyledEmptyText>
            {temFiltros
              ? 'Tente ajustar os filtros para encontrar relatórios.'
              : 'Comece cadastrando sua primeira relatorio.'}
          </StyledEmptyText>
        </StyledEmptyState>
      ) : (
        <StyledGrid>
          {relatoriosFiltradas.map(d => {
            
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
                    <StyledAmount>{formatarData(d.dataInicio)}</StyledAmount>
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
