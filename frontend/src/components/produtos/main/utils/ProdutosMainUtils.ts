import { useCallback, useMemo, useState } from 'react';
import { formatarValor, formatarData, parseMoeda } from '@/shared/utils/moeda';
import { salvarCatalogo, ProdutoCatalogo } from '@/shared/catalogo/catalogoService';

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
  valorTotal: number;
  gastoMensal: number;
  parcelados: number;
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

const MOCK_PRODUTOS: Produto[] = [
  { id: 'p1', nome: 'Arroz Tipo 1 (5kg)', categoria: 'Alimentos', localCompra: 'Supermercado Extra', preco: 27.9, parcelas: 1, dataCadastro: '2026-09-10' },
  { id: 'p2', nome: 'Feijão Carioca (1kg)', categoria: 'Alimentos', localCompra: 'Supermercado Extra', preco: 8.5, parcelas: 1, dataCadastro: '2026-09-10' },
  { id: 'p3', nome: 'Óleo de Soja (900ml)', categoria: 'Alimentos', localCompra: 'Atacado Z', preco: 7.9, parcelas: 1, dataCadastro: '2026-09-15' },
  { id: 'p4', nome: 'Café Torrado e Moído (500g)', categoria: 'Alimentos', localCompra: 'Padaria Central', preco: 18.9, parcelas: 3, dataCadastro: '2026-10-01' },
  { id: 'p5', nome: 'Detergente Neutro', categoria: 'Limpeza', localCompra: 'Mercado Y', preco: 2.49, parcelas: 1, dataCadastro: '2026-10-02' },
  { id: 'p6', nome: 'Sabão em Pó (1,6kg)', categoria: 'Limpeza', localCompra: 'Atacado Z', preco: 15.9, parcelas: 2, dataCadastro: '2026-10-05' },
  { id: 'p7', nome: 'Papel Higiênico (12 rolos)', categoria: 'Higiene', localCompra: 'Atacado Z', preco: 21.9, parcelas: 3, dataCadastro: '2026-10-08' },
];

const CATEGORIAS_PADRAO = ['Alimentos', 'Bebidas', 'Limpeza', 'Higiene', 'Eletrônicos', 'Vestuário', 'Outros'];

function calcularResumo(produtos: Produto[]): ProdutosResumo {
  const totalProdutos = produtos.length;
  const valorTotal = produtos.reduce((acc, p) => acc + p.preco, 0);
  // Quanto sai neste mês: à vista integral ou 1x do parcelado
  const gastoMensal = produtos.reduce(
    (acc, p) => acc + (p.parcelas > 1 ? p.preco / p.parcelas : p.preco),
    0
  );
  const parcelados = produtos.filter(p => p.parcelas > 1).length;
  return { totalProdutos, valorTotal, gastoMensal, parcelados };
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

function sincronizarCatalogo(produtos: Produto[]): void {
  const catalogo: ProdutoCatalogo[] = produtos.map(p => ({
    id: p.id,
    nome: p.nome,
    categoria: p.categoria,
    localCompra: p.localCompra,
    preco: p.preco,
  }));
  salvarCatalogo(catalogo);
}

export function useProdutosMain() {
  const [produtos, setProdutos] = useState<Produto[]>(MOCK_PRODUTOS);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filtros, setFiltros] = useState<ProdutosFiltros>(FILTROS_INICIAIS);
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProdutosFormData>(FORM_INICIAL);
  const [exclusaoPendente, setExclusaoPendente] = useState<Produto | null>(null);

  const data = useMemo(() => construirDados(produtos), [produtos]);

  const produtosFiltrados = useMemo(() => {
    return produtos.filter(p => {
      if (filtros.pesquisa && !p.nome.toLowerCase().includes(filtros.pesquisa.toLowerCase())) {
        return false;
      }
      if (filtros.categoria && p.categoria !== filtros.categoria) return false;
      // Selecionar um local no select carrega apenas os produtos daquele local
      if (filtros.localCompra && p.localCompra !== filtros.localCompra) return false;
      return true;
    });
  }, [produtos, filtros]);

  // ============================================
  // AÇÕES
  // ============================================
  const toggleSidebar = useCallback(() => setSidebarOpen(p => !p), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

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

  const salvarProduto = useCallback(() => {
    if (!formData.nome.trim()) return;

    // Local novo digitado tem prioridade sobre o select
    const localFinal =
      formData.localCompra === '__novo__'
        ? formData.novoLocal.trim() || 'Não informado'
        : formData.localCompra || 'Não informado';

    const base = {
      nome: formData.nome.trim(),
      categoria: formData.categoria || 'Outros',
      localCompra: localFinal,
      preco: parseMoeda(formData.preco),
      parcelas: Math.max(1, Number(formData.parcelas) || 1),
    };

    setProdutos(prev => {
      let atualizados: Produto[];
      if (editandoId) {
        atualizados = prev.map(p => (p.id === editandoId ? { ...p, ...base } : p));
      } else {
        const novo: Produto = {
          id: String(Date.now()),
          dataCadastro: new Date().toISOString().split('T')[0],
          ...base,
        };
        atualizados = [novo, ...prev];
      }
      sincronizarCatalogo(atualizados);
      return atualizados;
    });

    fecharModal();
  }, [formData, editandoId, fecharModal]);

  const confirmarExclusao = useCallback((produto: Produto) => {
    setExclusaoPendente(produto);
  }, []);

  const cancelarExclusao = useCallback(() => setExclusaoPendente(null), []);

  const confirmarEExcluir = useCallback(() => {
    if (exclusaoPendente) {
      setProdutos(prev => {
        const atualizados = prev.filter(p => p.id !== exclusaoPendente.id);
        sincronizarCatalogo(atualizados);
        return atualizados;
      });
      setExclusaoPendente(null);
    }
  }, [exclusaoPendente]);

  return {
    state: {
      data,
      produtosFiltrados,
      filtros,
      sidebarOpen,
      modalAberto,
      editandoId,
      formData,
      exclusaoPendente,
      isLoading: false,
    },
    actions: {
      toggleSidebar,
      closeSidebar,
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
