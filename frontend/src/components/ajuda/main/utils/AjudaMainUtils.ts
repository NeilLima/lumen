import { useState, useCallback } from 'react';
import { useAjuda } from './AjudaUtils';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useAjudaMain() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const ajuda = useAjuda();

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

  const handleEditarFromDetalhe = useCallback((item: typeof ajuda.state.detalheAjuda) => {
    if (item) {
      ajuda.actions.fecharDetalhe();
      ajuda.actions.abrirModalEditar(item);
    }
  }, [ajuda.actions]);

  return {
    state: {
      sidebarOpen,
      ...ajuda.state,
    },
    actions: {
      toggleSidebar,
      closeSidebar,
      ...ajuda.actions,
      handleEditarFromDetalhe,
    },
    helpers: ajuda.helpers,
  };
}
