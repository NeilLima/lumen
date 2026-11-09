/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { ComprasRepository } from '../repository/compras.repository.js';
import { CreateCompraDto, UpdateCompraDto } from '../dto/compra.dto.js';
import { DividasService } from '../../dividas/services/dividas.service.js';
import { TransactionsService } from '../../transactions/services/transactions.service.js';

@Injectable()
export class ComprasService {
  constructor(
    private readonly comprasRepository: ComprasRepository,
    private readonly dividasService: DividasService,
    private readonly transactionsService: TransactionsService,
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
    const dataCompra = dto.dataCompra ? new Date(dto.dataCompra) : new Date();
    const compra = await this.comprasRepository.create(
      userId,
      {
        local: dto.local ?? null,
        dataCompra,
        statusPagamento: status,
        parcels: dto.parcels ?? 1,
        parcelasPagas: dto.parcelasPagas ?? 0,
        totalAmount: total,
        notes: dto.notes ?? null,
        accountId: dto.accountId || null,
      },
      itens,
    );

    // Compra paga com conta definida gera transação de despesa (desconta o saldo)
    if (status === 'pago' && dto.accountId) {
      const tx = await this.transactionsService.create(userId, {
        description: `Compra - ${dto.local ?? 'itens'}`,
        amount: total,
        type: 'EXPENSE',
        accountId: dto.accountId,
        date: dataCompra.toISOString(),
        notes: dto.notes ?? undefined,
      });
      await this.comprasRepository.update(userId, compra.id, { transactionId: tx.id });
      compra.transactionId = tx.id;
    }

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

    const newStatus = dto.statusPagamento ?? existing.statusPagamento;
    const newAccountId =
      dto.accountId !== undefined ? (dto.accountId || null) : existing.accountId;
    const total = Number(existing.totalAmount);

    // Resolve a transação de despesa conforme o novo status/conta
    let transactionId = existing.transactionId;
    if (existing.transactionId && (newStatus !== 'pago' || !newAccountId)) {
      // Saiu de "pago" ou perdeu a conta: remove a transação (reverte o saldo)
      await this.transactionsService.remove(userId, existing.transactionId);
      transactionId = null;
    } else if (!existing.transactionId && newStatus === 'pago' && newAccountId) {
      // Entrou em "pago" com conta: gera a transação de despesa
      const tx = await this.transactionsService.create(userId, {
        description: `Compra - ${existing.local ?? 'itens'}`,
        amount: total,
        type: 'EXPENSE',
        accountId: newAccountId,
        date: existing.dataCompra.toISOString(),
        notes: existing.notes ?? undefined,
      });
      transactionId = tx.id;
    } else if (existing.transactionId && newAccountId && newAccountId !== existing.accountId) {
      // Mesma compra paga, mas trocou de conta: move a transação
      await this.transactionsService.update(userId, existing.transactionId, {
        accountId: newAccountId,
      });
    }

    await this.comprasRepository.update(userId, id, {
      ...(dto.local !== undefined ? { local: dto.local } : {}),
      ...(dto.dataCompra !== undefined ? { dataCompra: dto.dataCompra ? new Date(dto.dataCompra) : undefined } : {}),
      ...(dto.statusPagamento !== undefined ? { statusPagamento: dto.statusPagamento } : {}),
      ...(dto.parcels !== undefined ? { parcels: dto.parcels } : {}),
      ...(dto.parcelasPagas !== undefined ? { parcelasPagas: dto.parcelasPagas } : {}),
      ...(dto.notes !== undefined ? { notes: dto.notes } : {}),
      ...(dto.accountId !== undefined ? { accountId: newAccountId } : {}),
      transactionId,
    });
    const c = await this.comprasRepository.findById(userId, id);
    if (!c) throw new NotFoundException('Compra não encontrada');
    return this.map(c);
  }

  async remove(userId: string, id: string) {
    const existing = await this.comprasRepository.findById(userId, id);
    if (!existing) throw new NotFoundException('Compra não encontrada');
    // Remove a transação vinculada primeiro (reverte o desconto no saldo)
    if (existing.transactionId) {
      await this.transactionsService.remove(userId, existing.transactionId);
    }
    await this.comprasRepository.remove(userId, id);
    return { deleted: true };
  }
}
