/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../core/prisma/prisma.service';

@Injectable()
export class IncomesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.transaction.findMany({
      where: { userId, type: 'INCOME' },
      include: { category: true, account: true },
      orderBy: { date: 'desc' },
    });
  }

  async findById(userId: string, id: string) {
    return this.prisma.transaction.findFirst({
      where: { id, userId, type: 'INCOME' },
      include: { category: true, account: true },
    });
  }

  async create(userId: string, data: Prisma.TransactionUncheckedCreateInput) {
    return this.prisma.transaction.create({
      data: { ...data, userId, type: 'INCOME' },
      include: { category: true, account: true },
    });
  }

  async update(userId: string, id: string, data: Prisma.TransactionUncheckedUpdateInput) {
    const existing = await this.prisma.transaction.findFirst({
      where: { id, userId, type: 'INCOME' },
    });
    if (!existing) {
      return null;
    }
    return this.prisma.transaction.update({
      where: { id },
      data,
      include: { category: true, account: true },
    });
  }

  async remove(userId: string, id: string) {
    const existing = await this.prisma.transaction.findFirst({
      where: { id, userId, type: 'INCOME' },
    });
    if (!existing) {
      return null;
    }
    return this.prisma.transaction.delete({ where: { id } });
  }
}