import { useState, useCallback } from 'react';
import { useDespesas } from './DespesasUtils';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useDespesasMain() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const despesas = useDespesas();

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

  const handleEditarFromDetalhe = useCallback((despesa: typeof despesas.state.detalheDespesa) => {
    if (despesa) {
      despesas.actions.fecharDetalhe();
      despesas.actions.abrirModalEditar(despesa);
    }
  }, [despesas.actions]);

  return {
    state: {
      sidebarOpen,
      ...despesas.state,
    },
    actions: {
      toggleSidebar,
      closeSidebar,
      ...despesas.actions,
      handleEditarFromDetalhe,
    },
    helpers: despesas.helpers,
  };
}