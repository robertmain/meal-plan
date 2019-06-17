import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  Body,
  Post,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { IngredientService } from '../ingredient/ingredient.service';
import { RecipeService } from './recipe.service';
import { CreateRecipe } from './dto/createRecipe.dto';
import { Recipe } from './recipe.entity';

@ApiUseTags('recipe')
@Controller('recipe')
@UseInterceptors(ClassSerializerInterceptor)
export class RecipeController {
  private readonly recipe: RecipeService;

  private readonly ingredient: IngredientService;

  public constructor(
    recipe: RecipeService,
    ingredient: IngredientService
  ) {
    this.recipe = recipe;
    this.ingredient = ingredient;
  }

  @Post()
  public async create(
    @Body() { ingredients, ...recipe }: CreateRecipe
  ): Promise<Recipe> {
    const allIngredients = await this.ingredient.findById(ingredients);

    const newRecipe = await this.recipe.create({
      ...recipe,
      ingredients: allIngredients,
    });

    return newRecipe;
  }
}
