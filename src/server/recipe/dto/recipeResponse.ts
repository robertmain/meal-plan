import { ApiProperty } from '@nestjs/swagger';
import { Ingredient } from '../../ingredient/ingredient.entity';

export abstract class RecipeResponse {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public descripion?: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt?: Date;

  @ApiProperty()
  public ingredients: Ingredient[];
}
