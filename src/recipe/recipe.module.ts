import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.entity';
import { RecipeController } from './recipe.controller';
import { IngredientModule } from '../ingredient/ingredient.module';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe]), IngredientModule],
  providers: [RecipeService],
  controllers: [RecipeController],
})
export class RecipeModule {}
