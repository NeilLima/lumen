/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { SubscriptionsRepository } from '../repository/subscriptions.repository';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from '../dto/subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly subscriptionsRepository: SubscriptionsRepository) {}

  async findAll(userId: string) {
    const subs = await this.subscriptionsRepository.findAll(userId);
    return subs.map((s) => ({
      ...s,
      amount: Number(s.amount),
      active: s.active,
    }));
  }

  async findById(userId: string, id: string) {
    const s = await this.subscriptionsRepository.findById(userId, id);
    if (!s) return null;
    return { ...s, amount: Number(s.amount) };
  }

  async create(userId: string, dto: CreateSubscriptionDto) {
    const s = await this.subscriptionsRepository.create(userId, {
      userId,
      name: dto.name,
      amount: dto.amount,
      dueDay: dto.dueDay ?? 10,
      categoryId: dto.categoryId ?? null,
      nextCharge: dto.nextCharge ? new Date(dto.nextCharge) : null,
      active: dto.active ?? true,
    });
    return { ...s, amount: Number(s.amount) };
  }

  async update(userId: string, id: string, dto: UpdateSubscriptionDto) {
    const existing = await this.subscriptionsRepository.findById(userId, id);
    if (!existing) {
      throw new NotFoundException('Assinatura não encontrada');
    }
    await this.subscriptionsRepository.update(userId, id, {
      ...(dto.name !== undefined ? { name: dto.name } : {}),
      ...(dto.amount !== undefined ? { amount: dto.amount } : {}),
      ...(dto.dueDay !== undefined ? { dueDay: dto.dueDay } : {}),
      ...(dto.categoryId !== undefined ? { categoryId: dto.categoryId } : {}),
      ...(dto.nextCharge !== undefined ? { nextCharge: dto.nextCharge ? new Date(dto.nextCharge) : null } : {}),
      ...(dto.active !== undefined ? { active: dto.active } : {}),
    });
    const s = await this.subscriptionsRepository.findById(userId, id);
    if (!s) throw new NotFoundException('Assinatura não encontrada');
    return { ...s, amount: Number(s.amount) };
  }

  async remove(userId: string, id: string) {
    const existing = await this.subscriptionsRepository.findById(userId, id);
    if (!existing) {
      throw new NotFoundException('Assinatura não encontrada');
    }
    await this.subscriptionsRepository.remove(userId, id);
    return { deleted: true };
  }
}