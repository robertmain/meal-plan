import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  ObjectType,
} from 'typeorm';
import { BaseEntity } from '../base';
import { Ingredient } from '../ingredient/ingredient.entity';

@Entity()
export class Recipe extends BaseEntity {
  @Column('text')
  public name: string;

  @Column({
    type: 'text',
    default: '',
    nullable: false,
  })
  public description?: string;
}
