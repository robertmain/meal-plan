import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import {
  ApiUseTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { IngredientService } from './ingredient.service';
import { Ingredient } from './ingredient.entity';
import { IngredientResponse } from './dto/ingredientResponse.dto';

@Controller('ingredient')
export class IngredientController {
  private readonly ingredientService: IngredientService;

  public constructor(ingredientService: IngredientService) {
    this.ingredientService = ingredientService;
  }

  @Get(':id')
  public async getOne(@Param('id') id: number): Promise<Ingredient> {
    try {
      const ingredient = await this.ingredientService.findById(id);
      return ingredient;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException();
      }
    }
  }
}
