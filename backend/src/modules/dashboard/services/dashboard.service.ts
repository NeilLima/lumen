/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  DashboardRepository,
  startOfMonth,
  startOfNextMonth,
} from '../repository/dashboard.repository';

@Injectable()
export class DashboardService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  async getDashboard(userId: string) {
    const user = await this.dashboardRepository.findUserWithProfile(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const start = startOfMonth();
    const end = startOfNextMonth();

    const [saldoTotal, receitasMes, despesasMes, cashFlow, categories, recentTransactions, totalTransactions] =
      await Promise.all([
        this.dashboardRepository.getTotalBalance(userId),
        this.dashboardRepository.getMonthlyTotal(userId, 'INCOME', start, end),
        this.dashboardRepository.getMonthlyTotal(userId, 'EXPENSE', start, end),
        this.dashboardRepository.getCashFlow(userId, 6),
        this.dashboardRepository.getExpensesByCategory(userId, start, end),
        this.dashboardRepository.getRecentTransactions(userId, 5),
        this.dashboardRepository.countByPeriod(userId, start, end),
      ]);

    const economia = receitasMes - despesasMes;

    // Percentual de cada categoria sobre o total de despesas do mês
    const totalExpenses = categories.reduce((sum, c) => sum + c.amount, 0) || 1;
    const categoryBreakdown = categories.map((c) => ({
      ...c,
      percentage: Math.round((c.amount / totalExpenses) * 100),
    }));

    const highlights = await this.dashboardRepository.getMonthlyHighlights(userId, start, end);

    const transactions = recentTransactions.map((t) => ({
      id: t.id,
      description: t.description,
      category: t.category?.name ?? 'Sem categoria',
      categoryColor: t.category?.color ?? '#6b7280',
      amount: t.type === 'INCOME' ? Number(t.amount) : -Number(t.amount),
      type: t.type.toLowerCase(),
      paymentMethod: t.account?.name ?? '—',
      date: t.date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
      icon: t.type === 'INCOME' ? 'cash' : 'cart',
    }));

    const now = new Date();
    const dayOfMonth = now.getDate();

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.profile?.firstName ?? '',
        lastName: user.profile?.lastName ?? '',
      },
      kpis: {
        saldoTotal,
        receitasMes,
        despesasMes,
        economia,
      },
      cashFlow,
      categories: categoryBreakdown,
      transactions,
      monthlySummary: {
        highestIncome: highlights.highestIncome
          ? { description: highlights.highestIncome.description, amount: Number(highlights.highestIncome.amount) }
          : null,
        highestExpense: highlights.highestExpense
          ? { description: highlights.highestExpense.description, amount: Number(highlights.highestExpense.amount) }
          : null,
        topCategory: categoryBreakdown[0]
          ? { description: categoryBreakdown[0].name, amount: categoryBreakdown[0].amount }
          : null,
        monthlySavings: economia,
        totalTransactions,
        dailyAverage: totalTransactions > 0 ? Math.round((despesasMes / dayOfMonth) * 100) / 100 : 0,
      },
      creditCard: null,
      payments: [],
      goals: [],
      alerts: [],
    };
  }
}
