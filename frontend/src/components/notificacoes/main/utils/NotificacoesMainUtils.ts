import { useState, useCallback } from 'react';
import { useNotificacoes } from './NotificacoesUtils';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useNotificacoesMain() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const notificacoes = useNotificacoes();

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const handleEditarFromDetalhe = useCallback((item: typeof notificacoes.state.detalheNotificacao) => {
    if (item) {
      notificacoes.actions.fecharDetalhe();
      notificacoes.actions.abrirModalEditar(item);
    }
  }, [notificacoes.actions]);

  return {
    state: {
      sidebarOpen,
      ...notificacoes.state,
    },
    actions: {
      toggleSidebar,
      closeSidebar,
      ...notificacoes.actions,
      handleEditarFromDetalhe,
    },
    helpers: notificacoes.helpers,
  };
}
