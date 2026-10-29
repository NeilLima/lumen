import { useState, useCallback } from 'react';
import { useRelatorios } from './RelatoriosUtils';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useRelatoriosMain() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const relatorios = useRelatorios();

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

  const handleEditarFromDetalhe = useCallback((item: typeof relatorios.state.detalheRelatorio) => {
    if (item) {
      relatorios.actions.fecharDetalhe();
      relatorios.actions.abrirModalEditar(item);
    }
  }, [relatorios.actions]);

  return {
    state: {
      sidebarOpen,
      ...relatorios.state,
    },
    actions: {
      toggleSidebar,
      closeSidebar,
      ...relatorios.actions,
      handleEditarFromDetalhe,
    },
    helpers: relatorios.helpers,
  };
}
