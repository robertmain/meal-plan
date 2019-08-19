import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  Body,
  Post,
  Put,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiBadRequestResponse,
  ApiOperation,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { IngredientService } from '../ingredient/ingredient.service';
import { RecipeService } from './recipe.service';
import { CreateRecipe } from './dto/createRecipe.dto';
import { Recipe } from './recipe.entity';
import { RecipeResponse } from './dto/recipeResponse';
import { UpdateRecipe } from './dto/updateRecipe.dto';

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

  @Put(':id')
  @ApiOperation({ title: 'Update an existing recipe in the database' })
  @ApiCreatedResponse({ type: RecipeResponse, description: 'Recipe was successfully created' })
  @ApiBadRequestResponse({ description: 'Array of validation errors' })
  @ApiNotFoundResponse({ description: 'Thrown  if the recipe being upated cannot be found' })
  public async update(
    id: number,
    @Body() { ingredients, ...recipe }: UpdateRecipe
  ): Promise<Recipe> {
    try {
      const recipeIngredients = await this.ingredient.findById(ingredients);

      const updatedRecipe = await this.recipe.update(id, {
        ...recipe,
        ingredients: recipeIngredients,
      });

      return updatedRecipe;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(`Unable to update missing recipe #${id}`);
      }
    }
  }
}
