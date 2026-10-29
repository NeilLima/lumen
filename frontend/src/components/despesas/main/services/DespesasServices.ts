import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Despesa, DespesasData, DespesasFormData } from '../types/DespesasTypes';

const MOCK_DESPESAS: Despesa[] = [
  {
    id: '1',
    nome: 'Aluguel',
    categoria: 'Moradia',
    categoriaCor: '#8b5cf6',
    categoriaIcone: '🏠',
    valor: 1800,
    conta: 'Conta Corrente',
    contaIcone: '🏦',
    data: '2026-07-25',
    parcelas: 1,
    prioridade: 'alta',
    observacoes: 'Aluguel mensal do apartamento',
    status: 'pago',
  },
  {
    id: '2',
    nome: 'Supermercado Extra',
    categoria: 'Alimentação',
    categoriaCor: '#10b981',
    categoriaIcone: '🛒',
    valor: 356.80,
    conta: 'Cartão Nubank',
    contaIcone: '💳',
    cartao: 'Nubank',
    data: '2026-07-12',
    parcelas: 1,
    prioridade: 'media',
    status: 'pago',
  },
  {
    id: '3',
    nome: 'Conta de Luz',
    categoria: 'Moradia',
    categoriaCor: '#8b5cf6',
    categoriaIcone: '⚡',
    valor: 189.60,
    conta: 'Conta Corrente',
    contaIcone: '🏦',
    data: '2026-07-10',
    parcelas: 1,
    prioridade: 'alta',
    status: 'atrasado',
  },
  {
    id: '4',
    nome: 'Internet',
    categoria: 'Moradia',
    categoriaCor: '#8b5cf6',
    categoriaIcone: '🌐',
    valor: 109.90,
    conta: 'Conta Corrente',
    contaIcone: '🏦',
    data: '2026-07-17',
    parcelas: 1,
    prioridade: 'media',
    status: 'pendente',
  },
  {
    id: '5',
    nome: 'Notebook Dell',
    categoria: 'Tecnologia',
    categoriaCor: '#3b82f6',
    categoriaIcone: '💻',
    valor: 450,
    conta: 'Cartão Nubank',
    contaIcone: '💳',
    cartao: 'Nubank',
    data: '2026-07-05',
    parcelas: 10,
    prioridade: 'baixa',
    observacoes: 'Parcela 3 de 10',
    status: 'pago',
  },
  {
    id: '6',
    nome: 'Academia',
    categoria: 'Saúde',
    categoriaCor: '#ef4444',
    categoriaIcone: '💪',
    valor: 89.90,
    conta: 'Conta Corrente',
    contaIcone: '🏦',
    data: '2026-07-20',
    parcelas: 1,
    prioridade: 'baixa',
    status: 'pendente',
  },
];

function calcularResumo(despesas: Despesa[]) {
  const totalPago = despesas
    .filter(d => d.status === 'pago')
    .reduce((acc, d) => acc + d.valor, 0);
  const totalPendente = despesas
    .filter(d => d.status === 'pendente')
    .reduce((acc, d) => acc + d.valor, 0);
  const totalAtrasado = despesas
    .filter(d => d.status === 'atrasado')
    .reduce((acc, d) => acc + d.valor, 0);
  const quantidade = despesas.length;
  const media = quantidade > 0 ? despesas.reduce((acc, d) => acc + d.valor, 0) / quantidade : 0;
  const maiorDespesa = despesas.length > 0
    ? despesas.reduce((maior, atual) => (atual.valor > maior.valor ? atual : maior))
    : null;

  return { totalPago, totalPendente, totalAtrasado, quantidade, media, maiorDespesa };
}

function construirDados(despesas: Despesa[]): DespesasData {
  const categorias = [...new Set(despesas.map(d => d.categoria))];
  const contas = [...new Set(despesas.map(d => d.conta))];
  return {
    despesas,
    resumo: calcularResumo(despesas),
    categorias,
    contas,
  };
}

export function despesasService() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['despesas'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return construirDados(MOCK_DESPESAS);
    },
    staleTime: 5 * 60 * 1000,
  });

  const criarMutation = useMutation({
    mutationFn: async (formData: DespesasFormData) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      const novaDespesa: Despesa = {
        id: String(Date.now()),
        nome: formData.nome,
        categoria: formData.categoria,
        categoriaCor: '#ef4444',
        categoriaIcone: '💸',
        valor: Number(formData.valor),
        conta: formData.conta,
        contaIcone: '🏦',
        cartao: formData.cartao || undefined,
        data: formData.data,
        parcelas: Number(formData.parcelas) || 1,
        prioridade: formData.prioridade,
        observacoes: formData.observacoes,
        status: 'pendente',
      };
      return novaDespesa;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['despesas'] });
    },
  });

  const atualizarMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: DespesasFormData }) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { id, formData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['despesas'] });
    },
  });

  const excluirMutation = useMutation({
    mutationFn: async (id: string) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['despesas'] });
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