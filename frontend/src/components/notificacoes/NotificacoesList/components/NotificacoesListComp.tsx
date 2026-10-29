'use client';

import { useState } from 'react';
import type { NotificacoesListProps } from '../types/NotificacoesListTypes';
import {
  StyledNotifPanel,
  StyledNotifHeader,
  StyledNotifTitle,
  StyledNotifSubtitle,
  StyledNotifStats,
  StyledStatCard,
  StyledStatIcon,
  StyledStatContent,
  StyledStatValue,
  StyledStatLabel,
  StyledNotifActions,
  StyledNotifSearch,
  StyledNotifFilterSelect,
  StyledMarkAllBtn,
  StyledNotifFeed,
  StyledNotifItem,
  StyledNotifIcon,
  StyledNotifContent,
  StyledNotifItemTitle,
  StyledUnreadDot,
  StyledNotifMessage,
  StyledNotifMeta,
  StyledNotifTime,
  StyledNotifTypeBadge,
  StyledNotifStatus,
  StyledNotifItemActions,
  StyledNotifActionBtn,
  StyledEmptyState,
  StyledEmptyIcon,
  StyledEmptyTitle,
  StyledEmptyText,
} from '../styles/NotificacoesListStyles';

type FilterType = 'todas' | 'nao_lidas' | 'lidas' | 'arquivadas';

export default function NotificacoesListComp({
  notificacoesFiltradas,
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
}: NotificacoesListProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('todas');

  const totalNaoLidas = notificacoesFiltradas.filter(n => n.status === 'nao_lida').length;
  const totalLidas = notificacoesFiltradas.filter(n => n.status === 'lida').length;
  const totalArquivadas = notificacoesFiltradas.filter(n => n.status === 'arquivada').length;

  const filteredNotifications = notificacoesFiltradas.filter(n => {
    if (activeFilter === 'todas') return true;
    if (activeFilter === 'nao_lidas') return n.status === 'nao_lida';
    if (activeFilter === 'lidas') return n.status === 'lida';
    if (activeFilter === 'arquivadas') return n.status === 'arquivada';
    return true;
  });

  const formatarTempoRelativo = (data: string): string => {
    if (!data) return '';
    const hoje = new Date();
    const dataNotif = new Date(data);
    const diffMs = hoje.getTime() - dataNotif.getTime();
    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHoras = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffDias === 0) {
      if (diffHoras === 0) return 'Agora mesmo';
      if (diffHoras === 1) return 'Há 1 hora';
      return `Há ${diffHoras} horas`;
    }
    if (diffDias === 1) return 'Ontem';
    if (diffDias < 7) return `Há ${diffDias} dias`;
    return formatarData(data);
  };

  return (
    <StyledNotifPanel>
      {/* Header */}
      <StyledNotifHeader>
        <div>
          <StyledNotifTitle>Central de Notificações</StyledNotifTitle>
          <StyledNotifSubtitle>Fique por dentro de tudo que acontece com suas finanças</StyledNotifSubtitle>
        </div>
      </StyledNotifHeader>

      {/* Estatísticas rápidas - clicáveis para filtrar */}
      <StyledNotifStats>
        <StyledStatCard
          $color="#8b5cf6"
          $active={activeFilter === 'todas'}
          onClick={() => setActiveFilter('todas')}
        >
          <StyledStatIcon $color="#8b5cf6">🔔</StyledStatIcon>
          <StyledStatContent>
            <StyledStatValue>{notificacoesFiltradas.length}</StyledStatValue>
            <StyledStatLabel>Todas</StyledStatLabel>
          </StyledStatContent>
        </StyledStatCard>

        <StyledStatCard
          $color="#ef4444"
          $active={activeFilter === 'nao_lidas'}
          onClick={() => setActiveFilter('nao_lidas')}
        >
          <StyledStatIcon $color="#ef4444">📬</StyledStatIcon>
          <StyledStatContent>
            <StyledStatValue>{totalNaoLidas}</StyledStatValue>
            <StyledStatLabel>Não Lidas</StyledStatLabel>
          </StyledStatContent>
        </StyledStatCard>

        <StyledStatCard
          $color="#10b981"
          $active={activeFilter === 'lidas'}
          onClick={() => setActiveFilter('lidas')}
        >
          <StyledStatIcon $color="#10b981">✅</StyledStatIcon>
          <StyledStatContent>
            <StyledStatValue>{totalLidas}</StyledStatValue>
            <StyledStatLabel>Lidas</StyledStatLabel>
          </StyledStatContent>
        </StyledStatCard>

        <StyledStatCard
          $color="#6b6b7b"
          $active={activeFilter === 'arquivadas'}
          onClick={() => setActiveFilter('arquivadas')}
        >
          <StyledStatIcon $color="#6b6b7b">📦</StyledStatIcon>
          <StyledStatContent>
            <StyledStatValue>{totalArquivadas}</StyledStatValue>
            <StyledStatLabel>Arquivadas</StyledStatLabel>
          </StyledStatContent>
        </StyledStatCard>
      </StyledNotifStats>

      {/* Barra de ações: busca + filtros + marcar todas */}
      <StyledNotifActions>
        <StyledNotifSearch
          type="text"
          placeholder="🔍 Buscar notificações..."
          value={filtros.pesquisa}
          onChange={e => onAtualizarFiltro('pesquisa', e.target.value)}
        />
        <StyledNotifFilterSelect
          value={filtros.tipo}
          onChange={e => onAtualizarFiltro('tipo', e.target.value)}
        >
          <option value="">Todos tipos</option>
          <option value="pagamento">Pagamento</option>
          <option value="conta">Conta</option>
          <option value="meta">Meta</option>
          <option value="cartao">Cartão</option>
          <option value="orcamento">Orçamento</option>
        </StyledNotifFilterSelect>
        <StyledMarkAllBtn>
          ✓ Marcar todas como lidas
        </StyledMarkAllBtn>
      </StyledNotifActions>

      {/* Feed de notificações */}
      {filteredNotifications.length === 0 ? (
        <StyledEmptyState>
          <StyledEmptyIcon>🔕</StyledEmptyIcon>
          <StyledEmptyTitle>Nenhuma notificação encontrada</StyledEmptyTitle>
          <StyledEmptyText>
            {activeFilter !== 'todas'
              ? 'Não há notificações nesta categoria no momento.'
              : 'Você está em dia! Não há novas notificações.'}
          </StyledEmptyText>
        </StyledEmptyState>
      ) : (
        <StyledNotifFeed>
          {filteredNotifications.map(d => {
            const isUnread = d.status === 'nao_lida';
            return (
              <StyledNotifItem key={d.id} $unread={isUnread}>
                {/* Ícone da notificação */}
                <StyledNotifIcon $color={d.categoriaCor}>
                  {d.categoriaIcone}
                </StyledNotifIcon>

                {/* Conteúdo principal */}
                <StyledNotifContent>
                  <StyledNotifItemTitle $unread={isUnread}>
                    {d.titulo}
                    {isUnread && <StyledUnreadDot />}
                  </StyledNotifItemTitle>

                  {d.mensagem && (
                    <StyledNotifMessage>{d.mensagem}</StyledNotifMessage>
                  )}

                  {/* Metadados: tempo, tipo, status */}
                  <StyledNotifMeta>
                    <StyledNotifTime>🕐 {formatarTempoRelativo(d.data)}</StyledNotifTime>
                    <StyledNotifTypeBadge $color={d.categoriaCor}>
                      {d.categoria}
                    </StyledNotifTypeBadge>
                    <StyledNotifStatus $status={d.status}>
                      {d.status === 'nao_lida' && '🔴'}
                      {d.status === 'lida' && '🟢'}
                      {d.status === 'arquivada' && '⚫'}
                      {getStatusLabel(d.status)}
                    </StyledNotifStatus>
                  </StyledNotifMeta>
                </StyledNotifContent>

                {/* Ações rápidas */}
                <StyledNotifItemActions>
                  <StyledNotifActionBtn
                    title="Ver detalhes"
                    onClick={() => onAbrirDetalhe(d)}
                  >
                    👁️
                  </StyledNotifActionBtn>
                  <StyledNotifActionBtn
                    title="Editar"
                    onClick={() => onAbrirModalEditar(d)}
                  >
                    ✏️
                  </StyledNotifActionBtn>
                  <StyledNotifActionBtn
                    title="Excluir"
                    $variant="danger"
                    onClick={() => onConfirmarExclusao(d)}
                  >
                    🗑️
                  </StyledNotifActionBtn>
                </StyledNotifItemActions>
              </StyledNotifItem>
            );
          })}
        </StyledNotifFeed>
      )}
    </StyledNotifPanel>
  );
}