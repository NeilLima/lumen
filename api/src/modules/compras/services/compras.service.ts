/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { ComprasRepository } from '../repository/compras.repository.js';
import { CreateCompraDto, UpdateCompraDto } from '../dto/compra.dto.js';
import { DividasService } from '../../dividas/services/dividas.service.js';

@Injectable()
export class ComprasService {
  constructor(
    private readonly comprasRepository: ComprasRepository,
    private readonly dividasService: DividasService,
  ) {}

  private map(compra: any) {
    return {
      ...compra,
      totalAmount: Number(compra.totalAmount),
      itens: (compra.itens || []).map((i: any) => ({
        ...i,
        quantidade: Number(i.quantidade),
        precoUnitario: Number(i.precoUnitario),
        subtotal: Number(i.subtotal),
      })),
    };
  }

  async findAll(userId: string) {
    const list = await this.comprasRepository.findAll(userId);
    return list.map((c) => this.map(c));
  }

  async findById(userId: string, id: string) {
    const c = await this.comprasRepository.findById(userId, id);
    if (!c) return null;
    return this.map(c);
  }

  async create(userId: string, dto: CreateCompraDto) {
    const itens = dto.itens.map((i) => {
      const q = i.quantidade;
      const p = i.precoUnitario;
      return {
        productId: i.productId ?? null,
        nome: i.nome,
        quantidade: q,
        unidade: i.unidade ?? 'un',
        precoUnitario: p,
        subtotal: q * p,
      };
    });
    const total = itens.reduce((acc, i) => acc + i.subtotal, 0);
    const status = dto.statusPagamento ?? 'pendente';
    const compra = await this.comprasRepository.create(
      userId,
      {
        local: dto.local ?? null,
        dataCompra: dto.dataCompra ? new Date(dto.dataCompra) : new Date(),
        statusPagamento: status,
        parcels: dto.parcels ?? 1,
        parcelasPagas: dto.parcelasPagas ?? 0,
        totalAmount: total,
        notes: dto.notes ?? null,
      },
      itens,
    );

    if (status !== 'pago') {
      await this.dividasService.create(userId, {
        name: dto.local ? `Compra - ${dto.local}` : 'Compra',
        totalAmount: total,
        remainingAmount: total,
        interestRate: 0,
        dueDate: dto.dataCompra ?? new Date().toISOString(),
        parcels: dto.parcels ?? 1,
        parcelasPagas: dto.parcelasPagas ?? 0,
        status: 'em_dia',
        notes: dto.notes ?? undefined,
      });
    }

    return this.map(compra);
  }

  async update(userId: string, id: string, dto: UpdateCompraDto) {
    const existing = await this.comprasRepository.findById(userId, id);
    if (!existing) throw new NotFoundException('Compra não encontrada');
    await this.comprasRepository.update(userId, id, {
      ...(dto.local !== undefined ? { local: dto.local } : {}),
      ...(dto.dataCompra !== undefined ? { dataCompra: dto.dataCompra ? new Date(dto.dataCompra) : undefined } : {}),
      ...(dto.statusPagamento !== undefined ? { statusPagamento: dto.statusPagamento } : {}),
      ...(dto.parcels !== undefined ? { parcels: dto.parcels } : {}),
      ...(dto.parcelasPagas !== undefined ? { parcelasPagas: dto.parcelasPagas } : {}),
      ...(dto.notes !== undefined ? { notes: dto.notes } : {}),
    });
    const c = await this.comprasRepository.findById(userId, id);
    if (!c) throw new NotFoundException('Compra não encontrada');
    return this.map(c);
  }

  async remove(userId: string, id: string) {
    const existing = await this.comprasRepository.findById(userId, id);
    if (!existing) throw new NotFoundException('Compra não encontrada');
    await this.comprasRepository.remove(userId, id);
    return { deleted: true };
  }
}
