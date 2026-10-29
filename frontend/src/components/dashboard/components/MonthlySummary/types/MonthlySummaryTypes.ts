export interface MonthlySummaryData {
  highestIncome: { description: string; amount: number };
  highestExpense: { description: string; amount: number };
  topCategory: { description: string; amount: number };
  monthlySavings: number;
  totalTransactions: number;
  dailyAverage: number;
}