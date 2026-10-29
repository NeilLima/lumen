import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Emprestimo, EmprestimosData, EmprestimosFormData } from '../types/EmprestimosTypes';

const MOCK_EMPRESTIMOS: Emprestimo[] = [
  {
    "id": "1",
    "nome": "Empréstimo Pessoal Banco do Brasil",
    "tipo": "recebido",
    "valor": 15000,
    "parcelas": 24,
    "parcelasPagas": 8,
    "juros": 1.5,
    "dataVencimento": "2026-08-15",
    "situacao": "em_dia",
    "categoria": "Banco",
    "categoriaCor": "#3b82f6",
    "categoriaIcone": "🏦",
    "observacoes": "Empréstimo pessoal para reforma"
  },
  {
    "id": "2",
    "nome": "Empréstimo para João",
    "tipo": "feito",
    "valor": 5000,
    "parcelas": 10,
    "parcelasPagas": 3,
    "juros": 0,
    "dataVencimento": "2026-07-20",
    "situacao": "atrasada",
    "categoria": "Pessoa",
    "categoriaCor": "#f59e0b",
    "categoriaIcone": "👤"
  },
  {
    "id": "3",
    "nome": "Financiamento Carro",
    "tipo": "recebido",
    "valor": 45000,
    "parcelas": 48,
    "parcelasPagas": 48,
    "juros": 1.2,
    "dataVencimento": "2026-06-30",
    "situacao": "quitada",
    "categoria": "Banco",
    "categoriaCor": "#3b82f6",
    "categoriaIcone": "🏦"
  }
];

function calcularResumo(emprestimos: Emprestimo[]) {
  const totalEmprestimos = emprestimos.length;
  const totalValor = emprestimos.reduce((acc, d) => acc + (d.valor || 0), 0);
  const totalAtrasado = emprestimos.filter(d => d.situacao === 'atrasada').reduce((acc, d) => acc + d.valor, 0);
  const totalQuitado = emprestimos.filter(d => d.situacao === 'quitada').reduce((acc, d) => acc + d.valor, 0);

  return { totalEmprestimos, totalValor, totalAtrasado, totalQuitado };
}

function construirDados(emprestimos: Emprestimo[]): EmprestimosData {
  return {
    emprestimos,
    resumo: calcularResumo(emprestimos),
  };
}

export function emprestimosService() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['emprestimos'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return construirDados(MOCK_EMPRESTIMOS);
    },
    staleTime: 5 * 60 * 1000,
  });

  const criarMutation = useMutation({
    mutationFn: async (formData: EmprestimosFormData) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      const novoEmprestimo: Emprestimo = {
        id: String(Date.now()),
        nome: formData.nome,
        tipo: formData.tipo,
        valor: Number(formData.valor) || 0,
        juros: Number(formData.juros) || 0,
        parcelas: Number(formData.parcelas) || 0,
        parcelasPagas: Number(formData.parcelasPagas) || 0,
        dataVencimento: formData.dataVencimento,
        situacao: formData.situacao,
        observacoes: formData.observacoes,
        categoria: 'Geral',
        categoriaCor: '#8b5cf6',
        categoriaIcone: '📋',
      };
      return novoEmprestimo;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emprestimos'] });
    },
  });

  const atualizarMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: EmprestimosFormData }) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { id, formData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emprestimos'] });
    },
  });

  const excluirMutation = useMutation({
    mutationFn: async (id: string) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emprestimos'] });
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
