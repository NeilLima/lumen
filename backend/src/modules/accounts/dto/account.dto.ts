/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional, IsIn, IsNumber, Min, IsBoolean } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsString()
  @IsOptional()
  bank?: string;

  @IsIn(['CHECKING', 'SAVINGS', 'WALLET', 'INVESTMENT'], { message: 'Tipo inválido' })
  @IsOptional()
  type?: string;

  @IsNumber({}, { message: 'Saldo deve ser um número' })
  @Min(0, { message: 'Saldo não pode ser negativo' })
  @IsOptional()
  balance?: number;

  @IsString()
  @IsOptional()
  color?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}

export class UpdateAccountDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  bank?: string;

  @IsIn(['CHECKING', 'SAVINGS', 'WALLET', 'INVESTMENT'])
  @IsOptional()
  type?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  balance?: number;

  @IsString()
  @IsOptional()
  color?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
