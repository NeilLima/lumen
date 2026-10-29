'use client';
import type { TransferenciasListProps } from '../types/TransferenciasListTypes';
import { StyledListContainer, StyledFilters, StyledFilterInput, StyledFilterSelect, StyledCleanButton, StyledTable, StyledTh, StyledTd, StyledActionButton, StyledEmpty } from '../styles/TransferenciasListStyles';
export default function TransferenciasListComp({ transferenciasFiltradas, filtros, data, formatarValor, formatarData, onAtualizarFiltro, onLimparFiltros, onAbrirDetalhe, onAbrirModalEditar, onConfirmarExclusao }: TransferenciasListProps) {
  return <StyledListContainer>
    <StyledFilters>
      <StyledFilterInput placeholder="Pesquisar..." value={filtros.pesquisa} onChange={e => onAtualizarFiltro('pesquisa', e.target.value)} />
      <StyledFilterSelect value={filtros.contaOrigem} onChange={e => onAtualizarFiltro('contaOrigem', e.target.value)}>
        <option value="">Origem</option>{data?.contas.map(c => <option key={c} value={c}>{c}</option>)}
      </StyledFilterSelect>
      <StyledFilterSelect value={filtros.contaDestino} onChange={e => onAtualizarFiltro('contaDestino', e.target.value)}>
        <option value="">Destino</option>{data?.contas.map(c => <option key={c} value={c}>{c}</option>)}
      </StyledFilterSelect>
      <StyledCleanButton onClick={onLimparFiltros}>Limpar</StyledCleanButton>
    </StyledFilters>
    {transferenciasFiltradas.length === 0 ? <StyledEmpty>Nenhuma transferência encontrada.</StyledEmpty> : (
      <StyledTable>
        <thead><tr><StyledTh>Descrição</StyledTh><StyledTh>Valor</StyledTh><StyledTh>Origem</StyledTh><StyledTh>Destino</StyledTh><StyledTh>Data</StyledTh><StyledTh>Ações</StyledTh></tr></thead>
        <tbody>{transferenciasFiltradas.map(t => <tr key={t.id}>
          <StyledTd>{t.descricao}</StyledTd>
          <StyledTd style={{ color: '#10b981', fontWeight: 600 }}>R$ {formatarValor(t.valor)}</StyledTd>
          <StyledTd>{t.contaOrigem}</StyledTd>
          <StyledTd>{t.contaDestino}</StyledTd>
          <StyledTd>{formatarData(t.data)}</StyledTd>
          <StyledTd><StyledActionButton onClick={() => onAbrirDetalhe(t)} title="Detalhes">👁️</StyledActionButton><StyledActionButton onClick={() => onAbrirModalEditar(t)} title="Editar">✏️</StyledActionButton><StyledActionButton onClick={() => onConfirmarExclusao(t)} title="Excluir">🗑️</StyledActionButton></StyledTd>
        </tr>)}</tbody>
      </StyledTable>
    )}
  </StyledListContainer>;
}
