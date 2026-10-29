import { useState, useCallback } from 'react';
import { useCaridade } from './CaridadeUtils';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useCaridadeMain() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const caridade = useCaridade();

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

  const handleEditarFromDetalhe = useCallback((item: typeof caridade.state.detalheCaridade) => {
    if (item) {
      caridade.actions.fecharDetalhe();
      caridade.actions.abrirModalEditar(item);
    }
  }, [caridade.actions]);

  return {
    state: {
      sidebarOpen,
      ...caridade.state,
    },
    actions: {
      toggleSidebar,
      closeSidebar,
      ...caridade.actions,
      handleEditarFromDetalhe,
    },
    helpers: caridade.helpers,
  };
}
