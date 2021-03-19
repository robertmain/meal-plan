import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.entity';
import { RecipeController } from './recipe.controller';
import { IngredientModule } from '../ingredient/ingredient.module';
import { Event } from './event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, Event]), IngredientModule],
  providers: [RecipeService],
  controllers: [RecipeController],
})
export class RecipeModule {}
