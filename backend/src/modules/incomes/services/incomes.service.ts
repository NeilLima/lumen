/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { IncomesRepository } from '../repository/incomes.repository';
import { CreateIncomeDto, UpdateIncomeDto } from '../dto/create-income.dto';

@Injectable()
export class IncomesService {
  constructor(private readonly incomesRepository: IncomesRepository) {}

  async findAll(userId: string) {
    const incomes = await this.incomesRepository.findAll(userId);
    return incomes.map((income) => ({
      ...income,
      amount: Number(income.amount),
      status: income.status || 'PENDING',
      recurrence: income.recurrence || 'NONE',
      attachment: income.attachment || null,
    }));
  }

  async create(userId: string, dto: CreateIncomeDto) {
    const income = await this.incomesRepository.create(userId, {
      userId,
      description: dto.description,
      amount: dto.amount,
      date: dto.date ? new Date(dto.date) : new Date(),
      categoryId: dto.categoryId || null,
      accountId: dto.accountId || null,
      type: dto.type || 'INCOME',
      status: dto.status || 'PENDING',
      paymentMethod: dto.paymentMethod || null,
      recurrence: dto.recurrence || 'NONE',
      attachment: dto.attachment || null,
      notes: dto.notes || null,
    });
    return { ...income, amount: Number(income.amount) };
  }

  async update(userId: string, id: string, dto: UpdateIncomeDto) {
    const existing = await this.incomesRepository.findById(userId, id);
    if (!existing) {
      throw new NotFoundException('Receita não encontrada');
    }
    const income = await this.incomesRepository.update(userId, id, {
      description: dto.description,
      amount: dto.amount,
      date: dto.date ? new Date(dto.date) : undefined,
      categoryId: dto.categoryId,
      accountId: dto.accountId,
      type: dto.type,
      status: dto.status,
      paymentMethod: dto.paymentMethod,
      recurrence: dto.recurrence,
      attachment: dto.attachment,
      notes: dto.notes,
    });
    if (!income) {
      throw new NotFoundException('Receita não encontrada');
    }
    return { ...income, amount: Number(income.amount) };
  }

  async remove(userId: string, id: string) {
    const existing = await this.incomesRepository.findById(userId, id);
    if (!existing) {
      throw new NotFoundException('Receita não encontrada');
    }
    await this.incomesRepository.remove(userId, id);
    return { deleted: true };
  }
}