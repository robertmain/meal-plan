import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
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
  @DeleteDateColumn()
  public deletedAt?: Date = null;
}
