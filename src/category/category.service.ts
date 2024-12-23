import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.schema';
import { Subcategory } from './subcategory.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
  ) {}

  async findSubCategoriesById(id: number): Promise<Subcategory[] | null> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      return null;
    }

    return this.subcategoryRepository.find({
      where: {
        category: { id: category.id },
      },
    });
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
}
