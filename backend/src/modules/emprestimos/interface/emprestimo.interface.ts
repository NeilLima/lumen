/* eslint-disable prettier/prettier */
import { CreateEmprestimoDto, UpdateEmprestimoDto } from '../dto/emprestimo.dto.js';
import { EmprestimoResponse, DeleteResult } from '../types/emprestimo.types.js';

export interface IEmprestimoRepository {
  findAll(userId: string): Promise<EmprestimoResponse[]>;
  findById(userId: string, id: string): Promise<EmprestimoResponse | null>;
  create(userId: string, data: Record<string, unknown>): Promise<EmprestimoResponse>;
  update(userId: string, id: string, data: Record<string, unknown>): Promise<unknown>;
  remove(userId: string, id: string): Promise<unknown>;
}

export interface IEmprestimoService {
  findAll(userId: string): Promise<EmprestimoResponse[]>;
  create(userId: string, dto: CreateEmprestimoDto): Promise<EmprestimoResponse>;
  update(userId: string, id: string, dto: UpdateEmprestimoDto): Promise<EmprestimoResponse>;
  remove(userId: string, id: string): Promise<DeleteResult>;
}
