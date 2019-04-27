import { Test, TestingModule } from '@nestjs/testing';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
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
        name: 'Brown Sugar',
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
            deletedAt: null,
          },
        });
      expect(ingredient).toBeTruthy();
    });
    it('omits deleted ingredients from query results', async (): Promise<void> => {
      const where = {
        id: 1,
        deletedAt: null,
      };
      IngredientRepository.findOneOrFail
        .mockRejectedValue(new EntityNotFoundError(Ingredient, { where }));

      await expect(service.findById(1)).rejects
        .toThrowError(EntityNotFoundError);

      expect(IngredientRepository.findOneOrFail)
        .toHaveBeenCalledWith({ where });
    });
    it('can be overridden to return deleted items', async (): Promise<void> => {
      const where = {
        id: 1,
      };
      IngredientRepository.findOneOrFail
        .mockRejectedValue(new EntityNotFoundError(Ingredient, { where }));

      await expect(service.findById(1, true)).rejects
        .toThrowError(EntityNotFoundError);

      expect(IngredientRepository.findOneOrFail)
        .toHaveBeenCalledWith({ where });
    });
  });
});
