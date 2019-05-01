import { Repository } from 'typeorm';
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
    const options = { where: { deletedAt: null } };
    if (includeDeleted) {
      delete options.where;
    }
    const ingredients = await this.repository.find(options);
    return ingredients;
  }
}
