import { Test, TestingModule } from '@nestjs/testing';
import { CreateRecipe } from './dto/createRecipe.dto';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { BaseEntity } from '../base/base.entity';

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
  });
});
