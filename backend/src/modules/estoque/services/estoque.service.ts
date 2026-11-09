/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { EstoqueRepository } from '../repository/estoque.repository.js';
import { CreateEstoqueItemDto, UpdateEstoqueItemDto } from '../dto/estoque.dto.js';
import { logEstoqueItemCreated, logEstoqueItemUpdated, logEstoqueItemRemoved } from '../logs/estoque.logs.js';

@Injectable()
export class EstoqueService {
  constructor(private readonly estoqueRepository: EstoqueRepository) {}

  async findAll(userId: string) {
    const itens = await this.estoqueRepository.findAll(userId);
    return itens.map((item) => ({
      ...item,
      quantidade: Number(item.quantidade),
      preco: Number(item.preco),
    }));
  }

  async create(userId: string, dto: CreateEstoqueItemDto) {
    const item = await this.estoqueRepository.create(userId, {
      userId,
      nome: dto.nome ?? '',
      categoria: dto.categoria ?? '',
      quantidade: dto.quantidade,
      unidade: dto.unidade ?? 'un',
      preco: dto.preco ?? 0,
      localCompra: dto.localCompra ?? '',
      quantidadeMinima: dto.quantidadeMinima,
      compraItemId: dto.compraItemId ?? null,
    });
    logEstoqueItemCreated(item.id, userId);
    return {
      ...item,
      quantidade: Number(item.quantidade),
      preco: Number(item.preco),
    };
  }

  async update(userId: string, id: string, dto: UpdateEstoqueItemDto) {
    const existing = await this.estoqueRepository.findById(userId, id);
    if (!existing) {
      throw new NotFoundException('Item de estoque não encontrado');
    }
    await this.estoqueRepository.update(userId, id, dto);
    const item = await this.estoqueRepository.findById(userId, id);
    if (!item) {
      throw new NotFoundException('Item de estoque não encontrado');
    }
    logEstoqueItemUpdated(item.id, userId);
    return {
      ...item,
      quantidade: Number(item.quantidade),
      preco: Number(item.preco),
    };
  }

  async remove(userId: string, id: string) {
    const existing = await this.estoqueRepository.findById(userId, id);
    if (!existing) {
      throw new NotFoundException('Item de estoque não encontrado');
    }
    await this.estoqueRepository.remove(userId, id);
    logEstoqueItemRemoved(id, userId);
    return { deleted: true };
  }
}