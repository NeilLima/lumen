/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { EmprestimosRepository } from '../repository/emprestimos.repository.js';
import { CreateEmprestimoDto, UpdateEmprestimoDto } from '../dto/emprestimo.dto.js';

@Injectable()
export class EmprestimosService {
  constructor(private readonly emprestimosRepository: EmprestimosRepository) {}

  async findAll(userId: string) {
    const items = await this.emprestimosRepository.findAll(userId);
    return items.map((d) => ({
      ...d,
      totalAmount: Number(d.totalAmount),
      remainingAmount: Number(d.remainingAmount),
      interestRate: d.interestRate ? Number(d.interestRate) : 0,
    }));
  }

  async findById(userId: string, id: string) {
    const d = await this.emprestimosRepository.findById(userId, id);
    if (!d) return null;
    return { ...d, totalAmount: Number(d.totalAmount), remainingAmount: Number(d.remainingAmount), interestRate: d.interestRate ? Number(d.interestRate) : 0 };
  }

  async create(userId: string, dto: CreateEmprestimoDto) {
    const d = await this.emprestimosRepository.create(userId, {
      userId,
      name: dto.name,
      totalAmount: dto.totalAmount,
      remainingAmount: dto.remainingAmount ?? dto.totalAmount,
      interestRate: dto.interestRate ?? 0,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
      parcels: dto.parcels ?? 0,
      parcelasPagas: dto.parcelasPagas ?? 0,
      status: dto.status ?? 'em_dia',
      categoryId: dto.categoryId ?? null,
      notes: dto.notes ?? null,
    });
    return { ...d, totalAmount: Number(d.totalAmount), remainingAmount: Number(d.remainingAmount), interestRate: d.interestRate ? Number(d.interestRate) : 0 };
  }

  async update(userId: string, id: string, dto: UpdateEmprestimoDto) {
    const existing = await this.emprestimosRepository.findById(userId, id);
    if (!existing) throw new NotFoundException('Empréstimo não encontrada');
    await this.emprestimosRepository.update(userId, id, {
      ...(dto.name !== undefined ? { name: dto.name } : {}),
      ...(dto.totalAmount !== undefined ? { totalAmount: dto.totalAmount } : {}),
      ...(dto.remainingAmount !== undefined ? { remainingAmount: dto.remainingAmount } : {}),
      ...(dto.interestRate !== undefined ? { interestRate: dto.interestRate } : {}),
      ...(dto.dueDate !== undefined ? { dueDate: dto.dueDate ? new Date(dto.dueDate) : null } : {}),
      ...(dto.parcels !== undefined ? { parcels: dto.parcels } : {}),
      ...(dto.parcelasPagas !== undefined ? { parcelasPagas: dto.parcelasPagas } : {}),
      ...(dto.status !== undefined ? { status: dto.status } : {}),
      ...(dto.categoryId !== undefined ? { categoryId: dto.categoryId } : {}),
      ...(dto.notes !== undefined ? { notes: dto.notes } : {}),
    });
    const d = await this.emprestimosRepository.findById(userId, id);
    if (!d) throw new NotFoundException('Empréstimo não encontrada');
    return { ...d, totalAmount: Number(d.totalAmount), remainingAmount: Number(d.remainingAmount), interestRate: d.interestRate ? Number(d.interestRate) : 0 };
  }

  async remove(userId: string, id: string) {
    const existing = await this.emprestimosRepository.findById(userId, id);
    if (!existing) throw new NotFoundException('Empréstimo não encontrada');
    await this.emprestimosRepository.remove(userId, id);
    return { deleted: true };
  }
}
