import { useState, useMemo, useCallback } from 'react';
import { useAjudaService } from '../services/AjudaServices';
import { useTheme } from '@/context/theme/ThemeContext';
import type { Ajuda, AjudaFiltros, AjudaFormData } from '../types/AjudaTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const FILTROS_INICIAIS: AjudaFiltros = { pesquisa: '', categoria: '', status: '', };

const FORM_INICIAL: AjudaFormData = { titulo: '', categoria: 'inicio', conteudo: '', status: 'publicado', };

const STATUS_LABELS: Record<string, string> = { 'publicado': 'Publicado', 'rascunho': 'Rascunho' };

const STATUS_CORES: Record<string, string> = { 'publicado': '#10b981', 'rascunho': '#f59e0b' };

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useAjuda() {
  const [filtros, setFiltros] = useState<AjudaFiltros>(FILTROS_INICIAIS);
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [formData, setFormData] = useState<AjudaFormData>(FORM_INICIAL);
  const [exclusaoPendente, setExclusaoPendente] = useState<Ajuda | null>(null);
  const [detalheAjuda, setDetalheAjuda] = useState<Ajuda | null>(null);
  const [modalInfoAberto, setModalInfoAberto] = useState(false);

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = useAjudaService();
  const theme = useTheme();

  const ajudasFiltradas = useMemo(() => {
    if (!service.data) return [];
    return service.data.ajudas.filter(item => {
      if (filtros.pesquisa && !item.titulo.toLowerCase().includes(filtros.pesquisa.toLowerCase())) return false;
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

  const abrirModalEditar = useCallback((item: Ajuda) => {
    setFormData({
      titulo: item.titulo,
      categoria: item.categoria,
      conteudo: item.conteudo || '',
      status: item.status,
    });
    setEditandoId(item.id);
    setModalAberto(true);
  }, []);

  const fecharModal = useCallback(() => {
    setModalAberto(false);
    setEditandoId(null);
    setFormData(FORM_INICIAL);
  }, []);

  const atualizarFiltro = useCallback((campo: keyof AjudaFiltros, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const limparFiltros = useCallback(() => {
    setFiltros(FILTROS_INICIAIS);
  }, []);

  const atualizarForm = useCallback((campo: keyof AjudaFormData, valor: string) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const salvarAjuda = useCallback(() => {
    if (editandoId) {
      service.atualizar({ id: editandoId, formData });
    } else {
      service.criar(formData);
    }
    fecharModal();
  }, [editandoId, formData, service, fecharModal]);

  const confirmarExclusao = useCallback((item: Ajuda) => {
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

  const abrirDetalhe = useCallback((item: Ajuda) => {
    setDetalheAjuda(item);
  }, []);

  const fecharDetalhe = useCallback(() => {
    setDetalheAjuda(null);
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
      ajudasFiltradas,
      isSaving: service.isSaving,
      exclusaoPendente,
      detalheAjuda,
      modalInfoAberto,
    },
    actions: {
      abrirModalNovo,
      abrirModalEditar,
      fecharModal,
      atualizarFiltro,
      limparFiltros,
      salvarAjuda,
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
