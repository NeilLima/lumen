export interface Income {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: string;
  categoryId: string | null;
  categoryName: string | null;
  categoryColor: string | null;
  accountId: string | null;
  accountName: string | null;
  paymentMethod: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IncomesData {
  incomes: Income[];
  total: number;
}

export interface CreateIncomeInput {
  description: string;
  amount: number;
  date: string;
  categoryId?: string | null;
  accountId?: string | null;
  type?: string;
  paymentMethod?: string | null;
  notes?: string | null;
}

export interface UpdateIncomeInput {
  description?: string;
  amount?: number;
  date?: string;
  categoryId?: string | null;
  accountId?: string | null;
  type?: string;
  paymentMethod?: string | null;
  notes?: string | null;
}