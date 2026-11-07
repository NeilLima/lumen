import { useCallback, useMemo, useState } from 'react';
import { formatarValor, formatarData, parseMoeda } from '@/shared/utils/moeda';
import { useProdutosService, type ApiProduct } from '../services/ProdutosServices';

export interface Produto {
  id: string;
  nome: string;
  categoria: string;
  localCompra: string;
  preco: number;
  parcelas: number;
  dataCadastro: string;
}

export interface ProdutosFiltros {
  pesquisa: string;
  categoria: string;
  localCompra: string;
}

export interface ProdutosFormData {
  nome: string;
  categoria: string;
  localCompra: string;
  novoLocal: string;
  preco: string;
  parcelas: string;
}

export interface ProdutosResumo {
  totalProdutos: number;
  totalLocais: number;
  totalCategorias: number;
}

export interface ProdutosData {
  produtos: Produto[];
  resumo: ProdutosResumo;
  categorias: string[];
  locais: string[];
}

const FILTROS_INICIAIS: ProdutosFiltros = {
  pesquisa: '',
  categoria: '',
  localCompra: '',
};

const FORM_INICIAL: ProdutosFormData = {
  nome: '',
  categoria: '',
  localCompra: '',
  novoLocal: '',
  preco: '',
  parcelas: '1',
};

const CATEGORIAS_PADRAO = ['Alimentos', 'Bebidas', 'Limpeza', 'Higiene', 'Eletrônicos', 'Vestuário', 'Outros'];

function apiToProduto(p: ApiProduct): Produto {
  return {
    id: p.id,
    nome: p.name,
    categoria: p.category,
    localCompra: p.local || 'Não informado',
    preco: Number(p.price) || 0,
    parcelas: p.installments || 1,
    dataCadastro: new Date().toISOString().split('T')[0],
  };
}

function calcularResumo(produtos: Produto[]): ProdutosResumo {
  const totalProdutos = produtos.length;
  const totalLocais = new Set(produtos.map(p => p.localCompra)).size;
  const totalCategorias = new Set(produtos.map(p => p.categoria)).size;
  return { totalProdutos, totalLocais, totalCategorias };
}

function construirDados(produtos: Produto[]): ProdutosData {
  const categorias = [
    ...new Set([...CATEGORIAS_PADRAO, ...produtos.map(p => p.categoria)]),
  ];
  const locais = [...new Set(produtos.map(p => p.localCompra))].sort();
  return {
    produtos,
    resumo: calcularResumo(produtos),
    categorias,
    locais,
  };
}

export function useProdutosMain() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [filtros, setFiltros] = useState<ProdutosFiltros>(FILTROS_INICIAIS);
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProdutosFormData>(FORM_INICIAL);
  const [exclusaoPendente, setExclusaoPendente] = useState<Produto | null>(null);

  const service = useProdutosService();

  const produtos: Produto[] = useMemo(() => {
    const raw = (service.data as ApiProduct[] | undefined) || [];
    return raw.map(apiToProduto);
  }, [service.data]);

  const data = useMemo(() => construirDados(produtos), [produtos]);

  const produtosFiltrados = useMemo(() => {
    return produtos.filter(produto => {
      if (filtros.pesquisa && !produto.nome.toLowerCase().includes(filtros.pesquisa.toLowerCase())) {
        return false;
      }
      if (filtros.categoria && produto.categoria !== filtros.categoria) {
        return false;
      }
      if (filtros.localCompra && produto.localCompra !== filtros.localCompra) {
        return false;
      }
      return true;
    });
  }, [produtos, filtros]);

  const toggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const toggleViewMode = useCallback(() => setViewMode(prev => prev === 'card' ? 'list' : 'card'), []);

  const abrirModalNovo = useCallback(() => {
    setFormData(FORM_INICIAL);
    setEditandoId(null);
    setModalAberto(true);
  }, []);

  const abrirModalEditar = useCallback((produto: Produto) => {
    setFormData({
      nome: produto.nome,
      categoria: produto.categoria,
      localCompra: produto.localCompra,
      novoLocal: '',
      preco: formatarValor(produto.preco),
      parcelas: String(produto.parcelas),
    });
    setEditandoId(produto.id);
    setModalAberto(true);
  }, []);

  const fecharModal = useCallback(() => {
    setModalAberto(false);
    setEditandoId(null);
    setFormData(FORM_INICIAL);
  }, []);

  const atualizarFiltro = useCallback((campo: keyof ProdutosFiltros, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const limparFiltros = useCallback(() => setFiltros(FILTROS_INICIAIS), []);

  const atualizarForm = useCallback((campo: keyof ProdutosFormData, valor: string) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const salvarProduto = useCallback(async () => {
    if (!formData.nome.trim()) return;

    const localFinal =
      formData.localCompra === '__novo__'
        ? formData.novoLocal.trim() || 'Não informado'
        : formData.localCompra || 'Não informado';

    const payload = {
      name: formData.nome.trim(),
      category: formData.categoria || 'Outros',
      local: localFinal,
      price: parseMoeda(formData.preco),
      installments: Math.max(1, Number(formData.parcelas) || 1),
    };

    try {
      if (editandoId) {
        await service.atualizar({ id: editandoId, data: payload });
      } else {
        await service.criar(payload);
      }
      fecharModal();
    } catch {
      // erro tratado pelo service
    }
  }, [formData, editandoId, service, fecharModal]);

  const confirmarExclusao = useCallback((produto: Produto) => {
    setExclusaoPendente(produto);
  }, []);

  const cancelarExclusao = useCallback(() => setExclusaoPendente(null), []);

  const confirmarEExcluir = useCallback(async () => {
    if (exclusaoPendente) {
      try {
        await service.excluir(exclusaoPendente.id);
      } catch {
        // erro tratado pelo service
      }
      setExclusaoPendente(null);
    }
  }, [exclusaoPendente, service]);

  return {
    state: {
      data,
      produtosFiltrados,
      filtros,
      viewMode,
      sidebarOpen,
      modalAberto,
      editandoId,
      formData,
      exclusaoPendente,
      isLoading: service.isLoading,
    },
    actions: {
      toggleSidebar,
      closeSidebar,
      toggleViewMode,
      abrirModalNovo,
      abrirModalEditar,
      fecharModal,
      atualizarFiltro,
      limparFiltros,
      atualizarForm,
      salvarProduto,
      confirmarExclusao,
      cancelarExclusao,
      confirmarEExcluir,
    },
    helpers: {
      formatarValor,
      formatarData,
    },
  };
}
