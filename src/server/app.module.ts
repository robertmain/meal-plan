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
  DB_HOSTNAME,
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
} = process.env;
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOSTNAME,
      port: parseInt(DB_PORT, 10),
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_DATABASE,
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
