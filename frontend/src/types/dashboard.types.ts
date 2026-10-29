export interface DashboardTypes {
  // KPI Cards
  balance: {
    total: number;
    percentageChange: number;
  };
  income: {
    total: number;
    percentageChange: number;
  };
  expenses: {
    total: number;
    percentageChange: number;
  };
  savings: {
    total: number;
    percentageChange: number;
  };

  // Charts
  cashFlow: {
    labels: string[];
    incomeData: number[];
    expenseData: number[];
  };

  categoryExpenses: {
    categories: CategoryExpense[];
    total: number;
  };

  // Recent Transactions
  recentTransactions: Transaction[];

  // Monthly Summary
  monthlySummary: {
    highestIncome: {
      description: string;
      amount: number;
    };
    highestExpense: {
      description: string;
      amount: number;
    };
    topCategory: {
      description: string;
      amount: number;
    };
    monthlySavings: number;
    totalTransactions: number;
    dailyAverage: number;
  };

  // Credit Card
  creditCard: {
    id: string;
    name: string;
    bank: string;
    flag: string;
    limitUsed: number;
    limitTotal: number;
    currentInvoice: number;
    dueDate: string;
  };

  // Upcoming Payments
  upcomingPayments: UpcomingPayment[];

  // Goals
  goals: Goal[];

  // Alerts
  alerts: Alert[];
}

export interface CategoryExpense {
  id: string;
  name: string;
  color: string;
  percentage: number;
  amount: number;
}

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

export interface UpcomingPayment {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  daysUntil: number;
}

export interface Goal {
  id: string;
  name: string;
  icon: string;
  currentAmount: number;
  targetAmount: number;
  percentage: number;
}

export interface Alert {
  id: string;
  type: 'warning' | 'danger' | 'info' | 'success';
  icon: string;
  title: string;
  description: string;
}

// ============================================
// Resposta do endpoint GET /dashboard (backend)
// ============================================
export interface DashboardUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface DashboardKpis {
  saldoTotal: number;
  receitasMes: number;
  despesasMes: number;
  economia: number;
}

export interface DashboardApiResponse {
  user: DashboardUser;
  kpis: DashboardKpis;
  cashFlow: {
    labels: string[];
    incomeData: number[];
    expenseData: number[];
  };
  categories: CategoryExpense[];
  transactions: Transaction[];
  monthlySummary: {
    highestIncome: { description: string; amount: number } | null;
    highestExpense: { description: string; amount: number } | null;
    topCategory: { description: string; amount: number } | null;
    monthlySavings: number;
    totalTransactions: number;
    dailyAverage: number;
  };
  creditCard: {
    id: string;
    name: string;
    bank: string;
    limitUsed: number;
    limitTotal: number;
    currentInvoice: number;
    dueDate: string;
  } | null;
  payments: UpcomingPayment[];
  goals: Goal[];
  alerts: Alert[];
}