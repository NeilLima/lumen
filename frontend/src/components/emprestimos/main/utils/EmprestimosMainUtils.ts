import { useState, useCallback } from 'react';
import { useEmprestimos } from './EmprestimosUtils';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useEmprestimosMain() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const emprestimos = useEmprestimos();

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

  const handleEditarFromDetalhe = useCallback((item: typeof emprestimos.state.detalheEmprestimo) => {
    if (item) {
      emprestimos.actions.fecharDetalhe();
      emprestimos.actions.abrirModalEditar(item);
    }
  }, [emprestimos.actions]);

  return {
    state: {
      sidebarOpen,
      ...emprestimos.state,
    },
    actions: {
      toggleSidebar,
      closeSidebar,
      ...emprestimos.actions,
      handleEditarFromDetalhe,
    },
    helpers: emprestimos.helpers,
  };
}
