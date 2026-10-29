export interface Transaction {
  id: string;
  description: string;
  category: string;
  categoryColor: string;
  amount: number;
  type: 'income' | 'expense';
  paymentMethod: string;
  date: string;
  icon: string;
}

export interface RecentTransactionsData {
  transactions: Transaction[];
}