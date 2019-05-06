import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientModule } from './ingredient/ingredient.module';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    IngredientModule,
    RecipeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  private readonly connection: Connection;

  public constructor(connection: Connection) {
    this.connection = connection;
  }
}
