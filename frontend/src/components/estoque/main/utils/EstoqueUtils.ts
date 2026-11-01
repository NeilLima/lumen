'use client';

import { useState, useMemo, useCallback } from 'react';
import { estoqueService } from '../services/EstoqueServices';
import type { EstoqueItem, EstoqueFiltros, EstoqueFormData, EstoqueFeedback } from '../types/EstoqueTypes';
import { formatarValor, formatarData, parseMoeda } from '@/shared/utils/moeda';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const FILTROS_INICIAIS: EstoqueFiltros = {
  pesquisa: '',
  categoria: '',
  localCompra: '',
  status: '',
};

const FORM_INICIAL: EstoqueFormData = {
  produtoCatalogoId: '',
  nome: '',
  categoria: '',
  localCompra: '',
  quantidade: '',
  unidade: 'un',
  preco: '',
  quantidadeMinima: '',
};

const STATUS_CORES: Record<string, string> = {
  ok: '#10b981',
  baixo: '#f59e0b',
  critico: '#ef4444',
};

const STATUS_LABELS: Record<string, string> = {
  ok: 'Estoque OK',
  baixo: 'Baixo',
  critico: 'Crítico',
};

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useEstoqueUtils() {
  const [filtros, setFiltros] = useState<EstoqueFiltros>(FILTROS_INICIAIS);
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [formData, setFormData] = useState<EstoqueFormData>(FORM_INICIAL);
  const [exclusaoPendente, setExclusaoPendente] = useState<EstoqueItem | null>(null);
  const [detalheItem, setDetalheItem] = useState<EstoqueItem | null>(null);
  const [modalInfoAberto, setModalInfoAberto] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [feedback, setFeedback] = useState<EstoqueFeedback | null>(null);

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = estoqueService();

  const itens = useMemo(() => service.data?.itens || [], [service.data]);

  const itensFiltrados = useMemo(() => {
    return itens.filter(item => {
      if (filtros.pesquisa && !item.nome.toLowerCase().includes(filtros.pesquisa.toLowerCase())) {
        return false;
      }
      if (filtros.categoria && item.categoria !== filtros.categoria) return false;
      if (filtros.localCompra && item.localCompra !== filtros.localCompra) return false;
      if (filtros.status) {
        const pct = item.quantidadeMinima > 0 ? (item.quantidade / item.quantidadeMinima) * 100 : 100;
        if (filtros.status === 'ok' && pct < 70) return false;
        if (filtros.status === 'baixo' && (pct < 30 || pct >= 70)) return false;
        if (filtros.status === 'critico' && pct >= 30) return false;
      }
      return true;
    });
  }, [itens, filtros]);
  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const toggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  const abrirModalNovo = useCallback(() => {
    setFormData(FORM_INICIAL);
    setEditandoId(null);
    setModalAberto(true);
  }, []);

  const abrirModalEditar = useCallback((item: EstoqueItem) => {
    setFormData({
      produtoCatalogoId: '',
      nome: item.nome,
      categoria: item.categoria,
      localCompra: item.localCompra,
      quantidade: String(item.quantidade),
      unidade: item.unidade,
      preco: formatarValor(item.preco),
      quantidadeMinima: String(item.quantidadeMinima),
    });
    setEditandoId(item.id);
    setModalAberto(true);
  }, []);

  const fecharModal = useCallback(() => {
    setModalAberto(false);
    setEditandoId(null);
    setFormData(FORM_INICIAL);
  }, []);

  const atualizarFiltro = useCallback((campo: keyof EstoqueFiltros, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const limparFiltros = useCallback(() => setFiltros(FILTROS_INICIAIS), []);

  const atualizarForm = useCallback((campo: keyof EstoqueFormData, valor: string) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const salvarItem = useCallback(async () => {
    if (!formData.nome.trim()) return;

    try {
      if (editandoId) {
        await service.atualizar({ id: editandoId, fd: formData });
        setFeedback({ tipo: 'sucesso', titulo: 'Item atualizado', mensagem: 'O item foi atualizado com sucesso.' });
      } else {
        await service.criar(formData);
        setFeedback({ tipo: 'sucesso', titulo: 'Item criado', mensagem: 'O item foi cadastrado com sucesso.' });
      }
      fecharModal();
    } catch {
      setFeedback({ tipo: 'erro', titulo: 'Não foi possível salvar', mensagem: 'Ocorreu um erro ao salvar o item. Tente novamente.' });
    }
  }, [formData, service, fecharModal, editandoId]);

  const confirmarExclusao = useCallback((item: EstoqueItem) => {
    setExclusaoPendente(item);
  }, []);

  const cancelarExclusao = useCallback(() => setExclusaoPendente(null), []);

  const confirmarEExcluir = useCallback(async () => {
    if (exclusaoPendente) {
      try {
        await service.excluir(exclusaoPendente.id);
        setFeedback({ tipo: 'sucesso', titulo: 'Item excluído', mensagem: `O item "${exclusaoPendente.nome}" foi removido.` });
      } catch {
        setFeedback({ tipo: 'erro', titulo: 'Não foi possível excluir', mensagem: 'Ocorreu um erro ao excluir o item. Tente novamente.' });
      } finally {
        setExclusaoPendente(null);
      }
    }
  }, [exclusaoPendente, service]);

  const excluirItem = useCallback((id: string) => {
    service.excluir(id);
  }, [service]);

  const abrirDetalhe = useCallback((item: EstoqueItem) => {
    setDetalheItem(item);
  }, []);

  const fecharDetalhe = useCallback(() => setDetalheItem(null), []);

  const abrirInfo = useCallback(() => setModalInfoAberto(true), []);
  const fecharInfo = useCallback(() => setModalInfoAberto(false), []);
  const fecharFeedback = useCallback(() => setFeedback(null), []);

  function getStatusCor(quantidade: number, minima: number): string {
    const pct = minima > 0 ? (quantidade / minima) * 100 : 100;
    if (pct >= 70) return STATUS_CORES.ok;
    if (pct >= 30) return STATUS_CORES.baixo;
    return STATUS_CORES.critico;
  }

  function getStatusLabel(quantidade: number, minima: number): string {
    const pct = minima > 0 ? (quantidade / minima) * 100 : 100;
    if (pct >= 70) return STATUS_LABELS.ok;
    if (pct >= 30) return STATUS_LABELS.baixo;
    return STATUS_LABELS.critico;
  }

  return {
    state: {
      data: service.data,
      isLoading: service.isLoading,
      filtros,
      itensFiltrados,
      sidebarOpen,
      modalAberto,
      editandoId,
      formData,
      exclusaoPendente,
      detalheItem,
      modalInfoAberto,
      isSaving: service.isSaving,
    feedback,

    },
    actions: {
      toggleSidebar,
      closeSidebar,
      abrirModalNovo,
      abrirModalEditar,
      fecharModal,
      atualizarFiltro,
      limparFiltros,
      salvarItem,
      excluirItem,
      atualizarForm,
      confirmarExclusao,
      cancelarExclusao,
      confirmarEExcluir,
      abrirDetalhe,
      fecharDetalhe,
      abrirInfo,
      fecharInfo,
    fecharFeedback,

    },
    helpers: {
      formatarValor,
      formatarData,
      getStatusCor,
      getStatusLabel,
    },
  };
}