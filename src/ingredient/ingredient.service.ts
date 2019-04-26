import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from './ingredient.entity';

@Injectable()
export class IngredientService {
  private readonly ingredientRepository: Repository<Ingredient>;

  public constructor(
    @InjectRepository(Ingredient) ingredientRepository: Repository<Ingredient>
  ) {
    this.ingredientRepository = ingredientRepository;
  }

  public async findById(id: number, includeDeleted: boolean = false): Promise<Ingredient> {
    const where = {
      id,
      deletedAt: null,
    };
    if (includeDeleted) {
      delete where.deletedAt;
    }
    const ingredient = await this.ingredientRepository.findOneOrFail({
      where,
    });

    return ingredient;
  }
}
