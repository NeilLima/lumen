'use client';

import type { CartoesListProps } from '../types/CartoesListTypes';
import {
  StyledCard,
  StyledCardHeader,
  StyledCardTitle,
  StyledFilterBar,
  StyledSearchInput,
  StyledSelect,
  StyledButton,
  StyledEmptyState,
  StyledEmptyIcon,
  StyledEmptyTitle,
  StyledEmptyText,
} from '../styles/CartoesListStyles';

export default function CartoesListComp({
  cartoesFiltrados,
  filtros,
  data,
  formatarValor,
  getBandeiraLabel,
  getStatusLabel,
  formatarLimite,
  onAtualizarFiltro,
  onLimparFiltros,
  onAbrirDetalhe,
  onAbrirModalEditar,
  onConfirmarExclusao,
}: CartoesListProps) {
  const temFiltros = filtros.pesquisa || filtros.bandeira || filtros.status;

  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Lista de Cartões ({cartoesFiltrados.length})</StyledCardTitle>
        {temFiltros && (
          <StyledButton $variant="ghost" onClick={onLimparFiltros}>
            Limpar filtros
          </StyledButton>
        )}
      </StyledCardHeader>

      <StyledFilterBar>
        <StyledSearchInput
          type="text"
          placeholder="🔍 Pesquisar cartões..."
          value={filtros.pesquisa}
          onChange={e => onAtualizarFiltro('pesquisa', e.target.value)}
        />
        <StyledSelect
          value={filtros.bandeira}
          onChange={e => onAtualizarFiltro('bandeira', e.target.value)}
        >
          <option value="">Todas bandeiras</option>
          {data?.bandeiras.map(b => (
            <option key={b} value={b}>{getBandeiraLabel(b as any)}</option>
          ))}
        </StyledSelect>
        <StyledSelect
          value={filtros.status}
          onChange={e => onAtualizarFiltro('status', e.target.value)}
        >
          <option value="">Todos status</option>
          <option value="ativo">Ativo</option>
          <option value="bloqueado">Bloqueado</option>
          <option value="cancelado">Cancelado</option>
        </StyledSelect>
      </StyledFilterBar>

      {cartoesFiltrados.length === 0 ? (
        <StyledEmptyState>
          <StyledEmptyIcon>📭</StyledEmptyIcon>
          <StyledEmptyTitle>Nenhum cartão encontrado</StyledEmptyTitle>
          <StyledEmptyText>
            {temFiltros
              ? 'Tente ajustar os filtros para encontrar cartões.'
              : 'Comece cadastrando seu primeiro cartão.'}
          </StyledEmptyText>
        </StyledEmptyState>
      ) : (
        <div style={{ marginTop: '20px' }}>
          {cartoesFiltrados.map(cartao => (
            <StyledCard key={cartao.id} style={{ borderTop: "4px solid " + cartao.cor }}>
              <StyledCardHeader>
                <StyledCardNome>{cartao.nome}</StyledCardNome>
                <span style={{ color: '#a0a0b0', fontSize: '13px', marginLeft: '12px' }}>{cartao.banco}</span>
              </StyledCardHeader>
              <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', color: '#a0a0b0' }}>Limite</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>R$ {formatarLimite(cartao.limiteTotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', color: '#a0a0b0' }}>Utilizado</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>R$ {formatarLimite(cartao.limiteUtilizado)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', color: '#a0a0b0' }}>Disponível</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>R$ {formatarLimite(cartao.limiteTotal - cartao.limiteUtilizado)}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <button
                  onClick={() => onAbrirDetalhe(cartao)}
                  style={{
                    width: '32px', height: '32px', border: 'none', borderRadius: '8px',
                    background: 'rgba(139,92,246,0.1)', cursor: 'pointer', fontSize: '16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 200ms ease',
                    '&:hover': { background: 'rgba(139,92,246,0.2)' }
                  }}
                  title="Ver detalhes">
                  👁️
                </button>
                <button
                  onClick={() => onAbrirModalEditar(cartao)}
                  style={{
                    width: '32px', height: '32px', border: 'none', borderRadius: '8px',
                    background: 'rgba(139,92,246,0.1)', cursor: 'pointer', fontSize: '16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 200ms ease',
                    '&:hover': { background: 'rgba(139,92,246,0.2)' }
                  }}
                  title="Editar">
                  ✏️
                </button>
                <button
                  onClick={() => onConfirmarExclusao(cartao)}
                  style={{
                    width: '32px', height: '32px', border: 'none', borderRadius: '8px',
                    background: 'rgba(239,68,68,0.1)', color: '#ef4444', cursor: 'pointer', fontSize: '16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 200ms ease',
                    '&:hover': { background: 'rgba(239,68,68,0.2)' }
                  }}
                  title="Excluir">
                  🗑️
                </button>
              </div>
            </StyledCard>
          ))}
        </div>
      )}
    </StyledCard>
  );
}