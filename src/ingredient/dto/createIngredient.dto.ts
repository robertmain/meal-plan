import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export abstract class CreateIngredient {
  @ApiProperty()
  @IsDefined()
  public name: string;
}
