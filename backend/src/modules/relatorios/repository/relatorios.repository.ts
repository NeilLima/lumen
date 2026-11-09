/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../core/prisma/prisma.service.js';

@Injectable()
export class RelatoriosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.relatorio.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(userId: string, id: string) {
    return this.prisma.relatorio.findFirst({ where: { id, userId } });
  }

  async create(userId: string, data: Omit<Prisma.RelatorioUncheckedCreateInput, 'userId'>) {
    return this.prisma.relatorio.create({ data: { ...data, userId } });
  }

  async update(userId: string, id: string, data: Prisma.RelatorioUncheckedUpdateInput) {
    return this.prisma.relatorio.updateMany({ where: { id, userId }, data });
  }

  async remove(userId: string, id: string) {
    return this.prisma.relatorio.deleteMany({ where: { id, userId } });
  }
}
