/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../core/prisma/prisma.service';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string, type?: string, take = 100) {
    return this.prisma.transaction.findMany({
      where: { userId, ...(type ? { type } : {}) },
      include: { account: true, category: true, creditCard: true },
      orderBy: { date: 'desc' },
      take,
    });
  }

  async findRecent(userId: string, take = 5) {
    return this.prisma.transaction.findMany({
      where: { userId },
      include: { account: true, category: true, creditCard: true },
      orderBy: { date: 'desc' },
      take,
    });
  }

  async findById(userId: string, id: string) {
    return this.prisma.transaction.findFirst({
      where: { id, userId },
      include: { account: true, category: true, creditCard: true },
    });
  }

  async create(userId: string, data: Prisma.TransactionUncheckedCreateInput) {
    return this.prisma.transaction.create({
      data,
      include: { account: true, category: true, creditCard: true },
    });
  }

  async update(userId: string, id: string, data: Prisma.TransactionUncheckedUpdateInput) {
    await this.prisma.transaction.updateMany({ where: { id, userId }, data });
    return this.prisma.transaction.findFirst({
      where: { id, userId },
      include: { account: true, category: true, creditCard: true },
    });
  }

  async remove(userId: string, id: string) {
    return this.prisma.transaction.deleteMany({ where: { id, userId } });
  }

  /** Atualiza o saldo da conta (delta positivo soma, negativo subtrai). */
  async adjustAccountBalance(accountId: string, delta: number) {
    await this.prisma.account.update({
      where: { id: accountId },
      data: { balance: { increment: delta } },
    });
  }

  async withBalanceLock<T>(fn: () => Promise<T>): Promise<T> {
    return this.prisma.$transaction(fn);
  }
}
