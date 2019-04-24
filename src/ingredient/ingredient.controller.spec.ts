import { Test, TestingModule } from '@nestjs/testing';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { NotFoundException } from '@nestjs/common';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { Ingredient } from './ingredient.entity';

describe('Ingredient Controller', (): void => {
  let controller: IngredientController;
  const service = {
    findById: jest.fn(),
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

  describe('getOne', (): void => {
    it('can retrieve a single ingredient by ID', async (): Promise<void> => {
      const mockIngredient: Ingredient = {
        id: 523,
        name: 'molasses',
        createdAt: new Date(),
      };

      service.findById.mockResolvedValue(mockIngredient);

      const ingredient = await controller.getOne(26);

      expect(service.findById).toHaveBeenCalledTimes(1);
      expect(service.findById).toHaveBeenCalledWith(26);
      expect(ingredient).toBe(mockIngredient);
    });
    it('handles missing ingredients by throwing a NotFoundException', async (): Promise<void> => {
      service.findById.mockRejectedValue(
        new EntityNotFoundError(Ingredient, 'id = 1')
      );

      await expect(controller.getOne(26)).rejects
        .toBeInstanceOf(NotFoundException);
    });
  });
});
