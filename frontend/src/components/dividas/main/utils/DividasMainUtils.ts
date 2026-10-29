import { useState, useCallback } from 'react';
import { useDividas } from './DividasUtils';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useDividasMain() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dividas = useDividas();

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

  const handleEditarFromDetalhe = useCallback((divida: typeof dividas.state.detalheDivida) => {
    if (divida) {
      dividas.actions.fecharDetalhe();
      dividas.actions.abrirModalEditar(divida);
    }
  }, [dividas.actions]);

  return {
    state: {
      sidebarOpen,
      ...dividas.state,
    },
    actions: {
      toggleSidebar,
      closeSidebar,
      ...dividas.actions,
      handleEditarFromDetalhe,
    },
    helpers: dividas.helpers,
  };
}