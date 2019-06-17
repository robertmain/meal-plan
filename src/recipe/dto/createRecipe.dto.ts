import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined, Allow } from 'class-validator';

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
    example: [27, 19, 11, 731],
    required: false,
    default: [],
  })
  public ingredients?: number[] = [];
}
