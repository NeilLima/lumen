import { useState, useMemo, useCallback } from 'react';
import { cartoesService } from '../services/CartoesServices';
import type { Cartao, CartoesFiltros, CartoesFormData } from '../types/CartoesTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const FILTROS_INICIAIS: CartoesFiltros = {
  pesquisa: '',
  bandeira: '',
  banco: '',
  status: '',
};

const FORM_INICIAL: CartoesFormData = {
  nome: '',
  bandeira: 'visa',
  banco: '',
  limiteTotal: '',
  melhorDiaCompra: '',
  dataVencimento: '',
  cor: '#8b5cf6',
};

const BANDEIRA_LABELS: Record<Cartao['bandeira'], string> = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  elo: 'Elo',
  amex: 'Amex',
  hipercard: 'Hipercard',
  outros: 'Outros',
};

const BANDEIRA_CORES: Record<Cartao['bandeira'], string> = {
  visa: '#1a1f71',
  mastercard: '#eb001b',
  elo: '#f15a24',
  amex: '#2e77bc',
  hipercard: '#a100ff',
  outros: '#6b7280',
};

const STATUS_LABELS: Record<Cartao['status'], string> = {
  ativo: 'Ativo',
  bloqueado: 'Bloqueado',
  cancelado: 'Cancelado',
};

const STATUS_CORES: Record<Cartao['status'], string> = {
  ativo: '#10b981',
  bloqueado: '#f59e0b',
  cancelado: '#ef4444',
};

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useCartoes() {
  const [filtros, setFiltros] = useState<CartoesFiltros>(FILTROS_INICIAIS);
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [formData, setFormData] = useState<CartoesFormData>(FORM_INICIAL);
  const [exclusaoPendente, setExclusaoPendente] = useState<Cartao | null>(null);
  const [detalheCartao, setDetalheCartao] = useState<Cartao | null>(null);
  const [modalInfoAberto, setModalInfoAberto] = useState(false);

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = cartoesService();

  const cartoesFiltrados = useMemo(() => {
    if (!service.data) return [];
    return service.data.cartoes.filter(cartao => {
      if (filtros.pesquisa && !cartao.nome.toLowerCase().includes(filtros.pesquisa.toLowerCase())) {
        return false;
      }
      if (filtros.bandeira && cartao.bandeira !== filtros.bandeira) {
        return false;
      }
      if (filtros.banco && cartao.banco !== filtros.banco) {
        return false;
      }
      if (filtros.status && cartao.status !== filtros.status) {
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

  const abrirModalEditar = useCallback((cartao: Cartao) => {
    setFormData({
      nome: cartao.nome,
      bandeira: cartao.bandeira,
      banco: cartao.banco,
      limiteTotal: String(cartao.limiteTotal),
      melhorDiaCompra: String(cartao.melhorDiaCompra),
      dataVencimento: String(cartao.dataVencimento),
      cor: cartao.cor,
    });
    setEditandoId(cartao.id);
    setModalAberto(true);
  }, []);

  const fecharModal = useCallback(() => {
    setModalAberto(false);
    setEditandoId(null);
    setFormData(FORM_INICIAL);
  }, []);

  const atualizarFiltro = useCallback((campo: keyof CartoesFiltros, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const limparFiltros = useCallback(() => {
    setFiltros(FILTROS_INICIAIS);
  }, []);

  const atualizarForm = useCallback((campo: keyof CartoesFormData, valor: string) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const salvarCartao = useCallback(() => {
    if (editandoId) {
      service.atualizar({ id: editandoId, formData });
    } else {
      service.criar(formData);
    }
    fecharModal();
  }, [editandoId, formData, service, fecharModal]);

  const confirmarExclusao = useCallback((cartao: Cartao) => {
    setExclusaoPendente(cartao);
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

  const excluirCartao = useCallback((id: string) => {
    service.excluir(id);
  }, [service]);

  const abrirDetalhe = useCallback((cartao: Cartao) => {
    setDetalheCartao(cartao);
  }, []);

  const fecharDetalhe = useCallback(() => {
    setDetalheCartao(null);
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

  function getBandeiraLabel(bandeira: Cartao['bandeira']): string {
    return BANDEIRA_LABELS[bandeira];
  }

  function getBandeiraCor(bandeira: Cartao['bandeira']): string {
    return BANDEIRA_CORES[bandeira];
  }

  function getStatusLabel(status: Cartao['status']): string {
    return STATUS_LABELS[status];
  }

  function getStatusCor(status: Cartao['status']): string {
    return STATUS_CORES[status];
  }

  function formatarLimite(valor: number): string {
    return formatarValor(valor);
  }

  return {
    state: {
      data: service.data,
      isLoading: service.isLoading,
      filtros,
      modalAberto,
      editandoId,
      formData,
      cartoesFiltrados,
      isSaving: service.isSaving,
      exclusaoPendente,
      detalheCartao,
      modalInfoAberto,
    },
    actions: {
      abrirModalNovo,
      abrirModalEditar,
      fecharModal,
      atualizarFiltro,
      limparFiltros,
      salvarCartao,
      excluirCartao,
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
      getBandeiraLabel,
      getBandeiraCor,
      getStatusLabel,
      getStatusCor,
      formatarLimite,
    },
  };
}