/* eslint-disable prettier/prettier */
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';
import { CategoryResponse, DeleteResult } from '../types/category.types';

export interface ICategoriesRepository {
  findAll(userId: string): Promise<CategoryResponse[]>;
  findById(userId: string, id: string): Promise<CategoryResponse | null>;
  create(userId: string, data: Record<string, unknown>): Promise<CategoryResponse>;
  update(userId: string, id: string, data: Record<string, unknown>): Promise<unknown>;
  remove(userId: string, id: string): Promise<unknown>;
}

export interface ICategoriesService {
  findAll(userId: string): Promise<CategoryResponse[]>;
  create(userId: string, dto: CreateCategoryDto): Promise<CategoryResponse>;
  update(userId: string, id: string, dto: UpdateCategoryDto): Promise<CategoryResponse>;
  remove(userId: string, id: string): Promise<DeleteResult>;
}
