import { ApiModelProperty } from '@nestjs/swagger';

export abstract class CreateRecipe {
  @ApiModelProperty({
    description: 'The name of the recipe',
    example: 'Hearty beef stew',
    required: true,
    default: '',
  })
  public name: string;

  @ApiModelProperty({
    description: 'An optional description of the recipe to create',
    example: 'A thick beef stew with a rich mushroom gravy',
    required: false,
    default: '',
  })
  public description?: string = '';
}
