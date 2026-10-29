/* eslint-disable prettier/prettier */
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsRepository } from '../repository/transactions.repository';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let repository: TransactionsRepository;

  const mockUserId = 'user_123';
  const mockTransaction = {
    id: 'txn_123',
    userId: mockUserId,
    description: 'Salário',
    amount: '2000.00',
    type: 'INCOME',
    date: new Date(),
    accountId: 'acc_123',
    creditCardId: null,
    categoryId: null,
    paymentMethod: null,
    recurrence: 'NONE',
    notes: null,
    account: { name: 'Conta Principal' },
    creditCard: null,
    category: null,
  };

  beforeEach(() => {
    repository = {
      findAll: jest.fn(),
      findRecent: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      adjustAccountBalance: jest.fn(),
      withBalanceLock: jest.fn(async (fn: () => Promise<any>) => fn()),
    } as unknown as TransactionsRepository;

    service = new TransactionsService(repository);
  });

  describe('balanceDelta', () => {
    it('should return positive amount for INCOME', () => {
      const svc = service as any;
      expect(svc.balanceDelta('INCOME', 100)).toBe(100);
    });

    it('should return negative amount for EXPENSE', () => {
      const svc = service as any;
      expect(svc.balanceDelta('EXPENSE', 100)).toBe(-100);
    });

    it('should return 0 for TRANSFER', () => {
      const svc = service as any;
      expect(svc.balanceDelta('TRANSFER', 100)).toBe(0);
    });

    it('should return 0 for unknown types', () => {
      const svc = service as any;
      expect(svc.balanceDelta('UNKNOWN', 100)).toBe(0);
    });
  });

  describe('map', () => {
    it('should map transactions with creditCard and account names', () => {
      const svc = service as any;
      const result = svc.map([mockTransaction]);

      expect(result[0].amount).toBe(2000);
      expect(result[0].accountName).toBe('Conta Principal');
      expect(result[0].creditCardName).toBeNull();
      expect(result[0].categoryName).toBeNull();
    });
  });

  describe('findAll', () => {
    it('should return mapped transactions', async () => {
      jest.spyOn(repository, 'findAll').mockResolvedValue([mockTransaction]);

      const result = await service.findAll(mockUserId);

      expect(repository.findAll).toHaveBeenCalledWith(mockUserId, undefined, 100);
      expect(result[0].amount).toBe(2000);
      expect(result[0].type).toBe('INCOME');
    });

    it('should filter by type when provided', async () => {
      jest.spyOn(repository, 'findAll').mockResolvedValue([mockTransaction]);

      await service.findAll(mockUserId, 'INCOME');

      expect(repository.findAll).toHaveBeenCalledWith(mockUserId, 'INCOME', 100);
    });
  });

  describe('create', () => {
    const createDto = {
      description: 'Supermercado',
      amount: 150,
      type: 'EXPENSE',
      date: '2024-01-15',
      accountId: 'acc_123',
      creditCardId: null,
      categoryId: null,
      paymentMethod: 'DEBIT',
      recurrence: 'NONE',
      notes: null,
    };

    it('should create expense and adjust account balance negatively', async () => {
      const created = { ...mockTransaction, type: 'EXPENSE', amount: '150.00' };
      jest.spyOn(repository, 'create').mockResolvedValue(created);

      const result = await service.create(mockUserId, createDto as any);

      expect(repository.withBalanceLock).toHaveBeenCalled();
      expect(repository.create).toHaveBeenCalled();
      expect(repository.adjustAccountBalance).toHaveBeenCalledWith('acc_123', -150);
      expect(result.amount).toBe(150);
    });

    it('should create TRANSFER without adjusting account balance', async () => {
      const created = { ...mockTransaction, type: 'TRANSFER', amount: '500.00' };
      jest.spyOn(repository, 'create').mockResolvedValue(created);

      const transferDto = { ...createDto, type: 'TRANSFER', amount: 500 };
      await service.create(mockUserId, transferDto as any);

      expect(repository.adjustAccountBalance).not.toHaveBeenCalled();
    });

    it('should create credit card transaction without adjusting account balance', async () => {
      const created = { ...mockTransaction, creditCardId: 'card_123' };
      jest.spyOn(repository, 'create').mockResolvedValue(created);

      const cardDto = { ...createDto, creditCardId: 'card_123', accountId: 'acc_123' };
      await service.create(mockUserId, cardDto as any);

      expect(repository.adjustAccountBalance).not.toHaveBeenCalled();
    });

    it('should create INCOME and adjust account balance positively', async () => {
      const created = { ...mockTransaction, type: 'INCOME', amount: '2000.00' };
      jest.spyOn(repository, 'create').mockResolvedValue(created);

      const incomeDto = { ...createDto, type: 'INCOME', amount: 2000 };
      await service.create(mockUserId, incomeDto as any);

      expect(repository.adjustAccountBalance).toHaveBeenCalledWith('acc_123', 2000);
    });
  });

  describe('update', () => {
    it('should throw NotFoundException when transaction does not exist', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(null);

      await expect(service.update(mockUserId, 'txn_999', { description: 'Novo' } as any))
        .rejects.toThrow(NotFoundException);
    });

    it('should update transaction and adjust balance correctly', async () => {
      const existing = { ...mockTransaction, type: 'EXPENSE', amount: '100.00' };
      const updated = { ...existing, description: 'Atualizado', amount: '200.00' };

      jest.spyOn(repository, 'findById')
        .mockResolvedValueOnce(existing)
        .mockResolvedValueOnce(updated);
      jest.spyOn(repository, 'update').mockResolvedValue(updated);

      const result = await service.update(mockUserId, 'txn_123', {
        description: 'Atualizado',
        amount: 200,
      } as any);

      expect(repository.adjustAccountBalance).toHaveBeenCalledWith('acc_123', 100);
      expect(repository.adjustAccountBalance).toHaveBeenCalledWith('acc_123', -200);
      expect(result.description).toBe('Atualizado');
    });
  });

  describe('remove', () => {
    it('should throw NotFoundException when transaction does not exist', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(null);

      await expect(service.remove(mockUserId, 'txn_999')).rejects.toThrow(NotFoundException);
    });

    it('should remove transaction and revert balance effect', async () => {
      const existing = { ...mockTransaction, type: 'INCOME', amount: '500.00', accountId: 'acc_123' };
      jest.spyOn(repository, 'findById').mockResolvedValue(existing);
      jest.spyOn(repository, 'remove').mockResolvedValue(undefined);

      const result = await service.remove(mockUserId, 'txn_123');

      expect(repository.adjustAccountBalance).toHaveBeenCalledWith('acc_123', -500);
      expect(repository.remove).toHaveBeenCalledWith(mockUserId, 'txn_123');
      expect(result).toEqual({ deleted: true });
    });

    it('should not adjust balance for credit card transactions on remove', async () => {
      const existing = { ...mockTransaction, creditCardId: 'card_123', accountId: 'acc_123' };
      jest.spyOn(repository, 'findById').mockResolvedValue(existing);
      jest.spyOn(repository, 'remove').mockResolvedValue(undefined);

      await service.remove(mockUserId, 'txn_123');

      expect(repository.adjustAccountBalance).not.toHaveBeenCalled();
    });
  });
});
