import { IsDefined } from 'class-validator';

export abstract class CreateIngredient {
  @IsDefined()
  public name: string;
}
