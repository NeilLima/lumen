import { useState, useCallback } from 'react';
import { useAssinaturas } from './AssinaturasUtils';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useAssinaturasMain() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const assinaturas = useAssinaturas();

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

  const handleEditarFromDetalhe = useCallback((item: typeof assinaturas.state.detalheAssinatura) => {
    if (item) {
      assinaturas.actions.fecharDetalhe();
      assinaturas.actions.abrirModalEditar(item);
    }
  }, [assinaturas.actions]);

  return {
    state: {
      sidebarOpen,
      ...assinaturas.state,
    },
    actions: {
      toggleSidebar,
      closeSidebar,
      ...assinaturas.actions,
      handleEditarFromDetalhe,
    },
    helpers: assinaturas.helpers,
  };
}
