import { useState, useCallback } from 'react';
import { useCategorias } from './CategoriasUtils';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useCategoriasMain() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const categorias = useCategorias();

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

  const handleEditarFromDetalhe = useCallback((item: typeof categorias.state.detalheCategoria) => {
    if (item) {
      categorias.actions.fecharDetalhe();
      categorias.actions.abrirModalEditar(item);
    }
  }, [categorias.actions]);

  return {
    state: {
      sidebarOpen,
      ...categorias.state,
    },
    actions: {
      toggleSidebar,
      closeSidebar,
      ...categorias.actions,
      handleEditarFromDetalhe,
    },
    helpers: categorias.helpers,
  };
}
