import { useState, useMemo, useCallback } from 'react';
import { despesasService } from '../services/DespesasServices';
import { useTheme } from '@/context/theme/ThemeContext';
import type { Despesa, DespesasFiltros, DespesasFormData } from '../types/DespesasTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const FILTROS_INICIAIS: DespesasFiltros = {
  pesquisa: '',
  categoria: '',
  conta: '',
  status: '',
  prioridade: '',
  dataInicio: '',
  dataFim: '',
};

const FORM_INICIAL: DespesasFormData = {
  nome: '',
  categoria: '',
  valor: '',
  conta: '',
  cartao: '',
  data: new Date().toISOString().split('T')[0],
  parcelas: '1',
  prioridade: 'media',
  observacoes: '',
};

const STATUS_LABELS: Record<Despesa['status'], string> = {
  pago: 'Pago',
  pendente: 'Pendente',
  atrasado: 'Atrasado',
};

const STATUS_CORES: Record<Despesa['status'], string> = {
  pago: '#10b981',
  pendente: '#f59e0b',
  atrasado: '#ef4444',
};

const PRIORIDADE_LABELS: Record<Despesa['prioridade'], string> = {
  baixa: 'Baixa',
  media: 'Média',
  alta: 'Alta',
};

const PRIORIDADE_CORES: Record<Despesa['prioridade'], string> = {
  baixa: '#3b82f6',
  media: '#f59e0b',
  alta: '#ef4444',
};

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useDespesas() {
  const [filtros, setFiltros] = useState<DespesasFiltros>(FILTROS_INICIAIS);
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [formData, setFormData] = useState<DespesasFormData>(FORM_INICIAL);
  const [exclusaoPendente, setExclusaoPendente] = useState<Despesa | null>(null);
  const [detalheDespesa, setDetalheDespesa] = useState<Despesa | null>(null);
  const [modalInfoAberto, setModalInfoAberto] = useState(false);

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = despesasService();
  const theme = useTheme();

  const despesasFiltradas = useMemo(() => {
    if (!service.data) return [];
    return service.data.despesas.filter(despesa => {
      if (filtros.pesquisa && !despesa.nome.toLowerCase().includes(filtros.pesquisa.toLowerCase())) {
        return false;
      }
      if (filtros.categoria && despesa.categoria !== filtros.categoria) {
        return false;
      }
      if (filtros.conta && despesa.conta !== filtros.conta) {
        return false;
      }
      if (filtros.status && despesa.status !== filtros.status) {
        return false;
      }
      if (filtros.prioridade && despesa.prioridade !== filtros.prioridade) {
        return false;
      }
      if (filtros.dataInicio && despesa.data < filtros.dataInicio) {
        return false;
      }
      if (filtros.dataFim && despesa.data > filtros.dataFim) {
        return false;
      }
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

  const abrirModalEditar = useCallback((despesa: Despesa) => {
    setFormData({
      nome: despesa.nome,
      categoria: despesa.categoria,
      valor: String(despesa.valor),
      conta: despesa.conta,
      cartao: despesa.cartao || '',
      data: despesa.data,
      parcelas: String(despesa.parcelas),
      prioridade: despesa.prioridade,
      observacoes: despesa.observacoes || '',
    });
    setEditandoId(despesa.id);
    setModalAberto(true);
  }, []);

  const fecharModal = useCallback(() => {
    setModalAberto(false);
    setEditandoId(null);
    setFormData(FORM_INICIAL);
  }, []);

  const atualizarFiltro = useCallback((campo: keyof DespesasFiltros, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const limparFiltros = useCallback(() => {
    setFiltros(FILTROS_INICIAIS);
  }, []);

  const atualizarForm = useCallback((campo: keyof DespesasFormData, valor: string) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const salvarDespesa = useCallback(() => {
    if (editandoId) {
      service.atualizar({ id: editandoId, formData });
    } else {
      service.criar(formData);
    }
    fecharModal();
  }, [editandoId, formData, service, fecharModal]);

  const confirmarExclusao = useCallback((despesa: Despesa) => {
    setExclusaoPendente(despesa);
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

  const excluirDespesa = useCallback((id: string) => {
    service.excluir(id);
  }, [service]);

  const abrirDetalhe = useCallback((despesa: Despesa) => {
    setDetalheDespesa(despesa);
  }, []);

  const fecharDetalhe = useCallback(() => {
    setDetalheDespesa(null);
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

  function getStatusLabel(status: Despesa['status']): string {
    return STATUS_LABELS[status];
  }

  function getStatusCor(status: Despesa['status']): string {
    return STATUS_CORES[status];
  }

  function getPrioridadeLabel(prioridade: Despesa['prioridade']): string {
    return PRIORIDADE_LABELS[prioridade];
  }

  function getPrioridadeCor(prioridade: Despesa['prioridade']): string {
    return PRIORIDADE_CORES[prioridade];
  }

  return {
    state: {
      data: service.data,
      isLoading: service.isLoading,
      filtros,
      modalAberto,
      editandoId,
      formData,
      despesasFiltradas,
      isSaving: service.isSaving,
      exclusaoPendente,
      detalheDespesa,
      modalInfoAberto,
    },
    actions: {
      abrirModalNovo,
      abrirModalEditar,
      fecharModal,
      atualizarFiltro,
      limparFiltros,
      salvarDespesa,
      excluirDespesa,
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
      formatarValor,
      formatarData,
      getStatusLabel,
      getStatusCor,
      getPrioridadeLabel,
      getPrioridadeCor,
    },
    theme,
  };
}