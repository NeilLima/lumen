/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateEstoqueItemDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'Categoria é obrigatória' })
  categoria: string;

  @IsNumber({}, { message: 'Quantidade deve ser um número' })
  @Min(0, { message: 'Quantidade não pode ser negativa' })
  quantidade: number;

  @IsString()
  @IsNotEmpty({ message: 'Unidade é obrigatória' })
  unidade: string;

  @IsNumber({}, { message: 'Preço deve ser um número' })
  @Min(0, { message: 'Preço não pode ser negativo' })
  preco: number;

  @IsString()
  @IsNotEmpty({ message: 'Local de compra é obrigatório' })
  localCompra: string;

  @IsNumber({}, { message: 'Quantidade mínima deve ser um número' })
  @Min(0, { message: 'Quantidade mínima não pode ser negativa' })
  quantidadeMinima: number;
}

export class UpdateEstoqueItemDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  categoria?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  quantidade?: number;

  @IsString()
  @IsOptional()
  unidade?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  preco?: number;

  @IsString()
  @IsOptional()
  localCompra?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  quantidadeMinima?: number;
}