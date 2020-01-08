import { IsDefined, Allow } from 'class-validator';
import { Ingredient } from '../../ingredient/ingredient.entity';

export abstract class UpdateRecipe {
  @IsDefined()
  public name: string;

  @Allow()
  public description?: string = '';

  @Allow()
  public ingredients?: Ingredient[] = [];
}
