/* eslint-disable prettier/prettier */
import { CreateOrcamentoDto, UpdateOrcamentoDto } from '../dto/orcamento.dto.js';
import { OrcamentoResponse, DeleteResult } from '../types/orcamento.types.js';

export interface IOrcamentoRepository {
  findAll(userId: string): Promise<OrcamentoResponse[]>;
  findById(userId: string, id: string): Promise<OrcamentoResponse | null>;
  create(userId: string, data: Record<string, unknown>): Promise<OrcamentoResponse>;
  update(userId: string, id: string, data: Record<string, unknown>): Promise<unknown>;
  remove(userId: string, id: string): Promise<unknown>;
}

export interface IOrcamentoService {
  findAll(userId: string): Promise<OrcamentoResponse[]>;
  create(userId: string, dto: CreateOrcamentoDto): Promise<OrcamentoResponse>;
  update(userId: string, id: string, dto: UpdateOrcamentoDto): Promise<OrcamentoResponse>;
  remove(userId: string, id: string): Promise<DeleteResult>;
}
