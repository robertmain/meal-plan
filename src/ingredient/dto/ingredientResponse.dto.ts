import { ApiModelProperty } from '@nestjs/swagger';

export abstract class IngredientResponse {
  @ApiModelProperty({
    description: 'Ingredient primary key ID',
  })
  public id: number;

  @ApiModelProperty({
    description: 'The full name of the ingredient',
    example: 'Quinoa',
  })
  public name: string;

  @ApiModelProperty({
    description: 'Ingredient creation date (in ISO-8601 format)',
    type: 'string',
    example: new Date().toISOString(),
  })
  public createdAt: Date;

  @ApiModelProperty({
    description: 'Ingredient last update date (in ISO-8601 format)',
    type: 'string',
    example: new Date().toISOString(),
  })
  public updatedAt?: Date;
}
