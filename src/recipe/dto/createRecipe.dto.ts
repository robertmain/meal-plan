import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined, Allow } from 'class-validator';
import { Ingredient } from 'src/ingredient/ingredient.entity';

export abstract class CreateRecipe {
  @IsDefined()
  @ApiModelProperty({
    description: 'The name of the recipe',
    example: 'Hearty beef stew',
    required: true,
    default: '',
  })
  public name: string;

  @Allow()
  @ApiModelProperty({
    description: 'An optional description of the recipe to create',
    example: 'A thick beef stew with a rich mushroom gravy',
    required: false,
    default: '',
  })
  public description?: string = '';

  @Allow()
  @ApiModelProperty({
    description: 'An array of ingredient IDs to assign to this recipe',
    example: [
      {
        id: 2,
        name: 'Beef',
        createdAt: new Date().toISOString(),
        updateDat: new Date().toISOString(),
      },
      {
        id: 8,
        name: 'Mushrooms',
        createdAt: new Date().toISOString(),
        updateDat: new Date().toISOString(),
      },
    ],
    required: false,
    default: [],
  })
  public ingredients?: Ingredient[] = [];
}
