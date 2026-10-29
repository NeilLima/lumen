import { useState, useCallback } from 'react';
import { useTransferencias } from './TransferenciasUtils';
export function useTransferenciasMain() {
  const [sidebarOpen, setSO] = useState(false);
  const t = useTransferencias();
  const toggle = useCallback(() => setSO(p => !p), []);
  const close = useCallback(() => setSO(false), []);
  const handleEditar = useCallback((tr: typeof t.state.detalheTransferencia) => { if (tr) { t.actions.fecharDetalhe(); t.actions.abrirModalEditar(tr); } }, [t.actions]);
  return { state: { sidebarOpen, ...t.state }, actions: { toggleSidebar: toggle, closeSidebar: close, ...t.actions, handleEditarFromDetalhe: handleEditar }, helpers: t.helpers };
}
