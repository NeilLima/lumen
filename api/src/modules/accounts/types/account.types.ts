/* eslint-disable prettier/prettier */
/**
 * Tipos específicos do módulo de contas.
 */

export type AccountType = 'CHECKING' | 'SAVINGS' | 'WALLET' | 'INVESTMENT';

export interface AccountResponse {
  id: string;
  userId: string;
  name: string;
  type: AccountType;
  balance: number;
  color: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeleteResult {
  deleted: boolean;
}
