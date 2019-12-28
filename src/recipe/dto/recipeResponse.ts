import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';
import { Ingredient } from '../../ingredient/ingredient.entity';

@ApiExtraModels(Ingredient)
export abstract class RecipeResponse {
  @ApiProperty({
    description: 'Recipe primary key ID',
    example: 85,
  })
  public id: number;

  @ApiProperty({
    description: 'The name of the created recipe',
    example: 'Beef Stew',
  })
  public name: string;

  @ApiProperty({
    description: 'A short description of the recipe',
    example: 'A rich beef stew in mushroom gravy',
  })
  public descripion?: string;

  @ApiProperty({
    description: 'The date the recipe was created (in ISO-8601 format)',
    example: new Date().toISOString(),
  })
  public createdAt: Date;

  @ApiProperty({
    description: 'The date the recipe was last updated (in ISO-8601 format)',
    example: new Date().toISOString(),
  })
  public updatedAt?: Date;

  @ApiProperty({
    description: 'All the ingredients required by this recipe',
  })
  public ingredients: Ingredient[];
}
