import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  ObjectType,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../base';
import { Ingredient } from '../ingredient/ingredient.entity';
import { Event } from './event.entity';

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

  @Column({
    type: 'text',
    default: '',
    nullable: false,
  })
  public link?: string;

  @ManyToMany(
    (): ObjectType<Ingredient> => Ingredient,
    (ingredient): Recipe[] => ingredient.recipe
  )
  @JoinTable()
  public ingredients: Ingredient[];

  @OneToMany(
    (): ObjectType<Event> => Event,
    (event): Recipe => event.recipe,
    { cascade: ['insert'] }
  )
  public events: Event[];
}
