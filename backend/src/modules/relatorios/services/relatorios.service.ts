/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { RelatoriosRepository } from '../repository/relatorios.repository.js';
import { CreateRelatorioDto, UpdateRelatorioDto } from '../dto/relatorio.dto.js';

@Injectable()
export class RelatoriosService {
  constructor(private readonly relatoriosRepository: RelatoriosRepository) {}

  private map(r: any) {
    return {
      ...r,
      dataInicio: r.dataInicio ? r.dataInicio.toISOString().split('T')[0] : null,
      dataFim: r.dataFim ? r.dataFim.toISOString().split('T')[0] : null,
    };
  }

  async findAll(userId: string) {
    const items = await this.relatoriosRepository.findAll(userId);
    return items.map((r) => this.map(r));
  }

  async findById(userId: string, id: string) {
    const r = await this.relatoriosRepository.findById(userId, id);
    if (!r) return null;
    return this.map(r);
  }

  async create(userId: string, dto: CreateRelatorioDto) {
    const r = await this.relatoriosRepository.create(userId, {
      nome: dto.nome,
      tipo: dto.tipo ?? 'fluxo',
      periodo: dto.periodo ?? 'mensal',
      dataInicio: new Date(dto.dataInicio),
      dataFim: new Date(dto.dataFim),
      observacoes: dto.observacoes ?? null,
    });
    return this.map(r);
  }

  async update(userId: string, id: string, dto: UpdateRelatorioDto) {
    const existing = await this.relatoriosRepository.findById(userId, id);
    if (!existing) throw new NotFoundException('Relatório não encontrado');
    await this.relatoriosRepository.update(userId, id, {
      ...(dto.nome !== undefined ? { nome: dto.nome } : {}),
      ...(dto.tipo !== undefined ? { tipo: dto.tipo } : {}),
      ...(dto.periodo !== undefined ? { periodo: dto.periodo } : {}),
      ...(dto.dataInicio !== undefined ? { dataInicio: new Date(dto.dataInicio) } : {}),
      ...(dto.dataFim !== undefined ? { dataFim: new Date(dto.dataFim) } : {}),
      ...(dto.observacoes !== undefined ? { observacoes: dto.observacoes } : {}),
    });
    const r = await this.relatoriosRepository.findById(userId, id);
    if (!r) throw new NotFoundException('Relatório não encontrado');
    return this.map(r);
  }

  async remove(userId: string, id: string) {
    const existing = await this.relatoriosRepository.findById(userId, id);
    if (!existing) throw new NotFoundException('Relatório não encontrado');
    await this.relatoriosRepository.remove(userId, id);
    return { deleted: true };
  }
}
