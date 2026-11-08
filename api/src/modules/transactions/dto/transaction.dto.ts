/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsNumber, IsIn, IsOptional, IsISO8601 } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  description: string;

  @IsNumber({}, { message: 'Valor deve ser um número' })
  amount: number;

  @IsIn(['INCOME', 'EXPENSE', 'TRANSFER'], { message: 'Tipo deve ser INCOME, EXPENSE ou TRANSFER' })
  type: string;

  @IsISO8601({}, { message: 'Data inválida' })
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  accountId?: string;

  @IsString()
  @IsOptional()
  creditCardId?: string;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  paymentMethod?: string;

  @IsIn(['NONE', 'WEEKLY', 'MONTHLY', 'YEARLY'])
  @IsOptional()
  recurrence?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateTransactionDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsIn(['INCOME', 'EXPENSE', 'TRANSFER'])
  @IsOptional()
  type?: string;

  @IsISO8601()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  accountId?: string;

  @IsString()
  @IsOptional()
  creditCardId?: string;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  paymentMethod?: string;

  @IsIn(['NONE', 'WEEKLY', 'MONTHLY', 'YEARLY'])
  @IsOptional()
  recurrence?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
