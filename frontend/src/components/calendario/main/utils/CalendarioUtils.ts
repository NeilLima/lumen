import { useState, useMemo, useCallback } from 'react';
import { calendarioService } from '../services/CalendarioServices';
import { useTheme } from '@/context/theme/ThemeContext';
import type { CalendarioDia, CalendarioResumo, CalendarioTransacao } from '../types/CalendarioTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

const STATUS_LABELS: Record<string, string> = {
  RECEIVED: 'Recebido',
  PENDING: 'Pendente',
  LATE: 'Atrasado',
};

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useCalendario() {
  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = calendarioService();
  const theme = useTheme();
  const [mesReferencia, setMesReferencia] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [diaSelecionado, setDiaSelecionado] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const transacoes = useMemo(() => service.data?.transacoes || [], [service.data]);

  const transacoesPorDia = useMemo(() => {
    const mapa = new Map<string, CalendarioTransacao[]>();
    for (const t of transacoes) {
      const key = (t.date || '').slice(0, 10);
      if (!key) continue;
      const lista = mapa.get(key) || [];
      lista.push(t);
      mapa.set(key, lista);
    }
    return mapa;
  }, [transacoes]);

  const dias = useMemo<CalendarioDia[]>(() => {
    const ano = mesReferencia.getFullYear();
    const mes = mesReferencia.getMonth();
    const primeiroDia = new Date(ano, mes, 1).getDay();
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();
    const resultado: CalendarioDia[] = [];

    for (let i = 0; i < primeiroDia; i++) {
      resultado.push({ dia: null, data: '', transacoes: [], totalReceitas: 0, totalDespesas: 0 });
    }

    for (let d = 1; d <= diasNoMes; d++) {
      const data = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const txs = transacoesPorDia.get(data) || [];
      const totalReceitas = txs
        .filter((t) => t.type === 'INCOME')
        .reduce((acc, t) => acc + t.amount, 0);
      const totalDespesas = txs
        .filter((t) => t.type === 'EXPENSE')
        .reduce((acc, t) => acc + t.amount, 0);
      resultado.push({ dia: d, data, transacoes: txs, totalReceitas, totalDespesas });
    }

    return resultado;
  }, [mesReferencia, transacoesPorDia]);

  const resumo = useMemo<CalendarioResumo>(() => {
    const mes = mesReferencia.getMonth();
    const ano = mesReferencia.getFullYear();
    const doMes = transacoes.filter((t) => {
      const d = new Date((t.date || '').slice(0, 10) + 'T12:00:00');
      return d.getFullYear() === ano && d.getMonth() === mes;
    });
    const totalReceitas = doMes.filter((t) => t.type === 'INCOME').reduce((acc, t) => acc + t.amount, 0);
    const totalDespesas = doMes.filter((t) => t.type === 'EXPENSE').reduce((acc, t) => acc + t.amount, 0);
    return {
      totalReceitas,
      totalDespesas,
      saldo: totalReceitas - totalDespesas,
      quantidade: doMes.length,
    };
  }, [transacoes, mesReferencia]);

  const transacoesDoDia = useMemo(() => {
    if (!diaSelecionado) return [];
    return transacoesPorDia.get(diaSelecionado) || [];
  }, [diaSelecionado, transacoesPorDia]);

  const hoje = useMemo(() => new Date().toISOString().slice(0, 10), []);

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const mesAnterior = useCallback(() => {
    setMesReferencia((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setDiaSelecionado(null);
  }, []);

  const proximoMes = useCallback(() => {
    setMesReferencia((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setDiaSelecionado(null);
  }, []);

  const irParaHoje = useCallback(() => {
    const d = new Date();
    setMesReferencia(new Date(d.getFullYear(), d.getMonth(), 1));
    setDiaSelecionado(d.toISOString().slice(0, 10));
  }, []);

  const selecionarDia = useCallback((data: string) => {
    setDiaSelecionado((prev) => (prev === data ? null : data));
  }, []);

  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  const mesLabel = `${MESES[mesReferencia.getMonth()]} ${mesReferencia.getFullYear()}`;

  function formatarValor(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function formatarDataCurta(data: string): string {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  function getStatusLabel(status?: string | null): string {
    return STATUS_LABELS[status || ''] || '—';
  }

  function getTipoCor(tipo: string): string {
    if (tipo === 'INCOME') return '#10b981';
    if (tipo === 'EXPENSE') return '#ef4444';
    return '#8b5cf6';
  }

  function getTipoLabel(tipo: string): string {
    if (tipo === 'INCOME') return 'Receita';
    if (tipo === 'EXPENSE') return 'Despesa';
    return 'Transferência';
  }

  return {
    state: {
      isLoading: service.isLoading,
      data: service.data ?? null,
      dias,
      resumo,
      mesLabel,
      hoje,
      diaSelecionado,
      transacoesDoDia,
      sidebarOpen,
      diasSemana: DIAS_SEMANA,
    },
    actions: {
      mesAnterior,
      proximoMes,
      irParaHoje,
      selecionarDia,
      toggleSidebar,
      closeSidebar,
    },
    helpers: {
      formatarValor,
      formatarDataCurta,
      getStatusLabel,
      getTipoCor,
      getTipoLabel,
    },
    theme,
  };
}
