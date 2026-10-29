import { useState, useMemo, useCallback } from 'react';
import { orcamentoService } from '../services/OrcamentoServices';
import { useTheme } from '@/context/theme/ThemeContext';
import type { OrcamentoCategoria, OrcamentoFiltros, OrcamentoFormData } from '../types/OrcamentoTypes';

const FILTROS_INICIAIS: OrcamentoFiltros = { pesquisa: '', status: '', mes: '' };
const FORM_INICIAL: OrcamentoFormData = { categoria: '', limite: '', gasto: '', mes: '7', ano: '2026' };
const STATUS_LABELS: Record<string, string> = { dentro: 'Dentro do Orçamento', atencao: 'Atenção', estourado: 'Estourado' };
const STATUS_CORES: Record<string, string> = { dentro: '#10b981', atencao: '#f59e0b', estourado: '#ef4444' };

export function useOrcamento() {
  const [filtros, setFiltros] = useState<OrcamentoFiltros>(FILTROS_INICIAIS);
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [formData, setFormData] = useState<OrcamentoFormData>(FORM_INICIAL);
  const [exclusaoPendente, setExclusaoPendente] = useState<OrcamentoCategoria | null>(null);
  const [detalheCategoria, setDetalheCategoria] = useState<OrcamentoCategoria | null>(null);
  const [modalInfoAberto, setModalInfoAberto] = useState(false);

  const service = orcamentoService();
  const theme = useTheme();

  const categoriasFiltradas = useMemo(() => {
    if (!service.data) return [];
    return service.data.categorias.filter(cat => {
      if (filtros.pesquisa && !cat.categoria.toLowerCase().includes(filtros.pesquisa.toLowerCase())) return false;
      if (filtros.status && cat.status !== filtros.status) return false;
      if (filtros.mes && String(cat.mes) !== filtros.mes) return false;
      return true;
    });
  }, [service.data, filtros]);

  const abrirModalNovo = useCallback(() => { setFormData(FORM_INICIAL); setEditandoId(null); setModalAberto(true); }, []);
  const abrirModalEditar = useCallback((cat: OrcamentoCategoria) => {
    setFormData({ categoria: cat.categoria, limite: String(cat.limite), gasto: String(cat.gasto), mes: String(cat.mes), ano: String(cat.ano) });
    setEditandoId(cat.id); setModalAberto(true);
  }, []);
  const fecharModal = useCallback(() => { setModalAberto(false); setEditandoId(null); setFormData(FORM_INICIAL); }, []);
  const atualizarFiltro = useCallback((campo: keyof OrcamentoFiltros, valor: string) => { setFiltros(prev => ({ ...prev, [campo]: valor })); }, []);
  const limparFiltros = useCallback(() => { setFiltros(FILTROS_INICIAIS); }, []);
  const atualizarForm = useCallback((campo: keyof OrcamentoFormData, valor: string) => { setFormData(prev => ({ ...prev, [campo]: valor })); }, []);
  const salvarCategoria = useCallback(() => {
    if (editandoId) { service.atualizar({ id: editandoId, formData }); } else { service.criar(formData); }
    fecharModal();
  }, [editandoId, formData, service, fecharModal]);
  const confirmarExclusao = useCallback((cat: OrcamentoCategoria) => { setExclusaoPendente(cat); }, []);
  const cancelarExclusao = useCallback(() => { setExclusaoPendente(null); }, []);
  const confirmarEExcluir = useCallback(() => { if (exclusaoPendente) { service.excluir(exclusaoPendente.id); setExclusaoPendente(null); } }, [exclusaoPendente, service]);
  const abrirDetalhe = useCallback((cat: OrcamentoCategoria) => { setDetalheCategoria(cat); }, []);
  const fecharDetalhe = useCallback(() => { setDetalheCategoria(null); }, []);
  const abrirInfo = useCallback(() => { setModalInfoAberto(true); }, []);
  const fecharInfo = useCallback(() => { setModalInfoAberto(false); }, []);

  function formatarValor(valor: number): string { return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function getStatusLabel(s: string): string { return STATUS_LABELS[s] || s; }
  function getStatusCor(s: string): string { return STATUS_CORES[s] || '#6b6b7b'; }
  function calcularPercentual(gasto: number, limite: number): number { return limite > 0 ? Math.round((gasto / limite) * 100) : 0; }

  return {
    state: { data: service.data, isLoading: service.isLoading, filtros, modalAberto, editandoId, formData, categoriasFiltradas, isSaving: service.isSaving, exclusaoPendente, detalheCategoria, modalInfoAberto },
    actions: { abrirModalNovo, abrirModalEditar, fecharModal, atualizarFiltro, limparFiltros, salvarCategoria, atualizarForm, confirmarExclusao, cancelarExclusao, confirmarEExcluir, abrirDetalhe, fecharDetalhe, abrirInfo, fecharInfo },
    helpers: { formatarValor, getStatusLabel, getStatusCor, calcularPercentual },
    theme,
  };
}
