/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificacaoRepository } from '../repository/notificacao.repository.js';
import { CreateNotificacaoDto, UpdateNotificacaoDto } from '../dto/notificacao.dto.js';

@Injectable()
export class NotificacaoService {
  constructor(private readonly notificacaoRepository: NotificacaoRepository) {}

  async findAll(userId: string) {
    const items = await this.notificacaoRepository.findAll(userId);
    return items.map((n) => ({ ...n }));
  }

  async findById(userId: string, id: string) {
    const n = await this.notificacaoRepository.findById(userId, id);
    if (!n) return null;
    return { ...n };
  }

  async create(userId: string, dto: CreateNotificacaoDto) {
    const n = await this.notificacaoRepository.create(userId, {
      userId,
      title: dto.title,
      type: dto.type,
      message: dto.message ?? null,
      read: dto.read ?? false,
      link: dto.link ?? null,
    });
    return { ...n };
  }

  async update(userId: string, id: string, dto: UpdateNotificacaoDto) {
    const existing = await this.notificacaoRepository.findById(userId, id);
    if (!existing) throw new NotFoundException('Notificação não encontrada');
    await this.notificacaoRepository.update(userId, id, {
      ...(dto.title !== undefined ? { title: dto.title } : {}),
      ...(dto.type !== undefined ? { type: dto.type } : {}),
      ...(dto.message !== undefined ? { message: dto.message } : {}),
      ...(dto.read !== undefined ? { read: dto.read } : {}),
      ...(dto.link !== undefined ? { link: dto.link } : {}),
    });
    const n = await this.notificacaoRepository.findById(userId, id);
    if (!n) throw new NotFoundException('Notificação não encontrada');
    return { ...n };
  }

  async remove(userId: string, id: string) {
    const existing = await this.notificacaoRepository.findById(userId, id);
    if (!existing) throw new NotFoundException('Notificação não encontrada');
    await this.notificacaoRepository.remove(userId, id);
    return { deleted: true };
  }
}
