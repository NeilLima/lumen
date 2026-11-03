/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateOrcamentoDto {
  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsNotEmpty({ message: 'Mês é obrigatório' })
  month: string; // YYYY-MM

  @IsNumber({}, { message: 'Limite deve ser um número' })
  @Min(0)
  limitAmount: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  spentAmount?: number;
}

export class UpdateOrcamentoDto {
  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  month?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  limitAmount?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  spentAmount?: number;
}
