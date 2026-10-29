import { useState, useMemo, useCallback } from 'react';
import { useNotificacoesService } from '../services/NotificacoesServices';
import { useTheme } from '@/context/theme/ThemeContext';
import type { Notificacao, NotificacoesFiltros, NotificacoesFormData } from '../types/NotificacoesTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const FILTROS_INICIAIS: NotificacoesFiltros = { pesquisa: '', tipo: '', status: '', };

const FORM_INICIAL: NotificacoesFormData = { titulo: '', tipo: 'pagamento', mensagem: '', data: new Date().toISOString().split('T')[0], status: 'nao_lida', };

const STATUS_LABELS: Record<string, string> = { 'nao_lida': 'Não Lida', 'lida': 'Lida', 'arquivada': 'Arquivada' };

const STATUS_CORES: Record<string, string> = { 'nao_lida': '#ef4444', 'lida': '#10b981', 'arquivada': '#6b6b7b' };

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useNotificacoes() {
  const [filtros, setFiltros] = useState<NotificacoesFiltros>(FILTROS_INICIAIS);
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [formData, setFormData] = useState<NotificacoesFormData>(FORM_INICIAL);
  const [exclusaoPendente, setExclusaoPendente] = useState<Notificacao | null>(null);
  const [detalheNotificacao, setDetalheNotificacao] = useState<Notificacao | null>(null);
  const [modalInfoAberto, setModalInfoAberto] = useState(false);

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = useNotificacoesService();
  const theme = useTheme();

  const notificacoesFiltradas = useMemo(() => {
    if (!service.data) return [];
    return service.data.notificacoes.filter(item => {
      if (filtros.pesquisa && !item.titulo.toLowerCase().includes(filtros.pesquisa.toLowerCase())) return false;
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

  const abrirModalEditar = useCallback((item: Notificacao) => {
    setFormData({
      titulo: item.titulo,
      tipo: item.tipo,
      mensagem: item.mensagem || '',
      data: item.data,
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

  const atualizarFiltro = useCallback((campo: keyof NotificacoesFiltros, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const limparFiltros = useCallback(() => {
    setFiltros(FILTROS_INICIAIS);
  }, []);

  const atualizarForm = useCallback((campo: keyof NotificacoesFormData, valor: string) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const salvarNotificacao = useCallback(() => {
    if (editandoId) {
      service.atualizar({ id: editandoId, formData });
    } else {
      service.criar(formData);
    }
    fecharModal();
  }, [editandoId, formData, service, fecharModal]);

  const confirmarExclusao = useCallback((item: Notificacao) => {
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

  const abrirDetalhe = useCallback((item: Notificacao) => {
    setDetalheNotificacao(item);
  }, []);

  const fecharDetalhe = useCallback(() => {
    setDetalheNotificacao(null);
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
      notificacoesFiltradas,
      isSaving: service.isSaving,
      exclusaoPendente,
      detalheNotificacao,
      modalInfoAberto,
    },
    actions: {
      abrirModalNovo,
      abrirModalEditar,
      fecharModal,
      atualizarFiltro,
      limparFiltros,
      salvarNotificacao,
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
