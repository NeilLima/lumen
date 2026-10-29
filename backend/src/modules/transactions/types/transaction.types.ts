/* eslint-disable prettier/prettier */
export type TransactionType = 'INCOME' | 'EXPENSE' | 'TRANSFER';

export interface TransactionResponse {
  id: string;
  userId: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: Date;
  paymentMethod: string | null;
  recurrence: string | null;
  notes: string | null;
  accountId: string | null;
  accountName: string | null;
  creditCardId: string | null;
  creditCardName: string | null;
  categoryId: string | null;
  categoryName: string | null;
  categoryColor: string;
}

export interface DeleteResult {
  deleted: boolean;
}
