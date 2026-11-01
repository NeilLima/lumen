import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { list, create, update, remove } from '@/services/crudService';
import { useAuth } from '@/hooks/useAuth';
import type { Cartao, CartoesData, CartoesFormData, ApiCard } from '../types/CartoesTypes';

const STATUS_MAP: Record<string, Cartao['status']> = {
  ACTIVE: 'ativo',
  BLOCKED: 'bloqueado',
  CANCELLED: 'cancelado',
};

const STATUS_REVERSO: Record<Cartao['status'], string> = {
  ativo: 'ACTIVE',
  bloqueado: 'BLOCKED',
  cancelado: 'CANCELLED',
};

const BANDEIRA_MAP: Record<string, Cartao['bandeira']> = {
  VISA: 'visa',
  MASTERCARD: 'mastercard',
  ELO: 'elo',
  AMEX: 'amex',
  HIPERCARD: 'hipercard',
};

function apiToCartao(card: ApiCard): Cartao {
  return {
    id: card.id,
    nome: card.name,
    bandeira: BANDEIRA_MAP[card.brand || ''] || 'outros',
    banco: card.bank || '',
    limiteTotal: Number(card.limitTotal),
    limiteUtilizado: Number(card.limitUsed),
    melhorDiaCompra: card.closingDay || card.dueDay,
    dataVencimento: card.dueDay,
    cor: card.color || '#8b5cf6',
    status: STATUS_MAP[card.status || 'ACTIVE'] || 'ativo',
  };
}

function toApiPayload(formData: CartoesFormData): Record<string, unknown> {
  return {
    name: formData.nome,
    bank: formData.banco,
    brand: formData.bandeira.toUpperCase(),
    limitTotal: Number(formData.limiteTotal),
    dueDay: Number(formData.dataVencimento),
    closingDay: Number(formData.melhorDiaCompra),
    color: formData.cor || undefined,
  };
}

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
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const { data: cards, isLoading: loadingCards } = useQuery({
    queryKey: ['cartoes', userId],
    queryFn: () => list('cards'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const data = construirDados(((cards as ApiCard[]) || []).map(apiToCartao));

  const criarMutation = useMutation({
    mutationFn: (formData: CartoesFormData) => create('cards', toApiPayload(formData)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartoes', userId] });
    },
  });

  const atualizarMutation = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: CartoesFormData }) =>
      update('cards', id, toApiPayload(formData)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartoes', userId] });
    },
  });

  const excluirMutation = useMutation({
    mutationFn: (id: string) => remove('cards', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartoes', userId] });
    },
  });

  return {
    data,
    isLoading: loadingCards,
    criar: criarMutation.mutateAsync,
    atualizar: atualizarMutation.mutateAsync,
    excluir: excluirMutation.mutateAsync,
    isSaving: criarMutation.isPending || atualizarMutation.isPending,
  };
}