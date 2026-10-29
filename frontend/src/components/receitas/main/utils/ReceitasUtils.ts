import { useState, useMemo, useCallback } from 'react';
import { receitasService } from '../services/ReceitasServices';
import { useTheme } from '@/context/theme/ThemeContext';
import type {
  Receita,
  ReceitasFeedback,
  ReceitasFiltros,
  ReceitasFormData,
} from '../types/ReceitasTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const FILTROS_INICIAIS: ReceitasFiltros = {
  pesquisa: '',
  categoria: '',
  conta: '',
  status: '',
  dataInicio: '',
  dataFim: '',
};

const FORM_INICIAL: ReceitasFormData = {
  nome: '',
  categoria: '',
  valor: '',
  conta: '',
  data: new Date().toISOString().split('T')[0],
  recorrencia: 'unica',
  observacoes: '',
  comprovante: '',
};

const STATUS_LABELS: Record<Receita['status'], string> = {
  recebido: 'Recebido',
  pendente: 'Pendente',
  atrasado: 'Atrasado',
};

const STATUS_CORES: Record<Receita['status'], string> = {
  recebido: '#10b981',
  pendente: '#f59e0b',
  atrasado: '#ef4444',
};

const RECORRENCIA_LABELS: Record<Receita['recorrencia'], string> = {
  unica: 'Única',
  mensal: 'Mensal',
  semanal: 'Semanal',
  anual: 'Anual',
};

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useReceitas() {
  const [filtros, setFiltros] = useState<ReceitasFiltros>(FILTROS_INICIAIS);
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ReceitasFormData>(FORM_INICIAL);
  const [exclusaoPendente, setExclusaoPendente] = useState<Receita | null>(null);
  const [detalheReceita, setDetalheReceita] = useState<Receita | null>(null);
  const [modalInfoAberto, setModalInfoAberto] = useState(false);
  const [feedback, setFeedback] = useState<ReceitasFeedback | null>(null);

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = receitasService();
  const theme = useTheme();

  const receitasFiltradas = useMemo(() => {
    if (!service.data) return [];
    return service.data.receitas.filter(receita => {
      if (filtros.pesquisa && !receita.nome.toLowerCase().includes(filtros.pesquisa.toLowerCase())) {
        return false;
      }
      if (filtros.categoria && receita.categoria !== filtros.categoria) {
        return false;
      }
      if (filtros.conta && receita.conta !== filtros.conta) {
        return false;
      }
      if (filtros.status && receita.status !== filtros.status) {
        return false;
      }
      if (filtros.dataInicio && receita.data < filtros.dataInicio) {
        return false;
      }
      if (filtros.dataFim && receita.data > filtros.dataFim) {
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

  const abrirModalEditar = useCallback((receita: Receita) => {
    setFormData({
      nome: receita.nome,
      categoria: receita.categoria,
      valor: String(receita.valor),
      conta: receita.conta,
      data: receita.data,
      recorrencia: receita.recorrencia,
      observacoes: receita.observacoes || '',
      comprovante: receita.comprovante || '',
    });
    setEditandoId(receita.id);
    setModalAberto(true);
  }, []);

  const fecharModal = useCallback(() => {
    setModalAberto(false);
    setEditandoId(null);
    setFormData(FORM_INICIAL);
  }, []);

  const atualizarFiltro = useCallback((campo: keyof ReceitasFiltros, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const limparFiltros = useCallback(() => {
    setFiltros(FILTROS_INICIAIS);
  }, []);

  const atualizarForm = useCallback((campo: keyof ReceitasFormData, valor: string) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const fecharFeedback = useCallback(() => {
    setFeedback(null);
  }, []);

  const salvarReceita = useCallback(async () => {
    const payload: ReceitasFormData = {
      ...formData,
      comprovante: (formData.comprovante || '').trim(),
    };
    try {
      if (editandoId) {
        await service.atualizar({ id: editandoId, formData: payload });
      } else {
        await service.criar(payload);
      }
      setFeedback({
        tipo: 'sucesso',
        titulo: editandoId ? 'Receita atualizada' : 'Receita criada',
        mensagem: editandoId
          ? 'As alterações foram salvas com sucesso.'
          : 'Sua receita foi cadastrada com sucesso.',
      });
      fecharModal();
    } catch {
      setFeedback({
        tipo: 'erro',
        titulo: 'Não foi possível salvar',
        mensagem:
          'Verifique os campos preenchidos (valor, data e comprovante) e tente novamente.',
      });
    }
  }, [editandoId, formData, service, fecharModal]);

  const confirmarExclusao = useCallback((receita: Receita) => {
    setExclusaoPendente(receita);
  }, []);

  const cancelarExclusao = useCallback(() => {
    setExclusaoPendente(null);
  }, []);

  const confirmarEExcluir = useCallback(async () => {
    const alvo = exclusaoPendente;
    if (!alvo) return;
    try {
      await service.excluir(alvo.id);
      setFeedback({
        tipo: 'sucesso',
        titulo: 'Receita excluída',
        mensagem: `A receita "${alvo.nome}" foi removida.`,
      });
    } catch {
      setFeedback({
        tipo: 'erro',
        titulo: 'Não foi possível excluir',
        mensagem: 'Ocorreu um erro ao excluir a receita. Tente novamente.',
      });
    } finally {
      setExclusaoPendente(null);
    }
  }, [exclusaoPendente, service]);

  const abrirDetalhe = useCallback((receita: Receita) => {
    setDetalheReceita(receita);
  }, []);

  const fecharDetalhe = useCallback(() => {
    setDetalheReceita(null);
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

  function getStatusLabel(status: Receita['status']): string {
    return STATUS_LABELS[status];
  }

  function getStatusCor(status: Receita['status']): string {
    return STATUS_CORES[status];
  }

  function getRecorrenciaLabel(recorrencia: Receita['recorrencia']): string {
    return RECORRENCIA_LABELS[recorrencia];
  }

  return {
    state: {
      data: service.data,
      isLoading: service.isLoading,
      filtros,
      modalAberto,
      editandoId,
      formData,
      receitasFiltradas,
      isSaving: service.isSaving,
      exclusaoPendente,
      detalheReceita,
      modalInfoAberto,
      feedback,
    },
    actions: {
      abrirModalNovo,
      abrirModalEditar,
      fecharModal,
      atualizarFiltro,
      limparFiltros,
      salvarReceita,
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
      getStatusLabel,
      getStatusCor,
      getRecorrenciaLabel,
    },
    theme,
  };
}