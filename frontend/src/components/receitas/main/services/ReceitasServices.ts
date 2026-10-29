import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { list, create, update, remove } from '@/services/crudService';
import { useAuth } from '@/hooks/useAuth';
import type {
  Receita,
  ReceitasData,
  ReceitasFormData,
  ReceitaRecorrencia,
} from '../types/ReceitasTypes';

interface ApiCategory {
  id: string;
  name: string;
  color?: string | null;
  icon?: string | null;
  type?: string;
}

interface ApiAccount {
  id: string;
  name: string;
  type?: string;
}

interface ApiIncome {
  id: string;
  description: string;
  amount: number | string;
  date: string;
  status?: string;
  recurrence?: string | null;
  notes?: string | null;
  attachment?: string | null;
  category?: ApiCategory | null;
  account?: ApiAccount | null;
}

const STATUS_API: Record<string, Receita['status']> = {
  RECEIVED: 'recebido',
  PENDING: 'pendente',
  LATE: 'atrasado',
};

const STATUS_REVERSO: Record<Receita['status'], string> = {
  recebido: 'RECEIVED',
  pendente: 'PENDING',
  atrasado: 'LATE',
};

const RECORRENCIA_API: Record<string, ReceitaRecorrencia> = {
  NONE: 'unica',
  WEEKLY: 'semanal',
  MONTHLY: 'mensal',
  YEARLY: 'anual',
};

const RECORRENCIA_REVERSO: Record<ReceitaRecorrencia, string> = {
  unica: 'NONE',
  semanal: 'WEEKLY',
  mensal: 'MONTHLY',
  anual: 'YEARLY',
};

const ICONE_CONTA: Record<string, string> = {
  CHECKING: '🏦',
  SAVINGS: '🐷',
  WALLET: '👛',
  INVESTMENT: '📈',
};

function toDateInput(iso: string): string {
  return iso ? iso.split('T')[0] : '';
}

function apiToReceita(income: ApiIncome): Receita {
  return {
    id: income.id,
    nome: income.description,
    categoria: income.category?.name || '',
    categoriaCor: income.category?.color || '#8b5cf6',
    categoriaIcone: income.category?.icon || '💰',
    valor: Number(income.amount),
    conta: income.account?.name || '',
    contaIcone: ICONE_CONTA[income.account?.type || ''] || '🏦',
    data: toDateInput(income.date),
    recorrencia: RECORRENCIA_API[income.recurrence || 'NONE'] || 'unica',
    observacoes: income.notes || '',
    comprovante: income.attachment || '',
    status: STATUS_API[income.status || 'PENDING'] || 'pendente',
  };
}

function toApiPayload(
  formData: ReceitasFormData,
  categoriaId: string | null,
  contaId: string | null,
): Record<string, unknown> {
  return {
    description: formData.nome,
    amount: Number(formData.valor),
    date: formData.data,
    categoryId: categoriaId || undefined,
    accountId: contaId || undefined,
    recurrence: RECORRENCIA_REVERSO[formData.recorrencia],
    notes: formData.observacoes || undefined,
    attachment: formData.comprovante || undefined,
  };
}

function calcularResumo(receitas: Receita[]) {
  const totalRecebido = receitas
    .filter(r => r.status === 'recebido')
    .reduce((acc, r) => acc + r.valor, 0);
  const totalPendente = receitas
    .filter(r => r.status === 'pendente')
    .reduce((acc, r) => acc + r.valor, 0);
  const totalAtrasado = receitas
    .filter(r => r.status === 'atrasado')
    .reduce((acc, r) => acc + r.valor, 0);
  const quantidade = receitas.length;
  const media = quantidade > 0 ? receitas.reduce((acc, r) => acc + r.valor, 0) / quantidade : 0;
  const maiorReceita = receitas.length > 0
    ? receitas.reduce((maior, atual) => (atual.valor > maior.valor ? atual : maior))
    : null;

  return { totalRecebido, totalPendente, totalAtrasado, quantidade, media, maiorReceita };
}

function construirDados(
  receitas: Receita[],
  categorias: string[],
  contas: string[],
): ReceitasData {
  return {
    receitas,
    resumo: calcularResumo(receitas),
    categorias,
    contas,
  };
}

export function receitasService() {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const { data: incomes, isLoading: loadingIncomes } = useQuery({
    queryKey: ['receitas', userId],
    queryFn: () => list('incomes'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const { data: categories } = useQuery({
    queryKey: ['receitas-categorias', userId],
    queryFn: () => list('categories'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const { data: accounts } = useQuery({
    queryKey: ['receitas-contas', userId],
    queryFn: () => list('accounts'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const categorias = ((categories as ApiCategory[]) || [])
    .filter((c) => c.type === 'INCOME' || c.type === 'BOTH')
    .sort((a, b) => a.name.localeCompare(b.name));

  const contas = ((accounts as ApiAccount[]) || []).sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const data = construirDados(
    ((incomes as ApiIncome[]) || []).map(apiToReceita),
    categorias.map((c) => c.name),
    contas.map((c) => c.name),
  );

  function resolverIds(formData: ReceitasFormData) {
    const categoria = categorias.find((c) => c.name === formData.categoria);
    const conta = contas.find((c) => c.name === formData.conta);
    return {
      categoriaId: categoria ? categoria.id : null,
      contaId: conta ? conta.id : null,
    };
  }

  const criarMutation = useMutation({
    mutationFn: async (formData: ReceitasFormData) => {
      const { categoriaId, contaId } = resolverIds(formData);
      return create('incomes', {
        ...toApiPayload(formData, categoriaId, contaId),
        status: 'PENDING',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['receitas', userId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const atualizarMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: ReceitasFormData }) => {
      const { categoriaId, contaId } = resolverIds(formData);
      return update('incomes', id, toApiPayload(formData, categoriaId, contaId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['receitas', userId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const excluirMutation = useMutation({
    mutationFn: (id: string) => remove('incomes', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['receitas', userId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  return {
    data,
    isLoading: loadingIncomes,
    criar: criarMutation.mutateAsync,
    atualizar: atualizarMutation.mutateAsync,
    excluir: excluirMutation.mutateAsync,
    isSaving: criarMutation.isPending || atualizarMutation.isPending,
  };
}