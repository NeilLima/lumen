import { useState, useCallback } from 'react';
import { useContas } from './ContasUtils';
export function useContasMain() {
  const [sidebarOpen, setSO] = useState(false);
  const c = useContas();
  const toggle = useCallback(() => setSO(p => !p), []);
  const close = useCallback(() => setSO(false), []);
  const handleEditar = useCallback((ct: typeof c.state.detalheConta) => { if (ct) { c.actions.fecharDetalhe(); c.actions.abrirModalEditar(ct); } }, [c.actions]);
  return { state: { sidebarOpen, ...c.state }, actions: { toggleSidebar: toggle, closeSidebar: close, ...c.actions, handleEditarFromDetalhe: handleEditar }, helpers: c.helpers };
}
