'use client';
import type { ContasListProps } from '../types/ContasListTypes';
import { StyledListContainer, StyledFilters, StyledFilterInput, StyledFilterSelect, StyledCleanButton, StyledCardsGrid, StyledCard, StyledCardHeader, StyledCardIcon, StyledCardNome, StyledCardBanco, StyledCardBody, StyledCardSaldo, StyledCardTipo, StyledCardActions, StyledActionButton, StyledEmpty } from '../styles/ContasListStyles';
export default function ContasListComp({ contasFiltradas, filtros, data, formatarValor, getTipoLabel, onAtualizarFiltro, onLimparFiltros, onAbrirDetalhe, onAbrirModalEditar, onConfirmarExclusao }: ContasListProps) {
  return <StyledListContainer><StyledFilters>
    <StyledFilterInput placeholder="Pesquisar..." value={filtros.pesquisa} onChange={e => onAtualizarFiltro('pesquisa', e.target.value)} data-testid="contas-busca" />
    <StyledFilterSelect value={filtros.tipo} onChange={e => onAtualizarFiltro('tipo', e.target.value)} data-testid="contas-filtro-tipo"><option value="">Todos os tipos</option><option value="corrente">Corrente</option><option value="poupanca">Poupança</option><option value="carteira">Carteira</option><option value="digital">Digital</option></StyledFilterSelect>
    <StyledFilterSelect value={filtros.status} onChange={e => onAtualizarFiltro('status', e.target.value)} data-testid="contas-filtro-status"><option value="">Todos status</option><option value="ativa">Ativa</option><option value="inativa">Inativa</option></StyledFilterSelect>
    <StyledCleanButton onClick={onLimparFiltros} data-testid="contas-limpar-filtros">Limpar</StyledCleanButton>
  </StyledFilters>
  {contasFiltradas.length === 0 ? <StyledEmpty>Nenhuma conta encontrada.</StyledEmpty> : (
    <StyledCardsGrid>{contasFiltradas.map(c => (
      <StyledCard key={c.id} style={{ borderTop: `4px solid ${c.cor}` }}>
        <StyledCardHeader><StyledCardIcon>{c.icone}</StyledCardIcon><div><StyledCardNome data-testid={`contas-item-nome-${c.id}`}>{c.nome}</StyledCardNome><StyledCardBanco>{c.banco}</StyledCardBanco></div></StyledCardHeader>
        <StyledCardBody><StyledCardSaldo>R$ {formatarValor(c.saldo)}</StyledCardSaldo><StyledCardTipo>{getTipoLabel(c.tipo)}</StyledCardTipo></StyledCardBody>
        <StyledCardActions><StyledActionButton onClick={() => onAbrirDetalhe(c)} data-testid={`contas-detalhes-${c.id}`}>👁️</StyledActionButton><StyledActionButton onClick={() => onAbrirModalEditar(c)} data-testid={`contas-editar-${c.id}`}>✏️</StyledActionButton><StyledActionButton onClick={() => onConfirmarExclusao(c)} data-testid={`contas-excluir-${c.id}`}>🗑️</StyledActionButton></StyledCardActions>
      </StyledCard>
    ))}</StyledCardsGrid>
  )}</StyledListContainer>;
}
