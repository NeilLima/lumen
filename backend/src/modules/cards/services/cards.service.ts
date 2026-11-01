/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CardsRepository } from '../repository/cards.repository';
import { CreateCardDto, UpdateCardDto } from '../dto/card.dto';

@Injectable()
export class CardsService {
  constructor(private readonly cardsRepository: CardsRepository) {}

  async findAll(userId: string) {
    const cards = await this.cardsRepository.findAll(userId);
    return cards.map((card) => ({
      ...card,
      limitTotal: Number(card.limitTotal),
      limitUsed: Number(card.limitUsed),
    }));
  }

  async findById(userId: string, id: string) {
    const card = await this.cardsRepository.findById(userId, id);
    if (!card) return null;
    return { ...card, limitTotal: Number(card.limitTotal), limitUsed: Number(card.limitUsed) };
  }

  async create(userId: string, dto: CreateCardDto) {
    const card = await this.cardsRepository.create(userId, {
      userId,
      name: dto.name,
      bank: dto.bank ?? null,
      brand: dto.brand ?? 'VISA',
      limitTotal: dto.limitTotal,
      limitUsed: dto.limitUsed ?? 0,
      dueDay: dto.dueDay ?? 10,
      closingDay: dto.closingDay ?? null,
      color: dto.color ?? null,
      status: dto.status ?? 'ACTIVE',
    });
    return { ...card, limitTotal: Number(card.limitTotal), limitUsed: Number(card.limitUsed) };
  }

  async update(userId: string, id: string, dto: UpdateCardDto) {
    const existing = await this.cardsRepository.findById(userId, id);
    if (!existing) {
      throw new NotFoundException('Cartão não encontrado');
    }
    await this.cardsRepository.update(userId, id, {
      ...(dto.name !== undefined ? { name: dto.name } : {}),
      ...(dto.bank !== undefined ? { bank: dto.bank } : {}),
      ...(dto.brand !== undefined ? { brand: dto.brand } : {}),
      ...(dto.limitTotal !== undefined ? { limitTotal: dto.limitTotal } : {}),
      ...(dto.limitUsed !== undefined ? { limitUsed: dto.limitUsed } : {}),
      ...(dto.dueDay !== undefined ? { dueDay: dto.dueDay } : {}),
      ...(dto.closingDay !== undefined ? { closingDay: dto.closingDay } : {}),
      ...(dto.color !== undefined ? { color: dto.color } : {}),
      ...(dto.status !== undefined ? { status: dto.status } : {}),
    });
    const card = await this.cardsRepository.findById(userId, id);
    if (!card) throw new NotFoundException('Cartão não encontrado');
    return { ...card, limitTotal: Number(card.limitTotal), limitUsed: Number(card.limitUsed) };
  }

  async remove(userId: string, id: string) {
    const existing = await this.cardsRepository.findById(userId, id);
    if (!existing) {
      throw new NotFoundException('Cartão não encontrado');
    }
    await this.cardsRepository.remove(userId, id);
    return { deleted: true };
  }
}