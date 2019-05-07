import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  Body,
  Post,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { RecipeService } from './recipe.service';
import { CreateRecipe } from './dto/createRecipe.dto';

@ApiUseTags('recipe')
@Controller('recipe')
@UseInterceptors(ClassSerializerInterceptor)
export class RecipeController {
  private readonly recipeService: RecipeService;

  public constructor(recipeService: RecipeService) {
    this.recipeService = recipeService;
  }

  @Post()
  public async create(@Body() recipe: CreateRecipe): Promise<CreateRecipe> {
    await this.recipeService.create(recipe);

    return recipe;
  }
}
