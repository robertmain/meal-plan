import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { IngredientModule } from './ingredient/ingredient.module';
import { RecipeModule } from './recipe/recipe.module';
import { Ingredient } from './ingredient/ingredient.entity';
import { BaseEntity } from './base';
import { Recipe } from './recipe/recipe.entity';

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME,
} = process.env;
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: parseInt(DB_PORT, 10),
      username: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
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
