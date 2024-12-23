import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Category } from './category.schema';
import { Subcategory } from './subcategory.schema';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Subcategory])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [],
})
export class CategoryModule {}
