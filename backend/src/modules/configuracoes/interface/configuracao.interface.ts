/* eslint-disable prettier/prettier */
import { CreateConfiguracaoDto, UpdateConfiguracaoDto } from '../dto/configuracao.dto.js';
import { ConfiguracaoResponse, DeleteResult } from '../types/configuracao.types.js';

export interface IConfiguracaoRepository {
  findAll(userId: string): Promise<ConfiguracaoResponse[]>;
  findById(userId: string, id: string): Promise<ConfiguracaoResponse | null>;
  create(userId: string, data: Record<string, unknown>): Promise<ConfiguracaoResponse>;
  update(userId: string, id: string, data: Record<string, unknown>): Promise<unknown>;
  remove(userId: string, id: string): Promise<unknown>;
}

export interface IConfiguracaoService {
  findAll(userId: string): Promise<ConfiguracaoResponse[]>;
  create(userId: string, dto: CreateConfiguracaoDto): Promise<ConfiguracaoResponse>;
  update(userId: string, id: string, dto: UpdateConfiguracaoDto): Promise<ConfiguracaoResponse>;
  remove(userId: string, id: string): Promise<DeleteResult>;
}
