import { Ajax } from '@/store/types';
import { Recipe } from './types';

export class State {
  public getRecipes: Ajax;

  public recipes: Recipe[] = [];
}
