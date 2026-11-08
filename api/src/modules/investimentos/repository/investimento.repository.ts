/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../core/prisma/prisma.service.js';

@Injectable()
export class InvestimentoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.investment.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findById(userId: string, id: string) {
    return this.prisma.investment.findFirst({ where: { id, userId } });
  }

  async create(userId: string, data: Prisma.InvestmentUncheckedCreateInput) {
    return this.prisma.investment.create({ data: { ...data, userId } });
  }

  async update(userId: string, id: string, data: Prisma.InvestmentUncheckedUpdateInput) {
    return this.prisma.investment.updateMany({ where: { id, userId }, data });
  }

  async remove(userId: string, id: string) {
    return this.prisma.investment.deleteMany({ where: { id, userId } });
  }
}
