import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, Allow } from 'class-validator';
import { Ingredient } from '../../ingredient/ingredient.entity';

export abstract class UpdateRecipe {
  @IsDefined()
  @ApiProperty({
    description: 'The name of the recipe',
    example: 'Hearty beef stew',
  })
  public name: string;

  @Allow()
  @ApiPropertyOptional({
    description: 'An optional description of the recipe to create',
    example: 'A thick beef stew with a rich mushroom gravy',
  })
  public description?: string = '';

  @Allow()
  @ApiPropertyOptional({
    description: 'An array of ingredients to assign to this recipe',
    type: Ingredient,
  })
  public ingredients?: Ingredient[] = [];
}
