import { useState, useCallback } from 'react';
import { useComprasUtils } from './ComprasUtils';

export function useComprasMain() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const compras = useComprasUtils();

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const handleEditarFromDetalhe = useCallback((compra: any) => {
    if (compra) {
      compras.actions.fecharDetalhe();
      compras.actions.abrirModalEditar(compra);
    }
  }, [compras.actions]);

  return {
    state: {
      sidebarOpen,
      ...compras.state,
    },
    actions: {
      toggleSidebar,
      closeSidebar,
      ...compras.actions,
      handleEditarFromDetalhe,
    },
    helpers: compras.helpers,
  };
}
