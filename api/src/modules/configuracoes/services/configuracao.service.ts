/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfiguracaoRepository } from '../repository/configuracao.repository.js';
import { CreateConfiguracaoDto, UpdateConfiguracaoDto } from '../dto/configuracao.dto.js';

@Injectable()
export class ConfiguracaoService {
  constructor(private readonly configuracaoRepository: ConfiguracaoRepository) {}

  async findAll(userId: string) {
    const items = await this.configuracaoRepository.findAll(userId);
    return items.map((s) => ({ ...s }));
  }

  async findById(userId: string, id: string) {
    const s = await this.configuracaoRepository.findById(userId, id);
    if (!s) return null;
    return { ...s };
  }

  async create(userId: string, dto: CreateConfiguracaoDto) {
    const s = await this.configuracaoRepository.create(userId, {
      userId,
      name: dto.name,
      category: dto.category ?? 'geral',
      value: dto.value,
      description: dto.description ?? null,
    });
    return { ...s };
  }

  async update(userId: string, id: string, dto: UpdateConfiguracaoDto) {
    const existing = await this.configuracaoRepository.findById(userId, id);
    if (!existing) throw new NotFoundException('Configuração não encontrada');
    await this.configuracaoRepository.update(userId, id, {
      ...(dto.name !== undefined ? { name: dto.name } : {}),
      ...(dto.category !== undefined ? { category: dto.category } : {}),
      ...(dto.value !== undefined ? { value: dto.value } : {}),
      ...(dto.description !== undefined ? { description: dto.description } : {}),
    });
    const s = await this.configuracaoRepository.findById(userId, id);
    if (!s) throw new NotFoundException('Configuração não encontrada');
    return { ...s };
  }

  async remove(userId: string, id: string) {
    const existing = await this.configuracaoRepository.findById(userId, id);
    if (!existing) throw new NotFoundException('Configuração não encontrada');
    await this.configuracaoRepository.remove(userId, id);
    return { deleted: true };
  }
}
