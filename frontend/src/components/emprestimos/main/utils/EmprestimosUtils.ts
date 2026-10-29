import { useState, useMemo, useCallback } from 'react';
import { emprestimosService } from '../services/EmprestimosServices';
import { useTheme } from '@/context/theme/ThemeContext';
import type { Emprestimo, EmprestimosFiltros, EmprestimosFormData } from '../types/EmprestimosTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const FILTROS_INICIAIS: EmprestimosFiltros = { pesquisa: '', situacao: '', tipo: '', };

const FORM_INICIAL: EmprestimosFormData = { nome: '', tipo: 'feito', valor: '', juros: '0', parcelas: '1', parcelasPagas: '0', dataVencimento: new Date().toISOString().split('T')[0], situacao: 'em_dia', observacoes: '', };

const STATUS_LABELS: Record<string, string> = { 'em_dia': 'Em Dia', 'atrasada': 'Atrasada', 'quitada': 'Quitada' };

const STATUS_CORES: Record<string, string> = { 'em_dia': '#3b82f6', 'atrasada': '#ef4444', 'quitada': '#10b981' };

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useEmprestimos() {
  const [filtros, setFiltros] = useState<EmprestimosFiltros>(FILTROS_INICIAIS);
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [formData, setFormData] = useState<EmprestimosFormData>(FORM_INICIAL);
  const [exclusaoPendente, setExclusaoPendente] = useState<Emprestimo | null>(null);
  const [detalheEmprestimo, setDetalheEmprestimo] = useState<Emprestimo | null>(null);
  const [modalInfoAberto, setModalInfoAberto] = useState(false);

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = emprestimosService();
  const theme = useTheme();

  const emprestimosFiltradas = useMemo(() => {
    if (!service.data) return [];
    return service.data.emprestimos.filter(item => {
      if (filtros.pesquisa && !item.nome.toLowerCase().includes(filtros.pesquisa.toLowerCase())) return false;
      if (filtros.situacao && item.situacao !== filtros.situacao) return false;
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

  const abrirModalEditar = useCallback((item: Emprestimo) => {
    setFormData({
      nome: item.nome,
      tipo: item.tipo,
      valor: String(item.valor),
      juros: String(item.juros),
      parcelas: String(item.parcelas),
      parcelasPagas: String(item.parcelasPagas),
      dataVencimento: item.dataVencimento,
      situacao: item.situacao,
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

  const atualizarFiltro = useCallback((campo: keyof EmprestimosFiltros, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const limparFiltros = useCallback(() => {
    setFiltros(FILTROS_INICIAIS);
  }, []);

  const atualizarForm = useCallback((campo: keyof EmprestimosFormData, valor: string) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const salvarEmprestimo = useCallback(() => {
    if (editandoId) {
      service.atualizar({ id: editandoId, formData });
    } else {
      service.criar(formData);
    }
    fecharModal();
  }, [editandoId, formData, service, fecharModal]);

  const confirmarExclusao = useCallback((item: Emprestimo) => {
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

  const abrirDetalhe = useCallback((item: Emprestimo) => {
    setDetalheEmprestimo(item);
  }, []);

  const fecharDetalhe = useCallback(() => {
    setDetalheEmprestimo(null);
  }, []);

  const abrirInfo = useCallback(() => {
    setModalInfoAberto(true);
  }, []);

  const fecharInfo = useCallback(() => {
    setModalInfoAberto(false);
  }, []);

  function formatarValor(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function formatarData(data: string): string {
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

  function calcularProgresso(pagas: number, total: number): number {
    return total > 0 ? Math.round((pagas / total) * 100) : 0;
  }

  return {
    state: {
      data: service.data,
      isLoading: service.isLoading,
      filtros,
      modalAberto,
      editandoId,
      formData,
      emprestimosFiltradas,
      isSaving: service.isSaving,
      exclusaoPendente,
      detalheEmprestimo,
      modalInfoAberto,
    },
    actions: {
      abrirModalNovo,
      abrirModalEditar,
      fecharModal,
      atualizarFiltro,
      limparFiltros,
      salvarEmprestimo,
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
      formatarValor, formatarData, getStatusLabel, getStatusCor, calcularProgresso,
    },
    theme,
  };
}
