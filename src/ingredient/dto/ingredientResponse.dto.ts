import { ApiProperty } from '@nestjs/swagger';

export abstract class IngredientResponse {
  @ApiProperty()
  public id: number;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt?: Date;
}
