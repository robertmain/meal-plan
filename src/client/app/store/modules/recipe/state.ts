import { Request } from '@/store/types';
import { Recipe } from './types';

export class State {
  public getRecipes: Request;

  public recipes: Recipe[] = [];
}
