/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional, IsIn, IsNumber, Min, IsBoolean } from 'class-validator';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsString()
  @IsOptional()
  bank?: string;

  @IsIn(['VISA', 'MASTERCARD', 'ELO', 'AMEX', 'HIPERCARD', 'DINERS', 'DISCOVER', 'OUTRO'])
  @IsOptional()
  brand?: string;

  @IsNumber({}, { message: 'Limite total deve ser um número' })
  @Min(0, { message: 'Limite não pode ser negativo' })
  limitTotal: number;

  @IsNumber({}, { message: 'Limite utilizado deve ser um número' })
  @Min(0, { message: 'Limite utilizado não pode ser negativo' })
  @IsOptional()
  limitUsed?: number;

  @IsNumber({}, { message: 'Dia de vencimento deve ser um número' })
  @Min(1)
  @IsOptional()
  dueDay?: number;

  @IsNumber({}, { message: 'Dia de fechamento deve ser um número' })
  @Min(1)
  @IsOptional()
  closingDay?: number;

  @IsString()
  @IsOptional()
  color?: string;

  @IsIn(['ACTIVE', 'BLOCKED', 'CANCELLED'])
  @IsOptional()
  status?: string;
}

export class UpdateCardDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  bank?: string;

  @IsIn(['VISA', 'MASTERCARD', 'ELO', 'AMEX', 'HIPERCARD', 'DINERS', 'DISCOVER', 'OUTRO'])
  @IsOptional()
  brand?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  limitTotal?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  limitUsed?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  dueDay?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  closingDay?: number;

  @IsString()
  @IsOptional()
  color?: string;

  @IsIn(['ACTIVE', 'BLOCKED', 'CANCELLED'])
  @IsOptional()
  status?: string;
}