import { Test, TestingModule } from '@nestjs/testing';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { NotFoundException } from '@nestjs/common';
import { CreateRecipe } from './dto/createRecipe.dto';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { IngredientService } from '../ingredient/ingredient.service';
import { Ingredient } from '../ingredient/ingredient.entity';
import { UpdateRecipe } from './dto/updateRecipe.dto';
import { RecipeResponse } from './dto/recipeResponse';

describe('Recipe Controller', (): void => {
  let controller: RecipeController;

  const recipeResponse: RecipeResponse = {
    id: 'c9a3b1e1-3440-4390-8cf8-aa98a618c718',
    name: 'Beef Casserole',
    descripion: 'Rich beef stew in mushroom gravy',
    createdAt: new Date(),
    ingredients: [
      'ac908ffa2-65fc-453b-be0f-f9591d46f19c',
      '59a66b1d-8d8a-4466-a639-6a9ed50aae85',
      '50912783-4c22-4a7f-a448-0bcf7bf7153d',
      'cdc5c006-8f3d-4244-aa19-140bc9d7b6ac',
      'aece8ff8-1f16-4e87-8292-4d1f347c8c48',
    ].map((ingredientId): Ingredient => ({
      id: ingredientId,
      name: `Ingredient ${ingredientId}`,
      recipe: [],
      createdAt: new Date(),
    })),
  };

  const services = {
    recipe: {
      save: jest.fn(),
      findById: jest.fn(),
    },
    ingredient: {
      findById: jest.fn(),
    },
  };

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [
        {
          provide: RecipeService,
          useValue: services.recipe,
        },
        {
          provide: IngredientService,
          useValue: services.ingredient,
        },
      ],
    }).compile();

    controller = module.get<RecipeController>(RecipeController);
  });

  afterEach((): void => {
    Object.values(services).forEach((service): void => {
      Object.entries(service)
        .forEach(([method]): void => service[method].mockReset());
    });
  });

  describe('create', (): void => {
    const newRecipe: CreateRecipe = {
      name: recipeResponse.name,
      description: recipeResponse.descripion,
    };

    it('creates a new recipe', async (): Promise<void> => {
      services.recipe.save.mockResolvedValue([newRecipe]);
      await controller.create(newRecipe);

      expect(services.recipe.save).toHaveBeenCalledWith([newRecipe]);
    });

    it('returns the newly created recipe', async (): Promise<void> => {
      services.recipe.save.mockResolvedValue([{
        ...newRecipe,
        id: recipeResponse.id,
        createdAt: recipeResponse.createdAt,
        updatedAt: recipeResponse.createdAt,
      }]);

      const {
        id,
        createdAt,
        updatedAt,
        ...recipe
      } = await controller.create(newRecipe);

      expect(id).toBeDefined();
      expect(createdAt).toBeDefined();
      expect(updatedAt).toBeDefined();

      expect(recipe).toEqual(newRecipe);
    });
  });

  describe('update', (): void => {
    const recipe: UpdateRecipe = {
      name: recipeResponse.name,
      description: recipeResponse.descripion,
    };

    it('updates an existing recipe', async (): Promise<void> => {
      const uuid = 'ab338b87-5099-4ae0-930d-f8c3ed79905d';
      await controller.update(uuid, recipe);

      expect(services.recipe.save).toHaveBeenCalledTimes(1);
      expect(services.recipe.save).toHaveBeenCalledWith([{
        id: uuid,
        ...recipe,
      }]);
    });

    it('returns the updated recipe', async (): Promise<void> => {
      services.recipe.findById.mockResolvedValue([recipeResponse]);
      services.recipe.save.mockResolvedValue([recipeResponse]);

      const returned = await controller.update(recipeResponse.id, {
        name: recipeResponse.name,
      });

      expect(returned).toBe(recipeResponse);
    });

    it('raises NotFoundException when attempting to update a non-existent recipe', async (): Promise<void> => {
      const missingIngredientId = recipeResponse.id + 1;
      services.recipe.findById.mockRejectedValue(
        new EntityNotFoundError(Ingredient, '')
      );

      await expect(controller.update(missingIngredientId, {
        name: recipeResponse.name,
      })).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
