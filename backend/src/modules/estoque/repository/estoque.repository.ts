/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../core/prisma/prisma.service';

@Injectable()
export class EstoqueRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.estoqueItem.findMany({
      where: { userId },
      orderBy: { dataAtualizacao: 'desc' },
    });
  }

  async findById(userId: string, id: string) {
    return this.prisma.estoqueItem.findFirst({ where: { id, userId } });
  }

  async create(userId: string, data: Prisma.EstoqueItemUncheckedCreateInput) {
    return this.prisma.estoqueItem.create({ data });
  }

  async update(userId: string, id: string, data: Prisma.EstoqueItemUncheckedUpdateInput) {
    return this.prisma.estoqueItem.updateMany({ where: { id, userId }, data });
  }

  async remove(userId: string, id: string) {
    return this.prisma.estoqueItem.deleteMany({ where: { id, userId } });
  }
}