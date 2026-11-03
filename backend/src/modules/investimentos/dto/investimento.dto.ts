/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateInvestimentoDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  broker?: string;

  @IsNumber({}, { message: 'Valor atual deve ser um número' })
  @Min(0)
  currentValue: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  investedAmount?: number;

  @IsString()
  @IsOptional()
  appliedDate?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateInvestimentoDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  broker?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  currentValue?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  investedAmount?: number;

  @IsString()
  @IsOptional()
  appliedDate?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
