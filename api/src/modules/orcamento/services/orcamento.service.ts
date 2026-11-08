/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { OrcamentoRepository } from '../repository/orcamento.repository.js';
import { CreateOrcamentoDto, UpdateOrcamentoDto } from '../dto/orcamento.dto.js';

@Injectable()
export class OrcamentoService {
  constructor(private readonly orcamentoRepository: OrcamentoRepository) {}

  async findAll(userId: string) {
    const items = await this.orcamentoRepository.findAll(userId);
    return items.map((b) => ({
      ...b,
      limitAmount: Number(b.limitAmount),
      spentAmount: Number(b.spentAmount),
      category: b.category ?? null,
    }));
  }

  async findById(userId: string, id: string) {
    const b = await this.orcamentoRepository.findById(userId, id);
    if (!b) return null;
    return { ...b, limitAmount: Number(b.limitAmount), spentAmount: Number(b.spentAmount) };
  }

  async create(userId: string, dto: CreateOrcamentoDto) {
    const b = await this.orcamentoRepository.create(userId, {
      userId,
      categoryId: dto.categoryId ?? null,
      month: dto.month,
      limitAmount: dto.limitAmount,
      spentAmount: dto.spentAmount ?? 0,
    });
    return { ...b, limitAmount: Number(b.limitAmount), spentAmount: Number(b.spentAmount) };
  }

  async update(userId: string, id: string, dto: UpdateOrcamentoDto) {
    const existing = await this.orcamentoRepository.findById(userId, id);
    if (!existing) throw new NotFoundException('Orçamento não encontrado');
    await this.orcamentoRepository.update(userId, id, {
      ...(dto.categoryId !== undefined ? { categoryId: dto.categoryId } : {}),
      ...(dto.month !== undefined ? { month: dto.month } : {}),
      ...(dto.limitAmount !== undefined ? { limitAmount: dto.limitAmount } : {}),
      ...(dto.spentAmount !== undefined ? { spentAmount: dto.spentAmount } : {}),
    });
    const b = await this.orcamentoRepository.findById(userId, id);
    if (!b) throw new NotFoundException('Orçamento não encontrado');
    return { ...b, limitAmount: Number(b.limitAmount), spentAmount: Number(b.spentAmount) };
  }

  async remove(userId: string, id: string) {
    const existing = await this.orcamentoRepository.findById(userId, id);
    if (!existing) throw new NotFoundException('Orçamento não encontrado');
    await this.orcamentoRepository.remove(userId, id);
    return { deleted: true };
  }
}
