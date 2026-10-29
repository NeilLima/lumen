import { useState, useMemo, useCallback } from 'react';
import { useRelatoriosService } from '../services/RelatoriosServices';
import { useTheme } from '@/context/theme/ThemeContext';
import type { Relatorio, RelatoriosFiltros, RelatoriosFormData } from '../types/RelatoriosTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const FILTROS_INICIAIS: RelatoriosFiltros = { pesquisa: '', tipo: '', periodo: '', };

const FORM_INICIAL: RelatoriosFormData = { nome: '', tipo: 'receitas', periodo: 'mensal', dataInicio: new Date().toISOString().split('T')[0], dataFim: new Date().toISOString().split('T')[0], observacoes: '', };

const STATUS_LABELS: Record<string, string> = { 'gerado': 'Gerado', 'pendente': 'Pendente' };

const STATUS_CORES: Record<string, string> = { 'gerado': '#10b981', 'pendente': '#f59e0b' };

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useRelatorios() {
  const [filtros, setFiltros] = useState<RelatoriosFiltros>(FILTROS_INICIAIS);
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [formData, setFormData] = useState<RelatoriosFormData>(FORM_INICIAL);
  const [exclusaoPendente, setExclusaoPendente] = useState<Relatorio | null>(null);
  const [detalheRelatorio, setDetalheRelatorio] = useState<Relatorio | null>(null);
  const [modalInfoAberto, setModalInfoAberto] = useState(false);

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = useRelatoriosService();
  const theme = useTheme();

  const relatoriosFiltradas = useMemo(() => {
    if (!service.data) return [];
    return service.data.relatorios.filter(item => {
      if (filtros.pesquisa && !item.nome.toLowerCase().includes(filtros.pesquisa.toLowerCase())) return false;
      if (filtros.tipo && item.tipo !== filtros.tipo) return false;
      if (filtros.periodo && item.periodo !== filtros.periodo) return false;
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

  const abrirModalEditar = useCallback((item: Relatorio) => {
    setFormData({
      nome: item.nome,
      tipo: item.tipo,
      periodo: item.periodo,
      dataInicio: item.dataInicio,
      dataFim: item.dataFim,
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

  const atualizarFiltro = useCallback((campo: keyof RelatoriosFiltros, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const limparFiltros = useCallback(() => {
    setFiltros(FILTROS_INICIAIS);
  }, []);

  const atualizarForm = useCallback((campo: keyof RelatoriosFormData, valor: string) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const salvarRelatorio = useCallback(() => {
    if (editandoId) {
      service.atualizar({ id: editandoId, formData });
    } else {
      service.criar(formData);
    }
    fecharModal();
  }, [editandoId, formData, service, fecharModal]);

  const confirmarExclusao = useCallback((item: Relatorio) => {
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

  const abrirDetalhe = useCallback((item: Relatorio) => {
    setDetalheRelatorio(item);
  }, []);

  const fecharDetalhe = useCallback(() => {
    setDetalheRelatorio(null);
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
      relatoriosFiltradas,
      isSaving: service.isSaving,
      exclusaoPendente,
      detalheRelatorio,
      modalInfoAberto,
    },
    actions: {
      abrirModalNovo,
      abrirModalEditar,
      fecharModal,
      atualizarFiltro,
      limparFiltros,
      salvarRelatorio,
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
