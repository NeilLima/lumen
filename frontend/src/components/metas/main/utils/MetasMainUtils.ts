import { useState, useCallback } from 'react';
import { useMetas } from './MetasUtils';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useMetasMain() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const metas = useMetas();

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const toggleSidebar = useCallback(() => { setSidebarOpen(prev => !prev); }, []);
  const closeSidebar = useCallback(() => { setSidebarOpen(false); }, []);
  const handleEditarFromDetalhe = useCallback((meta: typeof metas.state.detalheMeta) => {
    if (meta) { metas.actions.fecharDetalhe(); metas.actions.abrirModalEditar(meta); }
  }, [metas.actions]);

  return {
    state: { sidebarOpen, ...metas.state },
    actions: { toggleSidebar, closeSidebar, ...metas.actions, handleEditarFromDetalhe },
    helpers: metas.helpers,
  };
}
