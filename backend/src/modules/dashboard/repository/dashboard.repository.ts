/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';

@Injectable()
export class DashboardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserWithProfile(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });
  }

  /** Saldo total = soma dos saldos das contas. */
  async getTotalBalance(userId: string): Promise<number> {
    const result = await this.prisma.account.aggregate({
      where: { userId },
      _sum: { balance: true },
    });
    return Number(result._sum.balance ?? 0);
  }

  /** Soma de receitas ou despesas de um período. */
  async getMonthlyTotal(userId: string, type: 'INCOME' | 'EXPENSE', start: Date, end: Date): Promise<number> {
    const result = await this.prisma.transaction.aggregate({
      where: { userId, type, date: { gte: start, lt: end } },
      _sum: { amount: true },
    });
    return Number(result._sum.amount ?? 0);
  }

  /** Contagem de transações de um período. */
  async countByPeriod(userId: string, start: Date, end: Date): Promise<number> {
    return this.prisma.transaction.count({
      where: { userId, date: { gte: start, lt: end } },
    });
  }

  /** Fluxo de caixa: receitas/despesas por mês dos últimos N meses. */
  async getCashFlow(userId: string, months = 6) {
    const transactions = await this.prisma.transaction.findMany({
      where: { userId, date: { gte: startOfMonthsAgo(months) } },
      select: { amount: true, type: true, date: true },
    });

    const buckets = new Map<string, { income: number; expense: number }>();
    for (let i = months - 1; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      buckets.set(key, { income: 0, expense: 0 });
    }

    for (const t of transactions) {
      const key = `${t.date.getFullYear()}-${String(t.date.getMonth() + 1).padStart(2, '0')}`;
      const bucket = buckets.get(key);
      if (!bucket) continue;
      if (t.type === 'INCOME') bucket.income += Number(t.amount);
      else bucket.expense += Number(t.amount);
    }

    const labels: string[] = [];
    const incomeData: number[] = [];
    const expenseData: number[] = [];
    for (const [key, value] of buckets) {
      const [year, month] = key.split('-');
      const monthName = new Date(Number(year), Number(month) - 1, 1)
        .toLocaleString('pt-BR', { month: 'short' })
        .replace('.', '');
      labels.push(monthName.charAt(0).toUpperCase() + monthName.slice(1));
      incomeData.push(value.income);
      expenseData.push(value.expense);
    }
    return { labels, incomeData, expenseData };
  }

  /** Gastos por categoria no mês (top 6). */
  async getExpensesByCategory(userId: string, start: Date, end: Date) {
    const grouped = await this.prisma.transaction.groupBy({
      by: ['categoryId'],
      where: { userId, type: 'EXPENSE', date: { gte: start, lt: end }, categoryId: { not: null } },
      _sum: { amount: true },
    });

    const totals = grouped
      .filter((g) => g.categoryId !== null)
      .map((g) => ({ categoryId: g.categoryId as string, amount: Number(g._sum.amount ?? 0) }));

    if (totals.length === 0) return [];

    const categoryIds = totals.map((t) => t.categoryId);
    const categories = await this.prisma.category.findMany({
      where: { id: { in: categoryIds } },
      select: { id: true, name: true, color: true },
    });

    const categoryMap = new Map(categories.map((c) => [c.id, c]));
    return totals
      .map((t) => {
        const category = categoryMap.get(t.categoryId);
        return {
          id: t.categoryId,
          name: category?.name ?? 'Outros',
          color: category?.color ?? '#6b7280',
          amount: t.amount,
        };
      })
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 6);
  }

  async getRecentTransactions(userId: string, take = 5) {
    return this.prisma.transaction.findMany({
      where: { userId },
      include: { account: true, category: true },
      orderBy: { date: 'desc' },
      take,
    });
  }

  /** Maiores receita/despesa e categoria topo do mês. */
  async getMonthlyHighlights(userId: string, start: Date, end: Date) {
    const highestIncome = await this.prisma.transaction.findFirst({
      where: { userId, type: 'INCOME', date: { gte: start, lt: end } },
      orderBy: { amount: 'desc' },
    });
    const highestExpense = await this.prisma.transaction.findFirst({
      where: { userId, type: 'EXPENSE', date: { gte: start, lt: end } },
      orderBy: { amount: 'desc' },
    });
    return { highestIncome, highestExpense };
  }

  /** Cartão: como cartões ainda não existem, retorna null. */
  async getPrimaryCreditCard(_userId: string) {
    return null;
  }
}

function startOfMonthsAgo(months: number): Date {
  const d = new Date();
  d.setMonth(d.getMonth() - (months - 1), 1);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function startOfMonth(): Date {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function startOfNextMonth(): Date {
  const d = startOfMonth();
  d.setMonth(d.getMonth() + 1);
  return d;
}

