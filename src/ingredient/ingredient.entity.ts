import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base';

@Entity()
export class Ingredient extends BaseEntity {
  @Column('text')
  public name: string;
}
