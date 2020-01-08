import { Ingredient } from '../../ingredient/ingredient.entity';

export abstract class RecipeResponse {
  public id: number;

  public name: string;

  public descripion?: string;

  public createdAt: Date;

  public updatedAt?: Date;

  public ingredients: Ingredient[];
}
