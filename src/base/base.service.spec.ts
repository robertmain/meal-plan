import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import {
  Mock,
  IMock,
  It,
  MockBehavior,
} from 'typemoq';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { BaseEntity, BaseService } from '.';

const mockEntity: BaseEntity = {
  id: 6,
  updatedAt: new Date(),
  createdAt: new Date(),
  deletedAt: null,
};

const excludeDeleted = { deletedAt: null };

describe('Base Service', (): void => {
  let service: BaseService<BaseEntity>;
  let repository: IMock<Repository<BaseEntity>>;

  beforeEach(async (): Promise<void> => {
    repository = Mock.ofType<Repository<BaseEntity>>(
      Repository,
      MockBehavior.Strict
    );

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BaseService,
          useFactory: (): object => {
            class Service extends BaseService<BaseEntity> { }
            return new Service(repository.object);
          },
        },
      ],
    }).compile();

    service = module.get<BaseService<BaseEntity>>(BaseService);
  });
  describe('findById', (): void => {
    it('retrives a single entity by ID', async (): Promise<void> => {
      const where = {
        ...excludeDeleted,
        id: mockEntity.id,
      };

      repository.setup((mockRepo): Promise<BaseEntity> => mockRepo
        .findOneOrFail(It.isValue({ where })))
        .returns((): Promise<BaseEntity> => Promise.resolve(mockEntity))
        .verifiable();

      const ingredient = await service.findById(mockEntity.id);

      expect(ingredient).toBeTruthy();
    });
    it('omits deleted entities from query results', async (): Promise<void> => {
      const where = {
        ...excludeDeleted,
        id: mockEntity.id,
      };

      repository.setup((mockRepo): Promise<BaseEntity> => mockRepo
        .findOneOrFail(It.isValue({ where })))
        .returns((): Promise<BaseEntity> => Promise.reject(
          new EntityNotFoundError(BaseEntity, where)
        ))
        .verifiable();

      await expect(service.findById(mockEntity.id)).rejects
        .toThrowError(EntityNotFoundError);
    });
    it('can be overridden to return deleted entities', async (): Promise<void> => {
      const where = { id: mockEntity.id };

      repository.setup((mockRepo): Promise<BaseEntity> => mockRepo
        .findOneOrFail(It.isValue({ where })))
        .returns((): Promise<BaseEntity> => Promise.resolve(mockEntity))
        .verifiable();

      await expect(service.findById(mockEntity.id, true)).resolves.toBeTruthy();
    });
  });
  describe('findAll', (): void => {
    it('returns all entities from the datbase', async (): Promise<void> => {
      const where = { ...excludeDeleted };

      repository.setup((mockRepo): Promise<BaseEntity[]> => mockRepo
        .find(It.isValue({ where })))
        .returns((): Promise<BaseEntity[]> => Promise.resolve(
          new Array(10).fill(mockEntity)
        ))
        .verifiable();

      await service.findAll();
    });
    it('omits deleted entities from query results', async (): Promise<void> => {
      const where = { ...excludeDeleted };

      repository.setup((mockRepo): Promise<BaseEntity[]> => mockRepo
        .find(It.isValue({ where })))
        .returns((): Promise<BaseEntity[]> => Promise.resolve([]))
        .verifiable();

      await service.findAll();
    });
    it('can be overridden to return deleted entities', async (): Promise<void> => {
      const where = {};

      repository.setup((mockRepo): Promise<BaseEntity[]> => mockRepo
        .find(It.isValue({ where })))
        .returns((): Promise<BaseEntity[]> => Promise.resolve([]))
        .verifiable();

      await service.findAll(true);
    });
  });
});
