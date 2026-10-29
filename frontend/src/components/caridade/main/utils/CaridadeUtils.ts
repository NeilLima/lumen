import { useState, useMemo, useCallback } from 'react';
import { useCaridadeService } from '../services/CaridadeServices';
import { useTheme } from '@/context/theme/ThemeContext';
import type { Caridade, CaridadeFiltros, CaridadeFormData } from '../types/CaridadeTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const FILTROS_INICIAIS: CaridadeFiltros = { pesquisa: '', tipo: '', status: '', };

const FORM_INICIAL: CaridadeFormData = { nome: '', tipo: 'unica', valor: '', instituicao: '', data: new Date().toISOString().split('T')[0], status: 'realizada', observacoes: '', };

const STATUS_LABELS: Record<string, string> = { 'realizada': 'Realizada', 'pendente': 'Pendente' };

const STATUS_CORES: Record<string, string> = { 'realizada': '#10b981', 'pendente': '#f59e0b' };

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useCaridade() {
  const [filtros, setFiltros] = useState<CaridadeFiltros>(FILTROS_INICIAIS);
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [formData, setFormData] = useState<CaridadeFormData>(FORM_INICIAL);
  const [exclusaoPendente, setExclusaoPendente] = useState<Caridade | null>(null);
  const [detalheCaridade, setDetalheCaridade] = useState<Caridade | null>(null);
  const [modalInfoAberto, setModalInfoAberto] = useState(false);

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = useCaridadeService();
  const theme = useTheme();

  const caridadesFiltradas = useMemo(() => {
    if (!service.data) return [];
    return service.data.caridades.filter(item => {
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

  const abrirModalEditar = useCallback((item: Caridade) => {
    setFormData({
      nome: item.nome,
      tipo: item.tipo,
      valor: String(item.valor),
      instituicao: item.instituicao,
      data: item.data,
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

  const atualizarFiltro = useCallback((campo: keyof CaridadeFiltros, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const limparFiltros = useCallback(() => {
    setFiltros(FILTROS_INICIAIS);
  }, []);

  const atualizarForm = useCallback((campo: keyof CaridadeFormData, valor: string) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const salvarCaridade = useCallback(() => {
    if (editandoId) {
      service.atualizar({ id: editandoId, formData });
    } else {
      service.criar(formData);
    }
    fecharModal();
  }, [editandoId, formData, service, fecharModal]);

  const confirmarExclusao = useCallback((item: Caridade) => {
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

  const abrirDetalhe = useCallback((item: Caridade) => {
    setDetalheCaridade(item);
  }, []);

  const fecharDetalhe = useCallback(() => {
    setDetalheCaridade(null);
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
      caridadesFiltradas,
      isSaving: service.isSaving,
      exclusaoPendente,
      detalheCaridade,
      modalInfoAberto,
    },
    actions: {
      abrirModalNovo,
      abrirModalEditar,
      fecharModal,
      atualizarFiltro,
      limparFiltros,
      salvarCaridade,
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
