import {
  Controller,
  Get,
  Param,
  NotFoundException,
  ClassSerializerInterceptor,
  UseInterceptors,
  Post,
  Body,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { IngredientService } from './ingredient.service';
import { Ingredient } from './ingredient.entity';
import { IngredientResponse } from './dto/ingredientResponse.dto';
import { CreateIngredient } from './dto/createIngredient.dto';

@ApiUseTags('ingredient')
@Controller('ingredient')
@UseInterceptors(ClassSerializerInterceptor)
export class IngredientController {
  private readonly ingredientService: IngredientService;

  public constructor(ingredientService: IngredientService) {
    this.ingredientService = ingredientService;
  }

  @Get()
  @ApiOperation({ title: 'Retrieve all ingredients in the database' })
  @ApiOkResponse({ type: IngredientResponse, description: 'All ingredients in the database(omitting deleted records)', isArray: true })
  public async root(): Promise<Ingredient[]> {
    const ingredients = await this.ingredientService.findAll();
    return ingredients;
  }

  @Get(':id')
  @ApiOperation({ title: 'Retrieve a single ingredient by ID' })
  @ApiOkResponse({ type: IngredientResponse, description: 'Ingredient was successfully located' })
  @ApiNotFoundResponse({ description: 'An ingredient of the requested ID could not be found' })
  public async getOne(@Param('id') id: number): Promise<Ingredient> {
    const [ingredient] = await this.ingredientService.findById([id]);

    if (!ingredient) {
      throw new NotFoundException();
    }
    return ingredient;
  }

  @Post()
  @ApiOperation({
    title: 'Create a new ingredient',
  })
  @ApiCreatedResponse({
    type: IngredientResponse,
    description: 'Ingredient was successfully created',
  })
  @ApiBadRequestResponse({
    description: 'Array of validation errors',
  })
  public async create(
    @Body() ingredient: CreateIngredient
  ): Promise<Ingredient> {
    return this.ingredientService.create(ingredient);
  }
}
