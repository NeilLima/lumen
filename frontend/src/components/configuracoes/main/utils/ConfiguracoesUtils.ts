import { useState, useMemo, useCallback } from 'react';
import { useConfiguracoesService } from '../services/ConfiguracoesServices';
import { useTheme } from '@/context/theme/ThemeContext';
import type { Configuracao, ConfiguracoesFiltros, ConfiguracoesFormData } from '../types/ConfiguracoesTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const FILTROS_INICIAIS: ConfiguracoesFiltros = { pesquisa: '', categoria: '', };

const FORM_INICIAL: ConfiguracoesFormData = { nome: '', categoria: 'aparencia', valor: '', descricao: '', };

const STATUS_LABELS: Record<string, string> = { 'aparencia': 'Aparência', 'idioma': 'Idioma', 'moeda': 'Moeda', 'backup': 'Backup', 'seguranca': 'Segurança', 'notificacoes': 'Notificações' };

const STATUS_CORES: Record<string, string> = { 'aparencia': '#3b82f6', 'idioma': '#10b981', 'moeda': '#f59e0b', 'backup': '#8b5cf6', 'seguranca': '#ef4444', 'notificacoes': '#f59e0b' };

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useConfiguracoes() {
  const [filtros, setFiltros] = useState<ConfiguracoesFiltros>(FILTROS_INICIAIS);
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ConfiguracoesFormData>(FORM_INICIAL);
  const [exclusaoPendente, setExclusaoPendente] = useState<Configuracao | null>(null);
  const [detalheConfiguracao, setDetalheConfiguracao] = useState<Configuracao | null>(null);
  const [modalInfoAberto, setModalInfoAberto] = useState(false);

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = useConfiguracoesService();
  const theme = useTheme();

  const configuracoesFiltradas = useMemo(() => {
    if (!service.data) return [];
    return service.data.configuracoes.filter(item => {
      if (filtros.pesquisa && !item.nome.toLowerCase().includes(filtros.pesquisa.toLowerCase())) return false;
      if (filtros.categoria && item.categoria !== filtros.categoria) return false;
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

  const abrirModalEditar = useCallback((item: Configuracao) => {
    setFormData({
      nome: item.nome,
      categoria: item.categoria,
      valor: item.valor,
      descricao: item.descricao || '',
    });
    setEditandoId(item.id);
    setModalAberto(true);
  }, []);

  const fecharModal = useCallback(() => {
    setModalAberto(false);
    setEditandoId(null);
    setFormData(FORM_INICIAL);
  }, []);

  const atualizarFiltro = useCallback((campo: keyof ConfiguracoesFiltros, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const limparFiltros = useCallback(() => {
    setFiltros(FILTROS_INICIAIS);
  }, []);

  const atualizarForm = useCallback((campo: keyof ConfiguracoesFormData, valor: string) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const salvarConfiguracao = useCallback(() => {
    if (editandoId) {
      service.atualizar({ id: editandoId, formData });
    } else {
      service.criar(formData);
    }
    fecharModal();
  }, [editandoId, formData, service, fecharModal]);

  const confirmarExclusao = useCallback((item: Configuracao) => {
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

  const abrirDetalhe = useCallback((item: Configuracao) => {
    setDetalheConfiguracao(item);
  }, []);

  const fecharDetalhe = useCallback(() => {
    setDetalheConfiguracao(null);
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
      configuracoesFiltradas,
      isSaving: service.isSaving,
      exclusaoPendente,
      detalheConfiguracao,
      modalInfoAberto,
    },
    actions: {
      abrirModalNovo,
      abrirModalEditar,
      fecharModal,
      atualizarFiltro,
      limparFiltros,
      salvarConfiguracao,
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
