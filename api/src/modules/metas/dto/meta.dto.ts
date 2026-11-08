/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsIn } from 'class-validator';

export class CreateMetaDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Valor alvo é obrigatório' })
  valorAlvo: number;

  @IsNumber()
  @IsOptional()
  valorAtual?: number;

  @IsString()
  @IsNotEmpty({ message: 'Data limite é obrigatória' })
  dataLimite: string;

  @IsString()
  @IsNotEmpty({ message: 'Categoria é obrigatória' })
  categoria: string;

  @IsString()
  @IsOptional()
  categoriaCor?: string;

  @IsString()
  @IsOptional()
  categoriaIcone?: string;

  @IsIn(['baixa', 'media', 'alta'])
  @IsOptional()
  prioridade?: string;

  @IsIn(['em_andamento', 'concluida', 'pausada'])
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  descricao?: string;
}

export class UpdateMetaDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsNumber()
  @IsOptional()
  valorAlvo?: number;

  @IsNumber()
  @IsOptional()
  valorAtual?: number;

  @IsString()
  @IsOptional()
  dataLimite?: string;

  @IsString()
  @IsOptional()
  categoria?: string;

  @IsString()
  @IsOptional()
  categoriaCor?: string;

  @IsString()
  @IsOptional()
  categoriaIcone?: string;

  @IsIn(['baixa', 'media', 'alta'])
  @IsOptional()
  prioridade?: string;

  @IsIn(['em_andamento', 'concluida', 'pausada'])
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  descricao?: string;
}