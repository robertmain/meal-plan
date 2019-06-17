import {
  Entity,
  Column,
  ObjectType,
  ManyToMany,
} from 'typeorm';
import { Recipe } from '../recipe/recipe.entity';
import { BaseEntity } from '../base';

@Entity()
export class Ingredient extends BaseEntity {
  @Column('text')
  public name: string;

  @ManyToMany(
    (): ObjectType<Recipe> => Recipe,
    (recipe): Ingredient[] => recipe.ingredients
  )
  public recipe: Recipe[];
}
