/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { EstoqueRepository } from '../repository/estoque.repository';
import { CreateEstoqueItemDto, UpdateEstoqueItemDto } from '../dto/estoque.dto';
import { logEstoqueItemCreated, logEstoqueItemUpdated, logEstoqueItemRemoved } from '../logs/estoque.logs';

@Injectable()
export class EstoqueService {
  constructor(private readonly estoqueRepository: EstoqueRepository) {}

  async findAll(userId: string) {
    const itens = await this.estoqueRepository.findAll(userId);
    return itens.map((item) => ({
      ...item,
      quantidade: Number(item.quantidade),
      preco: Number(item.preco),
      quantidadeMinima: Number(item.quantidadeMinima),
    }));
  }

  async create(userId: string, dto: CreateEstoqueItemDto) {
    const item = await this.estoqueRepository.create(userId, {
      userId,
      nome: dto.nome,
      categoria: dto.categoria,
      quantidade: dto.quantidade,
      unidade: dto.unidade,
      preco: dto.preco,
      localCompra: dto.localCompra,
      quantidadeMinima: dto.quantidadeMinima,
    });
    logEstoqueItemCreated(item.id, userId);
    return {
      ...item,
      quantidade: Number(item.quantidade),
      preco: Number(item.preco),
      quantidadeMinima: Number(item.quantidadeMinima),
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
      quantidadeMinima: Number(item.quantidadeMinima),
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