/* eslint-disable prettier/prettier */
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { MetasRepository } from '../repository/metas.repository.js';
import { CreateMetaDto, UpdateMetaDto } from '../dto/meta.dto.js';

@Injectable()
export class MetasService {
  private readonly logger = new Logger(MetasService.name);

  constructor(private readonly metasRepository: MetasRepository) {}

  async findAll(userId: string) {
    const metas = await this.metasRepository.findAll(userId);
    this.logger.log(`Listadas ${metas.length} metas para o usuário ${userId}`);
    return metas;
  }

  async create(userId: string, dto: CreateMetaDto) {
    return this.metasRepository.create(userId, {
      userId,
      nome: dto.nome,
      valorAlvo: dto.valorAlvo,
      valorAtual: dto.valorAtual ?? 0,
      dataLimite: dto.dataLimite,
      categoria: dto.categoria,
      categoriaCor: dto.categoriaCor ?? '#8b5cf6',
      categoriaIcone: dto.categoriaIcone ?? '🎯',
      prioridade: dto.prioridade ?? 'media',
      status: dto.status ?? 'em_andamento',
      descricao: dto.descricao ?? null,
    });
  }

  async update(userId: string, id: string, dto: UpdateMetaDto) {
    const existing = await this.metasRepository.findById(userId, id);
    if (!existing) {
      throw new NotFoundException('Meta não encontrada');
    }
    await this.metasRepository.update(userId, id, dto as Record<string, unknown>);
    return this.metasRepository.findById(userId, id);
  }

  async remove(userId: string, id: string) {
    const existing = await this.metasRepository.findById(userId, id);
    if (!existing) {
      throw new NotFoundException('Meta não encontrada');
    }
    await this.metasRepository.remove(userId, id);
    return { deleted: true };
  }
}