export interface UpcomingPaymentData {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  daysUntil: number;
}

export interface UpcomingPaymentsData {
  payments: UpcomingPaymentData[];
}