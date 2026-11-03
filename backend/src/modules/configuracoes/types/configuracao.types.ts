/* eslint-disable prettier/prettier */
export type ConfiguracaoStatus = 'dentro' | 'atencao' | 'estourado';

export interface ConfiguracaoResponse {
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
