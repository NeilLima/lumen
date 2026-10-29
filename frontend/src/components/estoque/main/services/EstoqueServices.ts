import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { list, create, update, remove } from '@/services/crudService';
import type { EstoqueItem, EstoqueData, EstoqueFormData } from '../types/EstoqueTypes';

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
      try {
        const r = await list('estoque');
        return calcularResumo(r as EstoqueItem[]);
      } catch {
        const MOCK: EstoqueItem[] = [
          {
            id: '1',
            nome: 'Arroz Tipo 1 (5kg)',
            categoria: 'Alimentos',
            quantidade: 5,
            unidade: 'kg',
            preco: 27.9,
            localCompra: 'Supermercado Extra',
            quantidadeMinima: 3,
            dataAtualizacao: new Date().toISOString(),
          },
          {
            id: '2',
            nome: 'Feijão Carioca (1kg)',
            categoria: 'Alimentos',
            quantidade: 1,
            unidade: 'kg',
            preco: 8.5,
            localCompra: 'Supermercado Extra',
            quantidadeMinima: 2,
            dataAtualizacao: new Date().toISOString(),
          },
          {
            id: '3',
            nome: 'Óleo de Soja (900ml)',
            categoria: 'Alimentos',
            quantidade: 0,
            unidade: 'l',
            preco: 7.9,
            localCompra: 'Atacado Z',
            quantidadeMinima: 2,
            dataAtualizacao: new Date().toISOString(),
          },
          {
            id: '4',
            nome: 'Detergente Neutro',
            categoria: 'Limpeza',
            quantidade: 6,
            unidade: 'un',
            preco: 2.49,
            localCompra: 'Mercado Y',
            quantidadeMinima: 3,
            dataAtualizacao: new Date().toISOString(),
          },
        ];
        return calcularResumo(MOCK);
      }
    },
    staleTime: 5 * 60 * 1000,
  });

  const criar = useMutation({
    mutationFn: async (fd: EstoqueFormData) =>
      create('estoque', fd as unknown as Record<string, unknown>),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['estoque'] }); },
  });

  const atualizar = useMutation({
    mutationFn: async ({ id, fd }: { id: string; fd: EstoqueFormData }) =>
      update('estoque', id, fd as unknown as Record<string, unknown>),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['estoque'] }); },
  });

  const excluir = useMutation({
    mutationFn: async (id: string) => remove('estoque', id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['estoque'] }); },
  });

  return {
    data,
    isLoading,
    criar: criar.mutate,
    atualizar: atualizar.mutate,
    excluir: excluir.mutate,
    isSaving: criar.isPending || atualizar.isPending,
  };
}