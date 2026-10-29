/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { TransactionsRepository } from '../repository/transactions.repository';
import { CreateTransactionDto, UpdateTransactionDto } from '../dto/transaction.dto';
import { logTransactionCreated, logTransactionRemoved } from '../logs/transactions.logs';

@Injectable()
export class TransactionsService {
  constructor(private readonly transactionsRepository: TransactionsRepository) {}

  async findAll(userId: string, type?: string, take = 100) {
    const transactions = await this.transactionsRepository.findAll(userId, type, take);
    return this.map(transactions);
  }

  async findRecent(userId: string, take = 5) {
    const transactions = await this.transactionsRepository.findRecent(userId, take);
    return this.map(transactions);
  }

  private map(
    transactions: {
      id: string;
      description: string;
      amount: unknown;
      type: string;
      date: Date;
      paymentMethod: string | null;
      recurrence: string | null;
      notes: string | null;
      accountId: string | null;
      account: { name: string } | null;
      creditCardId: string | null;
      creditCard: { name: string } | null;
      categoryId: string | null;
      category: { name: string; color: string } | null;
    }[],
  ) {
    return transactions.map((t) => ({
      id: t.id,
      description: t.description,
      amount: Number(t.amount),
      type: t.type,
      date: t.date,
      paymentMethod: t.paymentMethod,
      recurrence: t.recurrence,
      notes: t.notes,
      accountId: t.accountId,
      accountName: t.account?.name ?? null,
      creditCardId: t.creditCardId,
      creditCardName: t.creditCard?.name ?? null,
      categoryId: t.categoryId,
      categoryName: t.category?.name ?? null,
      categoryColor: t.category?.color ?? '#6b7280',
    }));
  }

  /** Retorna o delta a aplicar no saldo da conta.
   *  - INCOME: +amount
   *  - EXPENSE: -amount
   *  - TRANSFER: 0 (não altera saldo bancário)
   *  - Se houver creditCardId: 0 (compra no cartão afeta limite, não saldo)
   */
  private balanceDelta(type: string, amount: number): number {
    if (type === 'INCOME') return amount;
    if (type === 'EXPENSE') return -amount;
    return 0;
  }

  async create(userId: string, dto: CreateTransactionDto) {
    const created = await this.transactionsRepository.withBalanceLock(async () => {
      const transaction = await this.transactionsRepository.create(userId, {
        userId,
        description: dto.description,
        amount: dto.amount,
        type: dto.type,
        date: dto.date ? new Date(dto.date) : new Date(),
        accountId: dto.accountId ?? null,
        creditCardId: dto.creditCardId ?? null,
        categoryId: dto.categoryId ?? null,
        paymentMethod: dto.paymentMethod ?? null,
        recurrence: dto.recurrence ?? 'NONE',
        notes: dto.notes ?? null,
      });

      // Ajusta saldo da conta apenas se houver accountId e não for compra no cartão
      if (dto.accountId && !dto.creditCardId) {
        const delta = this.balanceDelta(dto.type, dto.amount);
        if (delta !== 0) {
          await this.transactionsRepository.adjustAccountBalance(dto.accountId, delta);
        }
      }

      return transaction;
    });

    logTransactionCreated(String(created.id), userId);
    return { ...created, amount: Number(created.amount) };
  }

  async update(userId: string, id: string, dto: UpdateTransactionDto) {
    const existing = await this.transactionsRepository.findById(userId, id);
    if (!existing) {
      throw new NotFoundException('Transação não encontrada');
    }

    const updated = await this.transactionsRepository.withBalanceLock(async () => {
      // Reverte o efeito da transação antiga no saldo da conta
      if (existing.accountId && !existing.creditCardId) {
        const oldDelta = this.balanceDelta(existing.type, Number(existing.amount));
        if (oldDelta !== 0) {
          await this.transactionsRepository.adjustAccountBalance(
            existing.accountId,
            -oldDelta, // inverte o efeito anterior
          );
        }
      }

      await this.transactionsRepository.update(userId, id, {
        ...(dto.description !== undefined ? { description: dto.description } : {}),
        ...(dto.amount !== undefined ? { amount: dto.amount } : {}),
        ...(dto.type !== undefined ? { type: dto.type } : {}),
        ...(dto.date !== undefined ? { date: new Date(dto.date) } : {}),
        ...(dto.accountId !== undefined ? { accountId: dto.accountId } : {}),
        ...(dto.creditCardId !== undefined ? { creditCardId: dto.creditCardId } : {}),
        ...(dto.categoryId !== undefined ? { categoryId: dto.categoryId } : {}),
        ...(dto.paymentMethod !== undefined ? { paymentMethod: dto.paymentMethod } : {}),
        ...(dto.recurrence !== undefined ? { recurrence: dto.recurrence } : {}),
        ...(dto.notes !== undefined ? { notes: dto.notes } : {}),
      });

      // Aplica o efeito da nova transação
      const newType = dto.type ?? existing.type;
      const newAmount = dto.amount ?? Number(existing.amount);
      const newAccountId = dto.accountId ?? existing.accountId;
      const newCreditCardId = dto.creditCardId ?? existing.creditCardId;

      if (newAccountId && !newCreditCardId) {
        const delta = this.balanceDelta(newType, newAmount);
        if (delta !== 0) {
          await this.transactionsRepository.adjustAccountBalance(newAccountId, delta);
        }
      }

      return this.transactionsRepository.findById(userId, id);
    });

    if (!updated) {
      throw new BadRequestException('Falha ao atualizar transação');
    }
    return { ...updated, amount: Number(updated.amount) };
  }

  async remove(userId: string, id: string) {
    const existing = await this.transactionsRepository.findById(userId, id);
    if (!existing) {
      throw new NotFoundException('Transação não encontrada');
    }

    await this.transactionsRepository.withBalanceLock(async () => {
      // Reverte o efeito no saldo da conta
      if (existing.accountId && !existing.creditCardId) {
        const delta = this.balanceDelta(existing.type, Number(existing.amount));
        if (delta !== 0) {
          await this.transactionsRepository.adjustAccountBalance(
            existing.accountId,
            -delta, // inverte o efeito anterior
          );
        }
      }
      await this.transactionsRepository.remove(userId, id);
    });

    logTransactionRemoved(id, userId);
    return { deleted: true };
  }
}
