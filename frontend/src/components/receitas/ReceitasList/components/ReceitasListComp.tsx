'use client';

import type { ReceitasListProps } from '../types/ReceitasListTypes';
import {
  StyledCard,
  StyledCardHeader,
  StyledCardTitle,
  StyledFilterBar,
  StyledSearchInput,
  StyledSelect,
  StyledReceitasList,
  StyledReceitaItem,
  StyledReceitaIcon,
  StyledReceitaInfo,
  StyledReceitaName,
  StyledReceitaMeta,
  StyledReceitaCategory,
  StyledReceitaAccount,
  StyledReceitaDate,
  StyledReceitaValue,
  StyledReceitaActions,
  StyledButton,
  StyledIconButton,
  StyledStatusBadge,
  StyledRecorrenciaBadge,
  StyledEmptyState,
  StyledEmptyIcon,
  StyledEmptyTitle,
  StyledEmptyText,
} from '../styles/ReceitasListStyles';

export default function ReceitasListComp({
  receitasFiltradas,
  filtros,
  data,
  formatarValor,
  formatarData,
  getStatusCor,
  getStatusLabel,
  getRecorrenciaLabel,
  onAtualizarFiltro,
  onLimparFiltros,
  onAbrirDetalhe,
  onAbrirModalEditar,
  onConfirmarExclusao,
}: ReceitasListProps) {
  const temFiltros = filtros.pesquisa || filtros.categoria || filtros.conta || filtros.status;

  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Lista de Receitas ({receitasFiltradas.length})</StyledCardTitle>
        {temFiltros && (
          <StyledButton
            $variant="ghost"
            onClick={onLimparFiltros}
            data-testid="receitas-limpar-filtros"
          >
            Limpar filtros
          </StyledButton>
        )}
      </StyledCardHeader>

      <StyledFilterBar>
        <StyledSearchInput
          type="text"
          placeholder="🔍 Pesquisar receitas..."
          value={filtros.pesquisa}
          onChange={e => onAtualizarFiltro('pesquisa', e.target.value)}
          data-testid="receitas-busca"
        />
        <StyledSelect
          value={filtros.categoria}
          onChange={e => onAtualizarFiltro('categoria', e.target.value)}
          data-testid="receitas-filtro-categoria"
        >
          <option value="">Todas categorias</option>
          {data.categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </StyledSelect>
        <StyledSelect
          value={filtros.conta}
          onChange={e => onAtualizarFiltro('conta', e.target.value)}
          data-testid="receitas-filtro-conta"
        >
          <option value="">Todas contas</option>
          {data.contas.map(conta => (
            <option key={conta} value={conta}>{conta}</option>
          ))}
        </StyledSelect>
        <StyledSelect
          value={filtros.status}
          onChange={e => onAtualizarFiltro('status', e.target.value)}
          data-testid="receitas-filtro-status"
        >
          <option value="">Todos status</option>
          <option value="recebido">Recebido</option>
          <option value="pendente">Pendente</option>
          <option value="atrasado">Atrasado</option>
        </StyledSelect>
      </StyledFilterBar>

      {receitasFiltradas.length === 0 ? (
        <StyledEmptyState>
          <StyledEmptyIcon>📭</StyledEmptyIcon>
          <StyledEmptyTitle>Nenhuma receita encontrada</StyledEmptyTitle>
          <StyledEmptyText>
            {temFiltros
              ? 'Tente ajustar os filtros para encontrar receitas.'
              : 'Comece cadastrando sua primeira receita.'}
          </StyledEmptyText>
        </StyledEmptyState>
      ) : (
        <StyledReceitasList>
          {receitasFiltradas.map(receita => (
            <StyledReceitaItem key={receita.id}>
              <StyledReceitaIcon $color={receita.categoriaCor}>
                {receita.categoriaIcone}
              </StyledReceitaIcon>
              <StyledReceitaInfo>
                <StyledReceitaName data-testid={`receitas-item-nome-${receita.id}`}>
                  {receita.nome}
                </StyledReceitaName>
                <StyledReceitaMeta>
                  <StyledReceitaCategory>{receita.categoria}</StyledReceitaCategory>
                  <StyledReceitaAccount>• {receita.conta}</StyledReceitaAccount>
                  <StyledReceitaDate>• {formatarData(receita.data)}</StyledReceitaDate>
                  <StyledRecorrenciaBadge>{getRecorrenciaLabel(receita.recorrencia)}</StyledRecorrenciaBadge>
                </StyledReceitaMeta>
              </StyledReceitaInfo>
              <StyledStatusBadge $color={getStatusCor(receita.status)}>
                {getStatusLabel(receita.status)}
              </StyledStatusBadge>
              <StyledReceitaValue>R$ {formatarValor(receita.valor)}</StyledReceitaValue>
              <StyledReceitaActions>
                <StyledIconButton
                  title="Ver detalhes"
                  onClick={() => onAbrirDetalhe(receita)}
                  data-testid={`receitas-detalhes-${receita.id}`}
                >
                  👁️
                </StyledIconButton>
                <StyledIconButton
                  title="Editar"
                  onClick={() => onAbrirModalEditar(receita)}
                  data-testid={`receitas-editar-${receita.id}`}
                >
                  ✏️
                </StyledIconButton>
                <StyledIconButton
                  title="Excluir"
                  $color="#ef4444"
                  onClick={() => onConfirmarExclusao(receita)}
                  data-testid={`receitas-excluir-${receita.id}`}
                >
                  🗑️
                </StyledIconButton>
              </StyledReceitaActions>
            </StyledReceitaItem>
          ))}
        </StyledReceitasList>
      )}
    </StyledCard>
  );
}