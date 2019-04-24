import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity()
export class Ingredient extends BaseEntity {
  @Column('text')
  public name: string;
}
