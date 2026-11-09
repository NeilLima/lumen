/* eslint-disable prettier/prettier */
import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateEstoqueItemDto {
  @IsString()
  @IsOptional({ message: 'Nome pode ser preenchido manualmente ou vindo da compra' })
  nome?: string;

  @IsString()
  @IsOptional({ message: 'Categoria deve ser puxada da compra ou produto' })
  categoria?: string;

  @IsNumber({}, { message: 'Quantidade deve ser um n\u00fademero' })
  @Min(0, { message: 'Quantidade n\u00e3o pode ser negativa' })
  quantidade: number = 0;

  @IsString()
  @IsOptional({ message: 'Unidade pode ser preenchida manualmente' })
  unidade?: string;

  @IsNumber({}, { message: 'Pre\u00e7o deve ser um n\u00fademero' })
  @Min(0, { message: 'Pre\u00e7o n\u00e3o pode ser negativo' })
  preco?: number;

  @IsString()
  @IsOptional({ message: 'Local de compra n\u00e3o \u00e9 obrigat\u00f3rio aqui' })
  localCompra?: string;

  @IsNumber({}, { message: 'Quantidade m\u00ednima deve ser um n\u00fademero' })
  @Min(0, { message: 'Quantidade m\u00ednima n\u00e3o pode ser negativa' })
  quantidadeMinima: number = 0;

  @IsString()
  @IsOptional({ message: 'Item de compra de origem \u00e9 opcional' })
  compraItemId?: string;
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

  @IsString()
  @IsOptional()
  compraItemId?: string;
}