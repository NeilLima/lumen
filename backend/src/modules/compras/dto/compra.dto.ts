/* eslint-disable prettier/prettier */
import { IsString, IsOptional, IsNumber, Min, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CompraItemDto {
  @IsString()
  @IsOptional()
  productId?: string;

  @IsString()
  nome: string;

  @IsNumber({}, { message: 'Quantidade deve ser um número' })
  @Min(0, { message: 'Quantidade não pode ser negativa' })
  quantidade: number;

  @IsString()
  @IsOptional()
  unidade?: string;

  @IsNumber({}, { message: 'Preço deve ser um número' })
  @Min(0, { message: 'Preço não pode ser negativo' })
  precoUnitario: number;
}

export class CreateCompraDto {
  @IsString()
  @IsOptional()
  local?: string;

  @IsString()
  @IsOptional()
  dataCompra?: string;

  @IsString()
  @IsOptional()
  statusPagamento?: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  parcels?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  parcelasPagas?: number;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  accountId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CompraItemDto)
  itens: CompraItemDto[];
}

export class UpdateCompraDto {
  @IsString()
  @IsOptional()
  local?: string;

  @IsString()
  @IsOptional()
  dataCompra?: string;

  @IsString()
  @IsOptional()
  statusPagamento?: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  parcels?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  parcelasPagas?: number;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  accountId?: string;
}
