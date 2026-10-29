/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountsRepository } from '../repository/accounts.repository';
import { CreateAccountDto, UpdateAccountDto } from '../dto/account.dto';

@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async findAll(userId: string) {
    const accounts = await this.accountsRepository.findAll(userId);
    return accounts.map((account) => ({
      ...account,
      balance: Number(account.balance),
    }));
  }

  async create(userId: string, dto: CreateAccountDto) {
    const account = await this.accountsRepository.create(userId, {
      userId,
      name: dto.name,
      bank: dto.bank ?? null,
      type: dto.type ?? 'CHECKING',
      balance: dto.balance ?? 0,
      color: dto.color ?? null,
      active: dto.active ?? true,
    });
    return { ...account, balance: Number(account.balance) };
  }

  async update(userId: string, id: string, dto: UpdateAccountDto) {
    const existing = await this.accountsRepository.findById(userId, id);
    if (!existing) {
      throw new NotFoundException('Conta não encontrada');
    }
    await this.accountsRepository.update(userId, id, dto);
    const account = await this.accountsRepository.findById(userId, id);
    if (!account) {
      throw new NotFoundException('Conta não encontrada');
    }
    return { ...account, balance: Number(account.balance) };
  }

  async remove(userId: string, id: string) {
    const existing = await this.accountsRepository.findById(userId, id);
    if (!existing) {
      throw new NotFoundException('Conta não encontrada');
    }
    await this.accountsRepository.remove(userId, id);
    return { deleted: true };
  }
}
