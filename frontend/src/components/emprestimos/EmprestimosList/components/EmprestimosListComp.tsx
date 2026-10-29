'use client';

import type { EmprestimosListProps } from '../types/EmprestimosListTypes';
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
  StyledProgressBar,
  StyledProgressTrack,
  StyledProgressFill,
  StyledProgressPct,
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
} from '../styles/EmprestimosListStyles';

export default function EmprestimosListComp({
  emprestimosFiltradas,
  filtros,
  formatarValor,
  formatarData,
  getStatusLabel,
  getStatusCor,
  calcularProgresso,
  onAtualizarFiltro,
  onLimparFiltros,
  onAbrirDetalhe,
  onAbrirModalEditar,
  onConfirmarExclusao,
}: EmprestimosListProps) {
  const temFiltros = filtros.pesquisa || filtros.situacao || filtros.tipo;

  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Lista de Empréstimos ({emprestimosFiltradas.length})</StyledCardTitle>
        {temFiltros && (
          <StyledButton $variant="ghost" onClick={onLimparFiltros}>
            Limpar filtros
          </StyledButton>
        )}
      </StyledCardHeader>

      <StyledFilterBar>
        <StyledSearchInput
          type="text"
          placeholder="🔍 Pesquisar empréstimos..."
          value={filtros.pesquisa}
          onChange={e => onAtualizarFiltro('pesquisa', e.target.value)}
        />
        <StyledSelect
          value={filtros.situacao}
          onChange={e => onAtualizarFiltro('situacao', e.target.value)}
        >
          <option value="">Todas situações</option>
          <option value="em_dia">Em Dia</option>
          <option value="atrasada">Atrasada</option>
          <option value="quitada">Quitada</option>
        </StyledSelect>
        <StyledSelect
          value={filtros.tipo}
          onChange={e => onAtualizarFiltro('tipo', e.target.value)}
        >
          <option value="">Todos tipos</option>
          <option value="feito">Feito por mim</option>
          <option value="recebido">Recebido por mim</option>
        </StyledSelect>
      </StyledFilterBar>

      {emprestimosFiltradas.length === 0 ? (
        <StyledEmptyState>
          <StyledEmptyIcon>📭</StyledEmptyIcon>
          <StyledEmptyTitle>Nenhuma emprestimo encontrada</StyledEmptyTitle>
          <StyledEmptyText>
            {temFiltros
              ? 'Tente ajustar os filtros para encontrar empréstimos.'
              : 'Comece cadastrando sua primeira emprestimo.'}
          </StyledEmptyText>
        </StyledEmptyState>
      ) : (
        <StyledGrid>
          {emprestimosFiltradas.map(d => {
            const pct = calcularProgresso(d.parcelasPagas, d.parcelas);
            const cor = d.situacao === 'quitada' ? '#10b981' : d.situacao === 'atrasada' ? '#ef4444' : '#3b82f6';
            return (
              <StyledItem key={d.id}>
                <StyledItemHeader>
                  <StyledIcon $color={d.categoriaCor}>
                    {d.categoriaIcone}
                  </StyledIcon>
                  <StyledInfo>
                    <StyledName>{d.nome}</StyledName>
                    <StyledSub>{getStatusLabel(d.situacao)}</StyledSub>
                  </StyledInfo>
                  <StyledStatusBadge $color={getStatusCor(d.situacao)}>
                    {getStatusLabel(d.situacao)}
                  </StyledStatusBadge>
                </StyledItemHeader>

                <StyledProgressBar>
                  <StyledProgressTrack>
                    <StyledProgressFill $pct={pct} $color={cor} />
                  </StyledProgressTrack>
                  <StyledProgressPct>{pct}%</StyledProgressPct>
                </StyledProgressBar>

                <StyledValues>
                  <div>
                    <StyledLabel>Valor</StyledLabel>
                    <StyledAmount>R$ {formatarValor(d.valor)}</StyledAmount>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <StyledLabel>Data</StyledLabel>
                    <StyledAmount>{formatarData(d.dataVencimento)}</StyledAmount>
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
