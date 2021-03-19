import {
  Entity,
  Column,
  ObjectType,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from '../base';
import { Recipe } from './recipe.entity';

@Entity({
  orderBy: {
    date: 'ASC',
  },
})
export class Event extends BaseEntity {
  @Column('timestamp')
  public date: Date;

  @ManyToOne(
    (): ObjectType<Recipe> => Recipe,
    (recipe): Event[] => recipe.events
  )
  public recipe: Recipe;
}
