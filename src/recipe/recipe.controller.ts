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
  ApiTags,
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

@ApiTags('recipe')
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
  @ApiOperation({ summary: 'Create a new recipe with associated ingredients' })
  @ApiCreatedResponse({ type: RecipeResponse, description: 'Recipe was successfully created' })
  @ApiBadRequestResponse({ description: 'Array of validation errors' })
  public async create(@Body() recipe: CreateRecipe): Promise<Recipe> {
    const [newRecipe] = await this.recipe.save([recipe]);

    return newRecipe;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing recipe in the database' })
  @ApiCreatedResponse({ type: RecipeResponse, description: 'Recipe was successfully created' })
  @ApiBadRequestResponse({ description: 'Array of validation errors' })
  @ApiNotFoundResponse({ description: 'Thrown  if the recipe being upated cannot be found' })
  public async update(
    id: number,
    @Body() recipe: UpdateRecipe
  ): Promise<Recipe> {
    try {
      await this.recipe.findById([id]);
      const [updatedRecipe] = await this.recipe.save([{
        id,
        ...recipe,
      }]);

      return updatedRecipe;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(`Unable to update missing recipe #${id}`);
      }
    }
  }
}
