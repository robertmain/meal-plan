import { Test, TestingModule } from '@nestjs/testing';
import { IngredientService } from './ingredient.service';
import { Ingredient } from './ingredient.entity';

describe('IngredientService', (): void => {
  let service: IngredientService;

  const IngredientRepository = {
    findOneOrFail: jest.fn(),
  };

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngredientService,
        {
          provide: 'IngredientRepository',
          useFactory: (): object => IngredientRepository,
        },
      ],
    }).compile();

    service = module.get<IngredientService>(IngredientService);
  });

  afterEach((): void => {
    IngredientRepository.findOneOrFail.mockReset();
  });

  describe('findById', (): void => {
    it('retrives a single ingredient by ID', async (): Promise<void> => {
      const newIngredient: Ingredient = {
        id: 1,
        name: '',
        updatedAt: new Date(),
        createdAt: new Date(),
        deletedAt: null,
      };
      IngredientRepository.findOneOrFail.mockResolvedValue(newIngredient);

      const ingredient = await service.findById(1);

      expect(IngredientRepository.findOneOrFail)
        .toHaveBeenCalledWith({
          where: {
            id: ingredient.id,
          },
        });
      expect(ingredient).toBeTruthy();
    });
  });
});
