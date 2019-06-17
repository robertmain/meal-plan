import { ApiModelProperty } from '@nestjs/swagger';
import { Ingredient } from '../../ingredient/ingredient.entity';

export abstract class RecipeResponse {
  @ApiModelProperty({
    description: 'Recipe primary key ID',
    example: 85,
  })
  public id: number;

  @ApiModelProperty({
    description: 'The name of the created recipe',
    example: 'Beef Stew',
  })
  public name: string;

  @ApiModelProperty({
    description: 'A short description of the recipe',
    example: 'A rich beef stew in mushroom gravy',
  })
  public descripion: string;

  @ApiModelProperty({
    description: 'The date the recipe was created (in ISO-8601 format)',
    type: 'string',
    example: new Date().toISOString(),
  })
  public createdAt: Date;

  @ApiModelProperty({
    description: 'The date the recipe was last updated (in ISO-8601 format)',
    type: 'string',
    example: new Date().toISOString(),
  })
  public updatedAt?: Date;

  @ApiModelProperty({
    description: 'All the ingredients required by this recipe',
    type: Ingredient,
    isArray: true,
    example: [
      {
        id: 2,
        name: 'Cumin',
        createdAt: new Date().toISOString(),
        updateDat: new Date().toISOString(),
      },
      {
        id: 8,
        name: 'Ground Beef',
        createdAt: new Date().toISOString(),
        updateDat: new Date().toISOString(),
      },
    ],
  })
  public ingredients: Ingredient[];
}
