import { Repository, DeepPartial } from 'typeorm';
import { BaseEntity } from './base.entity';

export abstract class BaseService<Entity extends BaseEntity> {
  protected readonly repository: Repository<Entity>;

  public constructor(repository: Repository<Entity>) {
    this.repository = repository;
  }

  public async findById(id: number, includeDeleted: boolean = false): Promise<Entity> {
    const where = {
      id,
      deletedAt: null,
    };
    if (includeDeleted) {
      delete where.deletedAt;
    }
    const ingredient = await this.repository.findOneOrFail({
      where,
    });

    return ingredient;
  }

  public async findAll(includeDeleted: boolean = false): Promise<Entity[]> {
    const where = { deletedAt: null };
    if (includeDeleted) {
      delete where.deletedAt;
    }
    const ingredients = await this.repository.find({
      where,
    });
    return ingredients;
  }

  public async create(entity: DeepPartial<Entity>): Promise<Entity> {
    const savedEntity = await this.repository.save(entity);
    return savedEntity;
  }
}
