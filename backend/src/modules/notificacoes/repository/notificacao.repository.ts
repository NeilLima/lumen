/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../core/prisma/prisma.service.js';

@Injectable()
export class NotificacaoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      
      orderBy: { createdAt: 'asc' },
    });
  }

  async findById(userId: string, id: string) {
    return this.prisma.notification.findFirst({ where: { id, userId } });
  }

  async create(userId: string, data: Prisma.NotificationUncheckedCreateInput) {
    return this.prisma.notification.create({ data: { ...data, userId } });
  }

  async update(userId: string, id: string, data: Prisma.NotificationUncheckedUpdateInput) {
    return this.prisma.notification.updateMany({ where: { id, userId }, data });
  }

  async remove(userId: string, id: string) {
    return this.prisma.notification.deleteMany({ where: { id, userId } });
  }
}
