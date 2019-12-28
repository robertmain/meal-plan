import { ApiProperty } from '@nestjs/swagger';

export abstract class IngredientResponse {
  @ApiProperty({
    description: 'Ingredient primary key ID',
  })
  public id: number;

  @ApiProperty({
    description: 'The full name of the ingredient',
    example: 'Quinoa',
  })
  public name: string;

  @ApiProperty({
    description: 'Ingredient creation date (in ISO-8601 format)',
    type: 'string',
    example: new Date().toISOString(),
  })
  public createdAt: Date;

  @ApiProperty({
    description: 'Ingredient last update date (in ISO-8601 format)',
    type: 'string',
    example: new Date().toISOString(),
  })
  public updatedAt?: Date;
}
