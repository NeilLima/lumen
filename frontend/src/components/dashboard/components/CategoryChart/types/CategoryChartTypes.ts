export interface CategoryExpense {
  id: string;
  name: string;
  color: string;
  percentage: number;
  amount: number;
}

export interface CategoryChartData {
  categories: CategoryExpense[];
  total: number;
}