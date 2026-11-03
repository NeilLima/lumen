/* eslint-disable prettier/prettier */
export type InvestimentoStatus = 'dentro' | 'atencao' | 'estourado';

export interface InvestimentoResponse {
  id: string;
  userId: string;
  categoryId: string | null;
  month: string;
  limitAmount: number;
  spentAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeleteResult {
  deleted: boolean;
}
