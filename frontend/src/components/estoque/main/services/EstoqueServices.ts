import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { list, create, update, remove } from '@/services/crudService';
import type { EstoqueItem, EstoqueData, EstoqueSubmitData, EstoqueCompraItemOption, EstoqueCompraApi, EstoqueProductApi } from '../types/EstoqueTypes';

function calcularResumo(itens: EstoqueItem[]): EstoqueData {
  const categorias = [...new Set(itens.map(i => i.categoria))].sort();
  const locais = [...new Set(itens.map(i => i.localCompra))].sort();
  return { itens, categorias, locais };
}

export function estoqueService() {
const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['estoque'],
    queryFn: async () => {
      // Padrão: busca do próprio API do Estoque (dados reais)
      const r = await list('estoque');
      return calcularResumo(r as EstoqueItem[]);
    },
    staleTime: 5 * 60 * 1000,
  });

  // Itens de compras do usuário — fonte para cadastrar estoque (regra 14: reuso do módulo Compras)
  const { data: itensCompra = [] } = useQuery({
    queryKey: ['estoque', 'itens-compra'],
    queryFn: async (): Promise<EstoqueCompraItemOption[]> => {
      const [compras, produtos] = await Promise.all([
        list('compras') as Promise<EstoqueCompraApi[]>,
        list('products') as Promise<EstoqueProductApi[]>,
      ]);
      const produtosArr = Array.isArray(produtos) ? produtos : [];
      const categoriaPorProdutoId = new Map(produtosArr.map(p => [p.id, p.category]));
      const categoriaPorNome = new Map(
        produtosArr.map(p => [p.name.trim().toLowerCase(), p.category])
      );
      return (Array.isArray(compras) ? compras : []).flatMap(compra =>
        (compra.itens || []).map(item => ({
          id: item.id,
          compraId: compra.id,
          nome: item.nome,
          categoria:
            item.product?.category ??
            (item.productId ? categoriaPorProdutoId.get(item.productId) : undefined) ??
            categoriaPorNome.get(item.nome.trim().toLowerCase()) ??
            '',
          quantidade: Number(item.quantidade) || 0,
          unidade: item.unidade || 'un',
          preco: Number(item.precoUnitario) || 0,
          localCompra: compra.local || '',
          dataCompra: compra.dataCompra || '',
        }))
      );
    },
    staleTime: 5 * 60 * 1000,
  });

  const criar = useMutation({
    mutationFn: async (fd: EstoqueSubmitData) =>
      create('estoque', fd as unknown as Record<string, unknown>),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['estoque'] }); },
  });

  const atualizar = useMutation({
    mutationFn: async ({ id, fd }: { id: string; fd: EstoqueSubmitData }) =>
      update('estoque', id, fd as unknown as Record<string, unknown>),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['estoque'] }); },
  });

  const excluir = useMutation({
    mutationFn: async (id: string) => remove('estoque', id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['estoque'] }); },
  });

  return {
    data,
    itensCompra,
    isLoading,
    criar: criar.mutateAsync,
    atualizar: atualizar.mutateAsync,
    excluir: excluir.mutateAsync,
    isSaving: criar.isPending || atualizar.isPending,
  };
}