import { useState, useMemo, useCallback } from 'react';
import { contasService } from '../services/ContasServices';
import type { Conta, ContasFeedback, ContasFiltros, ContasFormData } from '../types/ContasTypes';
const FI: ContasFiltros = { pesquisa: '', tipo: '', banco: '', status: '' };
const FV: ContasFormData = { nome: '', tipo: 'corrente', saldo: '', banco: '', cor: '#8b5cf6' };
const TIPO_LABELS: Record<string, string> = { corrente: 'Conta Corrente', poupanca: 'Poupança', carteira: 'Carteira', digital: 'Conta Digital' };
export function useContas() {
  const [filtros, setF] = useState<ContasFiltros>(FI);
  const [modalAberto, setMA] = useState(false); const [editandoId, setEI] = useState<string | null>(null);
  const [formData, setFD] = useState<ContasFormData>(FV);
  const [exclusaoPendente, setEP] = useState<Conta | null>(null);
  const [detalheConta, setDC] = useState<Conta | null>(null);
  const [modalInfoAberto, setMIA] = useState(false);
  const [feedback, setFeedback] = useState<ContasFeedback | null>(null);
  const service = contasService();
  const filtradas = useMemo(() => {
    if (!service.data) return [];
    return service.data.contas.filter(c => {
      if (filtros.pesquisa && !c.nome.toLowerCase().includes(filtros.pesquisa.toLowerCase())) return false;
      if (filtros.tipo && c.tipo !== filtros.tipo) return false;
      if (filtros.banco && c.banco !== filtros.banco) return false;
      if (filtros.status === 'ativa' && !c.ativa) return false;
      if (filtros.status === 'inativa' && c.ativa) return false;
      return true;
    });
  }, [service.data, filtros]);
  const abrirModalNovo = useCallback(() => { setFD(FV); setEI(null); setMA(true); }, []);
  const abrirModalEditar = useCallback((c: Conta) => { setFD({ nome: c.nome, tipo: c.tipo, saldo: String(c.saldo), banco: c.banco, cor: c.cor }); setEI(c.id); setMA(true); }, []);
  const fecharModal = useCallback(() => { setMA(false); setEI(null); setFD(FV); }, []);
  const atualizarFiltro = useCallback((c: keyof ContasFiltros, v: string) => { setF(p => ({ ...p, [c]: v })); }, []);
  const limparFiltros = useCallback(() => { setF(FI); }, []);
  const atualizarForm = useCallback((c: keyof ContasFormData, v: string) => { setFD(p => ({ ...p, [c]: v })); }, []);
  const salvar = useCallback(async () => {
    const editando = !!editandoId;
    try {
      if (editandoId) await service.atualizar({ id: editandoId, formData });
      else await service.criar(formData);
      setFeedback({
        tipo: 'sucesso',
        titulo: editando ? 'Conta atualizada' : 'Conta criada',
        mensagem: editando ? 'As alterações foram salvas com sucesso.' : 'Sua conta foi cadastrada com sucesso.',
      });
      fecharModal();
    } catch {
      setFeedback({
        tipo: 'erro',
        titulo: 'Não foi possível salvar',
        mensagem: 'Verifique os campos preenchidos e tente novamente.',
      });
    }
  }, [editandoId, formData, service, fecharModal]);
  const confirmarExclusao = useCallback((c: Conta) => { setEP(c); }, []);
  const cancelarExclusao = useCallback(() => { setEP(null); }, []);
  const confirmarEExcluir = useCallback(async () => {
    const alvo = exclusaoPendente;
    if (!alvo) return;
    try {
      await service.excluir(alvo.id);
      setFeedback({ tipo: 'sucesso', titulo: 'Conta excluída', mensagem: `A conta "${alvo.nome}" foi removida.` });
    } catch {
      setFeedback({ tipo: 'erro', titulo: 'Não foi possível excluir', mensagem: 'Ocorreu um erro ao excluir a conta. Tente novamente.' });
    } finally {
      setEP(null);
    }
  }, [exclusaoPendente, service]);
  const fecharFeedback = useCallback(() => { setFeedback(null); }, []);
  const abrirDetalhe = useCallback((c: Conta) => { setDC(c); }, []);
  const fecharDetalhe = useCallback(() => { setDC(null); }, []);
  const abrirInfo = useCallback(() => { setMIA(true); }, []);
  const fecharInfo = useCallback(() => { setMIA(false); }, []);
  function fv(v: number) { return v.toLocaleString('pt-BR', { minimumFractionDigits: 2 }); }
  function getTipoLabel(t: string) { return TIPO_LABELS[t] || t; }
  return { state: { data: service.data, isLoading: service.isLoading, filtros, modalAberto, editandoId, formData, contasFiltradas: filtradas, isSaving: service.isSaving, exclusaoPendente, detalheConta, modalInfoAberto, feedback }, actions: { abrirModalNovo, abrirModalEditar, fecharModal, atualizarFiltro, limparFiltros, salvarConta: salvar, atualizarForm, confirmarExclusao, cancelarExclusao, confirmarEExcluir, abrirDetalhe, fecharDetalhe, abrirInfo, fecharInfo, fecharFeedback }, helpers: { formatarValor: fv, getTipoLabel } };
}
