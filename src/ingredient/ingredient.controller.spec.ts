import { Test, TestingModule } from '@nestjs/testing';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { NotFoundException } from '@nestjs/common';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { Ingredient } from './ingredient.entity';
import { IngredientResponse } from './dto/ingredientResponse.dto';
import { CreateIngredient } from './dto/createIngredient.dto';

describe('Ingredient Controller', (): void => {
  let controller: IngredientController;

  const ingredientResponse: IngredientResponse = {
    id: 523,
    name: 'Brown sugar',
    createdAt: new Date(),
  };

  const service = {
    findById: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngredientController],
      providers: [
        {
          provide: IngredientService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<IngredientController>(IngredientController);
  });

  afterEach((): void => {
    Object.keys(service).forEach((method): void => {
      service[method].mockReset();
    });
  });

  describe('root', (): void => {
    it('retrieves all ingredients in the database', async (): Promise<void> => {
      const mockIngredients = Array(10).fill(ingredientResponse);

      service.findAll.mockResolvedValue(mockIngredients);

      const ingredients = await controller.root();

      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(ingredients).toHaveLength(mockIngredients.length);
      expect(ingredients).toContain(ingredientResponse);
    });
    it('returns an empty array if there are no ingredients', async (): Promise<void> => {
      service.findAll.mockResolvedValue([]);
    });
  });

  describe('getOne', (): void => {
    it('can retrieve a single ingredient by ID', async (): Promise<void> => {
      service.findById.mockResolvedValue([ingredientResponse]);

      const ingredient = await controller.getOne(26);

      expect(service.findById).toHaveBeenCalledTimes(1);
      expect(service.findById).toHaveBeenCalledWith([26]);
      expect(ingredient).toBe(ingredientResponse);
    });
    it('handles missing ingredients by throwing a NotFoundException', async (): Promise<void> => {
      service.findById.mockResolvedValue([]);

      await expect(controller.getOne(26)).rejects
        .toBeInstanceOf(NotFoundException);
    });
    it('allows un-caught exceptions to bubble', async (): Promise<void> => {
      service.findById.mockRejectedValue(new Error('Error'));

      await expect(controller.getOne(26)).rejects
        .toBeInstanceOf(Error);
    });
  });
  describe('create', (): void => {
    const newIngredient: CreateIngredient = {
      name: ingredientResponse.name,
    };
    it('creates a single ingredient', async (): Promise<void> => {
      await controller.create(newIngredient);

      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith({
        ...newIngredient,
      });
    });
    it('returns the newly created recipe', async (): Promise<void> => {
      service.create.mockResolvedValue(ingredientResponse);

      const ingredient = await controller.create(newIngredient);

      expect(ingredient).toBe(ingredientResponse);
    });
  });
});
