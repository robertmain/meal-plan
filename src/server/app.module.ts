import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TerminusModule } from '@nestjs/terminus';
import { IngredientModule } from './ingredient/ingredient.module';
import { RecipeModule } from './recipe/recipe.module';
import { Ingredient } from './ingredient/ingredient.entity';
import { BaseEntity } from './base';
import { Recipe } from './recipe/recipe.entity';
import { HealthController } from './health.controller';

const {
  DATABASE_URL,
} = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: DATABASE_URL,
      entities: [
        BaseEntity,
        Ingredient,
        Recipe,
      ],
      migrations: [join(__dirname, '/migration/**/*.ts')],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
      renderPath: '/',
    }),
    IngredientModule,
    RecipeModule,
    TerminusModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {
  private readonly connection: Connection;

  public constructor(connection: Connection) {
    this.connection = connection;
  }
}
