import { useState, useMemo, useCallback } from 'react';
import { metasService } from '../services/MetasServices';
import { useTheme } from '@/context/theme/ThemeContext';
import type { Meta, MetasFiltros, MetasFormData } from '../types/MetasTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const FILTROS_INICIAIS: MetasFiltros = { pesquisa: '', categoria: '', status: '', prioridade: '' };

const FORM_INICIAL: MetasFormData = {
  nome: '', valorAlvo: '', valorAtual: '', dataLimite: new Date().toISOString().split('T')[0],
  categoria: '', prioridade: 'media', status: 'em_andamento', descricao: '',
};

const PRIORIDADE_LABELS: Record<Meta['prioridade'], string> = { baixa: 'Baixa', media: 'Média', alta: 'Alta' };
const PRIORIDADE_CORES: Record<Meta['prioridade'], string> = { baixa: '#10b981', media: '#f59e0b', alta: '#ef4444' };
const STATUS_LABELS: Record<Meta['status'], string> = { em_andamento: 'Em Andamento', concluida: 'Concluída', pausada: 'Pausada' };
const STATUS_CORES: Record<Meta['status'], string> = { em_andamento: '#3b82f6', concluida: '#10b981', pausada: '#f59e0b' };

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useMetas() {
  const [filtros, setFiltros] = useState<MetasFiltros>(FILTROS_INICIAIS);
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [formData, setFormData] = useState<MetasFormData>(FORM_INICIAL);
  const [exclusaoPendente, setExclusaoPendente] = useState<Meta | null>(null);
  const [detalheMeta, setDetalheMeta] = useState<Meta | null>(null);
  const [modalInfoAberto, setModalInfoAberto] = useState(false);

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = metasService();
  const theme = useTheme();

  const metasFiltradas = useMemo(() => {
    if (!service.data) return [];
    return service.data.metas.filter(meta => {
      if (filtros.pesquisa && !meta.nome.toLowerCase().includes(filtros.pesquisa.toLowerCase())) return false;
      if (filtros.categoria && meta.categoria !== filtros.categoria) return false;
      if (filtros.status && meta.status !== filtros.status) return false;
      if (filtros.prioridade && meta.prioridade !== filtros.prioridade) return false;
      return true;
    });
  }, [service.data, filtros]);

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const abrirModalNovo = useCallback(() => { setFormData(FORM_INICIAL); setEditandoId(null); setModalAberto(true); }, []);
  const abrirModalEditar = useCallback((meta: Meta) => {
    setFormData({ nome: meta.nome, valorAlvo: String(meta.valorAlvo), valorAtual: String(meta.valorAtual), dataLimite: meta.dataLimite, categoria: meta.categoria, prioridade: meta.prioridade, status: meta.status, descricao: meta.descricao || '' });
    setEditandoId(meta.id); setModalAberto(true);
  }, []);
  const fecharModal = useCallback(() => { setModalAberto(false); setEditandoId(null); setFormData(FORM_INICIAL); }, []);
  const atualizarFiltro = useCallback((campo: keyof MetasFiltros, valor: string) => { setFiltros(prev => ({ ...prev, [campo]: valor })); }, []);
  const limparFiltros = useCallback(() => { setFiltros(FILTROS_INICIAIS); }, []);
  const atualizarForm = useCallback((campo: keyof MetasFormData, valor: string) => { setFormData(prev => ({ ...prev, [campo]: valor })); }, []);
  const salvarMeta = useCallback(() => {
    if (editandoId) { service.atualizar({ id: editandoId, formData }); } else { service.criar(formData); }
    fecharModal();
  }, [editandoId, formData, service, fecharModal]);
  const confirmarExclusao = useCallback((meta: Meta) => { setExclusaoPendente(meta); }, []);
  const cancelarExclusao = useCallback(() => { setExclusaoPendente(null); }, []);
  const confirmarEExcluir = useCallback(() => { if (exclusaoPendente) { service.excluir(exclusaoPendente.id); setExclusaoPendente(null); } }, [exclusaoPendente, service]);
  const abrirDetalhe = useCallback((meta: Meta) => { setDetalheMeta(meta); }, []);
  const fecharDetalhe = useCallback(() => { setDetalheMeta(null); }, []);
  const abrirInfo = useCallback(() => { setModalInfoAberto(true); }, []);
  const fecharInfo = useCallback(() => { setModalInfoAberto(false); }, []);

  function formatarValor(valor: number): string { return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function formatarData(data: string): string { const partes = data.split('-'); if (partes.length !== 3) return data; return `${partes[2]}/${partes[1]}/${partes[0]}`; }
  function getPrioridadeLabel(p: Meta['prioridade']): string { return PRIORIDADE_LABELS[p]; }
  function getPrioridadeCor(p: Meta['prioridade']): string { return PRIORIDADE_CORES[p]; }
  function getStatusLabel(s: Meta['status']): string { return STATUS_LABELS[s]; }
  function getStatusCor(s: Meta['status']): string { return STATUS_CORES[s]; }
  function calcularProgresso(meta: Meta): number { return meta.valorAlvo > 0 ? Math.round((meta.valorAtual / meta.valorAlvo) * 100) : 0; }

  return {
    state: { data: service.data, isLoading: service.isLoading, filtros, modalAberto, editandoId, formData, metasFiltradas, isSaving: service.isSaving, exclusaoPendente, detalheMeta, modalInfoAberto },
    actions: { abrirModalNovo, abrirModalEditar, fecharModal, atualizarFiltro, limparFiltros, salvarMeta, atualizarForm, confirmarExclusao, cancelarExclusao, confirmarEExcluir, abrirDetalhe, fecharDetalhe, abrirInfo, fecharInfo },
    helpers: { formatarValor, formatarData, getPrioridadeLabel, getPrioridadeCor, getStatusLabel, getStatusCor, calcularProgresso },
    theme,
  };
}
