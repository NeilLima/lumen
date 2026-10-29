/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthService } from '../services/auth.service';
import { AuthRepository } from '../repository/auth.repository';

describe('AuthService', () => {
  let service: AuthService;
  let repository: { findUserByEmail: jest.Mock; findUserById: jest.Mock; createUser: jest.Mock };
  let jwtService: { sign: jest.Mock };
  let configService: { get: jest.Mock };

  const mockUser = {
    id: 'user-1',
    email: 'teste@lumen.com',
    password: bcrypt.hashSync('senha12345', 10),
    profile: { firstName: 'Teste', lastName: 'Silva' },
  };

  beforeEach(async () => {
    repository = {
      findUserByEmail: jest.fn(),
      findUserById: jest.fn(),
      createUser: jest.fn(),
    };
    jwtService = { sign: jest.fn().mockReturnValue('token-jwt') };
    configService = { get: jest.fn().mockReturnValue('test-secret') };

    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AuthRepository, useValue: repository },
        { provide: JwtService, useValue: jwtService },
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('deve registrar um novo usuário e retornar token sem senha', async () => {
    repository.findUserByEmail.mockResolvedValue(null);
    repository.createUser.mockResolvedValue({ ...mockUser, password: 'hashed' });

    const result = await service.register({
      email: 'teste@lumen.com',
      password: 'senha12345',
      firstName: 'Teste',
      lastName: 'Silva',
    });

    expect(repository.createUser).toHaveBeenCalledTimes(1);
    expect(jwtService.sign).toHaveBeenCalledWith(
      { sub: mockUser.id, email: mockUser.email },
      expect.objectContaining({ secret: 'test-secret' }),
    );
    expect(result.token).toBe('token-jwt');
    expect(result.user).not.toHaveProperty('password');
    expect(result.user.email).toBe('teste@lumen.com');
  });

  it('deve falhar ao registrar com e-mail já em uso', async () => {
    repository.findUserByEmail.mockResolvedValue(mockUser);

    await expect(
      service.register({
        email: 'teste@lumen.com',
        password: 'senha12345',
        firstName: 'Teste',
        lastName: 'Silva',
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('deve fazer login com credenciais válidas', async () => {
    repository.findUserByEmail.mockResolvedValue(mockUser);

    const result = await service.login({ email: 'teste@lumen.com', password: 'senha12345' });

    expect(result.token).toBe('token-jwt');
    expect(result.user).not.toHaveProperty('password');
  });

  it('deve falhar login com usuário inexistente', async () => {
    repository.findUserByEmail.mockResolvedValue(null);

    await expect(
      service.login({ email: 'nao@existe.com', password: 'senha12345' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('deve falhar login com senha incorreta', async () => {
    repository.findUserByEmail.mockResolvedValue(mockUser);

    await expect(
      service.login({ email: 'teste@lumen.com', password: 'errada123' }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
