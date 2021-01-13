import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, Allow } from 'class-validator';
import { Ingredient } from '../../ingredient/ingredient.entity';

export abstract class CreateRecipe {
  @ApiProperty()
  @IsDefined()
  public name: string;

  @ApiProperty()
  @Allow()
  public description?: string = '';

  @ApiProperty({
    type: Ingredient,
  })
  @Allow()
  public ingredients?: Ingredient[] = [];
}
