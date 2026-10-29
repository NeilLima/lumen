import { useState, useMemo, useCallback } from 'react';
import { useInvestimentosService } from '../services/InvestimentosServices';
import { useTheme } from '@/context/theme/ThemeContext';
import type { Investimento, InvestimentosFiltros, InvestimentosFormData } from '../types/InvestimentosTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const FILTROS_INICIAIS: InvestimentosFiltros = { pesquisa: '', tipo: '', status: '', };

const FORM_INICIAL: InvestimentosFormData = { nome: '', tipo: 'cdb', valorAplicado: '', valorAtual: '', dataAplicacao: new Date().toISOString().split('T')[0], status: 'ativo', observacoes: '', };

const STATUS_LABELS: Record<string, string> = { 'ativo': 'Ativo', 'resgatado': 'Resgatado', 'perda': 'Perda' };

const STATUS_CORES: Record<string, string> = { 'ativo': '#10b981', 'resgatado': '#3b82f6', 'perda': '#ef4444' };

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useInvestimentos() {
  const [filtros, setFiltros] = useState<InvestimentosFiltros>(FILTROS_INICIAIS);
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [formData, setFormData] = useState<InvestimentosFormData>(FORM_INICIAL);
  const [exclusaoPendente, setExclusaoPendente] = useState<Investimento | null>(null);
  const [detalheInvestimento, setDetalheInvestimento] = useState<Investimento | null>(null);
  const [modalInfoAberto, setModalInfoAberto] = useState(false);

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = useInvestimentosService();
  const theme = useTheme();

  const investimentosFiltradas = useMemo(() => {
    if (!service.data) return [];
    return service.data.investimentos.filter(item => {
      if (filtros.pesquisa && !item.nome.toLowerCase().includes(filtros.pesquisa.toLowerCase())) return false;
      if (filtros.tipo && item.tipo !== filtros.tipo) return false;
      if (filtros.status && item.status !== filtros.status) return false;
      return true;
    });
  }, [service.data, filtros]);

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const abrirModalNovo = useCallback(() => {
    setFormData(FORM_INICIAL);
    setEditandoId(null);
    setModalAberto(true);
  }, []);

  const abrirModalEditar = useCallback((item: Investimento) => {
    setFormData({
      nome: item.nome,
      tipo: item.tipo,
      valorAplicado: String(item.valorAplicado),
      valorAtual: String(item.valorAtual),
      dataAplicacao: item.dataAplicacao,
      status: item.status,
      observacoes: item.observacoes || '',
    });
    setEditandoId(item.id);
    setModalAberto(true);
  }, []);

  const fecharModal = useCallback(() => {
    setModalAberto(false);
    setEditandoId(null);
    setFormData(FORM_INICIAL);
  }, []);

  const atualizarFiltro = useCallback((campo: keyof InvestimentosFiltros, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const limparFiltros = useCallback(() => {
    setFiltros(FILTROS_INICIAIS);
  }, []);

  const atualizarForm = useCallback((campo: keyof InvestimentosFormData, valor: string) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const salvarInvestimento = useCallback(() => {
    if (editandoId) {
      service.atualizar({ id: editandoId, formData });
    } else {
      service.criar(formData);
    }
    fecharModal();
  }, [editandoId, formData, service, fecharModal]);

  const confirmarExclusao = useCallback((item: Investimento) => {
    setExclusaoPendente(item);
  }, []);

  const cancelarExclusao = useCallback(() => {
    setExclusaoPendente(null);
  }, []);

  const confirmarEExcluir = useCallback(() => {
    if (exclusaoPendente) {
      service.excluir(exclusaoPendente.id);
      setExclusaoPendente(null);
    }
  }, [exclusaoPendente, service]);

  const abrirDetalhe = useCallback((item: Investimento) => {
    setDetalheInvestimento(item);
  }, []);

  const fecharDetalhe = useCallback(() => {
    setDetalheInvestimento(null);
  }, []);

  const abrirInfo = useCallback(() => {
    setModalInfoAberto(true);
  }, []);

  const fecharInfo = useCallback(() => {
    setModalInfoAberto(false);
  }, []);

  function formatarValor(valor: number): string {
    if (!valor) return '0,00';
    return valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function formatarData(data: string): string {
    if (!data) return '';
    const partes = data.split('-');
    if (partes.length !== 3) return data;
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  function getStatusLabel(status: string): string {
    return STATUS_LABELS[status] || status;
  }

  function getStatusCor(status: string): string {
    return STATUS_CORES[status] || '#6b6b7b';
  }

  return {
    state: {
      data: service.data,
      isLoading: service.isLoading,
      filtros,
      modalAberto,
      editandoId,
      formData,
      investimentosFiltradas,
      isSaving: service.isSaving,
      exclusaoPendente,
      detalheInvestimento,
      modalInfoAberto,
    },
    actions: {
      abrirModalNovo,
      abrirModalEditar,
      fecharModal,
      atualizarFiltro,
      limparFiltros,
      salvarInvestimento,
      atualizarForm,
      confirmarExclusao,
      cancelarExclusao,
      confirmarEExcluir,
      abrirDetalhe,
      fecharDetalhe,
      abrirInfo,
      fecharInfo,
    },
    helpers: {
      formatarValor, formatarData, getStatusLabel, getStatusCor,
    },
    theme,
  };
}
