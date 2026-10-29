import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Caridade, CaridadeData, CaridadeFormData } from '../types/CaridadeTypes';

const MOCK_CARIDADE: Caridade[] = [
  {
    "id": "1",
    "nome": "Doação Mensal ONG Amor",
    "tipo": "recorrente",
    "valor": 100,
    "instituicao": "ONG Amor",
    "data": "2026-07-15",
    "status": "realizada",
    "categoria": "Social",
    "categoriaCor": "#ef4444",
    "categoriaIcone": "❤️"
  },
  {
    "id": "2",
    "nome": "Doação Igreja",
    "tipo": "unica",
    "valor": 50,
    "instituicao": "Igreja São João",
    "data": "2026-07-10",
    "status": "realizada",
    "categoria": "Religiosa",
    "categoriaCor": "#8b5cf6",
    "categoriaIcone": "⛪"
  },
  {
    "id": "3",
    "nome": "Contribuição Abrigo Animal",
    "tipo": "recorrente",
    "valor": 80,
    "instituicao": "Abrigo Animal",
    "data": "2026-08-01",
    "status": "pendente",
    "categoria": "Animal",
    "categoriaCor": "#f59e0b",
    "categoriaIcone": "🐾"
  }
];

function calcularResumo(caridades: Caridade[]) {
  const totalDoacoes = caridades.length;
  const totalValor = caridades.reduce((acc, d) => acc + (d.valor || 0), 0);
  const totalRealizadas = caridades.filter(d => d.status === 'realizada').length;
  const totalPendentes = caridades.filter(d => d.status === 'pendente').length;

  return { totalDoacoes, totalValor, totalRealizadas, totalPendentes };
}

function construirDados(caridades: Caridade[]): CaridadeData {
  return {
    caridades,
    resumo: calcularResumo(caridades),
  };
}

export function useCaridadeService() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['caridade'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return construirDados(MOCK_CARIDADE);
    },
    staleTime: 5 * 60 * 1000,
  });

  const criarMutation = useMutation({
    mutationFn: async (formData: CaridadeFormData) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      const novoCaridade: Caridade = {
        id: String(Date.now()),
        nome: formData.nome,
        tipo: formData.tipo,
        valor: Number(formData.valor) || 0,
        instituicao: formData.instituicao,
        data: formData.data,
        status: formData.status,
        observacoes: formData.observacoes,
        categoria: 'Geral',
        categoriaCor: '#8b5cf6',
        categoriaIcone: '📋',
      };
      return novoCaridade;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['caridade'] });
    },
  });

  const atualizarMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: CaridadeFormData }) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { id, formData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['caridade'] });
    },
  });

  const excluirMutation = useMutation({
    mutationFn: async (id: string) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['caridade'] });
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
