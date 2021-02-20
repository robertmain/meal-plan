import { ApiProperty } from '@nestjs/swagger';

export abstract class IngredientResponse {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt?: Date;
}
