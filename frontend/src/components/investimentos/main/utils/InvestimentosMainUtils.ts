import { useState, useCallback } from 'react';
import { useInvestimentos } from './InvestimentosUtils';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useInvestimentosMain() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const investimentos = useInvestimentos();

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

  const handleEditarFromDetalhe = useCallback((item: typeof investimentos.state.detalheInvestimento) => {
    if (item) {
      investimentos.actions.fecharDetalhe();
      investimentos.actions.abrirModalEditar(item);
    }
  }, [investimentos.actions]);

  return {
    state: {
      sidebarOpen,
      ...investimentos.state,
    },
    actions: {
      toggleSidebar,
      closeSidebar,
      ...investimentos.actions,
      handleEditarFromDetalhe,
    },
    helpers: investimentos.helpers,
  };
}
