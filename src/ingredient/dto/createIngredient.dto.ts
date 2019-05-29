import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export abstract class CreateIngredient {
  @IsDefined()
  @ApiModelProperty({
    description: 'The full name of the ingredient',
    example: 'Quinoa',
  })
  public name: string;
}
