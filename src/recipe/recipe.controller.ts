import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  Body,
  Post,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiBadRequestResponse,
  ApiOperation,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { IngredientService } from '../ingredient/ingredient.service';
import { RecipeService } from './recipe.service';
import { CreateRecipe } from './dto/createRecipe.dto';
import { Recipe } from './recipe.entity';
import { RecipeResponse } from './dto/recipeResponse';

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
  @ApiOperation({ title: 'Create a new recipe with associated ingredients' })
  @ApiCreatedResponse({ type: RecipeResponse, description: 'Recipe was successfully created' })
  @ApiBadRequestResponse({ description: 'Array of validation errors' })
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
