/* eslint-disable prettier/prettier */
import { CreateEstoqueItemDto, UpdateEstoqueItemDto } from '../dto/estoque.dto';
import { EstoqueItemResponse, DeleteResult } from '../types/estoque.types';

export interface IEstoqueRepository {
  findAll(userId: string): Promise<EstoqueItemResponse[]>;
  findById(userId: string, id: string): Promise<EstoqueItemResponse | null>;
  create(userId: string, data: Record<string, unknown>): Promise<EstoqueItemResponse>;
  update(userId: string, id: string, data: Record<string, unknown>): Promise<unknown>;
  remove(userId: string, id: string): Promise<unknown>;
}

export interface IEstoqueService {
  findAll(userId: string): Promise<EstoqueItemResponse[]>;
  create(userId: string, dto: CreateEstoqueItemDto): Promise<EstoqueItemResponse>;
  update(userId: string, id: string, dto: UpdateEstoqueItemDto): Promise<EstoqueItemResponse>;
  remove(userId: string, id: string): Promise<DeleteResult>;
}