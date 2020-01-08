import { ApiProperty } from '@nestjs/swagger';

export abstract class IngredientResponse {
  public id: number;

  public name: string;

  public createdAt: Date;

  public updatedAt?: Date;
}
