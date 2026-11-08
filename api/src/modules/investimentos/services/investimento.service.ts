/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InvestimentoRepository } from '../repository/investimento.repository.js';
import { CreateInvestimentoDto, UpdateInvestimentoDto } from '../dto/investimento.dto.js';

@Injectable()
export class InvestimentoService {
  constructor(private readonly investimentoRepository: InvestimentoRepository) {}

  async findAll(userId: string) {
    const items = await this.investimentoRepository.findAll(userId);
    return items.map((i) => ({
      ...i,
      currentValue: Number(i.currentValue),
      investedAmount: Number(i.investedAmount),
    }));
  }

  async findById(userId: string, id: string) {
    const i = await this.investimentoRepository.findById(userId, id);
    if (!i) return null;
    return { ...i, currentValue: Number(i.currentValue), investedAmount: Number(i.investedAmount) };
  }

  async create(userId: string, dto: CreateInvestimentoDto) {
    const i = await this.investimentoRepository.create(userId, {
      userId,
      name: dto.name,
      type: dto.type ?? 'OTHER',
      broker: dto.broker ?? null,
      currentValue: dto.currentValue,
      investedAmount: dto.investedAmount ?? dto.currentValue,
      appliedDate: dto.appliedDate ? new Date(dto.appliedDate) : null,
      status: dto.status ?? 'ativo',
      notes: dto.notes ?? null,
    });
    return { ...i, currentValue: Number(i.currentValue), investedAmount: Number(i.investedAmount) };
  }

  async update(userId: string, id: string, dto: UpdateInvestimentoDto) {
    const existing = await this.investimentoRepository.findById(userId, id);
    if (!existing) throw new NotFoundException('Investimento não encontrado');
    await this.investimentoRepository.update(userId, id, {
      ...(dto.name !== undefined ? { name: dto.name } : {}),
      ...(dto.type !== undefined ? { type: dto.type } : {}),
      ...(dto.broker !== undefined ? { broker: dto.broker } : {}),
      ...(dto.currentValue !== undefined ? { currentValue: dto.currentValue } : {}),
      ...(dto.investedAmount !== undefined ? { investedAmount: dto.investedAmount } : {}),
      ...(dto.appliedDate !== undefined ? { appliedDate: dto.appliedDate ? new Date(dto.appliedDate) : null } : {}),
      ...(dto.status !== undefined ? { status: dto.status } : {}),
      ...(dto.notes !== undefined ? { notes: dto.notes } : {}),
    });
    const i = await this.investimentoRepository.findById(userId, id);
    if (!i) throw new NotFoundException('Investimento não encontrado');
    return { ...i, currentValue: Number(i.currentValue), investedAmount: Number(i.investedAmount) };
  }

  async remove(userId: string, id: string) {
    const existing = await this.investimentoRepository.findById(userId, id);
    if (!existing) throw new NotFoundException('Investimento não encontrado');
    await this.investimentoRepository.remove(userId, id);
    return { deleted: true };
  }
}
