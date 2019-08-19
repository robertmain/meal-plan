import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { IngredientModule } from './ingredient/ingredient.module';
import { RecipeModule } from './recipe/recipe.module';
import { Ingredient } from './ingredient/ingredient.entity';
import { BaseEntity } from './base';
import { Recipe } from './recipe/recipe.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'mealplan',
      password: 'abc',
      database: 'meal-plan',
      entities: [
        BaseEntity,
        Ingredient,
        Recipe,
      ],
      migrations: [join(__dirname, '/migration/**/*.ts')],
    }),
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
