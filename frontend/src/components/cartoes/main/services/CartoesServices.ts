import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Cartao, CartoesData, CartoesFormData } from '../types/CartoesTypes';

const MOCK_CARTOES: Cartao[] = [
  {
    id: '1',
    nome: 'Nubank',
    bandeira: 'mastercard',
    banco: 'Nubank',
    limiteTotal: 8000,
    limiteUtilizado: 3200,
    melhorDiaCompra: 3,
    dataVencimento: 15,
    cor: '#8b5cf6',
    status: 'ativo',
  },
  {
    id: '2',
    nome: 'Inter',
    bandeira: 'visa',
    banco: 'Banco Inter',
    limiteTotal: 5000,
    limiteUtilizado: 4500,
    melhorDiaCompra: 10,
    dataVencimento: 22,
    cor: '#f59e0b',
    status: 'ativo',
  },
  {
    id: '3',
    nome: 'Santander Free',
    bandeira: 'mastercard',
    banco: 'Santander',
    limiteTotal: 12000,
    limiteUtilizado: 2800,
    melhorDiaCompra: 5,
    dataVencimento: 18,
    cor: '#ef4444',
    status: 'ativo',
  },
  {
    id: '4',
    nome: 'C6 Bank',
    bandeira: 'elo',
    banco: 'C6 Bank',
    limiteTotal: 3000,
    limiteUtilizado: 0,
    melhorDiaCompra: 15,
    dataVencimento: 28,
    cor: '#10b981',
    status: 'bloqueado',
  },
  {
    id: '5',
    nome: 'XP Visa Infinite',
    bandeira: 'visa',
    banco: 'XP Investimentos',
    limiteTotal: 25000,
    limiteUtilizado: 8500,
    melhorDiaCompra: 1,
    dataVencimento: 10,
    cor: '#3b82f6',
    status: 'ativo',
  },
  {
    id: '6',
    nome: 'Hipercard',
    bandeira: 'hipercard',
    banco: 'Hipercard',
    limiteTotal: 4000,
    limiteUtilizado: 1200,
    melhorDiaCompra: 8,
    dataVencimento: 20,
    cor: '#ec4899',
    status: 'cancelado',
  },
];

function calcularResumo(cartoes: Cartao[]) {
  const totalLimite = cartoes.reduce((acc, c) => acc + c.limiteTotal, 0);
  const totalUtilizado = cartoes.reduce((acc, c) => acc + c.limiteUtilizado, 0);
  const totalDisponivel = totalLimite - totalUtilizado;
  const quantidade = cartoes.length;
  const taxaUtilizacao = totalLimite > 0 ? (totalUtilizado / totalLimite) * 100 : 0;
  const cartaoMaiorLimite = cartoes.length > 0
    ? cartoes.reduce((maior, atual) => (atual.limiteTotal > maior.limiteTotal ? atual : maior))
    : null;

  return { totalLimite, totalUtilizado, totalDisponivel, quantidade, taxaUtilizacao, cartaoMaiorLimite };
}

function construirDados(cartoes: Cartao[]): CartoesData {
  const bandeiras = [...new Set(cartoes.map(c => c.bandeira))];
  const bancos = [...new Set(cartoes.map(c => c.banco))];
  return {
    cartoes,
    resumo: calcularResumo(cartoes),
    bandeiras,
    bancos,
  };
}

export function cartoesService() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['cartoes'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return construirDados(MOCK_CARTOES);
    },
    staleTime: 5 * 60 * 1000,
  });

  const criarMutation = useMutation({
    mutationFn: async (formData: CartoesFormData) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      const novoCartao: Cartao = {
        id: String(Date.now()),
        nome: formData.nome,
        bandeira: formData.bandeira,
        banco: formData.banco,
        limiteTotal: Number(formData.limiteTotal),
        limiteUtilizado: 0,
        melhorDiaCompra: Number(formData.melhorDiaCompra),
        dataVencimento: Number(formData.dataVencimento),
        cor: formData.cor || '#8b5cf6',
        status: 'ativo',
      };
      return novoCartao;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartoes'] });
    },
  });

  const atualizarMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: CartoesFormData }) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { id, formData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartoes'] });
    },
  });

  const excluirMutation = useMutation({
    mutationFn: async (id: string) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartoes'] });
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