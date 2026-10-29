/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../core/prisma/prisma.service';

@Injectable()
export class AccountsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.account.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findById(userId: string, id: string) {
    return this.prisma.account.findFirst({ where: { id, userId } });
  }

  async create(userId: string, data: Prisma.AccountUncheckedCreateInput) {
    return this.prisma.account.create({ data });
  }

  async update(userId: string, id: string, data: Prisma.AccountUncheckedUpdateInput) {
    return this.prisma.account.updateMany({ where: { id, userId }, data });
  }

  async remove(userId: string, id: string) {
    return this.prisma.account.deleteMany({ where: { id, userId } });
  }
}
