import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export abstract class BaseEntity {
  @PrimaryColumn({
    generated: 'uuid',
    type: 'uuid',
  })
  public id: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt?: Date;

  @Exclude()
  @Column('timestamp')
  public deletedAt?: Date = null;
}
