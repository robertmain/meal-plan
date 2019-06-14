import { Repository, DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm';
import { BaseEntity } from './base.entity';

export abstract class BaseService<Entity extends BaseEntity> {
  protected readonly repository: Repository<Entity>;

  public constructor(repository: Repository<Entity>) {
    this.repository = repository;
  }

  public async findById(
    id: number,
    includeDeleted: boolean = false,
    options: FindOneOptions<Entity> = {}
  ): Promise<Entity> {
    const where = {
      id,
      deletedAt: null,
    };
    if (includeDeleted) {
      delete where.deletedAt;
    }
    const record = await this.repository.findOneOrFail({
      ...options,
      where,
    });

    return record;
  }

  public async findAll(
    includeDeleted: boolean = false,
    options: FindManyOptions<Entity> = {}
  ): Promise<Entity[]> {
    const where = { deletedAt: null };
    if (includeDeleted) {
      delete where.deletedAt;
    }
    const records = await this.repository.find({
      ...options,
      where,
    });
    return records;
  }

  public async create(entity: DeepPartial<Entity>): Promise<Entity> {
    const savedEntity = await this.repository.save(entity);
    return savedEntity;
  }
}
