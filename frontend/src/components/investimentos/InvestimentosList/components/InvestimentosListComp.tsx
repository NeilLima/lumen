'use client';

import type { InvestimentosListProps } from '../types/InvestimentosListTypes';
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
} from '../styles/InvestimentosListStyles';

export default function InvestimentosListComp({
  investimentosFiltradas,
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
}: InvestimentosListProps) {
  const temFiltros = filtros.pesquisa || filtros.tipo || filtros.status;

  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Lista de Investimentos ({investimentosFiltradas.length})</StyledCardTitle>
        {temFiltros && (
          <StyledButton $variant="ghost" onClick={onLimparFiltros}>
            Limpar filtros
          </StyledButton>
        )}
      </StyledCardHeader>

      <StyledFilterBar>
        <StyledSearchInput
          type="text"
          placeholder="🔍 Pesquisar investimentos..."
          value={filtros.pesquisa}
          onChange={e => onAtualizarFiltro('pesquisa', e.target.value)}
        />
        <StyledSelect
          value={filtros.tipo}
          onChange={e => onAtualizarFiltro('tipo', e.target.value)}
        >
          <option value="">Todos tipos</option>
          <option value="cdb">CDB</option>
          <option value="tesouro">Tesouro</option>
          <option value="acoes">Ações</option>
          <option value="fundos">Fundos</option>
          <option value="cripto">Criptomoedas</option>
        </StyledSelect>
        <StyledSelect
          value={filtros.status}
          onChange={e => onAtualizarFiltro('status', e.target.value)}
        >
          <option value="">Todos status</option>
          <option value="ativo">Ativo</option>
          <option value="resgatado">Resgatado</option>
          <option value="perda">Perda</option>
        </StyledSelect>
      </StyledFilterBar>

      {investimentosFiltradas.length === 0 ? (
        <StyledEmptyState>
          <StyledEmptyIcon>📭</StyledEmptyIcon>
          <StyledEmptyTitle>Nenhuma investimento encontrada</StyledEmptyTitle>
          <StyledEmptyText>
            {temFiltros
              ? 'Tente ajustar os filtros para encontrar investimentos.'
              : 'Comece cadastrando sua primeira investimento.'}
          </StyledEmptyText>
        </StyledEmptyState>
      ) : (
        <StyledGrid>
          {investimentosFiltradas.map(d => {
            
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
                    <StyledAmount>R$ {formatarValor(d.valorAtual)}</StyledAmount>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <StyledLabel>Data</StyledLabel>
                    <StyledAmount>{formatarData(d.dataAplicacao)}</StyledAmount>
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
