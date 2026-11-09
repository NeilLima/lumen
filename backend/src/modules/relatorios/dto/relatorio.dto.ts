/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional, IsISO8601 } from 'class-validator';

export class CreateRelatorioDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsString()
  @IsOptional()
  tipo?: string;

  @IsString()
  @IsOptional()
  periodo?: string;

  @IsISO8601({}, { message: 'Data de início inválida' })
  dataInicio: string;

  @IsISO8601({}, { message: 'Data de fim inválida' })
  dataFim: string;

  @IsString()
  @IsOptional()
  observacoes?: string;
}

export class UpdateRelatorioDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  tipo?: string;

  @IsString()
  @IsOptional()
  periodo?: string;

  @IsISO8601({}, { message: 'Data de início inválida' })
  @IsOptional()
  dataInicio?: string;

  @IsISO8601({}, { message: 'Data de fim inválida' })
  @IsOptional()
  dataFim?: string;

  @IsString()
  @IsOptional()
  observacoes?: string;
}
