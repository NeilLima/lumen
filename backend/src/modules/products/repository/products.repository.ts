/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../core/prisma/prisma.service.js';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.product.findMany({ where: { userId }, orderBy: { name: 'asc' } });
  }

  async findById(userId: string, id: string) {
    return this.prisma.product.findFirst({ where: { id, userId } });
  }

  async create(userId: string, data: Prisma.ProductUncheckedCreateInput) {
    return this.prisma.product.create({ data: { ...data, userId } });
  }

  async update(userId: string, id: string, data: Prisma.ProductUncheckedUpdateInput) {
    return this.prisma.product.updateMany({ where: { id, userId }, data });
  }

  async remove(userId: string, id: string) {
    return this.prisma.product.deleteMany({ where: { id, userId } });
  }

  /** 🔗 Propaga dados do produto p/ os itens de compra vinculados.
   *  ⚖️ REGRA CONTÁBIL: nome/unidade atualizam (são atributos), mas
   *  PREÇO NUNCA — compra é registro histórico do dia da compra
   *  (precoUnitario/subtotal/totalAmount ficam congelados). */
  async syncCompraItems(userId: string, productId: string, data: { name?: string; unit?: string }) {
    const items = await this.prisma.compraItem.findMany({
      where: { productId, compra: { userId } },
      select: { id: true },
    });
    const patch: Prisma.CompraItemUncheckedUpdateInput = {};
    if (data.name !== undefined) patch.nome = data.name;
    if (data.unit !== undefined) patch.unidade = data.unit;
    if (Object.keys(patch).length === 0) return 0;
    await this.prisma.compraItem.updateMany({ where: { productId, compra: { userId } }, data: patch });
    return items.length;
  }

  /** 🔗 Propaga dados do produto p/ os itens de estoque vinculados */
  async syncEstoqueItems(userId: string, productId: string, data: { name?: string; category?: string; unit?: string; local?: string | null; price?: unknown }) {
    const patch: Prisma.EstoqueItemUncheckedUpdateInput = {};
    if (data.name !== undefined) patch.nome = data.name;
    if (data.category !== undefined) patch.categoria = data.category;
    if (data.unit !== undefined) patch.unidade = data.unit;
    if (data.local !== undefined) patch.localCompra = data.local ?? '';
    if (data.price !== undefined && data.price !== null) patch.preco = Number(data.price);
    if (Object.keys(patch).length === 0) return 0;
    const res = await this.prisma.estoqueItem.updateMany({
      where: { productId, userId },
      data: patch,
    });
    return res.count;
  }

  /** 🗑️ Remove os itens de ESTOQUE vinculados ao produto (o histórico de
   *  compras é preservado — onDelete:SetNull só desvincula o productId) */
  async removeLinkedEstoque(userId: string, productId: string) {
    return this.prisma.estoqueItem.deleteMany({ where: { productId, userId } });
  }
}