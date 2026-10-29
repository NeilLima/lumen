import { useState, useCallback } from 'react';
import { useReceitas } from './ReceitasUtils';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useReceitasMain() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const receitas = useReceitas();

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

  const handleEditarFromDetalhe = useCallback((receita: typeof receitas.state.detalheReceita) => {
    if (receita) {
      receitas.actions.fecharDetalhe();
      receitas.actions.abrirModalEditar(receita);
    }
  }, [receitas.actions]);

  return {
    state: {
      sidebarOpen,
      ...receitas.state,
    },
    actions: {
      toggleSidebar,
      closeSidebar,
      ...receitas.actions,
      handleEditarFromDetalhe,
    },
    helpers: receitas.helpers,
  };
}