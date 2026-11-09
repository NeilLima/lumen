'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { list } from '@/services/crudService';
import { comprasService } from '../services/ComprasServices';
import { useTheme } from '@/context/theme/ThemeContext';
import type { Compra, CompraFilters, CreateCompraPayload, ContaOpcao } from '../types/ComprasTypes';

// ============================================
// 1 VARI�VEIS
// ============================================
const FILTROS_INICIAIS: CompraFilters = { pesquisa: '', statusPagamento: '' };

const FORM_INICIAL: CreateCompraPayload = { local: '', statusPagamento: 'pendente', accountId: '', itens: [] };

const STATUS_LABELS: Record<string, string> = {
  pago: 'Pago',
  pendente: 'Pendente',
};

const STATUS_CORES: Record<string, string> = {
  pago: '#10b981',
  pendente: '#f59e0b',
};

// ============================================
// 2 ESTADOS
// ============================================
export function useComprasUtils() {
  const [filtros, setFiltros] = useState<CompraFilters>(FILTROS_INICIAIS);
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateCompraPayload>(FORM_INICIAL);
  const [exclusaoPendente, setExclusaoPendente] = useState<Compra | null>(null);
  const [detalheCompra, setDetalheCompra] = useState<Compra | null>(null);
  const [modalInfoAberto, setModalInfoAberto] = useState(false);
  const [itemNome, setItemNome] = useState('');
  const [itemQtd, setItemQtd] = useState(1);
  const [itemPreco, setItemPreco] = useState(0);
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [showLocalSelector, setShowLocalSelector] = useState(false);

  // ============================================
  // 3 OBJETOS
  // ============================================
  const service = comprasService();
  const theme = useTheme();

  const [produtos, setProdutos] = useState<any[]>([]);
  const [locais, setLocais] = useState<any[]>([]);
  const [contas, setContas] = useState<ContaOpcao[]>([]);

  useEffect(() => {
    list('products')
      .then((data) => {
        const arr = Array.isArray(data) ? data : (data?.data || []);
        const mapped = arr.map((p: any) => ({
          id: p.id,
          nome: p.name,
          categoria: p.category,
          localCompra: p.local || '',
          preco: Number(p.price) || 0,
        }));
        setProdutos(mapped);
        setLocais([...new Set(mapped.map((p: any) => p.localCompra).filter(Boolean))]);
      })
      .catch(() => {});

    list('accounts')
      .then((data) => {
        const arr = Array.isArray(data) ? data : (data?.data || []);
        setContas(
          arr.map((a: any) => ({
            id: a.id,
            name: a.name,
            balance: Number(a.balance) || 0,
          }))
        );
      })
      .catch(() => {});
  }, []);

  const comprasFiltradas = useMemo(() => {
    if (!service.data) return [];
    return service.data.compras.filter((compra: Compra) => {
      if (filtros.pesquisa && !(compra.local || '').toLowerCase().includes(filtros.pesquisa.toLowerCase())) {
        return false;
      }
      if (filtros.statusPagamento && compra.statusPagamento !== filtros.statusPagamento) {
        return false;
      }
      return true;
    });
  }, [service.data, filtros]);

  // ============================================
  // 4 FUN��ES
  // ============================================
  const abrirModalNovo = useCallback(() => {
    setFormData(FORM_INICIAL);
    setEditandoId(null);
    setModalAberto(true);
    setShowProductSelector(false);
    setShowLocalSelector(false);
    setItemNome('');
    setItemQtd(1);
    setItemPreco(0);
  }, []);

  const abrirModalEditar = useCallback((compra: Compra) => {
    setFormData({
      local: compra.local || '',
      statusPagamento: compra.statusPagamento || 'pendente',
      accountId: compra.accountId || '',
      itens: (compra.itens || []).map(i => ({ productId: i.productId || undefined, nome: i.nome, quantidade: i.quantidade, unidade: i.unidade, precoUnitario: i.precoUnitario })),
    });
    setEditandoId(compra.id);
    setModalAberto(true);
  }, []);

  const fecharModal = useCallback(() => {
    setModalAberto(false);
    setEditandoId(null);
    setFormData(FORM_INICIAL);
    setShowProductSelector(false);
    setShowLocalSelector(false);
    setItemNome('');
    setItemQtd(1);
    setItemPreco(0);
  }, []);

  const atualizarFiltro = useCallback((campo: keyof CompraFilters, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const limparFiltros = useCallback(() => {
    setFiltros(FILTROS_INICIAIS);
  }, []);

  const atualizarForm = useCallback((campo: keyof CreateCompraPayload, valor: any) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const addItem = useCallback((nomeArg?: string, qtdArg?: number, precoArg?: number) => {
    // Ignora chamadas acidentais com evento do DOM (ex.: onClick sem wrapper)
    const nomeInput = typeof nomeArg === 'string' ? nomeArg : undefined;
    const qtdInput = typeof qtdArg === 'number' ? qtdArg : undefined;
    const precoInput = typeof precoArg === 'number' ? precoArg : undefined;

    const nome = nomeInput !== undefined ? nomeInput : itemNome;
    const qtd = qtdInput !== undefined ? qtdInput : itemQtd;

    if (!nome) return;

    // Buscar produto no catalogo pelo nome para obter preco correto
    const produtoCatalogo = produtos.find((p: any) => p.nome === nome);

    // Preco: prioridade para precoArg, depois preco do catalogo, depois itemPreco
    const preco = precoInput !== undefined
      ? precoInput
      : (produtoCatalogo?.preco !== undefined ? Number(produtoCatalogo.preco) : itemPreco);

    setFormData(prev => ({ ...prev, itens: [...prev.itens, {
      nome,
      quantidade: qtd,
      precoUnitario: preco,
      unidade: 'un',
      productId: undefined, // produtos do catalogo local não são produtos do banco
    }] }));

    // Resetar nome e qtd, preservar preco para proximo item
    setItemNome('');
    setItemQtd(1);
  }, [itemNome, itemQtd, itemPreco, produtos]);

  const removeItem = useCallback((idx: number) => {
    setFormData(prev => ({ ...prev, itens: prev.itens.filter((_, i) => i !== idx) }));
  }, []);

  const salvarCompra = useCallback(() => {
    // Se houver um item pendente (produto selecionado mas nao adicionado), inclui automaticamente
    let payload = formData;
    if (itemNome.trim() || itemPreco > 0) {
      const nome = itemNome.trim() || 'Item';
      const produtoCatalogo = produtos.find((p: any) => p.nome === nome);
      const preco = produtoCatalogo?.preco !== undefined ? Number(produtoCatalogo.preco) : itemPreco;
      const item = {
        nome,
        quantidade: itemQtd > 0 ? itemQtd : 1,
        precoUnitario: preco,
        unidade: 'un',
      };
      payload = { ...formData, itens: [...(formData.itens || []), item] };
    }

    if (editandoId) {
      service.atualizar({ id: editandoId, payload });
    } else {
      service.criar(payload);
    }
    fecharModal();
  }, [editandoId, formData, itemNome, itemQtd, itemPreco, produtos, service, fecharModal]);

  const confirmarExclusao = useCallback((compra: Compra) => {
    setExclusaoPendente(compra);
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

  const excluirCompra = useCallback((id: string) => {
    service.excluir(id);
  }, [service]);

  const abrirDetalhe = useCallback((compra: Compra) => {
    setDetalheCompra(compra);
  }, []);

  const fecharDetalhe = useCallback(() => {
    setDetalheCompra(null);
  }, []);

  const abrirInfo = useCallback(() => {
    setModalInfoAberto(true);
  }, []);

  const fecharInfo = useCallback(() => {
    setModalInfoAberto(false);
  }, []);

  function formatarValor(valor: number): string {
    return (valor || 0).toLocaleString('pt-BR', {
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
    return STATUS_CORES[status] || '#a0a0b0';
  }

  return {
    state: {
      data: service.data,
      isLoading: service.isLoading,
      filtros,
      modalAberto,
      editandoId,
      formData,
      comprasFiltradas,
      isSaving: service.isSaving,
      exclusaoPendente,
      detalheCompra,
      modalInfoAberto,
      itemNome,
      itemQtd,
      itemPreco,
      showProductSelector,
      showLocalSelector,
      produtos,
      locais,
      contas,
    },
    actions: {
      abrirModalNovo,
      abrirModalEditar,
      fecharModal,
      atualizarFiltro,
      limparFiltros,
      salvarCompra,
      excluirCompra,
      atualizarForm,
      addItem,
      removeItem,
      confirmarExclusao,
      cancelarExclusao,
      confirmarEExcluir,
      abrirDetalhe,
      fecharDetalhe,
      abrirInfo,
      fecharInfo,
      setItemNome,
      setItemQtd,
      setItemPreco,
      setShowProductSelector,
      setShowLocalSelector,
    },
    helpers: {
      formatarValor,
      formatarData,
      getStatusLabel,
      getStatusCor,
    },
    theme,
  };
}
