/* eslint-disable prettier/prettier */
import { NotFoundException } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsRepository } from '../repository/accounts.repository';

describe('AccountsService', () => {
  let service: AccountsService;
  let repository: AccountsRepository;

  const mockUserId = 'user_123';
  const mockAccount = {
    id: 'acc_123',
    userId: mockUserId,
    name: 'Conta Teste',
    type: 'CHECKING',
    balance: '1000.00',
    color: '#3B82F6',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    repository = {
      findAll: jest.fn(),
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as unknown as AccountsRepository;

    service = new AccountsService(repository);
  });

  describe('findAll', () => {
    it('should return all accounts with balance as number', async () => {
      jest.spyOn(repository, 'findAll').mockResolvedValue([mockAccount]);

      const result = await service.findAll(mockUserId);

      expect(repository.findAll).toHaveBeenCalledWith(mockUserId);
      expect(result).toHaveLength(1);
      expect(result[0].balance).toBe(1000);
      expect(typeof result[0].balance).toBe('number');
    });

    it('should return empty array when no accounts exist', async () => {
      jest.spyOn(repository, 'findAll').mockResolvedValue([]);

      const result = await service.findAll(mockUserId);

      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    const createDto = {
      name: 'Nova Conta',
      type: 'SAVINGS' as const,
      balance: 500,
      color: '#10B981',
    };

    it('should create an account and return balance as number', async () => {
      const createdAccount = { ...mockAccount, name: 'Nova Conta', balance: '500.00' };
      jest.spyOn(repository, 'create').mockResolvedValue(createdAccount);

      const result = await service.create(mockUserId, createDto);

      expect(repository.create).toHaveBeenCalledWith(mockUserId, {
        userId: mockUserId,
        name: 'Nova Conta',
        type: 'SAVINGS',
        balance: 500,
        color: '#10B981',
      });
      expect(result.balance).toBe(500);
      expect(typeof result.balance).toBe('number');
    });

    it('should use default type CHECKING when not provided', async () => {
      const createdAccount = { ...mockAccount, name: 'Nova Conta', balance: '0.00' };
      jest.spyOn(repository, 'create').mockResolvedValue(createdAccount);

      await service.create(mockUserId, { name: 'Nova Conta' } as any);

      expect(repository.create).toHaveBeenCalledWith(mockUserId, {
        userId: mockUserId,
        name: 'Nova Conta',
        type: 'CHECKING',
        balance: 0,
        color: null,
      });
    });
  });

  describe('update', () => {
    const updateDto = { name: 'Conta Atualizada' };

    it('should update account and return updated data', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(mockAccount);
      jest.spyOn(repository, 'update').mockResolvedValue({ ...mockAccount, ...updateDto });
      jest.spyOn(repository, 'findById').mockResolvedValueOnce({ ...mockAccount, ...updateDto });

      const result = await service.update(mockUserId, 'acc_123', updateDto);

      expect(repository.findById).toHaveBeenCalledWith(mockUserId, 'acc_123');
      expect(repository.update).toHaveBeenCalledWith(mockUserId, 'acc_123', updateDto);
      expect(result.name).toBe('Conta Atualizada');
    });

    it('should throw NotFoundException when account does not exist', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(null);

      await expect(service.update(mockUserId, 'acc_999', updateDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove existing account', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(mockAccount);
      jest.spyOn(repository, 'remove').mockResolvedValue(undefined);

      const result = await service.remove(mockUserId, 'acc_123');

      expect(repository.findById).toHaveBeenCalledWith(mockUserId, 'acc_123');
      expect(repository.remove).toHaveBeenCalledWith(mockUserId, 'acc_123');
      expect(result).toEqual({ deleted: true });
    });

    it('should throw NotFoundException when account does not exist', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(null);

      await expect(service.remove(mockUserId, 'acc_999')).rejects.toThrow(NotFoundException);
    });
  });
});
