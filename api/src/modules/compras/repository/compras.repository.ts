/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../core/prisma/prisma.service.js';

@Injectable()
export class ComprasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.compra.findMany({
      where: { userId },
      include: { itens: true },
      orderBy: { dataCompra: 'desc' },
    });
  }

  async findById(userId: string, id: string) {
    return this.prisma.compra.findFirst({
      where: { id, userId },
      include: { itens: true },
    });
  }

  async create(userId: string, data: Omit<Prisma.CompraUncheckedCreateInput, 'userId' | 'itens'>, itens: any[]) {
    return this.prisma.compra.create({
      data: {
        ...data,
        userId,
        itens: { create: itens },
      },
      include: { itens: true },
    });
  }

  async update(userId: string, id: string, data: Prisma.CompraUncheckedUpdateInput) {
    return this.prisma.compra.updateMany({ where: { id, userId }, data });
  }

  async remove(userId: string, id: string) {
    return this.prisma.compra.deleteMany({ where: { id, userId } });
  }
}
