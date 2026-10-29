"use client";
import type { CartoesListProps } from "../types/CartoesListTypes";
import { StyledListContainer, StyledFilters, StyledFilterInput, StyledFilterSelect, StyledCleanButton, StyledCardsGrid, StyledCard, StyledCardHeader, StyledCardNome, StyledCardBanco, StyledCardBody, StyledCardInfo, StyledCardLabel, StyledCardValue, StyledCardActions, StyledActionButton, StyledEmpty } from "../styles/CartoesListStyles";

export default function CartoesListComp({ cartoesFiltrados, filtros, data, formatarValor, getBandeiraLabel, getBandeiraCor, getStatusLabel, getStatusCor, formatarLimite, onAtualizarFiltro, onLimparFiltros, onAbrirDetalhe, onAbrirModalEditar, onConfirmarExclusao }: CartoesListProps) {
  return (
    <StyledListContainer>
      <StyledFilters>
        <StyledFilterInput placeholder="Pesquisar..." value={filtros.pesquisa} onChange={e => onAtualizarFiltro("pesquisa", e.target.value)} />
        <StyledFilterSelect value={filtros.bandeira} onChange={e => onAtualizarFiltro("bandeira", e.target.value)}>
          <option value="">Todas</option>
          {data?.bandeiras.map(b => <option key={b} value={b}>{getBandeiraLabel(b as any)}</option>)}
        </StyledFilterSelect>
        <StyledFilterSelect value={filtros.status} onChange={e => onAtualizarFiltro("status", e.target.value)}>
          <option value="">Todos</option>
          <option value="ativo">Ativo</option>
          <option value="bloqueado">Bloqueado</option>
          <option value="cancelado">Cancelado</option>
        </StyledFilterSelect>
        <StyledCleanButton onClick={onLimparFiltros}>Limpar</StyledCleanButton>
      </StyledFilters>
      {cartoesFiltrados.length === 0 ? (
        <StyledEmpty>Nenhum cartao encontrado.</StyledEmpty>
      ) : (
        <StyledCardsGrid>
          {cartoesFiltrados.map(cartao => (
            <StyledCard key={cartao.id} style={{ borderTop: "4px solid " + cartao.cor }}>
              <StyledCardHeader>
                <StyledCardNome>{cartao.nome}</StyledCardNome>
                <StyledCardBanco>{cartao.banco}</StyledCardBanco>
              </StyledCardHeader>
              <StyledCardBody>
                <StyledCardInfo><StyledCardLabel>Limite</StyledCardLabel><StyledCardValue>R$ {formatarLimite(cartao.limiteTotal)}</StyledCardValue></StyledCardInfo>
                <StyledCardInfo><StyledCardLabel>Utilizado</StyledCardLabel><StyledCardValue>R$ {formatarLimite(cartao.limiteUtilizado)}</StyledCardValue></StyledCardInfo>
                <StyledCardInfo><StyledCardLabel>Disponivel</StyledCardLabel><StyledCardValue>R$ {formatarLimite(cartao.limiteTotal - cartao.limiteUtilizado)}</StyledCardValue></StyledCardInfo>
              </StyledCardBody>
              <StyledCardActions>
                <StyledActionButton onClick={() => onAbrirDetalhe(cartao)}>👁️</StyledActionButton>
                <StyledActionButton onClick={() => onAbrirModalEditar(cartao)}>✏️</StyledActionButton>
                <StyledActionButton onClick={() => onConfirmarExclusao(cartao)}>🗑️</StyledActionButton>
              </StyledCardActions>
            </StyledCard>
          ))}
        </StyledCardsGrid>
      )}
    </StyledListContainer>
  );
}
