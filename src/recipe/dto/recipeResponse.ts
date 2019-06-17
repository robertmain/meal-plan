import { ApiModelProperty } from '@nestjs/swagger';

export abstract class RecipeResponse {
  @ApiModelProperty({
    description: 'Recipe primary key ID',
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
}
