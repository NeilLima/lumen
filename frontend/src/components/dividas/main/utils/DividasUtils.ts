import { useState, useMemo, useCallback } from 'react';
import { dividasService } from '../services/DividasServices';
import { useTheme } from '@/context/theme/ThemeContext';
import type { Divida, DividasFiltros, DividasFormData } from '../types/DividasTypes';
const FI: DividasFiltros = { pesquisa: '', situacao: '', tipo: '' };
const FMI: DividasFormData = { nome: '', tipo: 'banco', valor: '', parcelas: '1', parcelasPagas: '0', juros: '0', dataVencimento: new Date().toISOString().split('T')[0], situacao: 'em_dia', categoria: '', observacoes: '' };
const SL: Record<string, string> = { em_dia: 'Em Dia', atrasada: 'Atrasada', quitada: 'Quitada' };
const SC: Record<string, string> = { em_dia: '#3b82f6', atrasada: '#ef4444', quitada: '#10b981' };
const TL: Record<string, string> = { pessoa: 'Pessoa', empresa: 'Empresa', banco: 'Banco' };
export function useDividas() {
  const [f, sf] = useState<DividasFiltros>(FI); const [ma, sma] = useState(false); const [ei, sei] = useState<string | null>(null);
  const [fd, sfd] = useState<DividasFormData>(FMI); const [ep, sep] = useState<Divida | null>(null); const [dd, sdd] = useState<Divida | null>(null); const [mi, smi] = useState(false);
  const sv = dividasService(); const th = useTheme();
  const df = useMemo(() => {
    if (!sv.data) return []; return sv.data.dividas.filter(d => { if (f.pesquisa && !d.nome.toLowerCase().includes(f.pesquisa.toLowerCase())) return false; if (f.situacao && d.situacao !== f.situacao) return false; if (f.tipo && d.tipo !== f.tipo) return false; return true; });
  }, [sv.data, f]);
  const abrirModalNovo = useCallback(() => { sfd(FMI); sei(null); sma(true); }, []);
  const abrirModalEditar = useCallback((d: Divida) => { sfd({ nome: d.nome, tipo: d.tipo, valor: String(d.valor), parcelas: String(d.parcelas), parcelasPagas: String(d.parcelasPagas), juros: String(d.juros), dataVencimento: d.dataVencimento, situacao: d.situacao, categoria: d.categoria, observacoes: d.observacoes || '' }); sei(d.id); sma(true); }, []);
  const fecharModal = useCallback(() => { sma(false); sei(null); sfd(FMI); }, []);
  const atualizarFiltro = useCallback((c: keyof DividasFiltros, v: string) => { sf(prev => ({ ...prev, [c]: v })); }, []);
  const limparFiltros = useCallback(() => { sf(FI); }, []);
  const atualizarForm = useCallback((c: keyof DividasFormData, v: string) => { sfd(prev => ({ ...prev, [c]: v })); }, []);
  const salvarDivida = useCallback(() => { if (ei) { sv.atualizar({ id: ei, fd }); } else { sv.criar(fd); } fecharModal(); }, [ei, fd, sv, fecharModal]);
  const confirmarExclusao = useCallback((d: Divida) => { sep(d); }, []);
  const cancelarExclusao = useCallback(() => { sep(null); }, []);
  const confirmarEExcluir = useCallback(() => { if (ep) { sv.excluir(ep.id); sep(null); } }, [ep, sv]);
  const abrirDetalhe = useCallback((d: Divida) => { sdd(d); }, []);
  const fecharDetalhe = useCallback(() => { sdd(null); }, []);
  const abrirInfo = useCallback(() => { smi(true); }, []);
  const fecharInfo = useCallback(() => { smi(false); }, []);
  const fv = (v: number): string => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fd2 = (d: string): string => { const p = d.split('-'); if (p.length !== 3) return d; return `${p[2]}/${p[1]}/${p[0]}`; };
  return { state: { data: sv.data, isLoading: sv.isLoading, filtros: f, modalAberto: ma, editandoId: ei, formData: fd, dividasFiltradas: df, isSaving: sv.isSaving, exclusaoPendente: ep, detalheDivida: dd, modalInfoAberto: mi }, actions: { abrirModalNovo, abrirModalEditar, fecharModal, atualizarFiltro, limparFiltros, salvarDivida, atualizarForm, confirmarExclusao, cancelarExclusao, confirmarEExcluir, abrirDetalhe, fecharDetalhe, abrirInfo, fecharInfo }, helpers: { formatarValor: fv, formatarData: fd2, getSituacaoLabel: (s: string) => SL[s] || s, getSituacaoCor: (s: string) => SC[s] || '#6b6b7b', getTipoLabel: (t: string) => TL[t] || t, calcularProgresso: (pg: number, pt: number) => pt > 0 ? Math.round((pg / pt) * 100) : 0 }, theme: th };
}
