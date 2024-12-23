import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './category.schema';

@Entity('subcategories')
export class Subcategory {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  nameFr: string;

  @Column()
  nameEn: string;

  @ManyToOne(() => Category, (category) => category.subcategories)
  category: Category;
}
