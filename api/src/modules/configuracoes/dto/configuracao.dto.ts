/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateConfiguracaoDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsNotEmpty({ message: 'Valor é obrigatório' })
  value: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateConfiguracaoDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  value?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
