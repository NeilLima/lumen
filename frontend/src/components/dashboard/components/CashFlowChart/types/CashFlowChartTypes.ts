export interface CashFlowData {
  labels: string[];
  incomeData: number[];
  expenseData: number[];
}

export interface CashFlowChartData {
  cashFlow: CashFlowData;
}

export interface TooltipData {
  month: string;
  income: number;
  expense: number;
  x: number;
  y: number;
}