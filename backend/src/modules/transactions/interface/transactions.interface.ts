/* eslint-disable prettier/prettier */
import { CreateTransactionDto, UpdateTransactionDto } from '../dto/transaction.dto';
import { DeleteResult, TransactionResponse } from '../types/transaction.types';

export interface ITransactionsRepository {
  findAll(userId: string, type?: string, take?: number): Promise<TransactionResponse[]>;
  findRecent(userId: string, take?: number): Promise<TransactionResponse[]>;
  findById(userId: string, id: string): Promise<TransactionResponse | null>;
  create(userId: string, data: Record<string, unknown>): Promise<TransactionResponse>;
  update(userId: string, id: string, data: Record<string, unknown>): Promise<TransactionResponse | null>;
  remove(userId: string, id: string): Promise<unknown>;
  adjustAccountBalance(accountId: string, delta: number): Promise<void>;
  withBalanceLock<T>(fn: () => Promise<T>): Promise<T>;
}

export interface ITransactionsService {
  findAll(userId: string, type?: string): Promise<TransactionResponse[]>;
  findRecent(userId: string, take?: number): Promise<TransactionResponse[]>;
  create(userId: string, dto: CreateTransactionDto): Promise<TransactionResponse>;
  update(userId: string, id: string, dto: UpdateTransactionDto): Promise<TransactionResponse>;
  remove(userId: string, id: string): Promise<DeleteResult>;
}
