import { ApiModelProperty } from '@nestjs/swagger';

export abstract class IngredientResponse {
  @ApiModelProperty({
    description: 'Auto-incrementing entity ID',
  })
  public id: number;

  @ApiModelProperty({
    description: 'The full name of the ingredient',
    example: 'Quinoa',
  })
  public name: string;

  @ApiModelProperty({
    description: 'Entity creation date',
    type: 'string',
    example: new Date().toISOString(),
  })
  public createdAt: Date;

  @ApiModelProperty({
    description: 'Entity last update date',
    type: 'string',
    example: new Date().toISOString(),
  })
  public updatedAt?: Date;
}
