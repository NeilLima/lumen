'use client';

import type { AssinaturasListProps } from '../types/AssinaturasListTypes';
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
} from '../styles/AssinaturasListStyles';

export default function AssinaturasListComp({
  assinaturasFiltradas,
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
}: AssinaturasListProps) {
  const temFiltros = filtros.pesquisa || filtros.categoria || filtros.status;

  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Lista de Assinaturas ({assinaturasFiltradas.length})</StyledCardTitle>
        {temFiltros && (
          <StyledButton $variant="ghost" onClick={onLimparFiltros}>
            Limpar filtros
          </StyledButton>
        )}
      </StyledCardHeader>

      <StyledFilterBar>
        <StyledSearchInput
          type="text"
          placeholder="🔍 Pesquisar assinaturas..."
          value={filtros.pesquisa}
          onChange={e => onAtualizarFiltro('pesquisa', e.target.value)}
        />
        <StyledSelect
          value={filtros.categoria}
          onChange={e => onAtualizarFiltro('categoria', e.target.value)}
        >
          <option value="">Todas categorias</option>
          <option value="Streaming">Streaming</option>
          <option value="Música">Música</option>
          <option value="Produtividade">Produtividade</option>
          <option value="Saúde">Saúde</option>
          <option value="Internet">Internet</option>
          <option value="Telefone">Telefone</option>
          <option value="Outros">Outros</option>
        </StyledSelect>
        <StyledSelect
          value={filtros.status}
          onChange={e => onAtualizarFiltro('status', e.target.value)}
        >
          <option value="">Todos status</option>
          <option value="ativa">Ativa</option>
          <option value="pausada">Pausada</option>
          <option value="cancelada">Cancelada</option>
        </StyledSelect>
      </StyledFilterBar>

      {assinaturasFiltradas.length === 0 ? (
        <StyledEmptyState>
          <StyledEmptyIcon>📭</StyledEmptyIcon>
          <StyledEmptyTitle>Nenhuma assinatura encontrada</StyledEmptyTitle>
          <StyledEmptyText>
            {temFiltros
              ? 'Tente ajustar os filtros para encontrar assinaturas.'
              : 'Comece cadastrando sua primeira assinatura.'}
          </StyledEmptyText>
        </StyledEmptyState>
      ) : (
        <StyledGrid>
          {assinaturasFiltradas.map(d => {
            
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
                    <StyledAmount>{formatarData(d.proximaCobranca)}</StyledAmount>
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
