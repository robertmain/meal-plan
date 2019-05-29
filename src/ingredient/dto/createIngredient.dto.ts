import { ApiModelProperty } from '@nestjs/swagger';

export abstract class CreateIngredient {
  @ApiModelProperty({
    description: 'The full name of the ingredient',
    example: 'Quinoa',
  })
  public name: string;
}
