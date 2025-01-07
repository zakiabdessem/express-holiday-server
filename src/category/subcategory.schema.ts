import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from './category.schema';
import { Ticket } from 'src/ticket/ticket.schema';

@Entity('subcategories')
export class Subcategory {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  nameFr: string;

  @Column()
  nameEn: string;

  @ManyToOne(() => Category, (category) => category.subcategories)
  category: Category;

  @Column()
  categoryId: number;
}
