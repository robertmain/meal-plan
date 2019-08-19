import { Test, TestingModule } from '@nestjs/testing';
import { CreateRecipe } from './dto/createRecipe.dto';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { IngredientService } from '../ingredient/ingredient.service';
import { Ingredient } from '../ingredient/ingredient.entity';
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
      create: jest.fn(),
      update: jest.fn(),
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
      await controller.create(newRecipe);

      expect(services.recipe.create).toHaveBeenCalledWith(newRecipe);
    });

    it('returns the newly created recipe', async (): Promise<void> => {
      services.recipe.create.mockResolvedValue({
        ...newRecipe,
        id: recipeResponse.id,
        createdAt: recipeResponse.createdAt,
        updatedAt: recipeResponse.createdAt,
      });

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

    it('assigns existing ingredients to the newly created recipe', async (): Promise<void> => {
      const { ingredients } = recipeResponse;
      const ingredientIds = ingredients.map(({ id }): number => id);
      services.ingredient.findById.mockResolvedValue(ingredients);

      await controller.create({
        ...newRecipe,
        ingredients: ingredientIds,
      });

      expect(services.ingredient.findById).toHaveBeenCalledWith(ingredientIds);
      expect(services.recipe.create).toHaveBeenCalledWith({
        ...newRecipe,
        ingredients,
      });
    });
  });
});
