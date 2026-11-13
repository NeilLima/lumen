/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from '../repository/products.repository.js';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto.js';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async findAll(userId: string) {
    const products = await this.productsRepository.findAll(userId);
    return products.map((p) => this.map(p));
  }

  async findById(userId: string, id: string) {
    const p = await this.productsRepository.findById(userId, id);
    if (!p) return null;
    return this.map(p);
  }

  private map(p: { id: string; userId: string; name: string; category: string; unit: string; local: string | null; price: unknown; installments: number; createdAt: Date; updatedAt: Date }) {
    return {
      ...p,
      price: p.price != null ? Number(p.price) : null,
    };
  }

  async create(userId: string, dto: CreateProductDto) {
    const created = await this.productsRepository.create(userId, {
      userId,
      name: dto.name,
      category: dto.category,
      unit: dto.unit ?? 'un',
      local: dto.local ?? null,
      price: dto.price ?? null,
      installments: dto.installments ?? 1,
    });
    return this.map(created);
  }

  async update(userId: string, id: string, dto: UpdateProductDto) {
    const existing = await this.productsRepository.findById(userId, id);
    if (!existing) throw new NotFoundException('Produto não encontrado');
    const updateData = {
      ...(dto.name !== undefined ? { name: dto.name } : {}),
      ...(dto.category !== undefined ? { category: dto.category } : {}),
      ...(dto.unit !== undefined ? { unit: dto.unit } : {}),
      ...(dto.local !== undefined ? { local: dto.local } : {}),
      ...(dto.price !== undefined ? { price: dto.price } : {}),
      ...(dto.installments !== undefined ? { installments: dto.installments } : {}),
    };
    await this.productsRepository.update(userId, id, updateData);
    /** 🔗 Sincroniza os vínculos: compras (nome/unidade/preço+subtotal+total)
     *  e estoque (nome/categoria/unidade/local/preço) */
    await this.productsRepository.syncCompraItems(userId, id, updateData);
    await this.productsRepository.syncEstoqueItems(userId, id, updateData);
    const p = await this.productsRepository.findById(userId, id);
    if (!p) throw new NotFoundException('Produto não encontrado');
    return this.map(p);
  }

  async remove(userId: string, id: string) {
    const existing = await this.productsRepository.findById(userId, id);
    if (!existing) throw new NotFoundException('Produto não encontrado');
    /** 🗑️ Remove itens de estoque vinculados; compras ficam no histórico
     *  (productId vira null via onDelete:SetNull — não apaga registro financeiro) */
    await this.productsRepository.removeLinkedEstoque(userId, id);
    await this.productsRepository.remove(userId, id);
    return { deleted: true };
  }
}