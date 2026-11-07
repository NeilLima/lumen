/* eslint-disable prettier/prettier */
import { CreateCompraDto, UpdateCompraDto } from '../dto/compra.dto.js';
import { CompraResponse, DeleteResult } from '../types/compra.types.js';

export interface IComprasRepository {
  findAll(userId: string): Promise<CompraResponse[]>;
  findById(userId: string, id: string): Promise<CompraResponse | null>;
  create(userId: string, data: Record<string, unknown>, itens: Record<string, unknown>[]): Promise<CompraResponse>;
  update(userId: string, id: string, data: Record<string, unknown>): Promise<unknown>;
  remove(userId: string, id: string): Promise<unknown>;
}

export interface IComprasService {
  findAll(userId: string): Promise<CompraResponse[]>;
  findById(userId: string, id: string): Promise<CompraResponse | null>;
  create(userId: string, dto: CreateCompraDto): Promise<CompraResponse>;
  update(userId: string, id: string, dto: UpdateCompraDto): Promise<CompraResponse>;
  remove(userId: string, id: string): Promise<DeleteResult>;
}
