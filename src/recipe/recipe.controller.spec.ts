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
    id: 273,
    name: 'Beef Casserole',
    descripion: 'Rich beef stew in mushroom gravy',
    createdAt: new Date(),
    ingredients: [12, 43, 7, 22, 692].map((ingredientId): Ingredient => ({
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
      await controller.update(18, recipe);

      expect(services.recipe.save).toHaveBeenCalledTimes(1);
      expect(services.recipe.save).toHaveBeenCalledWith([{
        id: 18,
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
