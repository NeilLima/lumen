export interface CreditCardData {
  id: string;
  name: string;
  bank: string;
  limitUsed: number;
  limitTotal: number;
  currentInvoice: number;
  dueDate: string;
}