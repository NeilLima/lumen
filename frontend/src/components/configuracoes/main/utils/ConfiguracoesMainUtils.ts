import { useState, useCallback } from 'react';
import { useConfiguracoes } from './ConfiguracoesUtils';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useConfiguracoesMain() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const configuracoes = useConfiguracoes();

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

  const handleEditarFromDetalhe = useCallback((item: typeof configuracoes.state.detalheConfiguracao) => {
    if (item) {
      configuracoes.actions.fecharDetalhe();
      configuracoes.actions.abrirModalEditar(item);
    }
  }, [configuracoes.actions]);

  return {
    state: {
      sidebarOpen,
      ...configuracoes.state,
    },
    actions: {
      toggleSidebar,
      closeSidebar,
      ...configuracoes.actions,
      handleEditarFromDetalhe,
    },
    helpers: configuracoes.helpers,
  };
}
