import {
  Controller,
  Get,
  Param,
  NotFoundException,
  ClassSerializerInterceptor,
  UseInterceptors,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
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
import { UpdateIngredient } from './dto/updateIngredient.dto';

@ApiTags('ingredient')
@Controller('ingredient')
@UseInterceptors(ClassSerializerInterceptor)
export class IngredientController {
  private readonly ingredientService: IngredientService;

  public constructor(ingredientService: IngredientService) {
    this.ingredientService = ingredientService;
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all ingredients in the database' })
  @ApiOkResponse({ type: IngredientResponse, description: 'All ingredients in the database(omitting deleted records)', isArray: true })
  public async root(): Promise<IngredientResponse[]> {
    const ingredients = await this.ingredientService.findAll();
    return ingredients;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single ingredient by ID' })
  @ApiOkResponse({ type: IngredientResponse, description: 'Ingredient was successfully located' })
  @ApiNotFoundResponse({ description: 'An ingredient of the requested ID could not be found' })
  public async getOne(@Param('id') id: number): Promise<IngredientResponse> {
    const [ingredient] = await this.ingredientService.findById([id]);

    if (!ingredient) {
      throw new NotFoundException();
    }
    return ingredient;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new ingredient' })
  @ApiCreatedResponse({ type: IngredientResponse, description: 'Ingredient was successfully created' })
  @ApiBadRequestResponse({ description: 'Array of validation errors' })
  public async create(
    @Body() ingredient: CreateIngredient
  ): Promise<Ingredient[]> {
    return this.ingredientService.save([ingredient]);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing ingredient' })
  @ApiOkResponse({ type: IngredientResponse, description: 'Ingredient was successfully updated' })
  @ApiBadRequestResponse({ description: 'Array of validation errors' })
  @ApiNotFoundResponse({ description: 'Thrown if attempting to update a non-existant ingredient' })
  public async update(
    @Param('id') id: number,
    @Body() ingredient: UpdateIngredient
  ): Promise<Ingredient[]> {
    try {
      await this.ingredientService.findById([id]);
      return this.ingredientService.save([{
        id,
        ...ingredient,
      }]);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(`Unable to update missing ingredient #${id}`);
      }
    }
  }
}
