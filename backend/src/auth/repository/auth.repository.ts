/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });
  }

  async findUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });
  }

  async createUser(data: {
    email: string;
    password: string;
    profile: {
      firstName: string;
      lastName: string;
      countryIso2: string | null;
      stateIso2: string | null;
      city: string | null;
      birthDate: Date | null;
      gender: string | null;
    };
  }) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        profile: {
          create: data.profile,
        },
      },
      include: { profile: true },
    });
  }
}

