/* eslint-disable prettier/prettier */
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from '../repository/categories.repository';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';

interface DefaultCategory {
  name: string;
  color: string;
  icon: string;
  type: string;
}

const DEFAULT_INCOME_CATEGORIES: DefaultCategory[] = [
  { name: 'Salário', color: '#10b981', icon: '💰', type: 'INCOME' },
  { name: 'Salário Exterior', color: '#10b981', icon: '🌎', type: 'INCOME' },
  { name: '13º Salário', color: '#10b981', icon: '🎁', type: 'INCOME' },
  { name: 'Férias', color: '#10b981', icon: '🌴', type: 'INCOME' },
  { name: 'Hora Extra', color: '#10b981', icon: '⏰', type: 'INCOME' },
  { name: 'Bônus / Comissão', color: '#10b981', icon: '🏆', type: 'INCOME' },
  { name: 'Freelance', color: '#8b5cf6', icon: '💼', type: 'INCOME' },
  { name: 'Demissão / Rescisão', color: '#f59e0b', icon: '📄', type: 'INCOME' },
  { name: 'Aviso Prévio Indenizado', color: '#f59e0b', icon: '📨', type: 'INCOME' },
  { name: 'Multa Rescisória (FGTS)', color: '#f59e0b', icon: '⚖️', type: 'INCOME' },
  { name: 'FGTS / Saque-Aniversário', color: '#f59e0b', icon: '🏧', type: 'INCOME' },
  { name: 'Seguro-Desemprego', color: '#f59e0b', icon: '🛡️', type: 'INCOME' },
  { name: 'Benefício / Auxílio', color: '#f59e0b', icon: '🩺', type: 'INCOME' },
  { name: 'Pensão Alimentícia', color: '#3b82f6', icon: '🤝', type: 'INCOME' },
  { name: 'Aposentadoria / INSS', color: '#3b82f6', icon: '👴', type: 'INCOME' },
  { name: 'Aluguel Recebido', color: '#3b82f6', icon: '🏠', type: 'INCOME' },
  { name: 'Dividendos / JCP', color: '#3b82f6', icon: '📈', type: 'INCOME' },
  { name: 'Rendimento de Investimento', color: '#3b82f6', icon: '💹', type: 'INCOME' },
  { name: 'Venda de Produto', color: '#8b5cf6', icon: '🛒', type: 'INCOME' },
  { name: 'Venda de Usado', color: '#8b5cf6', icon: '🏷️', type: 'INCOME' },
  { name: 'Reembolso / Restituição', color: '#8b5cf6', icon: '↩️', type: 'INCOME' },
  { name: 'Presente / Herança', color: '#8b5cf6', icon: '🎀', type: 'INCOME' },
  { name: 'Cashback', color: '#8b5cf6', icon: '💳', type: 'INCOME' },
  { name: 'Premiação / Prêmio', color: '#8b5cf6', icon: '🎉', type: 'INCOME' },
  { name: 'Outras Receitas', color: '#64748b', icon: '➕', type: 'INCOME' },
];

const DEFAULT_EXPENSE_CATEGORIES: DefaultCategory[] = [
  { name: 'Moradia', color: '#8b5cf6', icon: '🏠', type: 'EXPENSE' },
  { name: 'Alimentação', color: '#10b981', icon: '🛒', type: 'EXPENSE' },
  { name: 'Transporte', color: '#3b82f6', icon: '🚗', type: 'EXPENSE' },
  { name: 'Saúde', color: '#ef4444', icon: '🩺', type: 'EXPENSE' },
  { name: 'Educação', color: '#f59e0b', icon: '📚', type: 'EXPENSE' },
  { name: 'Lazer', color: '#ec4899', icon: '🎬', type: 'EXPENSE' },
  { name: 'Assinaturas', color: '#8b5cf6', icon: '🔁', type: 'EXPENSE' },
  { name: 'Outras Despesas', color: '#64748b', icon: '➖', type: 'EXPENSE' },
];

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);

  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async findAll(userId: string) {
    await this.ensureDefaultCategories(userId);
    const categories = await this.categoriesRepository.findAll(userId);
    this.logger.log(`Listadas ${categories.length} categorias para o usuário ${userId}`);
    return categories;
  }

  private async ensureDefaultCategories(userId: string) {
    const existing = await this.categoriesRepository.findAll(userId);
    const existingNames = new Set(existing.map((c) => c.name.trim().toLowerCase()));
    const defaults = [...DEFAULT_INCOME_CATEGORIES, ...DEFAULT_EXPENSE_CATEGORIES].filter(
      (c) => !existingNames.has(c.name.trim().toLowerCase()),
    );
    if (defaults.length === 0) {
      return;
    }
    this.logger.log(
      `Criando ${defaults.length} categorias padrão para o usuário ${userId}`,
    );
    for (const category of defaults) {
      await this.categoriesRepository.create(userId, {
        userId,
        name: category.name,
        color: category.color,
        icon: category.icon,
        type: category.type,
      });
    }
  }

  async create(userId: string, dto: CreateCategoryDto) {
    return this.categoriesRepository.create(userId, {
      userId,
      name: dto.name,
      color: dto.color ?? '#8b5cf6',
      icon: dto.icon ?? null,
      type: dto.type ?? 'BOTH',
    });
  }

  async update(userId: string, id: string, dto: UpdateCategoryDto) {
    const existing = await this.categoriesRepository.findById(userId, id);
    if (!existing) {
      throw new NotFoundException('Categoria não encontrada');
    }
    await this.categoriesRepository.update(userId, id, dto);
    return this.categoriesRepository.findById(userId, id);
  }

  async remove(userId: string, id: string) {
    const existing = await this.categoriesRepository.findById(userId, id);
    if (!existing) {
      throw new NotFoundException('Categoria não encontrada');
    }
    await this.categoriesRepository.remove(userId, id);
    return { deleted: true };
  }
}
