import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { IngredientResponse } from './dto/ingredientResponse.dto';
import { CreateIngredient } from './dto/createIngredient.dto';
import { UpdateIngredient } from './dto/updateIngredient.dto';
import { Ingredient } from './ingredient.entity';

describe('Ingredient Controller', (): void => {
  let controller: IngredientController;

  const ingredientResponse: IngredientResponse = {
    id: 523,
    name: 'Brown sugar',
    createdAt: new Date(),
  };

  const services = {
    ingredient: {
      findById: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngredientController],
      providers: [
        {
          provide: IngredientService,
          useValue: services.ingredient,
        },
      ],
    }).compile();

    controller = module.get<IngredientController>(IngredientController);
  });

  afterEach((): void => {
    Object.values(services).forEach((service): void => {
      Object.entries(service)
        .forEach(([method]): void => service[method].mockReset());
    });
  });

  describe('root', (): void => {
    it('retrieves all ingredients in the database', async (): Promise<void> => {
      const mockIngredients = Array(10).fill(ingredientResponse);

      services.ingredient.findAll.mockResolvedValue(mockIngredients);

      const ingredients = await controller.root();

      expect(services.ingredient.findAll).toHaveBeenCalledTimes(1);
      expect(ingredients).toHaveLength(mockIngredients.length);
      expect(ingredients).toContain(ingredientResponse);
    });
    it('returns an empty array if there are no ingredients', async (): Promise<void> => {
      services.ingredient.findAll.mockResolvedValue([]);
    });
  });

  describe('getOne', (): void => {
    it('can retrieve a single ingredient by ID', async (): Promise<void> => {
      services.ingredient.findById.mockResolvedValue([ingredientResponse]);

      const ingredient = await controller.getOne(26);

      expect(services.ingredient.findById).toHaveBeenCalledTimes(1);
      expect(services.ingredient.findById).toHaveBeenCalledWith([26]);
      expect(ingredient).toBe(ingredientResponse);
    });
    it('handles missing ingredients by throwing a NotFoundException', async (): Promise<void> => {
      services.ingredient.findById.mockResolvedValue([]);

      await expect(controller.getOne(26)).rejects
        .toBeInstanceOf(NotFoundException);
    });
    it('allows un-caught exceptions to bubble', async (): Promise<void> => {
      services.ingredient.findById.mockRejectedValue(new Error('Error'));

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

      expect(services.ingredient.create).toHaveBeenCalledTimes(1);
      expect(services.ingredient.create).toHaveBeenCalledWith({
        ...newIngredient,
      });
    });
    it('returns the newly created ingredient', async (): Promise<void> => {
      services.ingredient.create.mockResolvedValue(ingredientResponse);

      const ingredient = await controller.create(newIngredient);

      expect(ingredient).toBe(ingredientResponse);
    });
  });
  describe('update', (): void => {
    const ingredient: UpdateIngredient = {
      name: ingredientResponse.name,
    };

    it('updates an existing ingredient', async (): Promise<void> => {
      await controller.update(ingredientResponse.id, ingredient);

      expect(services.ingredient.update).toHaveBeenCalledTimes(1);
      expect(services.ingredient.update).toHaveBeenCalledWith(
        ingredientResponse.id,
        ingredient
      );
    });

    it('returns the updated ingredient', async (): Promise<void> => {
      services.ingredient.update.mockResolvedValue(ingredientResponse);

      const returned = await controller.update(ingredientResponse.id, {
        name: ingredient.name,
      });

      expect(returned).toBe(ingredientResponse);
    });

    it('raises NotFoundException when attempting to update a non-existent ingredient', async (): Promise<void> => {
      const missingIngredientId = ingredientResponse.id + 1;
      services.ingredient.findById.mockRejectedValue(
        new EntityNotFoundError(Ingredient, '')
      );

      await expect(controller.update(missingIngredientId, {
        name: ingredientResponse.name,
      })).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
