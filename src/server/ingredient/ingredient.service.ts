import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../base';
import { Ingredient } from './ingredient.entity';

@Injectable()
export class IngredientService extends BaseService<Ingredient> {
  @InjectRepository(Ingredient)
  protected readonly repository: Repository<Ingredient>;
}
