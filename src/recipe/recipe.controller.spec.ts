import { Test, TestingModule } from '@nestjs/testing';
import { CreateRecipe } from './dto/createRecipe.dto';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

describe('Recipe Controller', (): void => {
  let controller: RecipeController;

  const service = {
    create: jest.fn(),
  };

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [
        {
          provide: RecipeService,
          useValue: service,
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

      expect(service.create).toHaveBeenCalledWith(newRecipe);
    });

    it('returns the newly created recipe', async (): Promise<void> => {
      service.create.mockResolvedValue({
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
  });
});
