import { Test, TestingModule } from '@nestjs/testing';
import { CreateRecipe } from './dto/createRecipe.dto';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { IngredientService } from '../ingredient/ingredient.service';
import { Ingredient } from '../ingredient/ingredient.entity';

describe('Recipe Controller', (): void => {
  let controller: RecipeController;

  const recipeService = {
    create: jest.fn(),
  };

  const ingredientService = {
    findById: jest.fn(),
  };

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [
        {
          provide: RecipeService,
          useValue: recipeService,
        },
        {
          provide: IngredientService,
          useValue: ingredientService,
        },
      ],
    }).compile();

    controller = module.get<RecipeController>(RecipeController);
  });

  describe('create', (): void => {
    const newRecipe: CreateRecipe = {
      name: 'Hearty Beef Stew',
      description: 'A nice winter beef stew',
    };

    it('creates a new recipe', async (): Promise<void> => {
      await controller.create(newRecipe);

      expect(recipeService.create).toHaveBeenCalledWith(newRecipe);
    });

    it('returns the newly created recipe', async (): Promise<void> => {
      recipeService.create.mockResolvedValue({
        ...newRecipe,
        id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
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
      const ingredientIds = [2, 6, 8, 1, 9];
      const ingredients = ingredientIds.map((id): Ingredient => ({
        id,
        name: 'Foo',
        createdAt: new Date(),
        updatedAt: new Date(),
        recipe: [],
      }));
      ingredientService.findById.mockResolvedValue(ingredients);

      await controller.create({
        ...newRecipe,
        ingredients: ingredientIds,
      });

      expect(ingredientService.findById).toHaveBeenCalledWith(ingredientIds);
      expect(recipeService.create).toHaveBeenCalledWith({
        ...newRecipe,
        ingredients,
      });
    });
  });
});
