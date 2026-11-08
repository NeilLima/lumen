/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../core/prisma/prisma.service.js';

@Injectable()
export class OrcamentoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.budget.findMany({
      where: { userId },
      include: { category: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findById(userId: string, id: string) {
    return this.prisma.budget.findFirst({ where: { id, userId }, include: { category: true } });
  }

  async create(userId: string, data: Prisma.BudgetUncheckedCreateInput) {
    return this.prisma.budget.create({ data: { ...data, userId }, include: { category: true } });
  }

  async update(userId: string, id: string, data: Prisma.BudgetUncheckedUpdateInput) {
    return this.prisma.budget.updateMany({ where: { id, userId }, data });
  }

  async remove(userId: string, id: string) {
    return this.prisma.budget.deleteMany({ where: { id, userId } });
  }
}
