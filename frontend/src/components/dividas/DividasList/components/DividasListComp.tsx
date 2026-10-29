'use client';

import type { DividasListProps } from '../types/DividasListTypes';
import {
  StyledCard,
  StyledCardHeader,
  StyledCardTitle,
  StyledFilterBar,
  StyledSearchInput,
  StyledSelect,
  StyledDividasGrid,
  StyledDividaItem,
  StyledDividaItemHeader,
  StyledDividaIcon,
  StyledDividaInfo,
  StyledDividaName,
  StyledDividaTipo,
  StyledStatusBadge,
  StyledProgressBar,
  StyledProgressTrack,
  StyledProgressFill,
  StyledProgressPct,
  StyledDividaValues,
  StyledDividaAmount,
  StyledDividaLabel,
  StyledDividaActions,
  StyledButton,
  StyledIconButton,
  StyledEmptyState,
  StyledEmptyIcon,
  StyledEmptyTitle,
  StyledEmptyText,
} from '../styles/DividasListStyles';

export default function DividasListComp({
  dividasFiltradas,
  filtros,
  formatarValor,
  formatarData,
  getSituacaoLabel,
  getSituacaoCor,
  getTipoLabel,
  calcularProgresso,
  onAtualizarFiltro,
  onLimparFiltros,
  onAbrirDetalhe,
  onAbrirModalEditar,
  onConfirmarExclusao,
}: DividasListProps) {
  const temFiltros = filtros.pesquisa || filtros.situacao || filtros.tipo;

  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Lista de Dívidas ({dividasFiltradas.length})</StyledCardTitle>
        {temFiltros && (
          <StyledButton $variant="ghost" onClick={onLimparFiltros}>
            Limpar filtros
          </StyledButton>
        )}
      </StyledCardHeader>

      <StyledFilterBar>
        <StyledSearchInput
          type="text"
          placeholder="🔍 Pesquisar dívidas..."
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
          <option value="pessoa">Pessoa</option>
          <option value="empresa">Empresa</option>
          <option value="banco">Banco</option>
        </StyledSelect>
      </StyledFilterBar>

      {dividasFiltradas.length === 0 ? (
        <StyledEmptyState>
          <StyledEmptyIcon>📭</StyledEmptyIcon>
          <StyledEmptyTitle>Nenhuma dívida encontrada</StyledEmptyTitle>
          <StyledEmptyText>
            {temFiltros
              ? 'Tente ajustar os filtros para encontrar dívidas.'
              : 'Comece cadastrando sua primeira dívida.'}
          </StyledEmptyText>
        </StyledEmptyState>
      ) : (
        <StyledDividasGrid>
          {dividasFiltradas.map(d => {
            const pct = calcularProgresso(d.parcelasPagas, d.parcelas);
            const cor = d.situacao === 'quitada' ? '#10b981' : d.situacao === 'atrasada' ? '#ef4444' : '#3b82f6';
            return (
              <StyledDividaItem key={d.id}>
                <StyledDividaItemHeader>
                  <StyledDividaIcon $color={d.categoriaCor}>
                    {d.categoriaIcone}
                  </StyledDividaIcon>
                  <StyledDividaInfo>
                    <StyledDividaName>{d.nome}</StyledDividaName>
                    <StyledDividaTipo>{getTipoLabel(d.tipo)}</StyledDividaTipo>
                  </StyledDividaInfo>
                  <StyledStatusBadge $color={getSituacaoCor(d.situacao)}>
                    {getSituacaoLabel(d.situacao)}
                  </StyledStatusBadge>
                </StyledDividaItemHeader>

                <StyledProgressBar>
                  <StyledProgressTrack>
                    <StyledProgressFill $pct={pct} $color={cor} />
                  </StyledProgressTrack>
                  <StyledProgressPct>{pct}%</StyledProgressPct>
                </StyledProgressBar>

                <StyledDividaValues>
                  <div>
                    <StyledDividaLabel>Valor</StyledDividaLabel>
                    <StyledDividaAmount>R$ {formatarValor(d.valor)}</StyledDividaAmount>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <StyledDividaLabel>Vencimento</StyledDividaLabel>
                    <StyledDividaAmount>{formatarData(d.dataVencimento)}</StyledDividaAmount>
                  </div>
                </StyledDividaValues>

                <StyledDividaActions>
                  <StyledIconButton title="Ver detalhes" onClick={() => onAbrirDetalhe(d)}>
                    👁️
                  </StyledIconButton>
                  <StyledIconButton title="Editar" onClick={() => onAbrirModalEditar(d)}>
                    ✏️
                  </StyledIconButton>
                  <StyledIconButton title="Excluir" $color="#ef4444" onClick={() => onConfirmarExclusao(d)}>
                    🗑️
                  </StyledIconButton>
                </StyledDividaActions>
              </StyledDividaItem>
            );
          })}
        </StyledDividasGrid>
      )}
    </StyledCard>
  );
}