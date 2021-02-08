import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export abstract class UpdateIngredient {
  @IsDefined()
  @ApiProperty({
    description: 'The full name of the ingredient',
    example: 'Pasta',
  })
  public name: string;
}
