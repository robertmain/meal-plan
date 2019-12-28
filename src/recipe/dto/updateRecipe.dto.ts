import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, Allow } from 'class-validator';
import { Ingredient } from '../../ingredient/ingredient.entity';

export abstract class UpdateRecipe {
  @IsDefined()
  @ApiProperty({
    description: 'The name of the recipe',
    example: 'Hearty beef stew',
    required: true,
    default: '',
  })
  public name: string;

  @Allow()
  @ApiProperty({
    description: 'An optional description of the recipe to create',
    example: 'A thick beef stew with a rich mushroom gravy',
    required: false,
    default: '',
  })
  public description?: string = '';

  @Allow()
  @ApiProperty({
    description: 'An array of ingredients to assign to this recipe',
    type: Ingredient,
    required: false,
    isArray: true,
    default: [],
  })
  public ingredients?: Ingredient[] = [];
}
