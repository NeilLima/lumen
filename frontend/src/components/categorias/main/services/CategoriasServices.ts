import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Categoria, CategoriasData, CategoriasFormData } from '../types/CategoriasTypes';

const MOCK_CATEGORIAS: Categoria[] = [
  {
    "id": "1",
    "nome": "Moradia",
    "icone": "🏠",
    "cor": "#8b5cf6",
    "tipo": "despesa",
    "valor": 2500.00,
    "data": "2025-07-15",
    "descricao": "Despesas com casa, aluguel, contas",
    "categoria": "Despesa",
    "categoriaCor": "#8b5cf6",
    "categoriaIcone": "🏠"
  },
  {
    "id": "2",
    "nome": "Alimentação",
    "icone": "🛒",
    "cor": "#10b981",
    "tipo": "despesa",
    "valor": 1200.00,
    "data": "2025-07-15",
    "descricao": "Supermercado e alimentação",
    "categoria": "Despesa",
    "categoriaCor": "#10b981",
    "categoriaIcone": "🛒"
  },
  {
    "id": "3",
    "nome": "Salário",
    "icone": "💰",
    "cor": "#10b981",
    "tipo": "receita",
    "valor": 8500.00,
    "data": "2025-07-15",
    "descricao": "Renda mensal",
    "categoria": "Receita",
    "categoriaCor": "#10b981",
    "categoriaIcone": "💰"
  },
  {
    "id": "4",
    "nome": "Transporte",
    "icone": "🚗",
    "cor": "#3b82f6",
    "tipo": "ambos",
    "valor": 800.00,
    "data": "2025-07-15",
    "descricao": "Combustível, uber, manutenção",
    "categoria": "Ambos",
    "categoriaCor": "#3b82f6",
    "categoriaIcone": "🚗"
  }
];

function calcularResumo(categorias: Categoria[]) {
  const totalCategorias = categorias.length;
  const totalDespesas = categorias.filter(d => d.tipo === 'despesa').length;
  const totalReceitas = categorias.filter(d => d.tipo === 'receita').length;
  const totalAmbos = categorias.filter(d => d.tipo === 'ambos').length;

  return { totalCategorias, totalDespesas, totalReceitas, totalAmbos };
}

function construirDados(categorias: Categoria[]): CategoriasData {
  return {
    categorias,
    resumo: calcularResumo(categorias),
  };
}

export function useCategoriasService() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['categorias'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return construirDados(MOCK_CATEGORIAS);
    },
    staleTime: 5 * 60 * 1000,
  });

  const criarMutation = useMutation({
    mutationFn: async (formData: CategoriasFormData) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      const novoCategoria: Categoria = {
        id: String(Date.now()),
        nome: formData.nome,
        icone: formData.icone,
        cor: formData.cor,
        tipo: formData.tipo,
        valor: 0,
        data: new Date().toISOString().split('T')[0],
        descricao: formData.descricao,
        categoria: 'Geral',
        categoriaCor: '#8b5cf6',
        categoriaIcone: '📋',
      };
      return novoCategoria;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categorias'] });
    },
  });

  const atualizarMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: CategoriasFormData }) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { id, formData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categorias'] });
    },
  });

  const excluirMutation = useMutation({
    mutationFn: async (id: string) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categorias'] });
    },
  });

  return {
    data,
    isLoading,
    criar: criarMutation.mutate,
    atualizar: atualizarMutation.mutate,
    excluir: excluirMutation.mutate,
    isSaving: criarMutation.isPending || atualizarMutation.isPending,
  };
}