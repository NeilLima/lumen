'use client';

import type { TransferenciasListProps } from '../types/TransferenciasListTypes';
import {
  StyledCard,
  StyledCardHeader,
  StyledCardTitle,
  StyledFilterBar,
  StyledSearchInput,
  StyledSelect,
  StyledDateInput,
  StyledTransferenciasList,
  StyledTransferenciaItem,
  StyledTransferenciaIcon,
  StyledTransferenciaInfo,
  StyledTransferenciaName,
  StyledTransferenciaMeta,
  StyledTransferenciaConta,
  StyledTransferenciaDate,
  StyledTransferenciaValue,
  StyledTransferenciaActions,
  StyledButton,
  StyledIconButton,
  StyledEmptyState,
  StyledEmptyIcon,
  StyledEmptyTitle,
  StyledEmptyText,
} from '../styles/TransferenciasListStyles';

export default function TransferenciasListComp({
  transferenciasFiltradas,
  filtros,
  data,
  formatarValor,
  formatarData,
  onAtualizarFiltro,
  onLimparFiltros,
  onAbrirDetalhe,
  onAbrirModalEditar,
  onConfirmarExclusao,
}: TransferenciasListProps) {
  const temFiltros = filtros.pesquisa || filtros.contaOrigem || filtros.contaDestino || filtros.dataInicio || filtros.dataFim;

  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Lista de Transferências ({transferenciasFiltradas.length})</StyledCardTitle>
        {temFiltros && (
          <StyledButton $variant="ghost" onClick={onLimparFiltros}>
            Limpar filtros
          </StyledButton>
        )}
      </StyledCardHeader>

      <StyledFilterBar>
        <StyledSearchInput
          type="text"
          placeholder="🔍 Pesquisar transferências..."
          value={filtros.pesquisa}
          onChange={e => onAtualizarFiltro('pesquisa', e.target.value)}
        />
        <StyledSelect
          value={filtros.contaOrigem}
          onChange={e => onAtualizarFiltro('contaOrigem', e.target.value)}
        >
          <option value="">Todas origens</option>
          {data.contas.map(conta => (
            <option key={conta} value={conta}>{conta}</option>
          ))}
        </StyledSelect>
        <StyledSelect
          value={filtros.contaDestino}
          onChange={e => onAtualizarFiltro('contaDestino', e.target.value)}
        >
          <option value="">Todas destinos</option>
          {data.contas.map(conta => (
            <option key={conta} value={conta}>{conta}</option>
          ))}
        </StyledSelect>
        <StyledDateInput
          type="date"
          value={filtros.dataInicio}
          onChange={e => onAtualizarFiltro('dataInicio', e.target.value)}
        />
        <StyledDateInput
          type="date"
          value={filtros.dataFim}
          onChange={e => onAtualizarFiltro('dataFim', e.target.value)}
        />
      </StyledFilterBar>

      {transferenciasFiltradas.length === 0 ? (
        <StyledEmptyState>
          <StyledEmptyIcon>📭</StyledEmptyIcon>
          <StyledEmptyTitle>Nenhuma transferência encontrada</StyledEmptyTitle>
          <StyledEmptyText>
            {temFiltros
              ? 'Tente ajustar os filtros para encontrar transferências.'
              : 'Comece cadastrando sua primeira transferência.'}
          </StyledEmptyText>
        </StyledEmptyState>
      ) : (
        <StyledTransferenciasList>
          {transferenciasFiltradas.map(t => (
            <StyledTransferenciaItem key={t.id}>
              <StyledTransferenciaIcon>↔️</StyledTransferenciaIcon>
              <StyledTransferenciaInfo>
                <StyledTransferenciaName>{t.descricao}</StyledTransferenciaName>
                <StyledTransferenciaMeta>
                  <StyledTransferenciaConta>{t.contaOrigem}</StyledTransferenciaConta>
                  <span>→</span>
                  <StyledTransferenciaConta>{t.contaDestino}</StyledTransferenciaConta>
                  <StyledTransferenciaDate>• {formatarData(t.data)}</StyledTransferenciaDate>
                </StyledTransferenciaMeta>
              </StyledTransferenciaInfo>
              <StyledTransferenciaValue>R$ {formatarValor(t.valor)}</StyledTransferenciaValue>
              <StyledTransferenciaActions>
                <StyledIconButton title="Ver detalhes" onClick={() => onAbrirDetalhe(t)}>
                  👁️
                </StyledIconButton>
                <StyledIconButton title="Editar" onClick={() => onAbrirModalEditar(t)}>
                  ✏️
                </StyledIconButton>
                <StyledIconButton title="Excluir" $color="#ef4444" onClick={() => onConfirmarExclusao(t)}>
                  🗑️
                </StyledIconButton>
              </StyledTransferenciaActions>
            </StyledTransferenciaItem>
          ))}
        </StyledTransferenciasList>
      )}
    </StyledCard>
  );
}
