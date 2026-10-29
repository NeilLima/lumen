/* eslint-disable prettier/prettier */
export type CategoryType = 'INCOME' | 'EXPENSE' | 'BOTH';

export interface CategoryResponse {
  id: string;
  userId: string;
  name: string;
  color: string;
  icon: string | null;
  type: CategoryType;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeleteResult {
  deleted: boolean;
}
