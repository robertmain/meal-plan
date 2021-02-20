import { Repository, DeepPartial, FindManyOptions } from 'typeorm';
import { BaseEntity } from './base.entity';

export abstract class BaseService<Entity extends BaseEntity> {
  protected readonly repository: Repository<Entity>;

  public constructor(repository: Repository<Entity>) {
    this.repository = repository;
  }

  public async findById(
    ids: string[],
    withDeleted = false,
    options: FindManyOptions<Entity> = {}
  ): Promise<Entity[]> {
    const records = await this.repository.findByIds(ids, {
      ...options,
      withDeleted,
    });

    return records;
  }

  public async findAll(
    withDeleted = false,
    options: FindManyOptions<Entity> = {}
  ): Promise<Entity[]> {
    const records = await this.repository.find({
      ...options,
      withDeleted,
    });
    return records;
  }

  public async save(entitites: DeepPartial<Entity>[]): Promise<Entity[]> {
    const results = this.repository.save(entitites);
    return results;
  }
}
