/* eslint-disable prettier/prettier */
import { CreateAccountDto, UpdateAccountDto } from '../dto/account.dto';
import { AccountResponse, DeleteResult } from '../types/account.types';

export interface IAccountsRepository {
  findAll(userId: string): Promise<AccountResponse[]>;
  findById(userId: string, id: string): Promise<AccountResponse | null>;
  create(userId: string, data: Record<string, unknown>): Promise<AccountResponse>;
  update(userId: string, id: string, data: Record<string, unknown>): Promise<unknown>;
  remove(userId: string, id: string): Promise<unknown>;
}

export interface IAccountsService {
  findAll(userId: string): Promise<AccountResponse[]>;
  create(userId: string, dto: CreateAccountDto): Promise<AccountResponse>;
  update(userId: string, id: string, dto: UpdateAccountDto): Promise<AccountResponse>;
  remove(userId: string, id: string): Promise<DeleteResult>;
}
