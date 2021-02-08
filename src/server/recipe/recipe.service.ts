import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base';
import { Recipe } from './recipe.entity';

@Injectable()
export class RecipeService extends BaseService<Recipe> {
  @InjectRepository(Recipe)
  protected readonly repository: Repository<Recipe>;
}
