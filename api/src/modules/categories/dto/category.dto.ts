/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsIn(['INCOME', 'EXPENSE', 'BOTH'], { message: 'Tipo inválido' })
  @IsOptional()
  type?: string;
}

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsIn(['INCOME', 'EXPENSE', 'BOTH'])
  @IsOptional()
  type?: string;
}
