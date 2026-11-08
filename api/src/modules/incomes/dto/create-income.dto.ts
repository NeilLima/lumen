/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, IsDateString, IsIn, IsUrl } from 'class-validator';

export class CreateIncomeDto {
  @IsString()
  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  description: string;

  @IsNumber({}, { message: 'Valor deve ser um número' })
  @Min(0.01, { message: 'Valor deve ser maior que zero' })
  amount: number;

  @IsDateString({}, { message: 'Data inválida' })
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  accountId?: string;

  @IsIn(['INCOME'], { message: 'Tipo deve ser INCOME' })
  @IsOptional()
  type?: string;

  @IsIn(['RECEIVED', 'PENDING', 'LATE'], { message: 'Status inválido' })
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  paymentMethod?: string;

  @IsIn(['NONE', 'WEEKLY', 'MONTHLY', 'YEARLY'], { message: 'Recorrência inválida' })
  @IsOptional()
  recurrence?: string;

  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  @IsOptional()
  attachment?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateIncomeDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber({}, { message: 'Valor deve ser um número' })
  @Min(0.01, { message: 'Valor deve ser maior que zero' })
  @IsOptional()
  amount?: number;

  @IsDateString({}, { message: 'Data inválida' })
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  accountId?: string;

  @IsIn(['INCOME'], { message: 'Tipo deve ser INCOME' })
  @IsOptional()
  type?: string;

  @IsIn(['RECEIVED', 'PENDING', 'LATE'], { message: 'Status inválido' })
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  paymentMethod?: string;

  @IsIn(['NONE', 'WEEKLY', 'MONTHLY', 'YEARLY'], { message: 'Recorrência inválida' })
  @IsOptional()
  recurrence?: string;

  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  @IsOptional()
  attachment?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}