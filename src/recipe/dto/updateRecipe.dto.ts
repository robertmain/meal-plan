import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, Allow } from 'class-validator';
import { Ingredient } from '../../ingredient/ingredient.entity';

export abstract class UpdateRecipe {
  @ApiProperty()
  @IsDefined()
  public name: string;

  @ApiProperty()
  @Allow()
  public description?: string = '';

  @ApiProperty()
  @Allow()
  public ingredients?: Ingredient[] = [];
}
