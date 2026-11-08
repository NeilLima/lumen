/* eslint-disable prettier/prettier */
import { CreateDividaDto, UpdateDividaDto } from '../dto/divida.dto.js';
import { DividaResponse, DeleteResult } from '../types/divida.types.js';

export interface IDividaRepository {
  findAll(userId: string): Promise<DividaResponse[]>;
  findById(userId: string, id: string): Promise<DividaResponse | null>;
  create(userId: string, data: Record<string, unknown>): Promise<DividaResponse>;
  update(userId: string, id: string, data: Record<string, unknown>): Promise<unknown>;
  remove(userId: string, id: string): Promise<unknown>;
}

export interface IDividaService {
  findAll(userId: string): Promise<DividaResponse[]>;
  create(userId: string, dto: CreateDividaDto): Promise<DividaResponse>;
  update(userId: string, id: string, dto: UpdateDividaDto): Promise<DividaResponse>;
  remove(userId: string, id: string): Promise<DeleteResult>;
}
