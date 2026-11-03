/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../core/prisma/prisma.service.js';

@Injectable()
export class EmprestimosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.debt.findMany({
      where: { userId, type: 'LOAN' },
      include: { category: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findById(userId: string, id: string) {
    return this.prisma.debt.findFirst({ where: { id, userId, type: 'LOAN' }, include: { category: true } });
  }

  async create(userId: string, data: Prisma.DebtUncheckedCreateInput) {
    return this.prisma.debt.create({ data: { ...data, userId, type: 'LOAN' } });
  }

  async update(userId: string, id: string, data: Prisma.DebtUncheckedUpdateInput) {
    return this.prisma.debt.updateMany({ where: { id, userId, type: 'LOAN' }, data });
  }

  async remove(userId: string, id: string) {
    return this.prisma.debt.deleteMany({ where: { id, userId, type: 'LOAN' } });
  }
}
