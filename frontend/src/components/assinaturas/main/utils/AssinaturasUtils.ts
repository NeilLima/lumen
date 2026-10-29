import { useState, useMemo, useCallback } from 'react';
import { useAssinaturasService } from '../services/AssinaturasServices';
import { useTheme } from '@/context/theme/ThemeContext';
import type { Assinatura, AssinaturasFiltros, AssinaturasFormData } from '../types/AssinaturasTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const FILTROS_INICIAIS: AssinaturasFiltros = { pesquisa: '', categoria: '', status: '', };

const FORM_INICIAL: AssinaturasFormData = { nome: '', categoria: 'Streaming', valor: '', ciclo: 'mensal', proximaCobranca: new Date().toISOString().split('T')[0], status: 'ativa', observacoes: '', };

const STATUS_LABELS: Record<string, string> = { 'ativa': 'Ativa', 'pausada': 'Pausada', 'cancelada': 'Cancelada' };

const STATUS_CORES: Record<string, string> = { 'ativa': '#10b981', 'pausada': '#f59e0b', 'cancelada': '#ef4444' };

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useAssinaturas() {
  const [filtros, setFiltros] = useState<AssinaturasFiltros>(FILTROS_INICIAIS);
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [formData, setFormData] = useState<AssinaturasFormData>(FORM_INICIAL);
  const [exclusaoPendente, setExclusaoPendente] = useState<Assinatura | null>(null);
  const [detalheAssinatura, setDetalheAssinatura] = useState<Assinatura | null>(null);
  const [modalInfoAberto, setModalInfoAberto] = useState(false);

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = useAssinaturasService();
  const theme = useTheme();

  const assinaturasFiltradas = useMemo(() => {
    if (!service.data) return [];
    return service.data.assinaturas.filter(item => {
      if (filtros.pesquisa && !item.nome.toLowerCase().includes(filtros.pesquisa.toLowerCase())) return false;
      if (filtros.categoria && item.categoria !== filtros.categoria) return false;
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

  const abrirModalEditar = useCallback((item: Assinatura) => {
    setFormData({
      nome: item.nome,
      categoria: item.categoria,
      valor: String(item.valor),
      ciclo: item.ciclo,
      proximaCobranca: item.proximaCobranca,
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

  const atualizarFiltro = useCallback((campo: keyof AssinaturasFiltros, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const limparFiltros = useCallback(() => {
    setFiltros(FILTROS_INICIAIS);
  }, []);

  const atualizarForm = useCallback((campo: keyof AssinaturasFormData, valor: string) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const salvarAssinatura = useCallback(() => {
    if (editandoId) {
      service.atualizar({ id: editandoId, formData });
    } else {
      service.criar(formData);
    }
    fecharModal();
  }, [editandoId, formData, service, fecharModal]);

  const confirmarExclusao = useCallback((item: Assinatura) => {
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

  const abrirDetalhe = useCallback((item: Assinatura) => {
    setDetalheAssinatura(item);
  }, []);

  const fecharDetalhe = useCallback(() => {
    setDetalheAssinatura(null);
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
      assinaturasFiltradas,
      isSaving: service.isSaving,
      exclusaoPendente,
      detalheAssinatura,
      modalInfoAberto,
    },
    actions: {
      abrirModalNovo,
      abrirModalEditar,
      fecharModal,
      atualizarFiltro,
      limparFiltros,
      salvarAssinatura,
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
