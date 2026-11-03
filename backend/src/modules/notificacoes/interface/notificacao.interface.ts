/* eslint-disable prettier/prettier */
import { CreateNotificacaoDto, UpdateNotificacaoDto } from '../dto/notificacao.dto.js';
import { NotificacaoResponse, DeleteResult } from '../types/notificacao.types.js';

export interface INotificacaoRepository {
  findAll(userId: string): Promise<NotificacaoResponse[]>;
  findById(userId: string, id: string): Promise<NotificacaoResponse | null>;
  create(userId: string, data: Record<string, unknown>): Promise<NotificacaoResponse>;
  update(userId: string, id: string, data: Record<string, unknown>): Promise<unknown>;
  remove(userId: string, id: string): Promise<unknown>;
}

export interface INotificacaoService {
  findAll(userId: string): Promise<NotificacaoResponse[]>;
  create(userId: string, dto: CreateNotificacaoDto): Promise<NotificacaoResponse>;
  update(userId: string, id: string, dto: UpdateNotificacaoDto): Promise<NotificacaoResponse>;
  remove(userId: string, id: string): Promise<DeleteResult>;
}
