/* eslint-disable prettier/prettier */
export const dashboardSchema = {
  user: 'DashboardUser',
  kpis: { saldoTotal: 'number', receitasMes: 'number', despesasMes: 'number', economia: 'number' },
  cashFlow: { labels: 'string[]', incomeData: 'number[]', expenseData: 'number[]' },
  categories: 'CategoryExpense[] (top 6 com percentage)',
  transactions: 'Transaction[] (últimas 5)',
  monthlySummary: 'MonthlySummary',
  creditCard: 'null (até implementar cartões)',
  payments: '[] (até implementar vencimentos)',
  goals: '[] (até implementar metas)',
  alerts: '[] (até implementar alertas)',
};
