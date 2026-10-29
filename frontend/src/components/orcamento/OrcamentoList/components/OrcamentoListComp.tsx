'use client';
import type { OrcamentoListProps } from '../types/OrcamentoListTypes';
import {
  StyledCard, StyledCardHeader, StyledCardTitle, StyledFilterBar, StyledInput, StyledSelect,
  StyledGrid, StyledItem, StyledItemHeader, StyledIcon, StyledInfo, StyledName, StyledBadge,
  StyledProgressBar, StyledProgressFill, StyledProgressText, StyledValues, StyledAmount, StyledLabel,
  StyledActions, StyledIconButton, StyledEmpty, StyledEmptyIcon, StyledEmptyTitle, StyledEmptyText,
} from '../styles/OrcamentoListStyles';

export default function OrcamentoListComp({
  categoriasFiltradas, filtros, data, formatarValor, getStatusLabel, getStatusCor, calcularPercentual,
  onAtualizarFiltro, onLimparFiltros, onAbrirDetalhe, onAbrirModalEditar, onConfirmarExclusao,
}: OrcamentoListProps) {
  const temFiltros = filtros.pesquisa || filtros.status || filtros.mes;
  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Categorias ({categoriasFiltradas.length})</StyledCardTitle>
        {temFiltros && <button onClick={onLimparFiltros} style={{ background: 'none', border: 'none', color: '#8b5cf6', cursor: 'pointer', fontSize: '13px' }}>Limpar filtros</button>}
      </StyledCardHeader>
      <StyledFilterBar>
        <StyledInput type="text" placeholder="🔍 Pesquisar..." value={filtros.pesquisa} onChange={e => onAtualizarFiltro('pesquisa', e.target.value)} />
        <StyledSelect value={filtros.status} onChange={e => onAtualizarFiltro('status', e.target.value)}>
          <option value="">Todos status</option>
          <option value="dentro">Dentro</option>
          <option value="atencao">Atenção</option>
          <option value="estourado">Estourado</option>
        </StyledSelect>
        <StyledSelect value={filtros.mes} onChange={e => onAtualizarFiltro('mes', e.target.value)}>
          <option value="">Todos meses</option>
          {data.meses.map((mes, i) => <option key={i} value={String(i + 1)}>{mes}</option>)}
        </StyledSelect>
      </StyledFilterBar>
      {categoriasFiltradas.length === 0 ? (
        <StyledEmpty><StyledEmptyIcon>📊</StyledEmptyIcon><StyledEmptyTitle>Nenhuma categoria encontrada</StyledEmptyTitle><StyledEmptyText>{temFiltros ? 'Tente ajustar os filtros.' : 'Adicione limites para suas categorias.'}</StyledEmptyText></StyledEmpty>
      ) : (
        <StyledGrid>
          {categoriasFiltradas.map(cat => {
            const pct = calcularPercentual(cat.gasto, cat.limite);
            const cor = pct > 90 ? '#ef4444' : pct > 70 ? '#f59e0b' : '#10b981';
            return (
              <StyledItem key={cat.id}>
                <StyledItemHeader>
                  <StyledIcon $color={cat.categoriaCor}>{cat.categoriaIcone}</StyledIcon>
                  <StyledInfo><StyledName>{cat.categoria}</StyledName></StyledInfo>
                  <StyledBadge $color={getStatusCor(cat.status)}>{getStatusLabel(cat.status)}</StyledBadge>
                </StyledItemHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <StyledProgressBar style={{ flex: 1 }}><StyledProgressFill $percentual={pct} $color={cor} /></StyledProgressBar>
                  <StyledProgressText>{pct}%</StyledProgressText>
                </div>
                <StyledValues>
                  <div><StyledLabel>Gasto</StyledLabel><StyledAmount>R$ {formatarValor(cat.gasto)}</StyledAmount></div>
                  <div style={{ textAlign: 'right' }}><StyledLabel>Limite</StyledLabel><StyledAmount>R$ {formatarValor(cat.limite)}</StyledAmount></div>
                </StyledValues>
                <StyledActions>
                  <StyledIconButton title="Detalhes" onClick={() => onAbrirDetalhe(cat)}>👁️</StyledIconButton>
                  <StyledIconButton title="Editar" onClick={() => onAbrirModalEditar(cat)}>✏️</StyledIconButton>
                  <StyledIconButton title="Excluir" $color="#ef4444" onClick={() => onConfirmarExclusao(cat)}>🗑️</StyledIconButton>
                </StyledActions>
              </StyledItem>
            );
          })}
        </StyledGrid>
      )}
    </StyledCard>
  );
}
