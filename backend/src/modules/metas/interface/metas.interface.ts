/* eslint-disable prettier/prettier */
import { CreateMetaDto, UpdateMetaDto } from '../dto/meta.dto.js';
import { MetaResponse, DeleteResult } from '../types/meta.types.js';

export interface IMetasRepository {
  findAll(userId: string): Promise<MetaResponse[]>;
  findById(userId: string, id: string): Promise<MetaResponse | null>;
  create(userId: string, data: Record<string, unknown>): Promise<MetaResponse>;
  update(userId: string, id: string, data: Record<string, unknown>): Promise<unknown>;
  remove(userId: string, id: string): Promise<unknown>;
}

export interface IMetasService {
  findAll(userId: string): Promise<MetaResponse[]>;
  create(userId: string, dto: CreateMetaDto): Promise<MetaResponse>;
  update(userId: string, id: string, dto: UpdateMetaDto): Promise<MetaResponse>;
  remove(userId: string, id: string): Promise<DeleteResult>;
}