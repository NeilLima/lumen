import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { list, create, update, remove } from '@/services/crudService';
import { useAuth } from '@/hooks/useAuth';
import type { Conta, ContasData, ContasFormData } from '../types/ContasTypes';

interface ApiAccount {
  id: string;
  name: string;
  bank?: string | null;
  type?: string;
  balance: number | string;
  color?: string | null;
  active?: boolean;
}

const TIPO_PARA_API: Record<Conta['tipo'], string> = {
  corrente: 'CHECKING',
  poupanca: 'SAVINGS',
  carteira: 'WALLET',
  digital: 'INVESTMENT',
};

const API_PARA_TIPO: Record<string, Conta['tipo']> = {
  CHECKING: 'corrente',
  SAVINGS: 'poupanca',
  WALLET: 'carteira',
  INVESTMENT: 'digital',
};

const ICONE_POR_TIPO: Record<Conta['tipo'], string> = {
  corrente: '🏦',
  poupanca: '🐷',
  carteira: '👛',
  digital: '📱',
};

function apiToConta(a: ApiAccount): Conta {
  const tipo = API_PARA_TIPO[a.type || 'CHECKING'] || 'corrente';
  return {
    id: a.id,
    nome: a.name,
    tipo,
    saldo: Number(a.balance),
    banco: a.bank || 'Não informado',
    icone: ICONE_POR_TIPO[tipo],
    cor: a.color || '#8b5cf6',
    ativa: a.active !== false,
  };
}

function calc(c: Conta[]) {
  return {
    totalSaldo: c.reduce((a, x) => a + x.saldo, 0),
    quantidade: c.length,
    maiorSaldo: c.length > 0 ? c.reduce((m, a) => (a.saldo > m.saldo ? a : m)) : null,
    contasAtivas: c.filter((x) => x.ativa).length,
  };
}

function build(c: Conta[]): ContasData {
  return { contas: c, resumo: calc(c), bancos: [...new Set(c.map((x) => x.banco))] };
}

export function contasService() {
  const { userId } = useAuth();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['contas', userId],
    queryFn: () => list('accounts'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const contas = ((data as ApiAccount[]) || []).map(apiToConta);
  const built = build(contas);

  // Contas ALIMENTA Receitas (select de conta do modal) e o Dashboard
  function invalidar() {
    qc.invalidateQueries({ queryKey: ['contas', userId] });
    qc.invalidateQueries({ queryKey: ['receitas-contas', userId] });
    qc.invalidateQueries({ queryKey: ['receitas', userId] });
    qc.invalidateQueries({ queryKey: ['dashboard'] });
  }

  const criar = useMutation({
    mutationFn: async (f: ContasFormData) =>
      create('accounts', {
        name: f.nome,
        bank: f.banco || undefined,
        type: TIPO_PARA_API[f.tipo],
        balance: Number(f.saldo) || 0,
        color: f.cor || '#8b5cf6',
        active: true,
      }),
    onSuccess: invalidar,
  });

  const atualizar = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: ContasFormData }) =>
      update('accounts', id, {
        name: formData.nome,
        bank: formData.banco || undefined,
        type: TIPO_PARA_API[formData.tipo],
        balance: Number(formData.saldo) || 0,
        color: formData.cor || '#8b5cf6',
      }),
    onSuccess: invalidar,
  });

  const excluir = useMutation({
    mutationFn: (id: string) => remove('accounts', id),
    onSuccess: invalidar,
  });

  return {
    data: built,
    isLoading,
    criar: criar.mutateAsync,
    atualizar: atualizar.mutateAsync,
    excluir: excluir.mutateAsync,
    isSaving: criar.isPending || atualizar.isPending,
  };
}
