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
    // Find subcategories directly by categoryId
    const subcategories = await this.subcategoryRepository.find({
      where: { categoryId: id },
    });

    if (!subcategories || subcategories.length === 0) {
      return null;
    }

    return subcategories;
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
}
