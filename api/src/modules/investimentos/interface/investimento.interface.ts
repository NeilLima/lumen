/* eslint-disable prettier/prettier */
import { CreateInvestimentoDto, UpdateInvestimentoDto } from '../dto/investimento.dto.js';
import { InvestimentoResponse, DeleteResult } from '../types/investimento.types.js';

export interface IInvestimentoRepository {
  findAll(userId: string): Promise<InvestimentoResponse[]>;
  findById(userId: string, id: string): Promise<InvestimentoResponse | null>;
  create(userId: string, data: Record<string, unknown>): Promise<InvestimentoResponse>;
  update(userId: string, id: string, data: Record<string, unknown>): Promise<unknown>;
  remove(userId: string, id: string): Promise<unknown>;
}

export interface IInvestimentoService {
  findAll(userId: string): Promise<InvestimentoResponse[]>;
  create(userId: string, dto: CreateInvestimentoDto): Promise<InvestimentoResponse>;
  update(userId: string, id: string, dto: UpdateInvestimentoDto): Promise<InvestimentoResponse>;
  remove(userId: string, id: string): Promise<DeleteResult>;
}
