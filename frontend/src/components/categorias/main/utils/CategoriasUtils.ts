import { useState, useMemo, useCallback } from 'react';
import { useCategoriasService } from '../services/CategoriasServices';
import { useTheme } from '@/context/theme/ThemeContext';
import type { Categoria, CategoriasFiltros, CategoriasFormData } from '../types/CategoriasTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const FILTROS_INICIAIS: CategoriasFiltros = { pesquisa: '', tipo: '', };

const FORM_INICIAL: CategoriasFormData = { nome: '', icone: '', cor: '', tipo: 'despesa', descricao: '', };

const STATUS_LABELS: Record<string, string> = { 'despesa': 'Despesa', 'receita': 'Receita', 'ambos': 'Ambos' };

const STATUS_CORES: Record<string, string> = { 'despesa': '#ef4444', 'receita': '#10b981', 'ambos': '#3b82f6' };

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useCategorias() {
  const [filtros, setFiltros] = useState<CategoriasFiltros>(FILTROS_INICIAIS);
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [formData, setFormData] = useState<CategoriasFormData>(FORM_INICIAL);
  const [exclusaoPendente, setExclusaoPendente] = useState<Categoria | null>(null);
  const [detalheCategoria, setDetalheCategoria] = useState<Categoria | null>(null);
  const [modalInfoAberto, setModalInfoAberto] = useState(false);

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = useCategoriasService();
  const theme = useTheme();

  const categoriasFiltradas = useMemo(() => {
    if (!service.data) return [];
    return service.data.categorias.filter(item => {
      if (filtros.pesquisa && !item.nome.toLowerCase().includes(filtros.pesquisa.toLowerCase())) return false;
      if (filtros.tipo && item.tipo !== filtros.tipo) return false;
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

  const abrirModalEditar = useCallback((item: Categoria) => {
    setFormData({
      nome: item.nome,
      icone: item.icone,
      cor: item.cor,
      tipo: item.tipo,
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

  const atualizarFiltro = useCallback((campo: keyof CategoriasFiltros, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const limparFiltros = useCallback(() => {
    setFiltros(FILTROS_INICIAIS);
  }, []);

  const atualizarForm = useCallback((campo: keyof CategoriasFormData, valor: string) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const salvarCategoria = useCallback(() => {
    if (editandoId) {
      service.atualizar({ id: editandoId, formData });
    } else {
      service.criar(formData);
    }
    fecharModal();
  }, [editandoId, formData, service, fecharModal]);

  const confirmarExclusao = useCallback((item: Categoria) => {
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

  const abrirDetalhe = useCallback((item: Categoria) => {
    setDetalheCategoria(item);
  }, []);

  const fecharDetalhe = useCallback(() => {
    setDetalheCategoria(null);
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
      categoriasFiltradas,
      isSaving: service.isSaving,
      exclusaoPendente,
      detalheCategoria,
      modalInfoAberto,
    },
    actions: {
      abrirModalNovo,
      abrirModalEditar,
      fecharModal,
      atualizarFiltro,
      limparFiltros,
      salvarCategoria,
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
