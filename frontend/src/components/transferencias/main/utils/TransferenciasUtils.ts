import { useState, useMemo, useCallback } from 'react';
import { transferenciasService } from '../services/TransferenciasServices';
import type { Transferencia, TransferenciasFiltros, TransferenciasFormData } from '../types/TransferenciasTypes';
const FI: TransferenciasFiltros = { pesquisa: '', contaOrigem: '', contaDestino: '', dataInicio: '', dataFim: '' };
const FV: TransferenciasFormData = { descricao: '', valor: '', contaOrigem: '', contaDestino: '', data: new Date().toISOString().split('T')[0], observacoes: '' };
export function useTransferencias() {
  const [filtros, setF] = useState<TransferenciasFiltros>(FI);
  const [modalAberto, setMA] = useState(false); const [editandoId, setEI] = useState<string | null>(null);
  const [formData, setFD] = useState<TransferenciasFormData>(FV);
  const [exclusaoPendente, setEP] = useState<Transferencia | null>(null);
  const [detalheTransferencia, setDT] = useState<Transferencia | null>(null);
  const [modalInfoAberto, setMIA] = useState(false);
  const service = transferenciasService();
  const filtradas = useMemo(() => {
    if (!service.data) return [];
    return service.data.transferencias.filter(t => {
      if (filtros.pesquisa && !t.descricao.toLowerCase().includes(filtros.pesquisa.toLowerCase())) return false;
      if (filtros.contaOrigem && t.contaOrigem !== filtros.contaOrigem) return false;
      if (filtros.contaDestino && t.contaDestino !== filtros.contaDestino) return false;
      if (filtros.dataInicio && t.data < filtros.dataInicio) return false;
      if (filtros.dataFim && t.data > filtros.dataFim) return false;
      return true;
    });
  }, [service.data, filtros]);
  const abrirModalNovo = useCallback(() => { setFD(FV); setEI(null); setMA(true); }, []);
  const abrirModalEditar = useCallback((t: Transferencia) => { setFD({ descricao: t.descricao, valor: String(t.valor), contaOrigem: t.contaOrigem, contaDestino: t.contaDestino, data: t.data, observacoes: t.observacoes || '' }); setEI(t.id); setMA(true); }, []);
  const fecharModal = useCallback(() => { setMA(false); setEI(null); setFD(FV); }, []);
  const atualizarFiltro = useCallback((c: keyof TransferenciasFiltros, v: string) => { setF(p => ({ ...p, [c]: v })); }, []);
  const limparFiltros = useCallback(() => { setF(FI); }, []);
  const atualizarForm = useCallback((c: keyof TransferenciasFormData, v: string) => { setFD(p => ({ ...p, [c]: v })); }, []);
  const salvar = useCallback(() => { if (editandoId) service.atualizar({ id: editandoId, formData }); else service.criar(formData); fecharModal(); }, [editandoId, formData, service, fecharModal]);
  const confirmarExclusao = useCallback((t: Transferencia) => { setEP(t); }, []);
  const cancelarExclusao = useCallback(() => { setEP(null); }, []);
  const confirmarEExcluir = useCallback(() => { if (exclusaoPendente) { service.excluir(exclusaoPendente.id); setEP(null); } }, [exclusaoPendente, service]);
  const excluir = useCallback((id: string) => { service.excluir(id); }, [service]);
  const abrirDetalhe = useCallback((t: Transferencia) => { setDT(t); }, []);
  const fecharDetalhe = useCallback(() => { setDT(null); }, []);
  const abrirInfo = useCallback(() => { setMIA(true); }, []);
  const fecharInfo = useCallback(() => { setMIA(false); }, []);
  function fv(v: number) { return v.toLocaleString('pt-BR', { minimumFractionDigits: 2 }); }
  function fd(d: string) { const p = d.split('-'); return p.length === 3 ? `${p[2]}/${p[1]}/${p[0]}` : d; }
  return {
    state: { data: service.data, isLoading: service.isLoading, filtros, modalAberto, editandoId, formData, transferenciasFiltradas: filtradas, isSaving: service.isSaving, exclusaoPendente, detalheTransferencia, modalInfoAberto },
    actions: { abrirModalNovo, abrirModalEditar, fecharModal, atualizarFiltro, limparFiltros, salvarTransferencia: salvar, excluirTransferencia: excluir, atualizarForm, confirmarExclusao, cancelarExclusao, confirmarEExcluir, abrirDetalhe, fecharDetalhe, abrirInfo, fecharInfo },
    helpers: { formatarValor: fv, formatarData: fd },
  };
}
