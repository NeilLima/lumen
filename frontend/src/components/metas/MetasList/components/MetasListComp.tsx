'use client';
import type { MetasListProps } from '../types/MetasListTypes';
import {
  StyledCard, StyledCardHeader, StyledCardTitle, StyledFilterBar,
  StyledSearchInput, StyledSelect, StyledMetasGrid, StyledMetaCard,
  StyledMetaHeader, StyledMetaIcon, StyledMetaInfo, StyledMetaName,
  StyledMetaCategory, StyledMetaBody, StyledProgressBar, StyledProgressFill,
  StyledProgressText, StyledMetaValues, StyledMetaValue, StyledMetaLabel,
  StyledMetaAmount, StyledMetaDeadline, StyledBadge, StyledMetaActions,
  StyledIconButton, StyledEmptyState, StyledEmptyIcon, StyledEmptyTitle, StyledEmptyText,
} from '../styles/MetasListStyles';

export default function MetasListComp({
  metasFiltradas, filtros, data, formatarValor, formatarData,
  getPrioridadeLabel, getPrioridadeCor, getStatusLabel, getStatusCor, calcularProgresso,
  onAtualizarFiltro, onLimparFiltros, onAbrirDetalhe, onAbrirModalEditar, onConfirmarExclusao,
}: MetasListProps) {
  const temFiltros = filtros.pesquisa || filtros.categoria || filtros.status || filtros.prioridade;
  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Metas ({metasFiltradas.length})</StyledCardTitle>
        {temFiltros && <button onClick={onLimparFiltros} style={{ background: 'none', border: 'none', color: '#8b5cf6', cursor: 'pointer', fontSize: '13px' }}>Limpar filtros</button>}
      </StyledCardHeader>
      <StyledFilterBar>
        <StyledSearchInput type="text" placeholder="🔍 Pesquisar metas..." value={filtros.pesquisa} onChange={e => onAtualizarFiltro('pesquisa', e.target.value)} />
        <StyledSelect value={filtros.categoria} onChange={e => onAtualizarFiltro('categoria', e.target.value)}>
          <option value="">Todas categorias</option>
          {data.categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </StyledSelect>
        <StyledSelect value={filtros.status} onChange={e => onAtualizarFiltro('status', e.target.value)}>
          <option value="">Todos status</option>
          <option value="em_andamento">Em Andamento</option>
          <option value="concluida">Concluída</option>
          <option value="pausada">Pausada</option>
        </StyledSelect>
        <StyledSelect value={filtros.prioridade} onChange={e => onAtualizarFiltro('prioridade', e.target.value)}>
          <option value="">Todas prioridades</option>
          <option value="alta">Alta</option>
          <option value="media">Média</option>
          <option value="baixa">Baixa</option>
        </StyledSelect>
      </StyledFilterBar>
      {metasFiltradas.length === 0 ? (
        <StyledEmptyState>
          <StyledEmptyIcon>🎯</StyledEmptyIcon>
          <StyledEmptyTitle>Nenhuma meta encontrada</StyledEmptyTitle>
          <StyledEmptyText>{temFiltros ? 'Tente ajustar os filtros.' : 'Comece definindo sua primeira meta financeira.'}</StyledEmptyText>
        </StyledEmptyState>
      ) : (
        <StyledMetasGrid>
          {metasFiltradas.map(meta => {
            const progresso = calcularProgresso(meta);
            const progressColor = progresso >= 100 ? '#10b981' : progresso >= 50 ? '#3b82f6' : '#f59e0b';
            return (
              <StyledMetaCard key={meta.id}>
                <StyledMetaHeader>
                  <StyledMetaIcon $color={meta.categoriaCor}>{meta.categoriaIcone}</StyledMetaIcon>
                  <StyledMetaInfo>
                    <StyledMetaName>{meta.nome}</StyledMetaName>
                    <StyledMetaCategory>{meta.categoria}</StyledMetaCategory>
                  </StyledMetaInfo>
                  <StyledBadge $color={getStatusCor(meta.status)}>{getStatusLabel(meta.status)}</StyledBadge>
                </StyledMetaHeader>
                <StyledMetaBody>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <StyledProgressBar style={{ flex: 1 }}>
                      <StyledProgressFill $progresso={progresso} $color={progressColor} />
                    </StyledProgressBar>
                    <StyledProgressText>{progresso}%</StyledProgressText>
                  </div>
                  <StyledMetaValues>
                    <StyledMetaValue>
                      <StyledMetaLabel>Atual</StyledMetaLabel>
                      <StyledMetaAmount>R$ {formatarValor(meta.valorAtual)}</StyledMetaAmount>
                    </StyledMetaValue>
                    <StyledMetaValue style={{ textAlign: 'right' }}>
                      <StyledMetaLabel>Meta</StyledMetaLabel>
                      <StyledMetaAmount>R$ {formatarValor(meta.valorAlvo)}</StyledMetaAmount>
                    </StyledMetaValue>
                  </StyledMetaValues>
                  <StyledMetaDeadline>📅 {formatarData(meta.dataLimite)}</StyledMetaDeadline>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <StyledBadge $color={getPrioridadeCor(meta.prioridade)}>{getPrioridadeLabel(meta.prioridade)}</StyledBadge>
                  </div>
                </StyledMetaBody>
                <StyledMetaActions>
                  <StyledIconButton title="Ver detalhes" onClick={() => onAbrirDetalhe(meta)}>👁️</StyledIconButton>
                  <StyledIconButton title="Editar" onClick={() => onAbrirModalEditar(meta)}>✏️</StyledIconButton>
                  <StyledIconButton title="Excluir" $color="#ef4444" onClick={() => onConfirmarExclusao(meta)}>🗑️</StyledIconButton>
                </StyledMetaActions>
              </StyledMetaCard>
            );
          })}
        </StyledMetasGrid>
      )}
    </StyledCard>
  );
}
